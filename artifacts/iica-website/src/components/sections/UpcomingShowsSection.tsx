import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
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

function formatTypeLabel(raw: string): string {
  if (!raw || !raw.trim()) return 'Coming Soon';
  return raw.trim();
}

// ─── Tabler icon renderer ─────────────────────────────────────────────────────
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
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
          <polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
        </svg>
      );
  }
}

// ─── Description with 2-line clamp + Read more ───────────────────────────────
function Description({
  text,
  theme,
  onReadMore,
}: {
  text: string;
  theme: string;
  onReadMore: () => void;
}) {
  const ref = useRef<HTMLParagraphElement>(null);
  const [isClamped, setIsClamped] = useState(false);

  // Detect if the text is actually overflowing (more than 2 lines)
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    setIsClamped(el.scrollHeight > el.clientHeight + 2); // +2px tolerance
  }, [text]);

  return (
    <div>
      <p
        ref={ref}
        className={`text-sm leading-relaxed ${
          theme === 'light' ? 'text-muted-foreground' : 'text-gray-400'
        }`}
        style={{
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
        }}
      >
        {text}
      </p>
      {isClamped && (
        <button
          onClick={onReadMore}
          className="mt-1 text-xs font-medium text-[#C13584] hover:text-[#a82d70] transition-colors"
        >
          Read more
        </button>
      )}
    </div>
  );
}

// ─── Detail Modal ─────────────────────────────────────────────────────────────
function ShowModal({
  show,
  badge,
  typeLabel,
  theme,
  onClose,
}: {
  show: UpcomingShow;
  badge: { bg: string; text: string; dot: string };
  typeLabel: string;
  theme: string;
  onClose: () => void;
}) {
  // Close on Escape key
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [onClose]);

  // Prevent body scroll while modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  return (
    <AnimatePresence>
      {/* Backdrop */}
      <motion.div
        key="backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
      />

      {/* Modal panel */}
      <motion.div
        key="modal"
        initial={{ opacity: 0, scale: 0.94, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.94, y: 20 }}
        transition={{ duration: 0.22, ease: 'easeOut' }}
        className={`fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none`}
      >
        <div
          onClick={e => e.stopPropagation()}
          className={`pointer-events-auto w-full max-w-md rounded-2xl border shadow-2xl flex flex-col max-h-[80vh] ${
            theme === 'light'
              ? 'bg-white border-border'
              : 'bg-[#111] border-white/10'
          }`}
        >
          {/* Modal header — fixed */}
          <div className={`flex items-start justify-between gap-3 px-6 pt-6 pb-4 border-b shrink-0 ${
            theme === 'light' ? 'border-border' : 'border-white/8'
          }`}>
            <div className="flex flex-col gap-2">
              <span className={`inline-flex items-center gap-1.5 self-start text-[11px] font-semibold uppercase tracking-widest rounded-full px-3 py-1 ${badge.bg} ${badge.text}`}>
                <span className={`w-1.5 h-1.5 rounded-full animate-pulse ${badge.dot}`} />
                {typeLabel}
              </span>
              {show.title && (
                <h3 className={`font-serif text-lg font-bold leading-snug ${
                  theme === 'light' ? 'text-foreground' : 'text-white'
                }`}>
                  {show.title}
                </h3>
              )}
            </div>
            <button
              onClick={onClose}
              aria-label="Close"
              className={`shrink-0 mt-0.5 rounded-full p-1.5 transition-colors ${
                theme === 'light'
                  ? 'text-muted-foreground hover:bg-muted hover:text-foreground'
                  : 'text-gray-400 hover:bg-white/10 hover:text-white'
              }`}
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Scrollable body */}
          <div className="overflow-y-auto px-6 py-5 flex-1">
            <p className={`text-sm leading-relaxed ${
              theme === 'light' ? 'text-muted-foreground' : 'text-gray-300'
            }`}>
              {show.subtitle}
            </p>
          </div>

          {/* CTA footer — fixed */}
          {show.cta_url && show.cta_label && (
            <div className={`px-6 pb-6 pt-4 border-t shrink-0 ${
              theme === 'light' ? 'border-border' : 'border-white/8'
            }`}>
              <a
                href={show.cta_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-[#C13584] px-5 py-2.5 text-sm font-medium text-white hover:bg-[#a82d70] transition-colors"
              >
                {show.cta_icon && (
                  <TablerIcon name={show.cta_icon} className="w-4 h-4 shrink-0" />
                )}
                {show.cta_label}
              </a>
            </div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

// ─── Props ────────────────────────────────────────────────────────────────────
interface UpcomingShowsSectionProps {
  shows: UpcomingShow[];
}

// ─── Main section ─────────────────────────────────────────────────────────────
export function UpcomingShowsSection({ shows }: UpcomingShowsSectionProps) {
  const { theme } = useTheme();
  const [modalShow, setModalShow] = useState<UpcomingShow | null>(null);

  const activeShows = shows.filter(s => s.type?.trim() && s.subtitle?.trim());
  if (activeShows.length === 0) return null;

  const badgeMap = theme === 'light' ? BADGE_STYLES_LIGHT : BADGE_STYLES;

  return (
    <>
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

                {/* Title + description (2-line clamp) */}
                <div className="flex-1">
                  {show.title && (
                    <h3 className={`font-serif text-base font-bold leading-snug mb-1.5 ${
                      theme === 'light' ? 'text-foreground' : 'text-white'
                    }`}>
                      {show.title}
                    </h3>
                  )}
                  <Description
                    text={show.subtitle}
                    theme={theme}
                    onReadMore={() => setModalShow(show)}
                  />
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

      {/* Detail modal */}
      {modalShow && (
        <ShowModal
          show={modalShow}
          badge={badgeMap[modalShow.badge_color] ?? badgeMap['red']}
          typeLabel={formatTypeLabel(modalShow.type)}
          theme={theme}
          onClose={() => setModalShow(null)}
        />
      )}
    </>
  );
}
