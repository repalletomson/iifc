import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '@/lib/themeContext';
import type { UpcomingShow } from '@/lib/googleSheets';

// ─── Badge config ─────────────────────────────────────────────────────────────
const BADGE_STYLES: Record<string, { bg: string; text: string; dot: string }> = {
  red:    { bg: 'bg-[#8B1A1A]/15',  text: 'text-[#c94444]',  dot: 'bg-[#c94444]'  },
  blue:   { bg: 'bg-blue-500/15',   text: 'text-blue-400',   dot: 'bg-blue-400'   },
  purple: { bg: 'bg-purple-500/15', text: 'text-purple-400', dot: 'bg-purple-400' },
  green:  { bg: 'bg-green-500/15',  text: 'text-green-400',  dot: 'bg-green-400'  },
  amber:  { bg: 'bg-amber-500/15',  text: 'text-amber-400',  dot: 'bg-amber-400'  },
};

const BADGE_STYLES_LIGHT: Record<string, { bg: string; text: string; dot: string }> = {
  red:    { bg: 'bg-[#8B1A1A]/10',  text: 'text-[#8B1A1A]',  dot: 'bg-[#8B1A1A]'  },
  blue:   { bg: 'bg-blue-100',      text: 'text-blue-700',    dot: 'bg-blue-600'   },
  purple: { bg: 'bg-purple-100',    text: 'text-purple-700',  dot: 'bg-purple-600' },
  green:  { bg: 'bg-green-100',     text: 'text-green-700',   dot: 'bg-green-600'  },
  amber:  { bg: 'bg-amber-100',     text: 'text-amber-700',   dot: 'bg-amber-600'  },
};

/** Convert a raw type string from the sheet into a human-readable badge label. */
function formatTypeLabel(raw: string): string {
  if (!raw || !raw.trim()) return 'Coming Soon';
  return raw.trim();
}

// ─── Tabler icon renderer (subset we care about) ─────────────────────────────
function TablerIcon({ name, className = 'w-5 h-5' }: { name: string; className?: string }) {
  switch (name) {
    case 'ti-brand-youtube':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
          <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2 31.2 31.2 0 0 0 0 12a31.2 31.2 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1A31.2 31.2 0 0 0 24 12a31.2 31.2 0 0 0-.5-5.8zM9.7 15.5V8.5l6.3 3.5-6.3 3.5z"/>
        </svg>
      );
    case 'ti-ticket':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M15 5l-10 10M3 9a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM21 15a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"/>
          <path d="M20 7L8 19"/>
        </svg>
      );
    case 'ti-disc':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="3"/>
          <path d="M12 3a9 9 0 0 1 9 9"/>
        </svg>
      );
    case 'ti-microphone-2':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/>
          <path d="M19 10v2a7 7 0 0 1-14 0v-2M12 19v4M8 23h8"/>
        </svg>
      );
    case 'ti-music':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 18V5l12-2v13M9 18a3 3 0 1 1-6 0 3 3 0 0 1 6 0zM21 16a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
        </svg>
      );
    case 'ti-video':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="6" width="15" height="12" rx="2"/>
          <path d="M17 10l5-3v10l-5-3V10z"/>
        </svg>
      );
    case 'ti-broadcast':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18.364 5.636a9 9 0 0 1 0 12.728M15.536 8.464a5 5 0 0 1 0 7.072M5.636 5.636a9 9 0 0 0 0 12.728M8.464 8.464a5 5 0 0 0 0 7.072"/>
          <circle cx="12" cy="12" r="1" fill="currentColor"/>
        </svg>
      );
    default:
      // ti-external-link or anything unrecognised
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
          <polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
        </svg>
      );
  }
}

// ─── Props ────────────────────────────────────────────────────────────────────
interface UpcomingShowsSectionProps {
  /** All upcoming shows from the CMS — already filtered to this artist's slug */
  shows: UpcomingShow[];
}

// ─── Component ────────────────────────────────────────────────────────────────
// Rendered inline inside the artist profile content area (no extra container/padding).
export function UpcomingShowsSection({ shows }: UpcomingShowsSectionProps) {
  const { theme } = useTheme();

  // Only shows with both mandatory fields (type + subtitle)
  // parseUpcomingShows already guarantees this, but guard defensively.
  // Line order from the sheet is preserved — no sorting applied.
  const activeShows = shows.filter(s => s.type?.trim() && s.subtitle?.trim());

  // Hide the entire section if nothing is active
  if (activeShows.length === 0) return null;

  const badgeMap = theme === 'light' ? BADGE_STYLES_LIGHT : BADGE_STYLES;

  return (
    <section className={`rounded-2xl border mb-10 p-6 transition-colors ${
      theme === 'light'
        ? 'bg-gradient-to-b from-slate-50 to-white border-border'
        : 'bg-gradient-to-b from-[#0f0f0f] to-[#0a0a0a] border-white/8'
    }`}>
      {/* Header */}
      <div className="mb-6 flex items-center gap-4">
        <span className="w-6 h-[2px] gradient-bg inline-block shrink-0" />
        <div>
          <p className="text-[#C13584] tracking-[0.3em] uppercase text-xs font-medium mb-0.5">
            What's New
          </p>
          <h2 className={`font-serif text-xl font-bold ${
            theme === 'light' ? 'text-foreground' : 'text-white'
          }`}>
            Upcoming Shows & Releases
          </h2>
        </div>
      </div>

      {/* Cards grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {activeShows.map((show, i) => {
          const badge = badgeMap[show.badge_color] ?? badgeMap['red'];
          const typeLabel = formatTypeLabel(show.type);

          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07, duration: 0.35 }}
              className={`rounded-xl border p-5 flex flex-col gap-3 transition-colors ${
                theme === 'light'
                  ? 'bg-white border-border shadow-sm hover:shadow-md'
                  : 'bg-[#0a0a0a] border-white/8 hover:border-white/20'
              }`}
            >
              {/* Badge */}
              <span className={`inline-flex items-center gap-1.5 self-start text-[11px] font-semibold uppercase tracking-widest rounded-full px-3 py-1 ${badge.bg} ${badge.text}`}>
                <span className={`w-1.5 h-1.5 rounded-full animate-pulse ${badge.dot}`} />
                {typeLabel}
              </span>

              {/* Title + subtitle */}
              <div className="flex-1">
                {show.title && (
                  <h3 className={`font-serif text-base font-bold leading-snug mb-1.5 ${
                    theme === 'light' ? 'text-foreground' : 'text-white'
                  }`}>
                    {show.title}
                  </h3>
                )}
                <p className={`text-sm leading-relaxed ${
                  theme === 'light' ? 'text-muted-foreground' : 'text-gray-400'
                }`}>
                  {show.subtitle}
                </p>
              </div>

              {/* CTA button */}
              {show.cta_url && show.cta_label && (
                <a
                  href={show.cta_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 self-start rounded-full bg-[#C13584] px-4 py-2 text-sm font-medium text-white hover:bg-[#a82d70] transition-colors"
                >
                  {show.cta_icon && (
                    <TablerIcon name={show.cta_icon} className="w-4 h-4 shrink-0" />
                  )}
                  {show.cta_label}
                </a>
              )}
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
