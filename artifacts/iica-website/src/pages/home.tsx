import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'wouter';
import { ChevronDown, TrendingUp, RefreshCw, Globe, Shield, Sparkles, ExternalLink } from 'lucide-react';
import useEmblaCarousel from 'embla-carousel-react';
import { Button } from '@/components/ui/button';
import { ConsultationModal } from '@/components/sections/ConsultationModal';
import { ArtistCard } from '@/components/sections/ArtistCard';
import { ARTISTS } from '@/data/artists';

export default function Home() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'start' });

  React.useEffect(() => {
    if (!emblaApi) return;
    const interval = setInterval(() => emblaApi.scrollNext(), 5000);
    return () => clearInterval(interval);
  }, [emblaApi]);

  return (
    <div className="bg-black text-white min-h-screen">

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">

        {/* Video background */}
        <div className="absolute inset-0 z-0">
          {/* Replace src with the actual video file when available */}
          {/* Video background — set src to your video file path when ready */}
          {/* <video ref={videoRef} autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover opacity-25" src="/hero-bg.mp4" /> */}
          {/* Cinematic gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black z-10" />
          {/* Ambient color orbs (always visible as fallback/supplement) */}
          <motion.div
            animate={{ x: [0, 80, 0], y: [0, 40, 0], scale: [1, 1.15, 1] }}
            transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
            className="absolute top-1/3 left-1/4 w-[32rem] h-[32rem] rounded-full bg-[#833AB4] filter blur-[140px] opacity-25 z-0"
          />
          <motion.div
            animate={{ x: [0, -80, 0], y: [0, -40, 0], scale: [1, 1.2, 1] }}
            transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
            className="absolute bottom-1/3 right-1/4 w-[28rem] h-[28rem] rounded-full bg-[#E1306C] filter blur-[140px] opacity-18 z-0"
          />
        </div>

        {/* Hero content */}
        <div className="container relative z-20 mx-auto px-6 text-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.15 } } }}
            className="max-w-4xl mx-auto"
          >
            <motion.p
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
              className="text-[#C13584] tracking-[0.3em] uppercase text-xs font-medium mb-6"
            >
              International Indian Culture & Arts
            </motion.p>

            <motion.h1
              variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}
              className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold leading-[1.08] mb-6"
            >
              Empowering Artists<br />
              <span className="gradient-text">Beyond Performance</span>
            </motion.h1>

            <motion.p
              variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}
              className="text-base md:text-lg text-gray-400 mb-10 leading-relaxed max-w-2xl mx-auto"
            >
              IICA connects artists, educators, performers and creative leaders through branding, collaborations, opportunities and global recognition.
            </motion.p>

            <motion.div
              variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Link href="/membership">
                <Button className="gradient-bg text-white h-13 px-8 text-base rounded-md border-0 w-full sm:w-auto hover:opacity-90 transition-opacity">
                  Become a Member
                </Button>
              </Link>
              <Link href="/artists">
                <Button variant="outline" className="h-13 px-8 text-base rounded-md w-full sm:w-auto bg-transparent text-white border border-white/20 hover:border-white/40 hover:bg-white/5 transition-all">
                  Explore Artists
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-gray-600 z-20"
        >
          <ChevronDown className="w-7 h-7" />
        </motion.div>
      </section>

      {/* ── FEATURE CARDS ── */}
      <section className="py-24 bg-[#060606] border-t border-white/5">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="group"
            >
              <Link href="/increase-earnings">
                <div className="border border-white/8 rounded-2xl p-10 bg-[#0a0a0a] hover:border-[#833AB4]/40 transition-all duration-300 cursor-pointer h-full">
                  <TrendingUp className="w-10 h-10 text-[#C13584] mb-6" />
                  <h3 className="font-serif text-3xl font-bold mb-4 text-white">Increase Earnings by 80%</h3>
                  <p className="text-gray-500 mb-8 text-base leading-relaxed">Leverage IICA's artist branding ecosystem to multiply your reach, fan base, and revenue streams. Data-driven, legacy-focused, results guaranteed.</p>
                  <div className="flex items-center text-[#C13584] text-sm font-medium group-hover:gap-3 transition-all">
                    Explore <ExternalLink className="w-4 h-4 ml-2" />
                  </div>
                </div>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="group"
            >
              <Link href="/relaunch-brand">
                <div className="border border-white/8 rounded-2xl p-10 bg-[#0a0a0a] hover:border-[#C13584]/40 transition-all duration-300 cursor-pointer h-full">
                  <RefreshCw className="w-10 h-10 text-[#833AB4] mb-6" />
                  <h3 className="font-serif text-3xl font-bold mb-4 text-white">Re-Launch Your Brand Offerings</h3>
                  <p className="text-gray-500 mb-8 text-base leading-relaxed">Reinvent how the world sees your artistry. From digital presence to global collaborations — IICA helps you succeed as a performing arts professional.</p>
                  <div className="flex items-center text-[#833AB4] text-sm font-medium">
                    Start Journey <ExternalLink className="w-4 h-4 ml-2" />
                  </div>
                </div>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── SERVICES / OFFERINGS ── */}
      <section className="py-24 bg-black border-t border-white/5">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="text-[#C13584] tracking-[0.3em] uppercase text-xs font-medium mb-4">What We Offer</p>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-white">Our Offerings</h2>
            <div className="w-12 h-[2px] gradient-bg mx-auto mt-6" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
            {[
              {
                icon: <Sparkles className="w-8 h-8 text-[#C13584]" />,
                title: "Premium Artist Branding",
                desc: "SEO-powered life journeys, HD content promotion, and professional legacy documentation crafted for the modern performing artist.",
                img: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&q=80",
              },
              {
                icon: <Shield className="w-8 h-8 text-[#833AB4]" />,
                title: "Legacy Brand Loyalty Program",
                desc: "Build long-term brand value that outlives any single performance or season — a living legacy for generations to come.",
                img: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=400&q=80",
              },
              {
                icon: <Globe className="w-8 h-8 text-[#d4a853]" />,
                title: "International Outreach Solutions",
                desc: "Cross-border collaborations, global exhibitions, and curated international networking for ambitious Indian artists.",
                img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
              },
            ].map((service, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="border border-white/8 rounded-2xl overflow-hidden bg-[#0a0a0a] hover:border-white/15 transition-colors group"
              >
                <div className="aspect-video overflow-hidden bg-[#111]">
                  <img src={service.img} alt={service.title} className="w-full h-full object-cover opacity-60 group-hover:opacity-80 group-hover:scale-105 transition-all duration-500" />
                </div>
                <div className="p-8">
                  <div className="mb-5">{service.icon}</div>
                  <h4 className="text-lg font-bold text-white mb-3">{service.title}</h4>
                  <p className="text-gray-500 text-sm leading-relaxed">{service.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center">
            <ConsultationModal>
              <Button className="gradient-bg text-white h-13 px-10 text-base hover:opacity-90 transition-opacity">
                Book a FREE Consultation
              </Button>
            </ConsultationModal>
          </div>
        </div>
      </section>

      {/* ── ARTIST STORIES ── */}
      <section className="py-24 bg-[#060606] border-t border-white/5">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-[#C13584] tracking-[0.3em] uppercase text-xs font-medium mb-4">Testimonials</p>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-white">What Artists Say About IICA</h2>
          </div>

          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex -ml-5">
              {[
                { name: "Meera Das", role: "Odissi Dancer", quote: "IICA transformed my digital presence. The legacy building tools are unlike anything else in the classical arts space." },
                { name: "Karthik Iyer", role: "Classical Violinist", quote: "Joining IICA gave me international visibility. My bookings doubled within the first 6 months of membership." },
                { name: "Pallavi Krishnan", role: "Mohiniyattam Artist", quote: "Finally a platform that understands performing arts. IICA's branding approach is deeply authentic and effective." },
                { name: "Rahul Sharma", role: "Santoor Maestro", quote: "The SEO-powered life journey documentation gave me credibility that I struggled to build alone for years." },
              ].map((item, i) => (
                <div key={i} className="flex-none w-full md:w-1/2 lg:w-1/3 pl-5">
                  <div className="border border-white/8 rounded-xl bg-[#0a0a0a] p-6 h-full flex flex-col">
                    <div className="aspect-video w-full mb-6 rounded-lg overflow-hidden bg-[#111]">
                      <iframe
                        width="100%"
                        height="100%"
                        src="https://www.youtube.com/embed/dQw4w9WgXcQ?controls=0"
                        title="Artist Testimonial"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                    <p className="text-gray-400 italic mb-6 flex-grow text-sm leading-relaxed">"{item.quote}"</p>
                    <div className="flex items-center border-t border-white/5 pt-4">
                      <div className="w-9 h-9 rounded-full gradient-bg mr-3 flex items-center justify-center text-white text-xs font-bold shrink-0">
                        {item.name[0]}
                      </div>
                      <div>
                        <h5 className="font-semibold text-sm text-white">{item.name}</h5>
                        <p className="text-xs text-gray-600">{item.role}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── ARTIST SHOWCASE ── */}
      <section className="py-24 bg-black border-t border-white/5 overflow-hidden">
        <div className="container mx-auto px-6 mb-12 flex justify-between items-end">
          <div>
            <p className="text-[#C13584] tracking-[0.3em] uppercase text-xs font-medium mb-3">Our Roster</p>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-white">IICA Artists</h2>
          </div>
          <Link href="/artists">
            <button className="text-gray-500 hover:text-white text-sm hidden md:block transition-colors">
              View All Artists →
            </button>
          </Link>
        </div>

        <div className="flex space-x-5 px-6 pb-6 overflow-x-auto snap-x snap-mandatory" style={{ scrollbarWidth: 'none' }}>
          {ARTISTS.slice(0, 6).map((artist, i) => (
            <div key={artist.slug} className="snap-center shrink-0 w-[270px] md:w-[300px]">
              <ArtistCard artist={artist} delay={i * 0.08} />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
