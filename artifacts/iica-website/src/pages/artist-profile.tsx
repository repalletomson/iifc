import React from 'react';
import { useRoute } from 'wouter';
import { motion } from 'framer-motion';
import { MapPin, ArrowLeft, Trophy, Calendar, Play } from 'lucide-react';
import { Link } from 'wouter';
import { ARTISTS } from '@/data/artists';
import { Button } from '@/components/ui/button';
import NotFound from './not-found';

export default function ArtistProfile() {
  const [match, params] = useRoute('/artist/:slug');
  const slug = params?.slug;
  
  const artist = ARTISTS.find(a => a.slug === slug);

  if (!artist) {
    return <NotFound />;
  }

  return (
    <div className="bg-black text-white min-h-screen">
      {/* Cinematic Hero */}
      <div className="relative h-[60vh] md:h-[80vh] w-full overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent z-10" />
        
        {artist.image ? (
          <img 
            src={artist.image} 
            alt={artist.name} 
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-[#111]" />
        )}

        <div className="absolute bottom-0 left-0 w-full z-20 pb-12 pt-32 bg-gradient-to-t from-black to-transparent">
          <div className="container mx-auto px-6">
            <Link href="/artists">
              <button className="flex items-center text-gray-400 hover:text-white mb-6 text-sm transition-colors">
                <ArrowLeft className="w-4 h-4 mr-2" /> Back to Directory
              </button>
            </Link>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="inline-block px-4 py-1 rounded-full gradient-bg text-white text-sm font-medium mb-4">
                {artist.instrument || artist.style || artist.profession}
              </div>
              <h1 className="font-serif text-5xl md:text-7xl font-bold mb-4">{artist.name}</h1>
              <div className="flex items-center text-gray-300 text-lg">
                <MapPin className="w-5 h-5 mr-2 text-[#C13584]" />
                {artist.city}, {artist.country}
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          
          {/* Left Column: Bio & Journey */}
          <div className="lg:col-span-2 space-y-16">
            <section>
              <h2 className="font-serif text-3xl font-bold mb-6 flex items-center">
                <span className="w-8 h-[2px] gradient-bg mr-4 inline-block" />
                Biography
              </h2>
              <div className="text-gray-300 text-lg leading-relaxed space-y-4">
                <p>{artist.bio}</p>
                <p>Recognized for exceptional contribution to the arts, {artist.name.split(' ')[0]} has established a unique presence that resonates with both purists and contemporary audiences alike. The journey of artistic evolution continues to inspire the next generation of performers.</p>
              </div>
            </section>

            {artist.milestones && artist.milestones.length > 0 && (
              <section>
                <h2 className="font-serif text-3xl font-bold mb-8 flex items-center">
                  <span className="w-8 h-[2px] gradient-bg mr-4 inline-block" />
                  Life Journey
                </h2>
                <div className="relative border-l-2 border-white/10 ml-4 md:ml-1/2 space-y-12">
                  {artist.milestones.map((milestone, index) => (
                    <motion.div 
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      className="relative pl-8 md:pl-0"
                    >
                      <div className="hidden md:block absolute w-4 h-4 rounded-full gradient-bg left-[-9px] top-2" />
                      <div className="md:hidden absolute w-4 h-4 rounded-full gradient-bg left-[-9px] top-2" />
                      
                      <div className={`md:w-1/2 ${index % 2 === 0 ? 'md:pr-12 md:text-right md:-ml-[50%]' : 'md:pl-12 md:ml-[50%]'}`}>
                        <span className="text-[#C13584] font-bold text-xl">{milestone.year}</span>
                        <h4 className="font-serif text-xl font-bold text-white mt-1 mb-2">{milestone.title}</h4>
                        <p className="text-gray-400">{milestone.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </section>
            )}
            
            {artist.gallery && artist.gallery.length > 0 && (
              <section>
                <h2 className="font-serif text-3xl font-bold mb-8 flex items-center">
                  <span className="w-8 h-[2px] gradient-bg mr-4 inline-block" />
                  Gallery
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div key={i} className="aspect-square rounded-lg overflow-hidden bg-[#111] relative group">
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <Play className="w-8 h-8 text-white" />
                      </div>
                      <div className="w-full h-full flex items-center justify-center text-white/10 font-serif">Image {i}</div>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Right Column: Sidebar */}
          <div className="space-y-8">
            <div className="glass-card rounded-2xl p-8 sticky top-24">
              <h3 className="font-serif text-2xl font-bold mb-6">Booking Inquiry</h3>
              <form className="space-y-4">
                <div>
                  <input type="text" placeholder="Your Name" className="w-full bg-black/50 border border-white/10 rounded-md px-4 py-3 text-white focus:outline-none focus:border-[#C13584]" />
                </div>
                <div>
                  <input type="email" placeholder="Email Address" className="w-full bg-black/50 border border-white/10 rounded-md px-4 py-3 text-white focus:outline-none focus:border-[#C13584]" />
                </div>
                <div>
                  <textarea placeholder="Event Details" rows={4} className="w-full bg-black/50 border border-white/10 rounded-md px-4 py-3 text-white focus:outline-none focus:border-[#C13584] resize-none" />
                </div>
                <Button className="w-full gradient-bg text-white h-12">
                  Send Inquiry
                </Button>
              </form>
            </div>

            {artist.awards && artist.awards.length > 0 && (
              <div className="glass-card rounded-2xl p-8 border-[#d4a853]/30">
                <h3 className="font-serif text-2xl font-bold mb-6 text-[#d4a853] flex items-center">
                  <Trophy className="w-5 h-5 mr-2" /> Awards
                </h3>
                <div className="space-y-6">
                  {artist.awards.map((award, index) => (
                    <div key={index} className="flex justify-between border-b border-white/5 pb-4 last:border-0 last:pb-0">
                      <span className="font-medium text-gray-200">{award.title}</span>
                      <span className="text-[#d4a853]">{award.year}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          
        </div>
      </div>
    </div>
  );
}
