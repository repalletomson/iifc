import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import { Link } from 'wouter';
import { useConfig } from '@/lib/configContext';
import { useTheme } from '@/lib/themeContext';

const FILTERS = [
  { label: 'All', tag: '' },
  { label: 'Indian Classical', tag: '#indianclassical' },
  { label: 'Western Classical', tag: '#western' },
  { label: 'Percussion', tag: '#percussion' },
  { label: 'Contemporary', tag: '#contemporary' },
];

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
  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80",
  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80",
  "https://images.unsplash.com/photo-1463453091185-61582044d556?w=400&q=80",
];

export default function Artists() {
  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState('');
  const { theme } = useTheme();
  const config = useConfig();

  // Only use Google Sheets data — no hardcoded fallback
  const allArtists = useMemo(() => {
    if (config.artists.length === 0) return [];
    return config.artists.map(a => ({
      slug: a.slug,
      name: a.name,
      profession: a.profession,
      image: a.image,
      tags: a.tags ? a.tags.toLowerCase() : '',
    }));
  }, [config.artists]);

  const filtered = useMemo(() => {
    let result = allArtists;

    // Text search filter
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(a =>
        a.name.toLowerCase().includes(q) ||
        a.profession.toLowerCase().includes(q)
      );
    }

    // Tag filter
    if (activeFilter) {
      result = result.filter(a => a.tags.includes(activeFilter));
    }

    return result;
  }, [allArtists, search, activeFilter]);

  return (
    <div className="bg-background text-foreground min-h-screen pt-20">

      {/* ── Header ── */}
      <div className="container mx-auto px-6 pt-12 pb-8">
        {/* Search bar — above title */}
        <div className="relative max-w-md mb-6">
          <Search className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 ${theme === 'light' ? 'text-muted-foreground' : 'text-gray-500'}`} />
          <input
            type="text"
            placeholder="Search for releases or artists"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className={`w-full rounded-full pl-12 pr-5 py-3 text-sm transition-colors focus:outline-none ${
              theme === 'light'
                ? 'bg-muted border border-border text-foreground placeholder:text-muted-foreground focus:border-accent'
                : 'bg-[#1a1a1a] border border-white/10 text-white placeholder:text-gray-500 focus:border-white/25'
            }`}
          />
        </div>

        <h1 className={`font-sans font-black ${theme === 'light' ? 'text-foreground' : 'text-white'}`} style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}>
          Artists
        </h1>

        {/* ── Filter chips ── */}
        <div className="flex flex-wrap gap-2 mt-6">
          {FILTERS.map((f) => {
            const isActive = activeFilter === f.tag;
            return (
              <button
                key={f.tag}
                onClick={() => setActiveFilter(f.tag)}
                className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all border ${
                  isActive
                    ? 'bg-[#C13584] text-white border-[#C13584] shadow-sm'
                    : theme === 'light'
                      ? 'bg-card text-muted-foreground border-border hover:border-accent hover:text-foreground'
                      : 'bg-[#1a1a1a] text-gray-400 border-white/10 hover:border-white/25 hover:text-white'
                }`}
              >
                {f.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Artist grid — EVEN style ── */}
      <div className="container mx-auto px-6 pb-20">
        {filtered.length === 0 ? (
          <div className={`text-center py-20 ${theme === 'light' ? 'text-muted-foreground' : 'text-gray-600'}`}>
            <p className="text-lg">
              {search || activeFilter
                ? `No artists found${search ? ` for "${search}"` : ''}${activeFilter ? ` in "${FILTERS.find(f => f.tag === activeFilter)?.label}"` : ''}`
                : 'No artists available yet. Check back soon!'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-x-5 gap-y-8">
            {filtered.map((artist, i) => (
              <motion.div
                key={artist.slug}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.02 }}
                className="flex flex-col items-center gap-2.5 group cursor-pointer"
              >
                <Link href={`/artist/${artist.slug}`}>
                  <div className={`w-28 h-28 sm:w-36 sm:h-36 md:w-44 md:h-44 rounded-full overflow-hidden transition-all duration-200 ${
                    theme === 'light'
                      ? 'bg-muted group-hover:ring-2 group-hover:ring-accent/30'
                      : 'bg-[#1a1a1a] group-hover:ring-2 group-hover:ring-white/20'
                  }`}>
                    <img
                      src={artist.image || ARTIST_AVATARS[i % ARTIST_AVATARS.length]}
                      alt={artist.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = ARTIST_AVATARS[i % ARTIST_AVATARS.length];
                      }}
                    />
                  </div>
                </Link>
                <p className={`text-xs font-medium text-center leading-tight ${theme === 'light' ? 'text-foreground' : 'text-white'}`}>{artist.name}</p>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
