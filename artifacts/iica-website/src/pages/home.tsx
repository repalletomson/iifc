import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'wouter';
import { ChevronDown, Sparkles, TrendingUp, RefreshCw, Globe, Shield, ExternalLink } from 'lucide-react';
import useEmblaCarousel from 'embla-carousel-react';
import { Button } from '@/components/ui/button';
import { ConsultationModal } from '@/components/sections/ConsultationModal';
import { ArtistCard } from '@/components/sections/ArtistCard';
import { ARTISTS } from '@/data/artists';

export default function Home() {
  const [emblaRef] = useEmblaCarousel({ loop: true, align: 'start' });

  React.useEffect(() => {
    const interval = setInterval(() => {
      // @ts-ignore
      if (emblaRef.current && emblaRef.current.embla) {
        // @ts-ignore
        emblaRef.current.embla.scrollNext();
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [emblaRef]);

  return (
    <div className="bg-black text-white min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 z-0">
          <motion.div 
            animate={{ 
              x: [0, 100, 0], 
              y: [0, 50, 0],
              scale: [1, 1.2, 1] 
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute top-1/4 left-1/4 w-[40rem] h-[40rem] bg-[#833AB4] rounded-full mix-blend-screen filter blur-[128px] opacity-30"
          />
          <motion.div 
            animate={{ 
              x: [0, -100, 0], 
              y: [0, -50, 0],
              scale: [1, 1.5, 1] 
            }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute bottom-1/4 right-1/4 w-[35rem] h-[35rem] bg-[#C13584] rounded-full mix-blend-screen filter blur-[128px] opacity-20"
          />
        </div>
        
        <div className="container relative z-10 mx-auto px-6 text-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
            }}
            className="max-w-4xl mx-auto"
          >
            <motion.h1 
              variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}
              className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold leading-tight mb-6"
            >
              Empowering Artists <br/>
              <span className="gradient-text">Beyond Performance</span>
            </motion.h1>
            
            <motion.p 
              variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}
              className="text-lg md:text-xl text-gray-300 mb-10 leading-relaxed"
            >
              International Indian Culture & Arts connects artists, educators, performers and creative leaders through branding, collaborations, opportunities and global recognition.
            </motion.p>
            
            <motion.div 
              variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}
              className="flex flex-col sm:flex-row items-center justify-center gap-6"
            >
              <Link href="/membership">
                <Button className="gradient-bg text-white h-14 px-8 text-lg rounded-md border-0 w-full sm:w-auto hover:opacity-90">
                  Become a Member
                </Button>
              </Link>
              <Link href="/artists">
                <Button variant="outline" className="h-14 px-8 text-lg rounded-md gradient-border w-full sm:w-auto bg-transparent hover:bg-white/5 text-white border-0">
                  Explore Artists
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>

        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-gray-400"
        >
          <ChevronDown className="w-8 h-8 opacity-50" />
        </motion.div>
      </section>

      {/* Feature Cards Section */}
      <section className="py-24 bg-[#0a0a0a]">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
              className="glass-card rounded-2xl p-10 gradient-border group cursor-pointer"
            >
              <Link href="/increase-earnings">
                <TrendingUp className="w-12 h-12 text-[#C13584] mb-6" />
                <h3 className="font-serif text-3xl font-bold mb-4 group-hover:gradient-text transition-all">Increase Earnings by 80%</h3>
                <p className="text-gray-400 mb-8 text-lg">Discover proven strategies to elevate your artistic value and secure premium opportunities globally.</p>
                <div className="flex items-center text-[#E1306C] font-medium">
                  Learn How <ExternalLink className="w-4 h-4 ml-2" />
                </div>
              </Link>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              whileHover={{ scale: 1.02 }}
              className="glass-card rounded-2xl p-10 gradient-border group cursor-pointer"
            >
              <Link href="/relaunch-brand">
                <RefreshCw className="w-12 h-12 text-[#833AB4] mb-6" />
                <h3 className="font-serif text-3xl font-bold mb-4 group-hover:gradient-text transition-all">Re-Launch Your Brand Offerings</h3>
                <p className="text-gray-400 mb-8 text-lg">Reposition yourself in the market with a fresh perspective, better digital presence, and high-value packaging.</p>
                <div className="flex items-center text-[#E1306C] font-medium">
                  Start Journey <ExternalLink className="w-4 h-4 ml-2" />
                </div>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 bg-black relative">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6">Our Services</h2>
            <p className="text-gray-400 text-lg">Comprehensive solutions designed exclusively for the modern classical and traditional performing artist.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass-card rounded-xl p-8"
            >
              <Sparkles className="w-10 h-10 text-white mb-6" />
              <h4 className="text-xl font-bold mb-4">Premium Artist Branding</h4>
              <p className="text-gray-400">SEO-powered life journeys, HD content promotion, and professional legacy documentation.</p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="glass-card rounded-xl p-8"
            >
              <Shield className="w-10 h-10 text-white mb-6" />
              <h4 className="text-xl font-bold mb-4">Legacy Brand Loyalty</h4>
              <p className="text-gray-400">Build long-term brand value that outlives any single performance or season.</p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="glass-card rounded-xl p-8"
            >
              <Globe className="w-10 h-10 text-white mb-6" />
              <h4 className="text-xl font-bold mb-4">International Outreach</h4>
              <p className="text-gray-400">Cross-border collaborations, global exhibitions, and international networking.</p>
            </motion.div>
          </div>

          <div className="text-center">
            <ConsultationModal>
              <Button className="gradient-bg text-white h-14 px-8 text-lg hover:opacity-90">
                Book a FREE Consultation
              </Button>
            </ConsultationModal>
          </div>
        </div>
      </section>

      {/* Artist Stories */}
      <section className="py-24 bg-[#0a0a0a]">
        <div className="container mx-auto px-6">
          <h2 className="font-serif text-4xl md:text-5xl font-bold mb-16 text-center">What Artists Say About IICA</h2>
          
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex -ml-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex-none w-full md:w-1/2 lg:w-1/3 pl-4">
                  <div className="glass-card rounded-xl p-6 h-full flex flex-col">
                    <div className="aspect-video w-full mb-6 rounded-lg overflow-hidden bg-[#111]">
                      <iframe 
                        width="100%" 
                        height="100%" 
                        src="https://www.youtube.com/embed/dQw4w9WgXcQ?controls=0" 
                        title="Placeholder Video"
                        frameBorder="0" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                        allowFullScreen
                      ></iframe>
                    </div>
                    <p className="text-gray-300 italic mb-4 flex-grow">"Joining IICA transformed my digital presence. The legacy building tools are unparalleled in the classical arts space."</p>
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full gradient-bg mr-3 flex items-center justify-center text-white font-bold">
                        A{i}
                      </div>
                      <div>
                        <h5 className="font-bold text-sm text-white">Artist Name {i}</h5>
                        <p className="text-xs text-gray-500">Classical Musician</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Artist Showcase */}
      <section className="py-24 bg-black overflow-hidden">
        <div className="container mx-auto px-6 mb-12 flex justify-between items-end">
          <div>
            <h2 className="font-serif text-4xl md:text-5xl font-bold mb-4">IICA Artists</h2>
            <p className="text-gray-400">Discover our distinguished roster of performers and educators.</p>
          </div>
          <Link href="/artists">
            <Button variant="link" className="text-[#C13584] hover:text-white hidden md:flex">
              View All Artists →
            </Button>
          </Link>
        </div>
        
        <div className="flex space-x-6 px-6 pb-8 overflow-x-auto snap-x snap-mandatory hide-scrollbar">
          {ARTISTS.slice(0, 6).map((artist, i) => (
            <div key={artist.slug} className="snap-center shrink-0 w-[280px] md:w-[320px]">
              <ArtistCard artist={artist} delay={i * 0.1} />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
