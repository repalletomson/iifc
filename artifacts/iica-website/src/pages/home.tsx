import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'wouter';
import { ChevronDown, TrendingUp, RefreshCw, Globe, Shield, Sparkles, ExternalLink, Users } from 'lucide-react';
import useEmblaCarousel from 'embla-carousel-react';
import { Button } from '@/components/ui/button';
import { ConsultationModal } from '@/components/sections/ConsultationModal';
import { ArtistCard } from '@/components/sections/ArtistCard';
import { ARTISTS } from '@/data/artists';
import heroBg from '@assets/generated_images/indian_classical_music_concert_221b.png';

/* ── Word-by-word animated heading ── */
function AnimatedHeading({ text, className }: { text: string; className?: string }) {
  const words = text.split(' ');
  return (
    <span className={className}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden mr-[0.22em] last:mr-0 align-bottom">
          <motion.span
            className="inline-block"
            initial={{ y: '110%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              duration: 0.65,
              ease: [0.22, 1, 0.36, 1],
              delay: 0.15 + i * 0.09,
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

/* ── Character-by-character shimmer line ── */
function AnimatedSubline({ text, delay = 0.8 }: { text: string; delay?: number }) {
  return (
    <motion.p
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {text}
    </motion.p>
  );
}

export default function Home() {
  const { scrollY } = useScroll();
  const heroOpacity = useTransform(scrollY, [0, 500], [1, 0]);
  const heroY = useTransform(scrollY, [0, 500], [0, 80]);
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'start' });

  React.useEffect(() => {
    if (!emblaApi) return;
    const interval = setInterval(() => emblaApi.scrollNext(), 5000);
    return () => clearInterval(interval);
  }, [emblaApi]);

  return (
    <div className="bg-black text-white min-h-screen">

      {/* ════════════════════════════════
          HERO — full photo + impact type
          ════════════════════════════════ */}
      <section className="relative min-h-screen flex items-end overflow-hidden">

        {/* Background photo */}
        <div className="absolute inset-0 z-0">
          <img
            src={heroBg}
            alt="IICA — Indian classical music performance"
            className="w-full h-full object-cover object-center"
          />
          {/* Layered overlays for cinematic dark depth */}
          <div className="absolute inset-0 bg-black/55" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/25 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent" />
          {/* Purple/pink ambient tint */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#833AB4]/15 via-transparent to-[#E1306C]/8" />
        </div>

        {/* Parallax content */}
        <motion.div
          style={{ opacity: heroOpacity, y: heroY }}
          className="relative z-10 w-full pb-20 md:pb-28 pt-28"
        >
          <div className="container mx-auto px-6 md:px-10 lg:px-16">

            {/* Social proof badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.05 }}
              className="inline-flex items-center gap-2.5 bg-white/8 border border-white/12 backdrop-blur-sm rounded-full px-4 py-2 mb-10 text-sm text-white/80"
            >
              <Users className="w-4 h-4 text-[#C13584]" />
              <span>Join <strong className="text-white">500+</strong> Indian artists on IICA</span>
            </motion.div>

            {/* Headline — EVEN Backstage style: huge, left-aligned, word-animated */}
            <h1 className="font-serif font-bold leading-[0.95] tracking-tight mb-8 max-w-[14ch]">
              <div className="text-[clamp(3.5rem,9vw,8rem)] text-white">
                <AnimatedHeading text="Empowering" />
              </div>
              <div className="text-[clamp(3.5rem,9vw,8rem)] text-white">
                <AnimatedHeading text="Artists" delay={0.1} />
              </div>
              <div className="text-[clamp(3rem,8vw,7rem)]">
                <AnimatedHeading
                  text="Beyond Performance"
                  className="gradient-text"
                />
              </div>
            </h1>

            {/* Sub-copy */}
            <AnimatedSubline
              text="IICA connects artists, educators, performers and creative leaders through branding, collaborations, opportunities and global recognition."
              delay={0.82}
            />
            <div className="text-gray-400 text-base md:text-lg leading-relaxed max-w-[52ch] mb-10 mt-0" />

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 1.0 }}
              className="flex flex-col sm:flex-row items-start gap-4"
            >
              <Link href="/membership">
                <Button className="gradient-bg text-white h-14 px-9 text-base rounded-md border-0 hover:opacity-90 transition-opacity font-medium">
                  Become a Member →
                </Button>
              </Link>
              <Link href="/artists">
                <Button
                  variant="outline"
                  className="h-14 px-9 text-base rounded-md bg-transparent text-white border border-white/25 hover:border-white/50 hover:bg-white/6 transition-all font-medium"
                >
                  Explore Artists
                </Button>
              </Link>
            </motion.div>

            {/* No card needed note */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.3 }}
              className="text-gray-600 text-xs mt-4"
            >
              Free to explore. No commitment required.
            </motion.p>
          </div>
        </motion.div>

        {/* Scroll cue */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 text-white/30"
        >
          <ChevronDown className="w-6 h-6" />
        </motion.div>
      </section>

      {/* ════════════════════════════════
          FEATURE HIGHLIGHTS — 4 tiles like EVEN
          ════════════════════════════════ */}
      <section className="border-b border-white/8 bg-[#080808]">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/8">
            {[
              { icon: <TrendingUp className="w-5 h-5" />, title: "80% More Earnings", desc: "Proven artist revenue growth" },
              { icon: <Sparkles className="w-5 h-5" />, title: "Premium Branding", desc: "SEO-powered life journeys" },
              { icon: <Globe className="w-5 h-5" />, title: "Global Reach", desc: "International collaborations" },
              { icon: <Shield className="w-5 h-5" />, title: "Legacy Program", desc: "Brand value beyond a lifetime" },
            ].map((tile, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="px-6 py-7 flex flex-col gap-2"
              >
                <div className="text-[#C13584] mb-1">{tile.icon}</div>
                <h4 className="font-semibold text-white text-sm">{tile.title}</h4>
                <p className="text-gray-600 text-xs leading-relaxed">{tile.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════
          FEATURE CARDS
          ════════════════════════════════ */}
      <section className="py-24 bg-[#060606]">
        <div className="container mx-auto px-6">
          <div className="mb-12">
            <p className="text-[#C13584] tracking-[0.3em] uppercase text-xs font-medium mb-3">Explore</p>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-white">Start Your Journey</h2>
          </div>
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
                  <div className="flex items-center text-[#C13584] text-sm font-medium">
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

      {/* ════════════════════════════════
          OFFERINGS
          ════════════════════════════════ */}
      <section className="py-24 bg-black border-t border-white/5">
        <div className="container mx-auto px-6">
          <div className="mb-14">
            <p className="text-[#C13584] tracking-[0.3em] uppercase text-xs font-medium mb-3">What We Offer</p>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-white">Our Offerings</h2>
            <div className="w-12 h-[2px] gradient-bg mt-6" />
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
                  <img
                    src={service.img}
                    alt={service.title}
                    className="w-full h-full object-cover opacity-60 group-hover:opacity-80 group-hover:scale-105 transition-all duration-500"
                  />
                </div>
                <div className="p-8">
                  <div className="mb-5">{service.icon}</div>
                  <h4 className="text-lg font-bold text-white mb-3">{service.title}</h4>
                  <p className="text-gray-500 text-sm leading-relaxed">{service.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <div>
            <ConsultationModal>
              <Button className="gradient-bg text-white h-13 px-10 text-base hover:opacity-90 transition-opacity">
                Book a FREE Consultation
              </Button>
            </ConsultationModal>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════
          ARTIST STORIES
          ════════════════════════════════ */}
      <section className="py-24 bg-[#060606] border-t border-white/5">
        <div className="container mx-auto px-6">
          <div className="mb-14">
            <p className="text-[#C13584] tracking-[0.3em] uppercase text-xs font-medium mb-3">Testimonials</p>
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

      {/* ════════════════════════════════
          ARTIST SHOWCASE
          ════════════════════════════════ */}
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

        <div
          className="flex space-x-5 px-6 pb-6 overflow-x-auto snap-x snap-mandatory"
          style={{ scrollbarWidth: 'none' }}
        >
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
