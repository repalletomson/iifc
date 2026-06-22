import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import { Link } from 'wouter';
import { ARTISTS } from '@/data/artists';

const ARTIST_AVATARS = [
  "https://images.unsplash.com/photo-1619983081593-e2ba5b543168?w=400&q=80",
  "https://images.unsplash.com/photo-1509059852496-f3822ae057bf?w=400&q=80",
  "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&q=80",
  "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&q=80",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80",
  "https://images.unsplash.com/photo-1520810627419-35e6bce42bca?w=400&q=80",
  "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&q=80",
  "https://images.unsplash.com/photo-1499952127939-9bbf5af6c51c?w=400&q=80",
  "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&q=80",
  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80",
  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80",
  "https://images.unsplash.com/photo-1463453091185-61582044d556?w=400&q=80",
];

export default function Artists() {
  const [search, setSearch] = useState('');

  const filtered = ARTISTS.filter(a =>
    a.name.toLowerCase().includes(search.toLowerCase()) ||
    a.profession.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-black text-white min-h-screen pt-16">

      {/* ── Header bar ── */}
      <div className="sticky top-16 z-20 bg-black border-b border-white/8">
        <div className="container mx-auto px-6 py-4 flex items-center gap-6">
          <h1 className="font-serif text-2xl font-bold text-white shrink-0">Artists</h1>

          {/* Search — EVEN style */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-600 w-4 h-4" />
            <input
              type="text"
              placeholder="Search releases or artists"
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full bg-[#1a1a1a] border border-white/10 rounded-full pl-10 pr-4 py-2 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-white/25 transition-colors"
            />
          </div>
        </div>
      </div>

      {/* ── Artist grid — EVEN style large circles ── */}
      <div className="container mx-auto px-6 py-10">
        {filtered.length === 0 ? (
          <div className="text-center py-20 text-gray-600">
            <p className="text-lg">No artists found for "{search}"</p>
          </div>
        ) : (
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-x-6 gap-y-10">
            {filtered.map((artist, i) => (
              <motion.div
                key={artist.slug}
                initial={{ opacity: 0, scale: 0.88 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.03 }}
                className="flex flex-col items-center gap-3 group"
              >
                <Link href={`/artist/${artist.slug}`}>
                  <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full overflow-hidden bg-[#1a1a1a] border-2 border-transparent group-hover:border-[#C13584]/50 transition-all duration-300 cursor-pointer">
                    <img
                      src={ARTIST_AVATARS[i % ARTIST_AVATARS.length]}
                      alt={artist.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </Link>
                <div className="text-center">
                  <p className="text-white text-xs font-semibold leading-tight group-hover:text-[#C13584] transition-colors">{artist.name}</p>
                  <p className="text-gray-600 text-[10px] mt-0.5 line-clamp-1">{(artist.instrument || artist.profession.split('|')[0]).trim()}</p>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
