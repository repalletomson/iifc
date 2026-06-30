import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Trophy } from 'lucide-react';
import { useTheme } from '@/lib/themeContext';
import { extractInstagramCode } from '@/lib/googleSheets';

/* ─── Data shape expected by the section ─── */
export interface AwardSlide {
  name: string;
  award: string;
  year: string;
  body: string;
  description: string;
  reelCode: string;
  photos?: string[];
}

interface AwardRecipientsProps {
  awards: AwardSlide[];
  eyebrow?: string;
  title?: string;
}

export default function AwardRecipients({
  awards,
  eyebrow = 'Achievements',
  title = 'Award Recipients',
}: AwardRecipientsProps) {
  const [index, setIndex] = useState(0);
  const { theme } = useTheme();

  const prev = useCallback(() => {
    setIndex((i) => (i - 1 + awards.length) % awards.length);
  }, [awards.length]);

  const next = useCallback(() => {
    setIndex((i) => (i + 1) % awards.length);
  }, [awards.length]);

  if (!awards || awards.length === 0) return null;

  const current = awards[index];
  const reelEmbedUrl = `https://www.instagram.com/reel/${extractInstagramCode(current.reelCode)}/embed/`;

  /* ── Shared style variables ── */
  const isLight = theme === 'light';

  /* ── Section background ── */
  const sectionBg = isLight ? 'bg-background border-t border-border' : 'bg-[#080808] border-t border-white/5';

  /* ── Outer card ── */
  const cardBg = isLight ? 'bg-white shadow-sm border border-gray-100' : 'bg-[#1A1A2E] border border-white/5';

  /* ── Left panel ── */
  const ghostColor = isLight ? 'text-gray-400 opacity-[0.12]' : 'text-white opacity-[0.08]';
  const nameColor = isLight ? 'text-gray-900' : 'text-white';
  const descColor = isLight ? 'text-gray-600' : 'text-gray-400';
  const instituteColor = isLight ? 'text-gray-500' : 'text-gray-500';
  /* ── Right panel ── */
  const dividerColor = isLight ? 'bg-gray-100' : 'bg-white/5';

  /* ── Nav buttons ── */
  const navBtn = isLight
    ? 'border-border hover:border-accent hover:bg-accent/10 text-foreground'
    : 'border-white/20 hover:border-white/50 hover:bg-white/5 text-white';

  return (
    <section className={`relative py-16 overflow-hidden transition-colors duration-300 ${sectionBg}`}>
      <div className="container mx-auto px-6 max-w-7xl">

        {/* ═══════════ Eyebrow + Title ═══════════ */}
        <div className="mb-8">
          <p className="text-[#C13584] text-xs tracking-[0.3em] uppercase font-medium mb-1">
            {eyebrow}
          </p>
          <h2 className={`font-serif text-4xl md:text-5xl font-bold tracking-tight ${isLight ? 'text-gray-900' : 'text-white'}`}>
            {title}
          </h2>
        </div>

        {/* ═══════════ Unified Card ═══════════ */}
        <div className={`rounded-2xl overflow-hidden flex flex-col md:flex-row items-stretch min-h-[480px] ${cardBg}`}>
          {/* ── LEFT PANEL (55%) ── */}
          <div className="w-full md:w-[55%] p-8 md:p-10 flex flex-col justify-between relative overflow-hidden shrink-0">
            {/* Ghost year watermark — positioned center-right of left panel */}
            <AnimatePresence mode="wait">
              <motion.span
                key={`ghost-${current.year}-${index}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className={`absolute right-0 top-6 md:top-8 text-[100px] md:text-[120px] font-black select-none pointer-events-none leading-none ${ghostColor}`}
              >
                {current.year}
              </motion.span>
            </AnimatePresence>

            {/* Year badge */}
            <div className="relative z-10">
              <div className="inline-flex items-center gap-1.5 bg-amber-100/70 dark:bg-amber-500/10 border border-amber-300/40 dark:border-amber-500/20 rounded-full px-3 py-1 mb-6">
                <Trophy className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                <span className="text-sm font-medium text-amber-700 dark:text-amber-400">
                  🏆 {current.year} Recipient
                </span>
              </div>
            </div>

            {/* Artist name + details */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`content-${index}`}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3 }}
                className="relative z-10 space-y-3"
              >
                <h3 className={`text-4xl md:text-5xl font-black tracking-tight leading-[1.05] ${nameColor}`}>
                  {current.name}
                </h3>
                <p className="text-lg font-bold uppercase tracking-wide text-[#C13584]">
                  {current.award}
                </p>
                <p className={`text-sm ${instituteColor}`}>{current.body}</p>
                <p className={`text-sm leading-relaxed max-w-[420px] ${descColor}`}>
                  {current.description}
                </p>
              </motion.div>
            </AnimatePresence>

            {/* Pagination */}
            <div className="relative z-10 mt-8 flex items-center gap-3">
                {/* Left arrow */}
                <button
                  onClick={prev}
                  className={`w-9 h-9 rounded-full border flex items-center justify-center transition-all ${navBtn}`}
                  aria-label="Previous recipient"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                {/* Dot indicators */}
                <div className="flex items-center gap-1.5">
                  {awards.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setIndex(i)}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        i === index
                          ? 'w-6 bg-[#C13584]'
                          : isLight
                            ? 'w-2 bg-gray-300 hover:bg-gray-400'
                            : 'w-2 bg-white/30 hover:bg-white/50'
                      }`}
                      aria-label={`Go to recipient ${i + 1}`}
                    />
                  ))}
                </div>

                {/* Right arrow */}
                <button
                  onClick={next}
                  className={`w-9 h-9 rounded-full border flex items-center justify-center transition-all ${navBtn}`}
                  aria-label="Next recipient"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>

                {/* Counter */}
                <span className={`text-xs font-medium tabular-nums min-w-[2rem] ${isLight ? 'text-gray-400' : 'text-gray-500'}`}>
                  {index + 1} / {awards.length}
                </span>
            </div>
          </div>

          {/* ── DIVIDER ── */}
          <div className={`hidden md:block w-px self-stretch ${dividerColor}`} />

          {/* ── RIGHT PANEL (45%) ── */}
          <div className="w-full md:w-[45%] flex flex-col overflow-hidden">
            {/* Instagram reel embed */}
            <div className="w-full max-w-[280px] mx-auto">
              <iframe
                src={reelEmbedUrl}
                className="w-full aspect-[9/16]"
                frameBorder="0"
                scrolling="no"
                allowTransparency={true}
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
