import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { ArtistCard } from '@/components/sections/ArtistCard';
import { ARTISTS } from '@/data/artists';

export default function Artists() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  
  const filters = ['All', 'Musician', 'Vocalist', 'Dancer', 'Visual Artist', 'Educator', 'Performers'];

  const filteredArtists = ARTISTS.filter(artist => {
    const matchesSearch = artist.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          artist.profession.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = activeFilter === 'All' || 
                          artist.profession.toLowerCase().includes(activeFilter.toLowerCase()) ||
                          (activeFilter === 'Performers' && (artist.profession.includes('Musician') || artist.profession.includes('Dancer')));
                          
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="bg-black text-white min-h-screen pt-20">
      <div className="container mx-auto px-6 py-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h1 className="font-serif text-5xl md:text-6xl font-bold mb-6">Artists Directory</h1>
          <p className="text-gray-400 text-lg">Discover the masters of Indian classical arts, contemporary performers, and cultural educators shaping the global landscape.</p>
        </motion.div>

        {/* Search and Filters */}
        <div className="mb-12">
          <div className="flex flex-col md:flex-row gap-6 items-center justify-between mb-8">
            <div className="relative w-full md:w-96">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
              <Input 
                type="text"
                placeholder="Search artists by name or profession..." 
                className="pl-12 h-14 bg-[#111] border-white/10 rounded-full text-white"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            {filters.map(filter => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                  activeFilter === filter 
                    ? 'gradient-bg text-white' 
                    : 'bg-[#111] text-gray-400 hover:text-white hover:bg-[#222] border border-white/5'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* Artists Grid */}
        {filteredArtists.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredArtists.map((artist, index) => (
              <ArtistCard key={artist.slug} artist={artist} delay={index * 0.05} />
            ))}
          </div>
        ) : (
          <div className="text-center py-24 glass-card rounded-2xl">
            <h3 className="text-2xl font-serif mb-2">No artists found</h3>
            <p className="text-gray-400">Try adjusting your search or filters.</p>
          </div>
        )}
      </div>
    </div>
  );
}
