import React from 'react';
import { Link } from 'wouter';
import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';

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

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.6 }}
      whileHover={{ scale: 1.02, boxShadow: "0 0 40px rgba(131,58,180,0.4)" }}
      className="glass-card rounded-xl overflow-hidden group flex flex-col h-full"
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
          <div className="w-full h-full bg-[#111] flex items-center justify-center">
            <span className="font-serif text-4xl text-white/20">{artist.name.charAt(0)}</span>
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
          <Button variant="outline" className="w-full gradient-border hover:bg-white/5 border-0 text-white bg-transparent">
            View Profile
          </Button>
        </Link>
      </div>
    </motion.div>
  );
}
