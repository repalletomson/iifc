import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Bell, TrendingUp, Award, PlayCircle, Star, CalendarDays } from 'lucide-react';
import { useTheme } from '@/lib/themeContext';

// ─── Section definitions ─────────────────────────────────────────────────────

interface NavSection {
  id: string;
  label: string;
  shortLabel: string;
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

const SECTIONS: NavSection[] = [
  { id: 'whats-new',       label: "What's New",  shortLabel: 'New',      Icon: Bell         },
  { id: 'highlights',      label: 'Highlights',  shortLabel: 'Timeline', Icon: TrendingUp   },
  { id: 'events-archive',  label: 'Events',      shortLabel: 'Events',   Icon: CalendarDays },
  { id: 'awards',          label: 'Awards',      shortLabel: 'Awards',   Icon: Award        },
  { id: 'watch-listen',    label: 'Watch',       shortLabel: 'Watch',    Icon: PlayCircle   },
  { id: 'testimonials',    label: 'Reviews',     shortLabel: 'Reviews',  Icon: Star         },
];

// Matches Navbar h-20
const HEADER_OFFSET = 80;

// ─── Scroll helper ────────────────────────────────────────────────────────────

function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const top = el.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET - 8;
  window.scrollTo({ top, behavior: prefersReduced ? 'auto' : 'smooth' });
}

// ─── Props ────────────────────────────────────────────────────────────────────

interface ArtistSectionNavProps {
  /** When true, renders the desktop inline bar (call once, in the page body).
   *  When false/omitted, renders only the mobile fixed bottom bar. */
  inline?: boolean;
}

// ─── Main component ───────────────────────────────────────────────────────────

export function ArtistSectionNav({ inline = false }: ArtistSectionNavProps) {
  const { theme } = useTheme();
  const [activeId, setActiveId]       = useState<string>('');
  const [visibleSections, setVisible] = useState<Set<string>>(new Set());
  const [navbarVisible, setNavbarVisible] = useState(true);
  const observerRef                   = useRef<IntersectionObserver | null>(null);

  // ── IntersectionObserver ──────────────────────────────────────────────────
  const updateActive = useCallback((entries: IntersectionObserverEntry[]) => {
    setVisible(prev => {
      const next = new Set(prev);
      entries.forEach(e => {
        if (e.isIntersecting) next.add(e.target.id);
        else next.delete(e.target.id);
      });
      return next;
    });
  }, []);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(updateActive, {
      rootMargin: `-${HEADER_OFFSET}px 0px -20% 0px`,
      threshold: 0.1,
    });
    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observerRef.current!.observe(el);
    });
    return () => observerRef.current?.disconnect();
  }, [updateActive]);

  // Mirror the navbar's hide-on-scroll-down / show-on-scroll-up logic
  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      if (y > lastY && y > 100) setNavbarVisible(false);
      else setNavbarVisible(true);
      lastY = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Pick the first (topmost) visible section as active
  useEffect(() => {
    const ordered = SECTIONS.filter(s => visibleSections.has(s.id));
    if (ordered.length > 0) setActiveId(ordered[0].id);
  }, [visibleSections]);

  const isDark        = theme === 'dark';
  const activeColor   = '#C13584';
  const inactiveColor = isDark ? '#6b7280' : '#9ca3af';

  // ─────────────────────────────────────────────────────────────────────────
  // DESKTOP — horizontal inline strip  (shown when inline=true)
  // Sits in normal page flow, right below the profile header.
  // ─────────────────────────────────────────────────────────────────────────
  if (inline) {
    return (
      <nav
        aria-label="Jump to section"
        className={`
          hidden lg:flex items-center gap-2 flex-wrap
          sticky z-30
          px-6 py-3 border-b
          transition-[top] duration-300
          ${isDark
            ? 'bg-background/90 backdrop-blur-md border-white/8'
            : 'bg-background/90 backdrop-blur-md border-border'}
        `}
        style={{ top: navbarVisible ? HEADER_OFFSET : 0 }}
      >
        {SECTIONS.map(({ id, label, Icon }) => {
          const isActive = activeId === id;
          const color    = isActive ? activeColor : inactiveColor;

          return (
            <button
              key={id}
              onClick={() => scrollToSection(id)}
              aria-label={label}
              aria-current={isActive ? 'page' : undefined}
              className={`
                flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium
                border transition-all duration-200 cursor-pointer
                ${isActive
                  ? isDark
                    ? 'border-[#C13584]/40 bg-[#C13584]/10 text-[#C13584]'
                    : 'border-[#C13584]/30 bg-[#C13584]/8 text-[#C13584]'
                  : isDark
                    ? 'border-white/8 bg-transparent text-gray-500 hover:border-white/20 hover:text-gray-300'
                    : 'border-border bg-transparent text-gray-400 hover:border-gray-300 hover:text-foreground'
                }
              `}
            >
              <Icon
                width={15}
                height={15}
                stroke={color}
                strokeWidth={1.8}
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ flexShrink: 0, transition: 'stroke 0.2s' }}
              />
              {label}
            </button>
          );
        })}
      </nav>
    );
  }

  // ─────────────────────────────────────────────────────────────────────────
  // MOBILE / TABLET — fixed bottom bar  (<1024px, always rendered)
  // ─────────────────────────────────────────────────────────────────────────
  return (
    <nav
      aria-label="Jump to section"
      className={`
        lg:hidden fixed bottom-0 left-0 right-0 z-40
        flex items-stretch justify-around
        border-t
        ${isDark
          ? 'bg-[#0a0a0a]/95 backdrop-blur-md border-white/10'
          : 'bg-white/95 backdrop-blur-md border-border'}
      `}
      style={{
        height: 'calc(56px + env(safe-area-inset-bottom))',
        paddingBottom: 'env(safe-area-inset-bottom)',
      }}
    >
      {SECTIONS.map(({ id, label, shortLabel, Icon }) => {
        const isActive = activeId === id;
        const color    = isActive ? activeColor : inactiveColor;

        return (
          <button
            key={id}
            onClick={() => scrollToSection(id)}
            aria-label={label}
            aria-current={isActive ? 'page' : undefined}
            className="flex flex-col items-center justify-center gap-0.5 flex-1 min-w-0 px-1 py-2 transition-colors"
          >
            <Icon
              width={20}
              height={20}
              stroke={color}
              strokeWidth={1.8}
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ transition: 'stroke 0.2s', flexShrink: 0 }}
            />
            <span
              className="text-[10px] font-medium truncate leading-tight"
              style={{ color, transition: 'color 0.2s' }}
            >
              {shortLabel}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
