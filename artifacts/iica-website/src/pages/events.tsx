import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, MapPin, ChevronLeft, ChevronRight, ArrowRight, Ticket } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/lib/themeContext';

/* ─── FEATURED EVENTS (hero carousel) ─── */
const FEATURED = [
  {
    id: 1,
    title: "Annual IICA Global Summit 2025",
    subtitle: "The confluence of India's greatest classical artists",
    date: "Sept 25–27, 2025",
    venue: "The Leela Palace, New Delhi",
    category: "Summit",
    bg: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=1400&q=80",
    accent: "#833AB4",
  },
  {
    id: 2,
    title: "Sur Sadhak Festival — Annual Classical Concert",
    subtitle: "Presented by Aniket Chakravarty & IICA",
    date: "Oct 18, 2025",
    venue: "Rabindra Sadan, Kolkata",
    category: "Festival",
    bg: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=1400&q=80",
    accent: "#C13584",
  },
  {
    id: 3,
    title: "Legacy Awards Night 2025",
    subtitle: "Honouring India's finest performing artists",
    date: "Dec 20, 2025",
    venue: "Taj Lands End, Mumbai",
    category: "Awards",
    bg: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1400&q=80",
    accent: "#E1306C",
  },
];

/* ─── ALL EVENTS ─── */
const ALL_EVENTS = [
  { id: 1, title: "Symphony of Strings", date: "Oct 15, 2025", venue: "NCPA, Mumbai", category: "Concert", img: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=500&q=80", color: "#6c2eb9" },
  { id: 2, title: "Global Rhythms Festival", date: "Nov 02, 2025", venue: "Royal Albert Hall, London", category: "Festival", img: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=500&q=80", color: "#c13584" },
  { id: 3, title: "Kathak Masterclass Series", date: "Nov 18, 2025", venue: "IICA Studios, Delhi", category: "Workshop", img: "https://images.unsplash.com/photo-1518834107812-67b0b7c58434?w=500&q=80", color: "#833AB4" },
  { id: 4, title: "Fusion Evenings", date: "Dec 05, 2025", venue: "Chowdiah Hall, Bangalore", category: "Concert", img: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=500&q=80", color: "#E1306C" },
  { id: 5, title: "Legacy Awards Night", date: "Dec 20, 2025", venue: "Taj Lands End, Mumbai", category: "Awards", img: "https://images.unsplash.com/photo-1571266028560-20d3234b0e39?w=500&q=80", color: "#d4a853" },
  { id: 6, title: "Classical Voices Conclave", date: "Jan 10, 2026", venue: "Music Academy, Chennai", category: "Concert", img: "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=500&q=80", color: "#833AB4" },
  { id: 7, title: "Rhythm & Beats Night", date: "Feb 14, 2026", venue: "Habitat Centre, Delhi", category: "Performance", img: "https://images.unsplash.com/photo-1598387993281-cecf8b71a8f8?w=500&q=80", color: "#C13584" },
  { id: 8, title: "Art of Abhinaya", date: "Mar 05, 2026", venue: "Online Virtual Event", category: "Workshop", img: "https://images.unsplash.com/photo-1506157786151-b8491531f063?w=500&q=80", color: "#6c2eb9" },
  { id: 9, title: "Sarod Soiree", date: "Mar 22, 2026", venue: "ITC Royal Bengal, Kolkata", category: "Concert", img: "https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?w=500&q=80", color: "#E1306C" },
  { id: 10, title: "Young Maestros Showcase", date: "Apr 10, 2026", venue: "Nehru Centre, Mumbai", category: "Performance", img: "https://images.unsplash.com/photo-1501386761578-eaa54b4e9d07?w=500&q=80", color: "#833AB4" },
  { id: 11, title: "Hindustani Vocal Evening", date: "Apr 28, 2026", venue: "Kamani Auditorium, Delhi", category: "Concert", img: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=500&q=80", color: "#C13584" },
  { id: 12, title: "IICA Annual Gala", date: "May 15, 2026", venue: "ITC Grand Chola, Chennai", category: "Awards", img: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=500&q=80", color: "#d4a853" },
];

const CATEGORIES = ["All", "Concert", "Festival", "Workshop", "Awards", "Performance", "Summit"];

export default function Events() {
  const { theme } = useTheme();
  const [featIdx, setFeatIdx] = useState(0);
  const [activeCategory, setActiveCategory] = useState("All");

  /* Auto-advance featured carousel */
  useEffect(() => {
    const t = setInterval(() => setFeatIdx(i => (i + 1) % FEATURED.length), 5000);
    return () => clearInterval(t);
  }, []);

  const filtered = activeCategory === "All"
    ? ALL_EVENTS
    : ALL_EVENTS.filter(e => e.category === activeCategory);

  const feat = FEATURED[featIdx];

  return (
    <div className="bg-background text-foreground min-h-screen pt-16 transition-colors duration-300">

      {/* ══════════════════════════════════════
          FEATURED CAROUSEL — District.in style
          ══════════════════════════════════════ */}
      <section className="relative h-[62vh] min-h-[420px] overflow-hidden">

        <AnimatePresence mode="wait">
          <motion.div
            key={featIdx}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="absolute inset-0"
          >
            <img src={feat.bg} alt={feat.title} className="w-full h-full object-cover" />
            <div className={`absolute inset-0 ${theme === 'light' ? 'bg-white/60' : 'bg-black/60'}`} />
            <div className={`absolute inset-0 bg-gradient-to-t ${theme === 'light' ? 'from-white via-white/20 to-transparent' : 'from-black via-black/20 to-transparent'}`} />
            <div className={`absolute inset-0 bg-gradient-to-r ${theme === 'light' ? 'from-white/80 via-transparent to-transparent' : 'from-black/80 via-transparent to-transparent'}`} />
          </motion.div>
        </AnimatePresence>

        {/* Content */}
        <div className="relative z-10 h-full flex items-end pb-12">
          <div className="container mx-auto px-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={featIdx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
                className="max-w-xl"
              >
                <span
                  className="inline-block text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-4"
                  style={{ background: feat.accent + '30', color: feat.accent, border: `1px solid ${feat.accent}50` }}
                >
                  {feat.category}
                </span>
                <h1 className={`font-serif text-3xl md:text-4xl font-bold mb-2 leading-tight ${theme === 'light' ? 'text-foreground' : 'text-white'}`}>{feat.title}</h1>
                <p className={`text-sm mb-4 ${theme === 'light' ? 'text-muted-foreground' : 'text-gray-300'}`}>{feat.subtitle}</p>
                <div className={`flex flex-wrap gap-4 text-xs mb-6 ${theme === 'light' ? 'text-muted-foreground' : 'text-gray-400'}`}>
                  <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5 text-[#C13584]" />{feat.date}</span>
                  <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-[#C13584]" />{feat.venue}</span>
                </div>
                <Button className="gradient-bg text-white h-10 px-6 text-sm rounded-md hover:opacity-90 font-semibold">
                  <Ticket className="w-4 h-4 mr-2" /> Book Tickets
                </Button>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Prev / Next arrows */}
        <button
          onClick={() => setFeatIdx(i => (i - 1 + FEATURED.length) % FEATURED.length)}
          className={`absolute left-4 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full border flex items-center justify-center transition-all ${
            theme === 'light'
              ? 'bg-card/70 border-border hover:bg-card'
              : 'bg-black/40 border-white/20 hover:bg-black/70'
          }`}
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <button
          onClick={() => setFeatIdx(i => (i + 1) % FEATURED.length)}
          className={`absolute right-4 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full border flex items-center justify-center transition-all ${
            theme === 'light'
              ? 'bg-card/70 border-border hover:bg-card'
              : 'bg-black/40 border-white/20 hover:bg-black/70'
          }`}
        >
          <ChevronRight className="w-4 h-4" />
        </button>

        {/* Dots */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2">
          {FEATURED.map((_, i) => (
            <button
              key={i}
              onClick={() => setFeatIdx(i)}
              className={`h-1 rounded-full transition-all ${i === featIdx ? 'w-6 bg-[#C13584]' : theme === 'light' ? 'w-2 bg-border' : 'w-2 bg-white/30'}`}
            />
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════
          CATEGORY PILLS
          ══════════════════════════════════════ */}
      <section className={`border-b sticky top-16 z-30 ${theme === 'light' ? 'bg-muted border-border' : 'bg-[#080808] border-white/8'}`}>
        <div className="container mx-auto px-6">
          <div className="flex gap-2 overflow-x-auto py-4" style={{ scrollbarWidth: 'none' }}>
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`whitespace-nowrap px-4 py-1.5 rounded-full text-xs font-semibold transition-all border ${
                  activeCategory === cat
                    ? 'gradient-bg text-white border-transparent'
                    : theme === 'light'
                      ? 'border-border text-muted-foreground hover:text-foreground hover:border-accent/50 bg-transparent'
                      : 'border-white/15 text-gray-400 hover:text-white hover:border-white/30 bg-transparent'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          ALL EVENTS GRID — District.in cards
          ══════════════════════════════════════ */}
      <section className="py-12">
        <div className="container mx-auto px-6">

          <div className="flex items-center justify-between mb-8">
            <h2 className={`font-serif text-2xl font-bold ${theme === 'light' ? 'text-foreground' : 'text-white'}`}>
              {activeCategory === "All" ? "All Events" : activeCategory}
              <span className={`text-base font-normal ml-2 ${theme === 'light' ? 'text-muted-foreground' : 'text-gray-600'}`}>({filtered.length})</span>
            </h2>
          </div>

          <motion.div
            layout
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5"
          >
            <AnimatePresence>
              {filtered.map((event, i) => (
                <motion.div
                  key={event.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: i * 0.04 }}
                  className={`group cursor-pointer rounded-2xl overflow-hidden border transition-all duration-300 ${
                    theme === 'light'
                      ? 'bg-card border-border hover:border-accent/30 hover:shadow-md'
                      : 'bg-[#0d0d0d] border-white/8 hover:border-white/20'
                  }`}
                >
                  {/* Poster image */}
                  <div className="aspect-[3/4] relative overflow-hidden">
                    <img
                      src={event.img}
                      alt={event.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {/* Gradient overlay */}
                    <div className={`absolute inset-0 bg-gradient-to-t ${theme === 'light' ? 'from-white via-white/30 to-transparent' : 'from-black via-black/30 to-transparent'}`} />

                    {/* Category pill */}
                    <div
                      className="absolute top-3 left-3 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full"
                      style={{ background: event.color + '30', color: event.color, border: `1px solid ${event.color}50` }}
                    >
                      {event.category}
                    </div>

                    {/* Hover CTA */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="gradient-bg text-white text-xs font-semibold px-4 py-2 rounded-full flex items-center gap-1.5">
                        <Ticket className="w-3 h-3" /> Book Now
                      </div>
                    </div>

                    {/* Bottom info */}
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <p className={`font-bold text-sm leading-snug line-clamp-2 mb-1 ${theme === 'light' ? 'text-foreground' : 'text-white'}`}>{event.title}</p>
                      <p className={`text-[11px] flex items-center gap-1 ${theme === 'light' ? 'text-muted-foreground' : 'text-gray-400'}`}>
                        <Calendar className="w-3 h-3 text-[#C13584] shrink-0" />{event.date}
                      </p>
                      <p className={`text-[11px] flex items-center gap-1 mt-0.5 ${theme === 'light' ? 'text-muted-foreground' : 'text-gray-500'}`}>
                        <MapPin className="w-3 h-3 text-[#833AB4] shrink-0" />{event.venue}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {filtered.length === 0 && (
            <div className={`text-center py-20 ${theme === 'light' ? 'text-muted-foreground' : 'text-gray-600'}`}>
              <p className="text-lg">No events in this category yet.</p>
            </div>
          )}
        </div>
      </section>

    </div>
  );
}
