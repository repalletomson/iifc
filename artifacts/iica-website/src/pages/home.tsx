import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'wouter';
import {
  ChevronLeft, ChevronRight, TrendingUp, RefreshCw,
  Globe, Shield, Sparkles, Trophy
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ConsultationModal } from '@/components/sections/ConsultationModal';
import { ARTISTS } from '@/data/artists';
import heroBg from '@assets/generated_images/indian_classical_music_concert_221b.png';

/* ═══════════════════════════════════════════
   TYPEWRITER — letter by letter, compact cursor
   ═══════════════════════════════════════════ */
function Typewriter({ text, className }: { text: string; className?: string }) {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);
  const idx = useRef(0);

  useEffect(() => {
    idx.current = 0;
    setDisplayed('');
    setDone(false);
    const timer = setInterval(() => {
      if (idx.current < text.length) {
        setDisplayed(text.slice(0, idx.current + 1));
        idx.current++;
      } else {
        setDone(true);
        clearInterval(timer);
      }
    }, 42);
    return () => clearInterval(timer);
  }, [text]);

  return (
    <span className={className}>
      {displayed}
      <span
        className="inline-block w-[2px] h-[0.75em] ml-[2px] align-middle bg-white/80"
        style={{ animation: done ? 'none' : undefined, opacity: done ? 0 : 1 }}
      />
    </span>
  );
}

/* ═══════════════════════════════════════════
   TESTIMONIALS
   ═══════════════════════════════════════════ */
const TESTIMONIALS = [
  {
    name: "Aniket Chakravarty",
    role: "Sarod Exponent, Kolkata",
    quote: "IICA gave my artistry a global identity. The life journey documentation and branding transformed how the world sees my classical music.",
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80",
    collageImg: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&q=80",
    videoId: "dQw4w9WgXcQ",
  },
  {
    name: "Debasmita Bhattacharya",
    role: "Sarod Player, Kolkata",
    quote: "Finally a platform that understands what classical Indian artists truly need — not just a profile, but a legacy.",
    img: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=600&q=80",
    collageImg: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=400&q=80",
    videoId: "dQw4w9WgXcQ",
  },
  {
    name: "Shatavisha Mukherjee",
    role: "Kathak Dancer, Lucknow",
    quote: "My bookings doubled in six months. IICA's SEO-powered artist page brought audiences I could never reach before on my own.",
    img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=600&q=80",
    collageImg: "https://images.unsplash.com/photo-1518834107812-67b0b7c58434?w=400&q=80",
    videoId: "dQw4w9WgXcQ",
  },
];

/* ═══════════════════════════════════════════
   AWARDS DATA
   ═══════════════════════════════════════════ */
const AWARDS = [
  {
    name: "Aniket Chakravarty",
    award: "Ali Akbar Khan Memorial Award",
    year: "2019",
    body: "MAIPAR — Monomanjari Institute of Performing Arts & Research",
    description: "Awarded for outstanding contribution to Hindustani classical music and the Sarod tradition. This honour recognizes young artists who demonstrate exceptional dedication to preserving Indian classical music in the legacy of the great Ustad.",
    photos: [
      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=500&q=80",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&q=80",
      "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=500&q=80",
    ],
  },
  {
    name: "Debasmita Bhattacharya",
    award: "Sangeet Natak Akademi Yuva Puraskar",
    year: "2022",
    body: "Sangeet Natak Akademi — India's National Academy of Music, Dance and Drama",
    description: "India's highest recognition for young performing artists — for extraordinary virtuosity on the Sarod and her role in bringing classical music to new generations of listeners worldwide.",
    photos: [
      "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=500&q=80",
      "https://images.unsplash.com/photo-1520810627419-35e6bce42bca?w=500&q=80",
      "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=500&q=80",
    ],
  },
];

const ARTIST_AVATARS = [
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&q=80",
  "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=300&q=80",
  "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&q=80",
  "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=300&q=80",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&q=80",
  "https://images.unsplash.com/photo-1520810627419-35e6bce42bca?w=300&q=80",
  "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300&q=80",
  "https://images.unsplash.com/photo-1499952127939-9bbf5af6c51c?w=300&q=80",
  "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=300&q=80",
  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&q=80",
  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&q=80",
  "https://images.unsplash.com/photo-1463453091185-61582044d556?w=300&q=80",
];

export default function Home() {
  const [talkIdx, setTalkIdx] = useState(0);
  const [awardIdx, setAwardIdx] = useState(0);

  return (
    <div className="bg-black text-white min-h-screen">

      {/* ═══════════════════════════════════════════════════════
          1. HERO — compact, all visible on one screen like EVEN
          ═══════════════════════════════════════════════════════ */}
      <section className="relative min-h-screen flex items-center overflow-hidden">

        {/* Background */}
        <div className="absolute inset-0 z-0">
          <img src={heroBg} alt="" className="w-full h-full object-cover object-center" />
          <div className="absolute inset-0 bg-black/58" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/30" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-transparent to-transparent" />
        </div>

        {/* Content — vertically centered, compact */}
        <div className="relative z-10 w-full pt-20">
          <div className="container mx-auto px-6 md:px-10">

            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="inline-flex items-center gap-2 bg-white/8 border border-white/12 backdrop-blur-sm rounded-full px-3.5 py-1.5 mb-6 text-xs text-white/80"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#C13584] animate-pulse" />
              Join <strong className="text-white mx-1">500+</strong> Indian artists on IICA
            </motion.div>

            {/* Headline — typewriter, moderate size */}
            <h1 className="font-serif font-bold leading-[1.0] tracking-tight mb-4 max-w-[20ch]">
              <span className="block text-white" style={{ fontSize: 'clamp(2.4rem, 5vw, 4.2rem)' }}>
                <Typewriter text="Empowering Artists," />
              </span>
              <span className="block gradient-text" style={{ fontSize: 'clamp(2.4rem, 5vw, 4.2rem)' }}>
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.6 }}
                >
                  Beyond Performance.
                </motion.span>
              </span>
            </h1>

            {/* Sub-copy */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.1 }}
              className="text-gray-400 text-sm md:text-base leading-relaxed max-w-[46ch] mb-7"
            >
              IICA connects artists, educators, performers and creative leaders through branding, collaborations, opportunities and global recognition.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.4 }}
              className="flex flex-col sm:flex-row items-start gap-3 mb-4"
            >
              <Link href="/membership">
                <Button className="gradient-bg text-white h-11 px-7 text-sm rounded-md border-0 hover:opacity-90 font-semibold">
                  Become a Member →
                </Button>
              </Link>
              <Link href="/artists">
                <Button variant="outline" className="h-11 px-7 text-sm rounded-md bg-transparent text-white border border-white/25 hover:border-white/50 hover:bg-white/6 transition-all">
                  Explore Artists
                </Button>
              </Link>
            </motion.div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.7 }}
              className="text-gray-600 text-xs"
            >
              Free to explore. No commitment required.
            </motion.p>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          2. EVEN-STYLE FEATURE TILES — 2 cards, dark, compact
          ═══════════════════════════════════════════════════════ */}
      <section className="bg-[#0a0a0a] border-t border-white/5">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-white/8">

            <Link href="/increase-earnings">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="group p-8 md:p-10 cursor-pointer hover:bg-white/3 transition-colors"
              >
                <TrendingUp className="w-7 h-7 text-[#C13584] mb-5" />
                <h3 className="font-bold text-white text-xl mb-2">Increase Earnings by 80%</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-5">
                  Leverage IICA's artist branding ecosystem to multiply your reach, fan base, and revenue streams. Data-driven, legacy-focused, results guaranteed.
                </p>
                <span className="text-[#C13584] text-xs font-semibold tracking-wider group-hover:underline">Explore →</span>
              </motion.div>
            </Link>

            <Link href="/relaunch-brand">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.08 }}
                className="group p-8 md:p-10 cursor-pointer hover:bg-white/3 transition-colors"
              >
                <RefreshCw className="w-7 h-7 text-[#833AB4] mb-5" />
                <h3 className="font-bold text-white text-xl mb-2">Re-Launch Your Brand Offerings</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-5">
                  Reinvent how the world sees your artistry. From digital presence to global collaborations — IICA helps you succeed as a performing arts professional.
                </p>
                <span className="text-[#833AB4] text-xs font-semibold tracking-wider group-hover:underline">Start Journey →</span>
              </motion.div>
            </Link>

          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          3. SERVICE TILES + APPOINTMENT
          ═══════════════════════════════════════════════════════ */}
      <section className="py-20 bg-black border-t border-white/5">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-14 text-center">
            {[
              { icon: "🏅", title: "Premium Artist Branding", desc: "Premium artists in India are leaving money on the table due to manual & centralized business models. Our technology-powered done-for-you services ensure a seamless decentralized model." },
              { icon: "🤲", title: "LEGACY Brand Loyalty Program", desc: "Every performing artist deserves a world-class archival solution to leave the legacy behind. Our solution guarantees celebration of your legacy, for lifetimes & generations." },
              { icon: "🌐", title: "International Outreach Solutions", desc: "For artists performing outside India, we offer a personalized brand solution so your international audience receives the best value from your tours with 80X more engagement." },
            ].map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex flex-col items-center"
              >
                <div className="text-5xl mb-5">{s.icon}</div>
                <h4 className="text-[#C13584] font-bold text-base mb-3">{s.title}</h4>
                <p className="text-gray-500 text-sm leading-relaxed max-w-[28ch] mx-auto">{s.desc}</p>
              </motion.div>
            ))}
          </div>
          <div className="text-center">
            <ConsultationModal>
              <Button className="gradient-bg text-white h-12 px-8 text-sm font-semibold rounded-full hover:opacity-90 shadow-lg shadow-[#833AB4]/20">
                Book an appointment for a FREE consultation, to know more!
              </Button>
            </ConsultationModal>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          4. ARTISTS ARE TALKING — EVEN editorial layout
          ═══════════════════════════════════════════════════════ */}
      <section className="py-20 bg-[#060606] border-t border-white/5">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">

            {/* Left: big heading + YouTube */}
            <div>
              <h2 className="font-serif font-black text-white leading-[0.9] mb-8" style={{ fontSize: 'clamp(2.8rem, 6vw, 5rem)' }}>
                ARTISTS<br />ARE<br />TALKING
              </h2>
              <div className="rounded-xl overflow-hidden aspect-video bg-[#111]">
                <iframe
                  width="100%" height="100%"
                  className="w-full h-full"
                  src={`https://www.youtube.com/embed/${TESTIMONIALS[talkIdx].videoId}?rel=0&modestbranding=1`}
                  title="Artist Testimonial"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>

            {/* Right: photo + quote */}
            <div className="flex flex-col lg:pt-4">
              <AnimatePresence mode="wait">
                <motion.div
                  key={talkIdx}
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -24 }}
                  transition={{ duration: 0.35 }}
                >
                  <div className="rounded-xl overflow-hidden aspect-[3/2] bg-[#111] mb-6">
                    <img src={TESTIMONIALS[talkIdx].img} alt={TESTIMONIALS[talkIdx].name} className="w-full h-full object-cover" />
                  </div>
                  <blockquote className="text-white text-lg md:text-xl font-medium leading-snug mb-5">
                    "{TESTIMONIALS[talkIdx].quote}"
                  </blockquote>
                  <div className="flex items-center gap-3">
                    <img src={TESTIMONIALS[talkIdx].img} alt="" className="w-8 h-8 rounded-full object-cover" />
                    <div>
                      <p className="text-white font-semibold text-sm">{TESTIMONIALS[talkIdx].name}</p>
                      <p className="text-gray-500 text-xs">{TESTIMONIALS[talkIdx].role}</p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              <div className="flex items-center gap-3 mt-8">
                <button onClick={() => setTalkIdx(i => (i - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)} className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center hover:border-white/50 hover:bg-white/5 transition-all">
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button onClick={() => setTalkIdx(i => (i + 1) % TESTIMONIALS.length)} className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center hover:border-white/50 hover:bg-white/5 transition-all">
                  <ChevronRight className="w-4 h-4" />
                </button>
                <span className="text-gray-600 text-xs ml-1">{talkIdx + 1} / {TESTIMONIALS.length}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          5. IICA ARTISTS — EVEN-style circular grid (multi-row)
          ═══════════════════════════════════════════════════════ */}
      <section className="py-20 bg-black border-t border-white/5">
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-end mb-10">
            <div>
              <p className="text-[#C13584] tracking-[0.3em] uppercase text-xs font-medium mb-2">Our Roster</p>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-white">IICA Artists</h2>
            </div>
            <Link href="/artists">
              <button className="text-gray-500 hover:text-white text-sm transition-colors hidden md:block">View All →</button>
            </Link>
          </div>

          {/* Grid of circular artists — like EVEN artists page */}
          <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-7 xl:grid-cols-8 gap-x-4 gap-y-8">
            {ARTISTS.map((artist, i) => (
              <motion.div
                key={artist.slug}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04 }}
                className="flex flex-col items-center gap-2 group"
              >
                <Link href={`/artist/${artist.slug}`}>
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden border-2 border-transparent group-hover:border-[#C13584]/60 transition-all duration-300 cursor-pointer">
                    <img
                      src={ARTIST_AVATARS[i % ARTIST_AVATARS.length]}
                      alt={artist.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                </Link>
                <p className="text-white text-[11px] font-medium text-center leading-tight line-clamp-2">{artist.name}</p>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link href="/artists">
              <Button variant="outline" className="border border-white/20 text-white bg-transparent hover:bg-white/5 hover:border-white/40 text-sm px-6 h-10">
                View All Artists
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          6. AWARDS — 2-slide carousel
          ═══════════════════════════════════════════════════════ */}
      <section className="py-20 bg-[#060606] border-t border-white/5">
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-end mb-10">
            <div>
              <p className="text-[#C13584] tracking-[0.3em] uppercase text-xs font-medium mb-2">Achievements</p>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-white">Award Recipients</h2>
            </div>
            {/* Carousel dots */}
            <div className="flex items-center gap-3">
              <button onClick={() => setAwardIdx(i => (i - 1 + AWARDS.length) % AWARDS.length)} className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center hover:border-white/50 hover:bg-white/5 transition-all">
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button onClick={() => setAwardIdx(i => (i + 1) % AWARDS.length)} className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center hover:border-white/50 hover:bg-white/5 transition-all">
                <ChevronRight className="w-4 h-4" />
              </button>
              <span className="text-gray-600 text-xs">{awardIdx + 1} / {AWARDS.length}</span>
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={awardIdx}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start"
            >
              {/* Photos grid */}
              <div className="space-y-3">
                <div className="grid grid-cols-3 gap-3">
                  {AWARDS[awardIdx].photos.map((photo, pi) => (
                    <div key={pi} className="aspect-square rounded-xl overflow-hidden bg-[#111]">
                      <img src={photo} alt="" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                    </div>
                  ))}
                </div>
                {/* Instagram reel button */}
                <div className="rounded-xl border border-white/8 bg-[#0d0d0d] p-6 flex items-center gap-5">
                  <div className="w-12 h-12 rounded-full gradient-bg flex items-center justify-center shrink-0">
                    <svg viewBox="0 0 24 24" className="w-5 h-5 text-white fill-current"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm mb-0.5">Award Ceremony Reel</p>
                    <p className="text-gray-500 text-xs mb-2">View the celebration on Instagram</p>
                    <a href="https://www.instagram.com/iica.app/" target="_blank" rel="noopener noreferrer" className="text-[#C13584] text-xs font-semibold hover:underline">
                      Watch on Instagram →
                    </a>
                  </div>
                </div>
              </div>

              {/* Text content */}
              <div className="flex flex-col justify-center">
                <div className="inline-flex items-center gap-2 mb-5">
                  <Trophy className="w-4 h-4 text-[#d4a853]" />
                  <span className="text-[#d4a853] text-xs font-medium tracking-wider uppercase">{AWARDS[awardIdx].year}</span>
                </div>
                <h3 className="font-serif text-3xl md:text-4xl font-bold text-white mb-2 leading-tight">
                  {AWARDS[awardIdx].name}
                </h3>
                <p className="gradient-text font-bold text-lg mb-1">{AWARDS[awardIdx].award}</p>
                <p className="text-gray-500 text-sm mb-6 italic">{AWARDS[awardIdx].body}</p>
                <p className="text-gray-300 text-sm leading-relaxed">{AWARDS[awardIdx].description}</p>

                {/* Dots */}
                <div className="flex gap-2 mt-8">
                  {AWARDS.map((_, i) => (
                    <button key={i} onClick={() => setAwardIdx(i)} className={`w-2 h-2 rounded-full transition-all ${i === awardIdx ? 'bg-[#C13584] w-6' : 'bg-white/20'}`} />
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

    </div>
  );
}
