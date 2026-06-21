import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'wouter';
import { ChevronDown, TrendingUp, RefreshCw, Globe, Shield, Sparkles, ChevronLeft, ChevronRight, Trophy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ConsultationModal } from '@/components/sections/ConsultationModal';
import { ARTISTS } from '@/data/artists';
import heroBg from '@assets/generated_images/indian_classical_music_concert_221b.png';

/* ══════════════════════════════════════════════
   TYPEWRITER: letter-by-letter with blinking cursor
   ══════════════════════════════════════════════ */
function Typewriter({ lines, className }: { lines: string[]; className?: string }) {
  const fullText = lines.join('\n');
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);
  const idx = useRef(0);

  useEffect(() => {
    const delay = setTimeout(() => {
      const timer = setInterval(() => {
        if (idx.current < fullText.length) {
          setDisplayed(fullText.slice(0, idx.current + 1));
          idx.current++;
        } else {
          setDone(true);
          clearInterval(timer);
        }
      }, 38);
      return () => clearInterval(timer);
    }, 400);
    return () => clearTimeout(delay);
  }, [fullText]);

  return (
    <span className={className}>
      {displayed.split('\n').map((line, i, arr) => (
        <React.Fragment key={i}>
          {line}
          {i < arr.length - 1 && <br />}
        </React.Fragment>
      ))}
      <span className={`inline-block w-[3px] h-[0.85em] ml-1 align-middle bg-white ${done ? 'animate-pulse opacity-0' : 'opacity-100'} transition-opacity`} />
    </span>
  );
}

/* ══════════════════════════════════════════════
   ARTISTS ARE TALKING: EVEN Backstage style
   ══════════════════════════════════════════════ */
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
    quote: "Finally a platform that understands what classical Indian artists truly need — not just a profile, but a legacy. IICA is that platform.",
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

/* ══════════════════════════════════════════════
   AWARDS DATA
   ══════════════════════════════════════════════ */
const AWARDS = [
  {
    name: "Aniket Chakravarty",
    award: "Ali Akbar Khan Memorial Award",
    year: "2019",
    body: "MAIPAR — Monomanjari Institute of Performing Arts & Research",
    description: "Aniket Chakravarty was bestowed the prestigious Ali Akbar Khan Memorial Award by MAIPAR for his outstanding contribution to Hindustani classical music and the Sarod tradition. This award recognizes young artists who demonstrate exceptional dedication to preserving and propagating Indian classical music in the legacy of the great Ustad.",
    photos: [
      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=500&q=80",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&q=80",
      "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=500&q=80",
    ],
    reelUrl: "https://www.instagram.com/reel/placeholder/embed",
  },
  {
    name: "Debasmita Bhattacharya",
    award: "Sangeet Natak Akademi Yuva Puraskar",
    year: "2022",
    body: "Sangeet Natak Akademi — India's National Academy of Music, Dance and Drama",
    description: "Debasmita Bhattacharya received the Sangeet Natak Akademi Yuva Puraskar — India's highest recognition for young performing artists — for her extraordinary virtuosity on the Sarod and her role in bringing classical music to new generations of listeners.",
    photos: [
      "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=500&q=80",
      "https://images.unsplash.com/photo-1520810627419-35e6bce42bca?w=500&q=80",
      "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=500&q=80",
    ],
    reelUrl: "https://www.instagram.com/reel/placeholder/embed",
  },
];

export default function Home() {
  const [talkIdx, setTalkIdx] = useState(0);

  return (
    <div className="bg-black text-white min-h-screen">

      {/* ════════════════════════════════════════════════
          1. HERO — video bg + typewriter headline
          ════════════════════════════════════════════════ */}
      <section className="relative min-h-screen flex items-end overflow-hidden">

        {/* Video background with image fallback */}
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            poster={heroBg}
            className="w-full h-full object-cover object-center"
            onError={(e) => { (e.target as HTMLVideoElement).style.display = 'none'; }}
          >
            <source src="https://videos.pexels.com/video-files/3045163/3045163-hd_1920_1080_25fps.mp4" type="video/mp4" />
            <source src="https://videos.pexels.com/video-files/4815899/4815899-hd_1920_1080_25fps.mp4" type="video/mp4" />
          </video>
          {/* Fallback image shown while video loads */}
          <img
            src={heroBg}
            alt=""
            className="absolute inset-0 w-full h-full object-cover object-center -z-10"
          />
          {/* Cinematic overlays */}
          <div className="absolute inset-0 bg-black/50" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-transparent to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-br from-[#833AB4]/12 via-transparent to-[#E1306C]/8" />
        </div>

        {/* Hero content */}
        <div className="relative z-10 w-full pb-20 md:pb-28 pt-28">
          <div className="container mx-auto px-6 md:px-10 lg:px-16">

            {/* Social proof pill */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="inline-flex items-center gap-2.5 bg-white/8 border border-white/12 backdrop-blur-sm rounded-full px-4 py-2 mb-10 text-sm text-white/80"
            >
              <span className="w-2 h-2 rounded-full bg-[#C13584] animate-pulse" />
              Join <strong className="text-white mx-1">500+</strong> Indian artists on IICA
            </motion.div>

            {/* Typewriter headline — massive impact type */}
            <h1 className="font-serif font-bold leading-[0.93] tracking-tight mb-8 max-w-[16ch]">
              <span className="block text-[clamp(3.2rem,8.5vw,7.5rem)] text-white">
                <Typewriter lines={["Empowering Artists,", "Beyond Performance."]} />
              </span>
            </h1>

            {/* Sub-copy fades in after typewriter */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.8, duration: 0.8 }}
              className="text-gray-400 text-base md:text-lg leading-relaxed max-w-[50ch] mb-10"
            >
              IICA connects artists, educators, performers and creative leaders through branding, collaborations, opportunities and global recognition.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 3.2, duration: 0.6 }}
              className="flex flex-col sm:flex-row items-start gap-4"
            >
              <Link href="/membership">
                <Button className="gradient-bg text-white h-14 px-9 text-base rounded-md border-0 hover:opacity-90 transition-opacity font-semibold">
                  Become a Member →
                </Button>
              </Link>
              <Link href="/artists">
                <Button variant="outline" className="h-14 px-9 text-base rounded-md bg-transparent text-white border border-white/25 hover:border-white/50 hover:bg-white/6 transition-all font-medium">
                  Explore Artists
                </Button>
              </Link>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 3.6 }}
              className="text-gray-600 text-xs mt-4"
            >
              Free to explore. No commitment required.
            </motion.p>
          </div>
        </div>

        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 text-white/30"
        >
          <ChevronDown className="w-6 h-6" />
        </motion.div>
      </section>

      {/* ════════════════════════════════════════════════
          2. TWO CARDS — Increase Earnings + Re-Launch Brand
          ════════════════════════════════════════════════ */}
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
                  <p className="text-gray-500 mb-8 text-base leading-relaxed">
                    Leverage IICA's artist branding ecosystem to multiply your reach, fan base, and revenue streams. Data-driven, legacy-focused, results guaranteed.
                  </p>
                  <span className="text-[#C13584] text-sm font-semibold tracking-wide">Explore →</span>
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
                  <p className="text-gray-500 mb-8 text-base leading-relaxed">
                    Reinvent how the world sees your artistry. From digital presence to global collaborations — IICA helps you succeed as a performing arts professional.
                  </p>
                  <span className="text-[#833AB4] text-sm font-semibold tracking-wide">Start Journey →</span>
                </div>
              </Link>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════
          3. THREE SERVICE TILES + APPOINTMENT FORM
          ════════════════════════════════════════════════ */}
      <section className="py-24 bg-black border-t border-white/5">
        <div className="container mx-auto px-6">

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-16 text-center">
            {[
              {
                icon: "🏅",
                title: "Premium Artist Branding",
                desc: "Premium artists in India are leaving money on the table, due to manual & centralized business models. Our technology-powered done-for-you services ensure a seamless decentralized model that solves the problem.",
              },
              {
                icon: "🤲",
                title: "LEGACY Brand Loyalty Program",
                desc: "Every performing artist, young and old, deserves a world-class archival solution to leave the legacy behind. Our simple, elegant and interactive archival solution guarantees celebration of your legacy, for lifetimes & generations.",
              },
              {
                icon: "🌐",
                title: "International Outreach Solutions",
                desc: "For travelling artists who are actively performing outside India, we offer a personalized brand solution so that your international audience receives the best value out of your tours with 80X more engagement with you.",
              },
            ].map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12 }}
                className="flex flex-col items-center"
              >
                <div className="text-5xl mb-6">{s.icon}</div>
                <h4 className="text-[#C13584] font-bold text-lg mb-4">{s.title}</h4>
                <p className="text-gray-400 text-sm leading-relaxed max-w-[30ch] mx-auto">{s.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* Appointment CTA */}
          <div className="text-center">
            <ConsultationModal>
              <Button className="gradient-bg text-white h-13 px-10 text-base font-semibold rounded-full hover:opacity-90 transition-opacity shadow-lg shadow-[#833AB4]/20">
                Book an appointment for a FREE consultation, to know more!
              </Button>
            </ConsultationModal>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════
          4. ARTISTS ARE TALKING — EVEN Backstage style
          ════════════════════════════════════════════════ */}
      <section className="py-0 bg-black border-t border-white/5 overflow-hidden">
        <div className="container mx-auto px-6 py-20">

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 items-stretch min-h-[520px]">

            {/* Left: big bold heading + collage */}
            <div className="relative flex flex-col justify-between pr-0 lg:pr-10">
              <h2
                className="font-serif font-black leading-[0.88] tracking-tight text-white mb-8"
                style={{ fontSize: 'clamp(3rem, 7vw, 6rem)' }}
              >
                ARTISTS<br />ARE<br />TALKING
              </h2>

              {/* Collage-style image + YouTube video */}
              <div className="relative">
                <div className="relative rounded-xl overflow-hidden aspect-video bg-[#111]">
                  <iframe
                    width="100%"
                    height="100%"
                    className="absolute inset-0 w-full h-full"
                    src={`https://www.youtube.com/embed/${TESTIMONIALS[talkIdx].videoId}?rel=0&modestbranding=1`}
                    title="Artist Testimonial"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
                {/* Small floating collage image */}
                <div className="absolute -bottom-5 -left-4 w-28 h-36 rounded-xl overflow-hidden border-2 border-black hidden md:block">
                  <img
                    src={TESTIMONIALS[talkIdx].collageImg}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Right: artist photo + quote */}
            <div className="flex flex-col justify-between pt-8 lg:pt-0 lg:pl-10 border-t lg:border-t-0 lg:border-l border-white/8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={talkIdx}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.4 }}
                  className="flex flex-col h-full"
                >
                  {/* Artist portrait */}
                  <div className="rounded-xl overflow-hidden mb-6 aspect-[4/3] bg-[#111]">
                    <img
                      src={TESTIMONIALS[talkIdx].img}
                      alt={TESTIMONIALS[talkIdx].name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Quote */}
                  <blockquote className="text-white text-xl md:text-2xl font-medium leading-snug mb-6">
                    "{TESTIMONIALS[talkIdx].quote}"
                  </blockquote>

                  {/* Artist identity */}
                  <div className="flex items-center gap-3 mt-auto">
                    <img
                      src={TESTIMONIALS[talkIdx].img}
                      alt=""
                      className="w-9 h-9 rounded-full object-cover"
                    />
                    <div>
                      <p className="text-white font-semibold text-sm">{TESTIMONIALS[talkIdx].name}</p>
                      <p className="text-gray-500 text-xs">{TESTIMONIALS[talkIdx].role}</p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Prev / Next */}
              <div className="flex items-center gap-3 mt-8">
                <button
                  onClick={() => setTalkIdx(i => (i - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)}
                  className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white hover:border-white/50 hover:bg-white/5 transition-all"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setTalkIdx(i => (i + 1) % TESTIMONIALS.length)}
                  className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white hover:border-white/50 hover:bg-white/5 transition-all"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
                <span className="text-gray-600 text-xs ml-2">{talkIdx + 1} / {TESTIMONIALS.length}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════
          5. IICA ARTISTS — circular horizontal scroll (EVEN artists page style)
          ════════════════════════════════════════════════ */}
      <section className="py-24 bg-[#060606] border-t border-white/5">
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
          className="flex gap-8 px-6 pb-6 overflow-x-auto snap-x snap-mandatory"
          style={{ scrollbarWidth: 'none' }}
        >
          {ARTISTS.slice(0, 10).map((artist, i) => {
            const unsplashAvatars = [
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
            ];
            return (
              <motion.div
                key={artist.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="snap-center shrink-0 flex flex-col items-center gap-3 w-36 group"
              >
                <Link href={`/artist/${artist.slug}`}>
                  <div className="w-28 h-28 rounded-full overflow-hidden border-2 border-white/10 group-hover:border-[#C13584]/60 transition-all duration-300 cursor-pointer">
                    <img
                      src={unsplashAvatars[i % unsplashAvatars.length]}
                      alt={artist.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </Link>
                <p className="text-white text-xs font-semibold text-center leading-tight">{artist.name}</p>
                <p className="text-gray-600 text-[10px] text-center leading-tight">{artist.instrument || artist.profession.split('|')[0].trim()}</p>
                <Link href={`/artist/${artist.slug}`}>
                  <button className="text-[10px] text-[#C13584] border border-[#C13584]/30 rounded-full px-3 py-1 hover:bg-[#C13584]/10 transition-colors">
                    View Profile
                  </button>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ════════════════════════════════════════════════
          6. AWARDS — 2 awardees with photos + reel + text
          ════════════════════════════════════════════════ */}
      <section className="py-24 bg-black border-t border-white/5">
        <div className="container mx-auto px-6">

          <div className="mb-16 text-center">
            <p className="text-[#C13584] tracking-[0.3em] uppercase text-xs font-medium mb-3">Achievements</p>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-white">Award Recipients</h2>
            <div className="w-12 h-[2px] gradient-bg mx-auto mt-6" />
          </div>

          <div className="space-y-24">
            {AWARDS.map((awardee, ai) => (
              <motion.div
                key={ai}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-start ${ai % 2 === 1 ? 'lg:flex lg:flex-row-reverse' : ''}`}
              >
                {/* Photos grid + Instagram reel */}
                <div className="space-y-4">
                  {/* 3-photo grid */}
                  <div className="grid grid-cols-3 gap-3">
                    {awardee.photos.map((photo, pi) => (
                      <div key={pi} className="aspect-square rounded-xl overflow-hidden bg-[#111]">
                        <img
                          src={photo}
                          alt={`${awardee.name} ${pi + 1}`}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    ))}
                  </div>

                  {/* Instagram Reel embed */}
                  <div className="rounded-xl overflow-hidden bg-[#0d0d0d] border border-white/8">
                    <div className="aspect-[9/12] w-full max-w-[320px] mx-auto flex items-center justify-center">
                      <div className="text-center px-6">
                        {/* Instagram reel placeholder — replace iframe src with actual embed URL */}
                        <div className="w-16 h-16 rounded-full gradient-bg flex items-center justify-center mx-auto mb-4">
                          <svg viewBox="0 0 24 24" className="w-7 h-7 text-white fill-current"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                        </div>
                        <p className="text-white font-semibold text-sm mb-1">Award Ceremony Reel</p>
                        <p className="text-gray-500 text-xs mb-4">View on Instagram</p>
                        <a
                          href="https://www.instagram.com/iica.app/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-block gradient-bg text-white text-xs px-4 py-2 rounded-full hover:opacity-90 transition-opacity"
                        >
                          Watch on Instagram →
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Text content */}
                <div className="flex flex-col justify-center">
                  <div className="inline-flex items-center gap-2 mb-6">
                    <Trophy className="w-5 h-5 text-[#d4a853]" />
                    <span className="text-[#d4a853] text-xs font-medium tracking-wider uppercase">{awardee.year}</span>
                  </div>
                  <h3 className="font-serif text-3xl md:text-4xl font-bold text-white mb-2 leading-tight">
                    {awardee.name}
                  </h3>
                  <p className="gradient-text font-bold text-xl mb-1">{awardee.award}</p>
                  <p className="text-gray-500 text-sm mb-8 italic">{awardee.body}</p>
                  <p className="text-gray-300 text-base leading-relaxed">{awardee.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
