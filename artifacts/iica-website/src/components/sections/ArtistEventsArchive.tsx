import React, { useState } from 'react';
import { MapPin } from 'lucide-react';
import { useTheme } from '@/lib/themeContext';
import type { ParsedEventEntry } from '@/lib/googleSheets';

// ─── helpers ─────────────────────────────────────────────────────────────────

const MONTH_SHORT = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

function parseDate(dateStr: string): { month: string; day: string; year: string } | null {
  if (!dateStr) return null;
  // Try ISO: YYYY-MM-DD
  const iso = dateStr.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (iso) {
    const month = MONTH_SHORT[parseInt(iso[2], 10) - 1] ?? '';
    return { month, day: iso[3].replace(/^0/, ''), year: iso[1] };
  }
  // Try DD/MM/YYYY or DD-MM-YYYY
  const dmy = dateStr.match(/^(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})$/);
  if (dmy) {
    const month = MONTH_SHORT[parseInt(dmy[2], 10) - 1] ?? '';
    return { month, day: dmy[1].replace(/^0/, ''), year: dmy[3] };
  }
  return null;
}

// ─── sub-components ───────────────────────────────────────────────────────────

interface EventRowProps {
  event: ParsedEventEntry;
  isDark: boolean;
}

function EventRow({ event, isDark }: EventRowProps) {
  const parsed = parseDate(event.date);

  return (
    <div
      className={`flex items-start gap-5 py-5 border-b
        ${isDark ? 'border-white/8' : 'border-[#e8e5e1]'}
      `}
    >
      {/* Date column */}
      <div
        className={`w-[68px] flex-shrink-0 pr-4 text-center border-r border-dashed
          ${isDark ? 'border-white/20' : 'border-[#d8bfcd]'}
        `}
      >
        {parsed ? (
          <>
            <span className="block text-[11px] font-semibold tracking-widest uppercase text-[#C13584]">
              {parsed.month}
            </span>
            <span
              className={`block font-serif font-bold text-2xl leading-tight
                ${isDark ? 'text-white' : 'text-[#1c1a24]'}
              `}
            >
              {parsed.day.padStart(2, '0')}
            </span>
            <span className={`block text-[11.5px] ${isDark ? 'text-gray-500' : 'text-[#6c6a75]'}`}>
              {parsed.year}
            </span>
          </>
        ) : (
          <span className={`block text-xs ${isDark ? 'text-gray-500' : 'text-[#6c6a75]'}`}>
            {event.date}
          </span>
        )}
      </div>

      {/* Content column */}
      <div className="flex-1 min-w-0">
        {/* Title + tag */}
        <div className="flex items-baseline justify-between gap-3 flex-wrap">
          <h4
            className={`font-serif font-bold text-[17px] m-0
              ${isDark ? 'text-white' : 'text-[#1c1a24]'}
            `}
          >
            {event.title}
          </h4>
          {event.tag && (
            <span
              className={`flex-shrink-0 text-[11px] font-semibold rounded-full px-3 py-[3px]
                ${isDark
                  ? 'text-[#C13584] bg-[#C13584]/10'
                  : 'text-[#b31d5c] bg-[#fbe7f0]'}
              `}
            >
              {event.tag}
            </span>
          )}
        </div>

        {/* Venue */}
        {event.venue && (
          <div
            className={`flex items-center gap-1.5 mt-1.5 text-[13px]
              ${isDark ? 'text-gray-500' : 'text-[#6c6a75]'}
            `}
          >
            <MapPin className="w-3 h-3 text-[#C13584] shrink-0" strokeWidth={2} />
            <span>{event.venue}</span>
          </div>
        )}

        {/* Description */}
        {event.description && (
          <p
            className={`mt-2 text-[13.5px] leading-relaxed max-w-[56ch]
              ${isDark ? 'text-gray-500' : 'text-[#6c6a75]'}
            `}
          >
            {event.description}
          </p>
        )}
      </div>
    </div>
  );
}

// ─── main component ───────────────────────────────────────────────────────────

const VISIBLE_COUNT = 4;

interface ArtistEventsArchiveProps {
  events: ParsedEventEntry[];
}

export function ArtistEventsArchive({ events }: ArtistEventsArchiveProps) {
  const { theme } = useTheme();
  const [expanded, setExpanded] = useState(false);

  if (!events || events.length === 0) return null;

  const isDark     = theme === 'dark';
  const visible    = events.slice(0, VISIBLE_COUNT);
  const extra      = events.slice(VISIBLE_COUNT);
  const hasMore    = extra.length > 0;

  return (
    <section id="events-archive">
      {/* Section heading */}
      <div className="mb-8">
        <span className="block w-7 h-[2px] bg-[#C13584] mb-4" />
        <h2
          className={`font-serif text-2xl font-bold mb-2
            ${isDark ? 'text-white' : 'text-[#1c1a24]'}
          `}
        >
          Concerts & Shows
        </h2>
        <p className={`text-sm ${isDark ? 'text-gray-500' : 'text-[#6c6a75]'}`}>
          Every hall, festival, and stage along the way.
        </p>
      </div>

      {/* Always-visible rows */}
      <div className={`border-t ${isDark ? 'border-white/8' : 'border-[#e8e5e1]'}`}>
        {visible.map((event, i) => (
          <EventRow key={i} event={event} isDark={isDark} />
        ))}
      </div>

      {/* Collapsible extra rows */}
      {hasMore && (
        <>
          <div
            className="grid transition-[grid-template-rows] duration-[450ms] ease-[cubic-bezier(0.65,0,0.35,1)]"
            style={{ gridTemplateRows: expanded ? '1fr' : '0fr' }}
            aria-hidden={!expanded}
          >
            <div className="overflow-hidden">
              {extra.map((event, i) => (
                <EventRow key={i} event={event} isDark={isDark} />
              ))}
              {/* close out the last row's bottom border */}
              <div className={`border-b ${isDark ? 'border-white/8' : 'border-[#e8e5e1]'}`} />
            </div>
          </div>

          {/* View more / fewer button */}
          <button
            onClick={() => setExpanded(v => !v)}
            aria-expanded={expanded}
            className={`flex items-center gap-2 mt-7 mx-auto px-5 py-2.5 rounded-full
              border text-[13.5px] font-semibold cursor-pointer
              transition-colors duration-200
              focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C13584]
              ${isDark
                ? 'border-white/10 text-gray-300 hover:border-[#C13584] hover:text-[#C13584]'
                : 'border-[#e8e5e1] text-[#1c1a24] hover:border-[#b31d5c] hover:text-[#b31d5c]'}
            `}
          >
            <span>{expanded ? 'Show fewer events' : `View ${extra.length} more event${extra.length !== 1 ? 's' : ''}`}</span>
            <svg
              viewBox="0 0 24 24" width="14" height="14"
              fill="none" stroke="currentColor" strokeWidth="2.2"
              className="transition-transform duration-[350ms] ease-[cubic-bezier(0.65,0,0.35,1)]"
              style={{ transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)' }}
            >
              <path d="M6 9l6 6 6-6" />
            </svg>
          </button>
        </>
      )}
    </section>
  );
}
