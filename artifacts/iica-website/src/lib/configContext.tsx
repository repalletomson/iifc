import React, { createContext, useContext, useEffect, useState, useRef, useCallback } from 'react';
import type { Testimonial, TalkShowVideo, InstagramReel, AwardRecipient, SheetArtist, Job, Event } from '@/lib/googleSheets';
import {
  fetchTestimonials, fetchTalkShow, fetchInstagramAwards,
  fetchInstagramPromo, fetchInstagramCollab, fetchAwards,
  fetchArtists, fetchHeroCards, fetchJobs, fetchEvents,
} from '@/lib/googleSheets';

// ─── Cache constants ──────────────────────────────────────────────────────────
const SESSION_STORAGE_KEY = 'iica-config-cache-v4'; // v4: added events sheet
/** How long a cache entry stays "fresh" before background revalidation triggers (ms). */
const CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes
/**
 * Flag stored in sessionStorage to deduplicate loads across HMR remounts.
 * Unlike a useRef, this survives React's Strict Mode double-invocation AND
 * Vite HMR fast-refresh unmount/remount cycles within the same browser tab.
 */
const HMR_LOADED_FLAG = 'iica-config-loaded';
/** After this idle time (tab hidden), trigger a background revalidate on resume. */
const VISIBILITY_REVALIDATE_AFTER_MS = 5 * 60 * 1000; // 5 minutes

/**
 * How long to wait after the critical wave finishes before starting the
 * deferred wave. A small delay lets the browser paint the hero section first.
 */
const DEFERRED_WAVE_DELAY_MS = 300;

// ─── Types ────────────────────────────────────────────────────────────────────
interface CacheEnvelope {
  data: Omit<ConfigData, 'refresh' | 'loading' | 'error' | 'failedSheets'>;
  savedAt: number;
}

interface ConfigData {
  testimonials: Testimonial[];
  talkShow: TalkShowVideo[];
  instagramAwards: InstagramReel[];
  instagramPromo: InstagramReel[];
  instagramCollab: InstagramReel[];
  awards: AwardRecipient[];
  artists: SheetArtist[];
  heroCards: any[];
  jobs: Job[];
  events: Event[];
  loading: boolean;
  error: string | null;
  failedSheets: string[];
  refresh: () => void;
}

const EMPTY_STATE: Omit<ConfigData, 'refresh'> = {
  testimonials: [], talkShow: [], instagramAwards: [],
  instagramPromo: [], instagramCollab: [], awards: [],
  artists: [], heroCards: [], jobs: [], events: [],
  loading: true, error: null, failedSheets: [],
};

const ConfigContext = createContext<ConfigData>({
  ...EMPTY_STATE,
  refresh: () => {},
});

// ─── Session storage helpers ──────────────────────────────────────────────────

/** Read and validate the localStorage cache envelope. Returns null on any failure. */
function readCache(): { data: Omit<ConfigData, 'refresh'>; isStale: boolean } | null {
  try {
    const raw = localStorage.getItem(SESSION_STORAGE_KEY);
    if (!raw) return null;
    const envelope: CacheEnvelope = JSON.parse(raw);
    // Shape guard
    if (!envelope?.data || !Array.isArray(envelope.data.artists)) return null;
    const isStale = Date.now() - (envelope.savedAt ?? 0) > CACHE_TTL_MS;
    return {
      data: { ...EMPTY_STATE, ...envelope.data, loading: false, error: null, failedSheets: [] },
      isStale,
    };
  } catch {
    return null;
  }
}

/** Write datasets to localStorage with a timestamp. */
function writeCache(data: Omit<ConfigData, 'refresh'>) {
  try {
    const { loading, error, failedSheets, ...rest } = data;
    const envelope: CacheEnvelope = { data: rest, savedAt: Date.now() };
    localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(envelope));
  } catch { /* quota exceeded — silently skip */ }
}

// ─── Provider ─────────────────────────────────────────────────────────────────

export function ConfigProvider({ children }: { children: React.ReactNode }) {
  // Seed state from cache immediately so a refresh renders cached content instantly
  const [data, setData] = useState<Omit<ConfigData, 'refresh'>>(() => {
    const cached = readCache();
    // If we have a cache, start with loading=false (show cached content immediately)
    // A background revalidation will follow if the cache is stale.
    return cached ? cached.data : { ...EMPTY_STATE };
  });

  // Keep a ref to track when the tab was hidden (for visibility-based revalidation)
  const hiddenAtRef = useRef<number | null>(null);

  // ── Shared helper: settle a batch of fetchers and merge results into state ──
  const settleBatch = useCallback(async (
    keys: readonly (keyof Omit<ConfigData, 'loading' | 'error' | 'failedSheets' | 'refresh'>)[],
    fetchers: Promise<any>[],
  ): Promise<void> => {
    const results = await Promise.allSettled(fetchers);

    const failedSheets: string[] = [];
    const partial: Record<string, any> = {};
    results.forEach((r, i) => {
      if (r.status === 'fulfilled') {
        partial[keys[i]] = r.value;
      } else {
        failedSheets.push(keys[i] as string);
        const reason = r.reason;
        const msg = reason instanceof Error ? reason.message : String(reason);
        if (msg.includes('timed out') || msg.includes('AbortError')) {
          console.log(`⏱️ [ConfigProvider] Sheet "${keys[i]}" timed out — Google may be slow. Using fallback data if available.`);
        } else {
          console.log(`⚠️ [ConfigProvider] Failed to fetch sheet "${keys[i]}":`, reason);
        }
      }
    });

    setData(prev => {
      const merged: Omit<ConfigData, 'refresh'> = {
        ...prev,
        ...partial,
        // Only mark loading=false after the critical wave (wave 1).
        // Deferred wave runs silently — never flip loading back to true.
        loading: false,
        error: failedSheets.length > 0
          ? `Some data could not be loaded: ${failedSheets.join(', ')}`
          : null,
        failedSheets: [...(prev.failedSheets ?? []), ...failedSheets],
      };
      if (Object.keys(partial).length > 0) {
        writeCache(merged);
      }
      return merged;
    });
  }, []);

  // ── Core load function ──────────────────────────────────────────────────────
  //
  // Two-wave strategy so the page is visible well before all 9 sheets finish:
  //
  //  Wave 1 — CRITICAL (blocks the loading spinner):
  //    heroCards + artists  — needed for the hero / artist grid above the fold.
  //
  //  Wave 2 — DEFERRED (fires ~300 ms after wave 1 completes, never shows a spinner):
  //    everything else — testimonials, talk show, instagram reels, awards, jobs.
  //    These populate below-the-fold sections; showing skeletons while they load
  //    is perfectly fine and doesn't feel slow.
  //
  // On a cold visit the user sees a fully rendered hero in ~2–4 s (just 2 sheets),
  // rather than waiting for all 9 sheets (which can take 8–12 s on slow connections).
  //
  const load = useCallback(async (isBackgroundRevalidation = false) => {
    // For background revalidation every wave runs silently (no spinner flip).
    if (!isBackgroundRevalidation) {
      setData(prev => ({ ...prev, loading: true, error: null, failedSheets: [] }));
    }

    // ── Wave 1: critical data ──────────────────────────────────────────────
    const criticalKeys = ['heroCards', 'artists'] as const;
    const criticalFetchers = [fetchHeroCards(), fetchArtists()];

    await settleBatch(criticalKeys, criticalFetchers);

    // Small pause so the browser paints the hero before we kick off more requests
    await new Promise(r => setTimeout(r, DEFERRED_WAVE_DELAY_MS));

    // ── Wave 2: deferred data (never blocks render) ────────────────────────
    const deferredKeys = [
      'testimonials', 'talkShow', 'instagramAwards',
      'instagramPromo', 'instagramCollab', 'awards', 'jobs', 'events',
    ] as const;
    const deferredFetchers = [
      fetchTestimonials(), fetchTalkShow(), fetchInstagramAwards(),
      fetchInstagramPromo(), fetchInstagramCollab(), fetchAwards(), fetchJobs(), fetchEvents(),
    ];

    // Fire and forget — deferred wave never shows a loading state
    settleBatch(deferredKeys, deferredFetchers).catch(() => {/* already logged inside settleBatch */});
  }, [settleBatch]);

  // ── Initial mount: deduplicated via localStorage flag (survives HMR) ──────
  useEffect(() => {
    const alreadyLoaded = localStorage.getItem(HMR_LOADED_FLAG) === '1';
    const cached = readCache();

    if (alreadyLoaded && cached) {
      // HMR remount: we already have data in localStorage, just rehydrate state
      // but still kick off a silent background revalidation if the cache is stale
      setData(cached.data);
      if (cached.isStale) {
        load(true /* background */);
      }
    } else {
      // First real mount (page load / cold start / F5)
      localStorage.setItem(HMR_LOADED_FLAG, '1');

      if (cached && !cached.isStale) {
        // Fresh cache: show immediately, no network request needed
        setData(cached.data);
      } else if (cached && cached.isStale) {
        // Stale cache: show cached content immediately, revalidate in background
        setData(cached.data);
        load(true /* background */);
      } else {
        // No cache: normal foreground load (two-wave)
        load(false);
      }
    }

    // Clear the HMR flag when the tab/window is closed so next cold start re-fetches
    const handleUnload = () => localStorage.removeItem(HMR_LOADED_FLAG);
    window.addEventListener('beforeunload', handleUnload);
    return () => window.removeEventListener('beforeunload', handleUnload);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Visibility-based revalidation (tab resume after idle) ───────────────────
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        hiddenAtRef.current = Date.now();
      } else if (document.visibilityState === 'visible') {
        const hiddenAt = hiddenAtRef.current;
        if (hiddenAt !== null) {
          const hiddenDuration = Date.now() - hiddenAt;
          hiddenAtRef.current = null;
          if (hiddenDuration >= VISIBILITY_REVALIDATE_AFTER_MS) {
            // Tab was backgrounded for long enough — silently revalidate
            console.log(`🔄 [ConfigProvider] Tab resumed after ${Math.round(hiddenDuration / 1000)}s idle, revalidating…`);
            load(true /* background */);
          }
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [load]);

  return (
    <ConfigContext.Provider value={{ ...data, refresh: () => load(false) }}>
      {children}
    </ConfigContext.Provider>
  );
}

export function useConfig() {
  return useContext(ConfigContext);
}
