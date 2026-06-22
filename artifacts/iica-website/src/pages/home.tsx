import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'wouter';
import { ChevronLeft, ChevronRight, TrendingUp, RefreshCw, Globe, Shield, Sparkles, Trophy } from 'lucide-react';
import { ConsultationModal } from '@/components/sections/ConsultationModal';
import { ARTISTS } from '@/data/artists';
import heroBg from '@assets/generated_images/indian_classical_music_concert_221b.png';

/* ─── Testimonials ─── */
const TESTIMONIALS = [
  {
    name: "Aniket Chakravarty",
    role: "Sarod Exponent, Kolkata",
    quote: "IICA gave my artistry a global identity. The life journey documentation and branding transformed how the world sees my classical music.",
    img: "https://images.unsplash.com/photo-1619983081593-e2ba5b543168?w=600&q=80",
    videoId: "tFjgL8GKcqE",
  },
  {
    name: "Debasmita Bhattacharya",
    role: "Sarod Player, Kolkata",
    quote: "Finally a platform that understands what classical Indian artists truly need — not just a profile, but a living legacy.",
    img: "https://images.unsplash.com/photo-1509059852496-f3822ae057bf?w=600&q=80",
    videoId: "u_HVMaXKZOQ",
  },
  {
    name: "Shatavisha Mukherjee",
    role: "Kathak Dancer, Lucknow",
    quote: "My bookings doubled in six months. IICA's SEO-powered artist page brought audiences I could never reach alone.",
    img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=600&q=80",
    videoId: "dZJiNoLCJ9k",
  },
];

/* ─── Awards ─── */
const AWARDS = [
  {
    name: "Aniket Chakravarty",
    award: "Ali Akbar Khan Memorial Award",
    year: "2019",
    body: "MAIPAR — Monomanjari Institute of Performing Arts & Research",
    description: "Awarded for outstanding contribution to Hindustani classical music and the Sarod tradition — recognizing young artists who demonstrate exceptional dedication to Indian classical music.",
    photos: [
      "https://images.unsplash.com/photo-1619983081593-e2ba5b543168?w=500&q=80",
      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=500&q=80",
      "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=500&q=80",
    ],
  },
  {
    name: "Debasmita Bhattacharya",
    award: "Sangeet Natak Akademi Yuva Puraskar",
    year: "2022",
    body: "Sangeet Natak Akademi — India's National Academy of Music, Dance and Drama",
    description: "India's highest recognition for young performing artists — for extraordinary virtuosity on the Sarod and her role in bringing classical music to new generations.",
    photos: [
      "https://images.unsplash.com/photo-1509059852496-f3822ae057bf?w=500&q=80",
      "https://images.unsplash.com/photo-1520810627419-35e6bce42bca?w=500&q=80",
      "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=500&q=80",
    ],
  },
];

const ARTIST_AVATARS = [
  "https://images.unsplash.com/photo-1619983081593-e2ba5b543168?w=300&q=80",
  "https://images.unsplash.com/photo-1509059852496-f3822ae057bf?w=300&q=80",
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

  /* Auto-advance testimonials */
  useEffect(() => {
    const t = setInterval(() => setTalkIdx(i => (i + 1) % TESTIMONIALS.length), 6000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="bg-black text-white min-h-screen">

      {/* ══════════════════════════════════════════════
          1. HERO — EVEN Backstage layout
          ══════════════════════════════════════════════ */}
      <section className="relative h-screen min-h-[600px] max-h-[900px] flex items-center overflow-hidden">

        {/* Video bg with image fallback */}
        <div className="absolute inset-0 z-0">
          <video
            autoPlay muted loop playsInline poster={heroBg}
            className="w-full h-full object-cover"
          >
            <source src="https://cdn.pixabay.com/video/2022/03/08/110617-686840178_large.mp4" type="video/mp4" />
            <source src="https://cdn.pixabay.com/video/2021/09/28/90070-622327617_large.mp4" type="video/mp4" />
          </video>
          <img src={heroBg} alt="" className="absolute inset-0 w-full h-full object-cover -z-10" />
          <div className="absolute inset-0 bg-black/55" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/15 to-black/35" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-transparent to-transparent" />
        </div>

        {/* Content */}
        <div className="relative z-10 w-full">
          <div className="container mx-auto px-6 md:px-10">

            {/* Badge — EVEN style */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="inline-flex items-center gap-2 bg-white/10 border border-white/15 backdrop-blur-sm rounded-full px-3.5 py-1.5 mb-6 text-xs text-white/80"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#C13584] animate-pulse" />
              Join <strong className="text-white mx-1">500+</strong> Indian artists on IICA
            </motion.div>

            {/* Big bold headline — EVEN style, no typewriter */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="font-sans font-black uppercase leading-[0.92] tracking-tight text-white mb-5"
              style={{ fontSize: 'clamp(3rem, 7.5vw, 6.5rem)' }}
            >
              EMPOWERING<br />
              ARTISTS,<br />
              <span className="gradient-text">BEYOND<br />PERFORMANCE.</span>
            </motion.h1>

            {/* One-line sub-copy */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-gray-300 text-sm md:text-base max-w-[46ch] mb-7"
            >
              Connect, brand, and grow through India's premier platform for performing artists.
            </motion.p>

            {/* ONE primary CTA — gradient only for "Become a Member" */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.65 }}
              className="flex items-center gap-4"
            >
              <Link href="/membership">
                <button className="gradient-bg text-white h-11 px-7 text-sm font-semibold rounded-full hover:opacity-90 transition-opacity">
                  Become a Member →
                </button>
              </Link>
              <Link href="/artists">
                <button className="h-11 px-7 text-sm font-medium rounded-full bg-white/8 border border-white/25 text-white hover:bg-white/15 hover:border-white/40 transition-all">
                  Explore Artists
                </button>
              </Link>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
              className="text-gray-600 text-xs mt-3"
            >
              No card needed. Free to explore.
            </motion.p>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          2. EVEN-STYLE FEATURE TILES — 2 tiles, dark bg
          ══════════════════════════════════════════════ */}
      <section className="bg-[#111] border-t border-white/8">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-white/10">

            <Link href="/increase-earnings">
              <div className="group p-8 md:p-10 cursor-pointer hover:bg-white/3 transition-colors">
                <TrendingUp className="w-6 h-6 text-[#C13584] mb-4" />
                <h3 className="font-bold text-white text-lg mb-2">Increase Earnings by 80%</h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  Leverage IICA's branding ecosystem to multiply your reach, fan base, and revenue streams with proven, data-driven strategies.
                </p>
              </div>
            </Link>

            <Link href="/relaunch-brand">
              <div className="group p-8 md:p-10 cursor-pointer hover:bg-white/3 transition-colors">
                <RefreshCw className="w-6 h-6 text-[#833AB4] mb-4" />
                <h3 className="font-bold text-white text-lg mb-2">Re-Launch Your Brand Offerings</h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  Reinvent how the world sees your artistry — from digital presence to global collaborations and lasting professional impact.
                </p>
              </div>
            </Link>

          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          3. SERVICE TILES + APPOINTMENT
          ══════════════════════════════════════════════ */}
      <section className="py-20 bg-black border-t border-white/5">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-14 text-center">
            {[
              { icon: "🏅", title: "Premium Artist Branding", desc: "Technology-powered done-for-you services that ensure a seamless, decentralized brand ecosystem for the modern performing artist." },
              { icon: "🤲", title: "LEGACY Brand Loyalty Program", desc: "A world-class archival solution that guarantees celebration of your legacy, for lifetimes and generations to come." },
              { icon: "🌐", title: "International Outreach Solutions", desc: "Personalized brand solutions for touring artists — so your international audience gets 80X more engagement with you." },
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
                <h4 className="text-[#C13584] font-bold text-sm uppercase tracking-wider mb-3">{s.title}</h4>
                <p className="text-gray-500 text-sm leading-relaxed max-w-[28ch] mx-auto">{s.desc}</p>
              </motion.div>
            ))}
          </div>
          <div className="text-center">
            <ConsultationModal>
              <button className="gradient-bg text-white h-11 px-8 text-sm font-semibold rounded-full hover:opacity-90 shadow-lg shadow-[#833AB4]/20">
                Book a FREE Consultation →
              </button>
            </ConsultationModal>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          4. ARTISTS ARE TALKING
          ══════════════════════════════════════════════ */}
      <section className="py-20 bg-[#080808] border-t border-white/5">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

            {/* Left: big heading + YouTube */}
            <div>
              <h2 className="font-sans font-black text-white leading-[0.9] uppercase mb-8" style={{ fontSize: 'clamp(2.5rem, 5.5vw, 4.5rem)' }}>
                ARTISTS<br />ARE<br />TALKING
              </h2>
              <div className="rounded-xl overflow-hidden aspect-video bg-[#111]">
                <iframe
                  width="100%" height="100%" className="w-full h-full"
                  src={`https://www.youtube.com/embed/${TESTIMONIALS[talkIdx].videoId}?rel=0&modestbranding=1&autoplay=0`}
                  title="Artist Testimonial" frameBorder="0"
                  allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>

            {/* Right: photo + quote */}
            <div>
              <AnimatePresence mode="wait">
                <motion.div
                  key={talkIdx}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="rounded-xl overflow-hidden aspect-[4/3] bg-[#111] mb-6">
                    <img src={TESTIMONIALS[talkIdx].img} alt={TESTIMONIALS[talkIdx].name} className="w-full h-full object-cover" />
                  </div>
                  <blockquote className="text-white text-lg font-medium leading-snug mb-5">
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

              <div className="flex items-center gap-3 mt-7">
                <button onClick={() => setTalkIdx(i => (i - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)} className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center hover:border-white/50 hover:bg-white/5 transition-all"><ChevronLeft className="w-4 h-4" /></button>
                <button onClick={() => setTalkIdx(i => (i + 1) % TESTIMONIALS.length)} className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center hover:border-white/50 hover:bg-white/5 transition-all"><ChevronRight className="w-4 h-4" /></button>
                <span className="text-gray-600 text-xs ml-1">{talkIdx + 1} / {TESTIMONIALS.length}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          5. IICA ARTISTS — EVEN circular grid
          ══════════════════════════════════════════════ */}
      <section className="py-20 bg-black border-t border-white/5">
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-end mb-10">
            <div>
              <p className="text-[#C13584] tracking-[0.3em] uppercase text-xs font-medium mb-2">Our Roster</p>
              <h2 className="font-serif text-3xl font-bold text-white">IICA Artists</h2>
            </div>
            <Link href="/artists">
              <button className="text-xs text-gray-500 hover:text-white border border-white/15 rounded-full px-4 py-1.5 hover:border-white/30 transition-all hidden md:block">
                View All Artists
              </button>
            </Link>
          </div>

          <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-7 xl:grid-cols-8 gap-x-4 gap-y-7">
            {ARTISTS.map((artist, i) => (
              <motion.div
                key={artist.slug}
                initial={{ opacity: 0, scale: 0.85 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.035 }}
                className="flex flex-col items-center gap-2 group"
              >
                <Link href={`/artist/${artist.slug}`}>
                  <div className="w-[72px] h-[72px] sm:w-20 sm:h-20 rounded-full overflow-hidden border-2 border-transparent group-hover:border-[#C13584]/60 transition-all duration-300 cursor-pointer bg-[#1a1a1a]">
                    <img
                      src={ARTIST_AVATARS[i % ARTIST_AVATARS.length]}
                      alt={artist.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                </Link>
                <p className="text-white text-[10px] font-medium text-center leading-tight line-clamp-2 px-1">{artist.name}</p>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link href="/artists">
              <button className="text-sm text-white border border-white/20 rounded-full px-6 h-10 hover:bg-white/5 hover:border-white/40 transition-all">
                View All Artists
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          6. AWARDS CAROUSEL
          ══════════════════════════════════════════════ */}
      <section className="py-20 bg-[#080808] border-t border-white/5">
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-end mb-10">
            <div>
              <p className="text-[#C13584] tracking-[0.3em] uppercase text-xs font-medium mb-2">Achievements</p>
              <h2 className="font-serif text-3xl font-bold text-white">Award Recipients</h2>
            </div>
            <div className="flex items-center gap-3">
              <button onClick={() => setAwardIdx(i => (i - 1 + AWARDS.length) % AWARDS.length)} className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center hover:border-white/50 hover:bg-white/5 transition-all"><ChevronLeft className="w-4 h-4" /></button>
              <button onClick={() => setAwardIdx(i => (i + 1) % AWARDS.length)} className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center hover:border-white/50 hover:bg-white/5 transition-all"><ChevronRight className="w-4 h-4" /></button>
              <span className="text-gray-600 text-xs">{awardIdx + 1} / {AWARDS.length}</span>
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={awardIdx}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.35 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-10"
            >
              {/* Photos + reel */}
              <div className="space-y-3">
                <div className="grid grid-cols-3 gap-3">
                  {AWARDS[awardIdx].photos.map((photo, pi) => (
                    <div key={pi} className="aspect-square rounded-xl overflow-hidden bg-[#111]">
                      <img src={photo} alt="" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                    </div>
                  ))}
                </div>
                <div className="rounded-xl border border-white/8 bg-[#0d0d0d] p-5 flex items-center gap-4">
                  <div className="w-11 h-11 rounded-full gradient-bg flex items-center justify-center shrink-0">
                    <svg viewBox="0 0 24 24" className="w-5 h-5 text-white fill-current"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm">Award Ceremony Reel</p>
                    <p className="text-gray-500 text-xs mb-1">Watch the celebration on Instagram</p>
                    <a href="https://www.instagram.com/iica.app/" target="_blank" rel="noopener noreferrer" className="text-[#C13584] text-xs font-semibold hover:underline">Watch on Instagram →</a>
                  </div>
                </div>
              </div>

              {/* Text */}
              <div>
                <div className="inline-flex items-center gap-2 mb-5">
                  <Trophy className="w-4 h-4 text-[#d4a853]" />
                  <span className="text-[#d4a853] text-xs font-medium tracking-wider uppercase">{AWARDS[awardIdx].year}</span>
                </div>
                <h3 className="font-serif text-3xl font-bold text-white mb-2 leading-tight">{AWARDS[awardIdx].name}</h3>
                <p className="gradient-text font-bold text-lg mb-1">{AWARDS[awardIdx].award}</p>
                <p className="text-gray-500 text-sm mb-6 italic">{AWARDS[awardIdx].body}</p>
                <p className="text-gray-300 text-sm leading-relaxed">{AWARDS[awardIdx].description}</p>
                <div className="flex gap-2 mt-8">
                  {AWARDS.map((_, i) => (
                    <button key={i} onClick={() => setAwardIdx(i)} className={`h-1.5 rounded-full transition-all ${i === awardIdx ? 'w-8 gradient-bg' : 'w-2 bg-white/20'}`} />
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
