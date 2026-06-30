'use client';

import React from 'react';
import { Link } from 'wouter';
import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/lib/themeContext';

interface ArtistCardProps {
  artist: {
    slug: string;
    name: string;
    profession: string;
    city: string;
    image: string;
    instrument?: string;
    style?: string;
  };
  delay?: number;
}

export function ArtistCard({ artist, delay = 0 }: ArtistCardProps) {
  const category = artist.instrument || artist.style || artist.profession;
  const { theme } = useTheme();

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.6 }}
      whileHover={{ 
        scale: 1.02, 
        boxShadow: theme === 'light' 
          ? "0 12px 40px rgba(180, 120, 200, 0.2)" 
          : "0 0 40px rgba(131, 58, 180, 0.4)"
      }}
      className={`rounded-xl overflow-hidden group flex flex-col h-full transition-all ${
        theme === 'light'
          ? 'bg-white shadow-md hover:shadow-xl'
          : 'glass-card'
      }`}
    >
      <div className="aspect-[4/5] relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />
        {artist.image ? (
          <img 
            src={artist.image} 
            alt={artist.name} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
        ) : (
          <div className={`w-full h-full flex items-center justify-center ${theme === 'light' ? 'bg-muted' : 'bg-[#111]'}`}>
            <span className={`font-serif text-4xl ${theme === 'light' ? 'text-foreground/10' : 'text-white/20'}`}>{artist.name.charAt(0)}</span>
          </div>
        )}
        <div className="absolute top-4 right-4 z-20">
          <span className="text-xs font-medium px-3 py-1 rounded-full gradient-bg text-white">
            {category}
          </span>
        </div>
        <div className="absolute bottom-4 left-4 right-4 z-20">
          <h3 className="font-serif text-xl font-bold text-white mb-1">{artist.name}</h3>
          <div className="flex items-center text-gray-300 text-sm">
            <MapPin className="w-3 h-3 mr-1" />
            {artist.city}
          </div>
        </div>
      </div>
      <div className="p-4 mt-auto">
        <Link href={`/artist/${artist.slug}`}>
          <Button 
            variant="outline" 
            className={`w-full border-0 transition-all ${
              theme === 'light'
                ? 'border border-[#C13584] text-[#C13584] bg-transparent hover:bg-[#C13584] hover:text-white'
                : 'gradient-border hover:bg-white/5 text-white bg-transparent'
            }`}
          >
            View Profile
          </Button>
        </Link>
      </div>
    </motion.div>
  );
}
