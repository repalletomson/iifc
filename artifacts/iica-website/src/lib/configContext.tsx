import React, { createContext, useContext, useEffect, useState, useRef, useCallback } from 'react';
import type { Testimonial, TalkShowVideo, InstagramReel, AwardRecipient, SheetArtist, Job } from '@/lib/googleSheets';
import {
  fetchTestimonials, fetchTalkShow, fetchInstagramAwards,
  fetchInstagramPromo, fetchInstagramCollab, fetchAwards,
  fetchArtists, fetchHeroCards, fetchJobs,
} from '@/lib/googleSheets';

// ─── Cache constants ──────────────────────────────────────────────────────────
const SESSION_STORAGE_KEY = 'iica-config-cache-v2';
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
  loading: boolean;
  error: string | null;
  failedSheets: string[];
  refresh: () => void;
}

const EMPTY_STATE: Omit<ConfigData, 'refresh'> = {
  testimonials: [], talkShow: [], instagramAwards: [],
  instagramPromo: [], instagramCollab: [], awards: [],
  artists: [], heroCards: [], jobs: [],
  loading: true, error: null, failedSheets: [],
};

const ConfigContext = createContext<ConfigData>({
  ...EMPTY_STATE,
  refresh: () => {},
});

// ─── Session storage helpers ──────────────────────────────────────────────────

/** Read and validate the session-storage cache envelope. Returns null on any failure. */
function readCache(): { data: Omit<ConfigData, 'refresh'>; isStale: boolean } | null {
  try {
    const raw = sessionStorage.getItem(SESSION_STORAGE_KEY);
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

/** Write datasets to session storage with a timestamp. */
function writeCache(data: Omit<ConfigData, 'refresh'>) {
  try {
    const { loading, error, failedSheets, ...rest } = data;
    const envelope: CacheEnvelope = { data: rest, savedAt: Date.now() };
    sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(envelope));
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

  // ── Core load function ──────────────────────────────────────────────────────
  const load = useCallback(async (isBackgroundRevalidation = false) => {
    // For background revalidation: don't show loading spinner (data already shown from cache)
    if (!isBackgroundRevalidation) {
      setData(prev => ({ ...prev, loading: true, error: null, failedSheets: [] }));
    }

    const keys = [
      'testimonials', 'talkShow', 'instagramAwards', 'instagramPromo',
      'instagramCollab', 'awards', 'artists', 'heroCards', 'jobs',
    ] as const;

    const fetchers = [
      fetchTestimonials(), fetchTalkShow(), fetchInstagramAwards(),
      fetchInstagramPromo(), fetchInstagramCollab(), fetchAwards(),
      fetchArtists(), fetchHeroCards(), fetchJobs(),
    ];

    // Promise.allSettled: one failing sheet never blocks the others
    const results = await Promise.allSettled(fetchers);

    const failedSheets: string[] = [];
    const partial: Record<string, any> = {};
    results.forEach((r, i) => {
      if (r.status === 'fulfilled') {
        partial[keys[i]] = r.value;
      } else {
        failedSheets.push(keys[i]);
        const reason = r.reason;
        const msg = reason instanceof Error ? reason.message : String(reason);
        if (msg.includes('timed out') || msg.includes('AbortError')) {
          console.log(`⏱️ [ConfigProvider] Sheet "${keys[i]}" timed out — Google may be slow. Using fallback data if available.`);
        } else {
          console.log(`⚠️ [ConfigProvider] Failed to fetch sheet "${keys[i]}":`, reason);
        }
      }
    });

    const errorMsg = failedSheets.length > 0
      ? `Some data could not be loaded: ${failedSheets.join(', ')}`
      : null;

    setData(prev => {
      const merged: Omit<ConfigData, 'refresh'> = {
        ...prev,
        ...partial,
        loading: false,
        error: errorMsg,
        failedSheets,
      };
      // Persist the successfully loaded data (even partial) to cache
      if (Object.keys(partial).length > 0) {
        writeCache(merged);
      }
      return merged;
    });

    if (failedSheets.length === 0) {
      console.log('📊 Google Sheets data loaded:', keys.reduce((acc, k) => {
        acc[k] = (partial[k] || []).length;
        return acc;
      }, {} as Record<string, number>));
    }
  }, []);

  // ── Initial mount: deduplicated via sessionStorage flag (survives HMR) ──────
  useEffect(() => {
    const alreadyLoaded = sessionStorage.getItem(HMR_LOADED_FLAG) === '1';
    const cached = readCache();

    if (alreadyLoaded && cached) {
      // HMR remount: we already have data in sessionStorage, just rehydrate state
      // but still kick off a silent background revalidation if the cache is stale
      setData(cached.data);
      if (cached.isStale) {
        load(true /* background */);
      }
    } else {
      // First real mount (page load / cold start / F5)
      sessionStorage.setItem(HMR_LOADED_FLAG, '1');

      if (cached && !cached.isStale) {
        // Fresh cache: show immediately, no network request needed
        setData(cached.data);
      } else if (cached && cached.isStale) {
        // Stale cache: show cached content immediately, revalidate in background
        setData(cached.data);
        load(true /* background */);
      } else {
        // No cache: normal foreground load
        load(false);
      }
    }

    // Clear the HMR flag when the tab/window is closed so next cold start re-fetches
    const handleUnload = () => sessionStorage.removeItem(HMR_LOADED_FLAG);
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
