import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, MapPin, IndianRupee } from 'lucide-react';
import { Link } from 'wouter';
import { useTheme } from '@/lib/themeContext';
import { useConfig } from '@/lib/configContext';
import type { Event } from '@/lib/googleSheets';
import { DUMMY_EVENTS, toImgUrl, extractDriveId, eventSlug } from '@/lib/eventsData';

// ─── Event Card ───────────────────────────────────────────────────────────────
function EventCard({ event }: { event: Event }) {
  const { theme } = useTheme();
  const driveId = extractDriveId(event.image);
  const imgSrc  = toImgUrl(event.image, 'w800');
  const slug    = eventSlug(event);
  const isFree  = !event.price || event.price === '0';

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      className={`group rounded-2xl overflow-hidden border transition-all duration-300 flex flex-col ${
        theme === 'light'
          ? 'bg-card border-border hover:border-[#C13584]/40 hover:shadow-lg'
          : 'bg-[#0d0d0d] border-white/8 hover:border-[#C13584]/40'
      }`}
    >
      {/* Image */}
      <div className="aspect-[16/9] relative overflow-hidden bg-gradient-to-br from-[#833AB4]/20 to-[#C13584]/20">
        {imgSrc ? (
          <img
            src={imgSrc}
            alt={event.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Calendar className="w-12 h-12 text-[#C13584]/30" />
          </div>
        )}
        <div className={`absolute inset-0 bg-gradient-to-t ${
          theme === 'light' ? 'from-white/60 to-transparent' : 'from-black/70 to-transparent'
        }`} />

        {event.category && (
          <div className="absolute top-3 left-3 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#C13584]/80 text-white">
            {event.category}
          </div>
        )}
        <div className="absolute top-3 right-3 text-[10px] font-bold px-2.5 py-1 rounded-full bg-black/60 text-white flex items-center gap-0.5">
          {isFree ? 'Free' : <><IndianRupee className="w-2.5 h-2.5" />{event.price}</>}
        </div>
      </div>

      {/* Info */}
      <div className="p-5 flex flex-col flex-1">
        <h3 className={`font-serif font-bold text-base leading-snug mb-2 line-clamp-2 ${
          theme === 'light' ? 'text-foreground' : 'text-white'
        }`}>
          {event.title}
        </h3>

        {event.description && (
          <p className={`text-xs leading-relaxed line-clamp-2 mb-3 flex-1 ${
            theme === 'light' ? 'text-muted-foreground' : 'text-gray-400'
          }`}>
            {event.description.split('\n')[0]}
          </p>
        )}

        <div className={`space-y-1 text-[11px] mb-4 ${
          theme === 'light' ? 'text-muted-foreground' : 'text-gray-500'
        }`}>
          {event.date && (
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3 h-3 text-[#C13584] shrink-0" />
              {event.date}
            </div>
          )}
          {event.venue && (
            <div className="flex items-center gap-1.5">
              <MapPin className="w-3 h-3 text-[#833AB4] shrink-0" />
              {event.venue}{event.city ? `, ${event.city}` : ''}
            </div>
          )}
        </div>

        <Link href={`/events/${slug}`}>
          <button className="w-full gradient-bg text-white text-xs font-semibold py-2.5 rounded-lg hover:opacity-90 transition-opacity">
            View & Register →
          </button>
        </Link>
      </div>
    </motion.div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function Events() {
  const { theme } = useTheme();
  const { events: rawEvents, loading } = useConfig();

  const allEvents  = rawEvents.length > 0 ? rawEvents : DUMMY_EVENTS;
  const events     = useMemo(() =>
    allEvents.filter(e => !['draft', 'past'].includes((e.status || '').toLowerCase())),
    [allEvents]
  );

  const categories = useMemo(() => {
    const cats = new Set(events.map(e => e.category).filter(Boolean));
    return ['All', ...Array.from(cats).sort()];
  }, [events]);

  const [activeCategory, setActiveCategory] = useState('All');
  const filtered = useMemo(() =>
    activeCategory === 'All' ? events : events.filter(e => e.category === activeCategory),
    [events, activeCategory]
  );

  return (
    <div className="bg-background text-foreground min-h-screen pt-16 transition-colors duration-300">

      {/* Banner */}
      <section className="relative h-[50vh] min-h-[300px] overflow-hidden">
        <motion.img
          src="/images/events/event-1.png"
          alt="IICA Events"
          initial={{ scale: 1.04, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className={`absolute inset-0 ${theme === 'light' ? 'bg-white/25' : 'bg-black/30'}`} />
        <div className={`absolute inset-0 bg-gradient-to-t ${theme === 'light' ? 'from-white/50 to-transparent' : 'from-black/60 to-transparent'}`} />
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          className="relative z-10 h-full flex items-end pb-10"
        >
          <div className="container mx-auto px-6">
            <p className="text-[#C13584] text-xs font-bold uppercase tracking-widest mb-2 drop-shadow">IICA Events</p>
            <h1 className="font-serif text-3xl md:text-5xl font-bold text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)] leading-tight">
              Upcoming Events &<br className="hidden md:block" /> Performances
            </h1>
          </div>
        </motion.div>
      </section>

      {/* Category pills */}
      {categories.length > 1 && (
        <section className={`border-b sticky top-16 z-30 ${
          theme === 'light' ? 'bg-background border-border' : 'bg-[#080808] border-white/8'
        }`}>
          <div className="container mx-auto px-6">
            <div className="flex gap-2 overflow-x-auto py-3.5" style={{ scrollbarWidth: 'none' }}>
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`whitespace-nowrap px-4 py-1.5 rounded-full text-xs font-semibold transition-all border ${
                    activeCategory === cat
                      ? 'gradient-bg text-white border-transparent'
                      : theme === 'light'
                        ? 'border-border text-muted-foreground hover:text-foreground bg-transparent'
                        : 'border-white/15 text-gray-400 hover:text-white bg-transparent'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Grid */}
      <section className="py-12">
        <div className="container mx-auto px-6">
          {loading && (
            <div className="text-center py-24">
              <div className="w-8 h-8 border-2 border-[#C13584] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
              <p className={`text-sm ${theme === 'light' ? 'text-muted-foreground' : 'text-gray-500'}`}>Loading events...</p>
            </div>
          )}

          {!loading && filtered.length === 0 && (
            <div className={`text-center py-24 ${theme === 'light' ? 'text-muted-foreground' : 'text-gray-600'}`}>
              <Calendar className="w-14 h-14 mx-auto mb-4 opacity-30" />
              <p className="text-xl font-serif font-semibold mb-2">
                {allEvents.length === 0 ? 'Events coming soon!' : 'No events in this category'}
              </p>
              <p className="text-sm opacity-70">
                {allEvents.length === 0 ? 'Stay tuned — exciting events are being planned.' : 'Try another category.'}
              </p>
            </div>
          )}

          {!loading && filtered.length > 0 && (
            <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatePresence>
                {filtered.map(event => (
                  <EventCard key={event.id || event.title} event={event} />
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
}
