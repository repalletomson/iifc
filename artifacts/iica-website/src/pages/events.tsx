import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Events() {
  const events = [
    { id: 1, title: "Symphony of Strings", date: "Oct 15, 2025", venue: "NCPA, Mumbai", category: "Concert", image: "/images/events/event-1.png" },
    { id: 2, title: "Global Rhythms", date: "Nov 02, 2025", venue: "Royal Albert Hall, London", category: "Festival", image: "/images/events/event-2.png" },
    { id: 3, title: "Kathak Masterclass", date: "Nov 18, 2025", venue: "IICA Studios, Delhi", category: "Workshop", image: "/images/events/event-1.png" },
    { id: 4, title: "Fusion Evenings", date: "Dec 05, 2025", venue: "Chowdiah Hall, Bangalore", category: "Concert", image: "/images/events/event-2.png" },
    { id: 5, title: "Legacy Awards Night", date: "Dec 20, 2025", venue: "Taj Lands End, Mumbai", category: "Awards", image: "/images/events/event-1.png" },
    { id: 6, title: "Classical Voices", date: "Jan 10, 2026", venue: "Music Academy, Chennai", category: "Concert", image: "/images/events/event-2.png" },
    { id: 7, title: "Rhythm & Beats", date: "Feb 14, 2026", venue: "Habitat Centre, Delhi", category: "Performance", image: "/images/events/event-1.png" },
    { id: 8, title: "Art of Abhinaya", date: "Mar 05, 2026", venue: "Online Virtual Event", category: "Workshop", image: "/images/events/event-2.png" },
  ];

  return (
    <div className="bg-black text-white min-h-screen pt-20">
      {/* Hero */}
      <section className="container mx-auto px-6 py-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="font-serif text-5xl md:text-6xl font-bold mb-6">Upcoming Events</h1>
          <p className="text-gray-400 text-lg max-w-2xl">Experience the magic of live performances, exclusive masterclasses, and global cultural showcases.</p>
        </motion.div>

        {/* Featured Event */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-card rounded-3xl overflow-hidden mb-16 gradient-border group"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="aspect-video lg:aspect-auto bg-[#111] relative flex items-center justify-center">
              <span className="font-serif text-3xl text-white/20">Featured Event Image</span>
            </div>
            <div className="p-10 md:p-16 flex flex-col justify-center">
              <div className="inline-block px-4 py-1 rounded-full bg-[#E1306C]/20 text-[#E1306C] text-sm font-bold w-max mb-6">
                FEATURED
              </div>
              <h2 className="font-serif text-4xl font-bold mb-4 group-hover:gradient-text transition-all duration-500">
                Annual IICA Global Summit 2025
              </h2>
              <div className="flex flex-col sm:flex-row gap-4 mb-8 text-gray-300">
                <div className="flex items-center"><Calendar className="w-5 h-5 mr-2 text-[#833AB4]" /> Sept 25-27, 2025</div>
                <div className="flex items-center"><MapPin className="w-5 h-5 mr-2 text-[#833AB4]" /> The Leela Palace, New Delhi</div>
              </div>
              <p className="text-gray-400 mb-8 text-lg">A three-day confluence of the world's most distinguished classical artists, cultural ambassadors, and art patrons.</p>
              <Button className="gradient-bg text-white h-14 w-max px-10 text-lg hover:opacity-90">
                Register Now
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Filters */}
        <div className="flex gap-4 overflow-x-auto pb-4 mb-8 hide-scrollbar">
          {['All Events', 'Concerts', 'Festivals', 'Workshops', 'Awards'].map((filter, i) => (
            <button 
              key={filter}
              className={`px-6 py-2.5 rounded-full whitespace-nowrap font-medium transition-all ${
                i === 0 ? 'gradient-bg text-white' : 'glass-card text-gray-400 hover:text-white'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {events.map((event, i) => (
            <motion.div 
              key={event.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-card rounded-2xl overflow-hidden group cursor-pointer"
            >
              <div className="aspect-[4/3] bg-[#111] relative overflow-hidden flex items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />
                <img src={event.image} alt={event.title} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity z-0" />
                <div className="absolute top-4 right-4 z-20">
                  <span className="bg-black/60 backdrop-blur-md border border-white/10 text-white text-xs px-3 py-1.5 rounded-full font-medium">
                    {event.category}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <div className="text-[#C13584] text-sm font-bold mb-2">{event.date}</div>
                <h3 className="font-serif text-xl font-bold mb-2 group-hover:text-[#E1306C] transition-colors line-clamp-1">{event.title}</h3>
                <div className="flex items-center text-gray-400 text-sm mb-6">
                  <MapPin className="w-4 h-4 mr-1" /> {event.venue}
                </div>
                <Button variant="outline" className="w-full gradient-border text-white bg-transparent hover:bg-white/5 border-0 justify-between group-hover:pl-4 transition-all">
                  Details <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
