import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'wouter';
import { ChevronLeft, ChevronRight, TrendingUp, RefreshCw, ArrowRight } from 'lucide-react';
import { ConsultationModal } from '@/components/sections/ConsultationModal';
import AwardRecipients from '@/components/sections/AwardRecipients';
import heroBg from '/images/hero-bg.png';
import { useConfig } from '@/lib/configContext';
import { useTheme } from '@/lib/themeContext';
import { extractYoutubeId } from '@/lib/googleSheets';

/* ─── Cycle Typing Hook — types prefix, then cycles through words ─── */
function useCycleTyping(prefix: string, words: string[], typeSpeed: number = 60, deleteSpeed: number = 35, pauseMs: number = 1500) {
  const [displayed, setDisplayed] = useState(prefix);
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isWaiting, setIsWaiting] = useState(false);

  useEffect(() => {
    const currentWord = words[wordIndex];
    const fullText = prefix + currentWord;

    if (isWaiting) {
      const timer = setTimeout(() => {
        setIsWaiting(false);
        setIsDeleting(true);
      }, pauseMs);
      return () => clearTimeout(timer);
    }

    if (isDeleting) {
      if (displayed.length <= prefix.length) {
        setIsDeleting(false);
        setWordIndex((prev) => (prev + 1) % words.length);
        return;
      }
      const timer = setTimeout(() => {
        setDisplayed((prev) => prev.slice(0, -1));
      }, deleteSpeed);
      return () => clearTimeout(timer);
    }

    // Typing forward
    if (displayed.length < fullText.length) {
      const timer = setTimeout(() => {
        setDisplayed(fullText.slice(0, displayed.length + 1));
      }, typeSpeed);
      return () => clearTimeout(timer);
    } else {
      // Done typing, wait before deleting
      const timer = setTimeout(() => setIsWaiting(true), pauseMs);
      return () => clearTimeout(timer);
    }
  }, [displayed, isDeleting, isWaiting, wordIndex, prefix, words, typeSpeed, deleteSpeed, pauseMs]);

  return displayed;
}

/* ─── Testimonials ─── */
const TESTIMONIALS = [
  {
    name: "Aniket Chakravarty",
    role: "Sarod Exponent, Kolkata",
    quote: "IICA gave my artistry a global identity. The life journey documentation and branding transformed how the world sees my classical music.",
    img: "https://images.unsplash.com/photo-1519802774765-9e3b1e3e6a7e?w=600&q=80",
    videoId: "KWXLJ85ua8s",
  },
  {
    name: "Debasmita Bhattacharya",
    role: "Sarod Player, Kolkata",
    quote: "Finally a platform that understands what classical Indian artists truly need — not just a profile, but a living legacy.",
    img: "https://images.unsplash.com/photo-1509059852496-f3822ae057bf?w=600&q=80",
    videoId: "KnXNmUWgeWQ",
  },
  {
    name: "Shatavisha Mukherjee",
    role: "Kathak Dancer, Lucknow",
    quote: "My bookings doubled in six months. IICA's SEO-powered artist page brought audiences I could never reach alone.",
    img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=600&q=80",
    videoId: "_lH_XfQwkOg",
  },
];

// Fallback data — used when Google Sheets is not configured
const TALK_SHOW_VIDEOS = [
  { title: "The Inspiration Talk", videoId: "dQw4w9WgXcQ", desc: "World-class musicians network and share experiences" },
  { title: "Artist Soumendra Goswami", videoId: "dQw4w9WgXcQ", desc: "Dhrupad, SITAR" },
  { title: "STAR of the Month", videoId: "dQw4w9WgXcQ", desc: "Manali Ghosh | STAR Magazine" },
  { title: "Career Corner", videoId: "dQw4w9WgXcQ", desc: "Indian Cultural Career Corner" },
  { title: "Featured Artist", videoId: "dQw4w9WgXcQ", desc: "Exclusive interview & performance" },
];

const HERO_CARDS = [
  { icon: "TrendingUp", label: "Increase Your Artistic Brand Earnings by 80%", desc: "Premium artistic brands follow strategic steps to grow their brand value, win international awards, perform at prestigious concerts, and receive accolades that set them apart — IICA makes this your reality.", gradient: "from-[#C13584] to-[#E1306C]", bgImage: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=800&q=80", link: "/increase-earnings" },
  { icon: "RefreshCw", label: "Prepare to Succeed as Performing Arts Professionals", desc: "India's performing arts market was valued at $3.8 billion in 2023, and is expected to reach $7 billion by 2027. The worldwide arts industry is worth $1.5 trillion.", gradient: "from-[#833AB4] to-[#C13584]", bgImage: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&q=80", link: "/relaunch-brand" },
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
  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&q=80",
  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&q=80",
  "https://images.unsplash.com/photo-1463453091185-61582044d556?w=300&q=80",
];

export default function Home() {
  const [talkIdx, setTalkIdx] = useState(0);
  const config = useConfig();
  const { theme } = useTheme();

  // Merge Google Sheets data with fallback
  const activeTestimonials = config.testimonials.length > 0
    ? config.testimonials.map(t => ({ name: t.name, role: t.role, quote: t.quote, img: t.img, videoId: t.videoid }))
    : TESTIMONIALS;

  const awardsForSection = config.awards.length > 0
    ? config.awards.map(a => ({ name: a.name, award: a.award, year: a.year, body: a.body, description: a.description, reelCode: a.reelcode, photos: ["https://images.unsplash.com/photo-1509059852496-f3822ae057bf?w=500&q=80", "https://images.unsplash.com/photo-1520810627419-35e6bce42bca?w=500&q=80", "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=500&q=80"] }))
    : [];

  const activeTalkShow = config.talkShow.length > 0 ? config.talkShow : TALK_SHOW_VIDEOS;
  const activeHeroCards = config.heroCards.length > 0 ? config.heroCards : HERO_CARDS;

  // Only use Google Sheets artists — same as Artists page
  const activeArtists = config.artists.map(a => ({ slug: a.slug, name: a.name, image: a.image }));

  /* Cycle typing: "EMPOWERING ARTISTS" → "EMPOWERING PERFORMERS" → "EMPOWERING CREATORS" → loop */
  const cyclingLine = useCycleTyping("EMPOWERING ", ["ARTISTS,", "MUSICIANS,", "CREATORS,"], 45, 25, 2000);

  return (
    <div className="bg-background text-foreground min-h-screen transition-colors duration-300">

      {/* ══════════════════════════════════════════════
          1. HERO — EVEN-style layout
          ══════════════════════════════════════════════ */}
      <section className={`relative h-screen min-h-[600px] max-h-[900px] flex items-center overflow-hidden ${
        theme === 'light' ? 'bg-muted' : ''
      }`}>

        {/* Video bg with image fallback — visible in both themes */}
        <div className="absolute inset-0 z-0">
          <video
            autoPlay muted loop playsInline poster={heroBg}
            className="w-full h-full object-cover"
          >
            <source src="/hero-video.mp4" type="video/mp4" />
          </video>
          {/* Dark theme: reduced overlays so video is visible */}
          {theme === 'dark' && (
            <>
              <div className="absolute inset-0 bg-black/25" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-black/25" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-transparent" />
            </>
          )}
          {/* Light theme: light overlays for text readability while keeping video visible */}
          {theme === 'light' && (
            <>
              <div className="absolute inset-0 bg-white/20" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#F8F7F5]/50 via-white/10 to-white/20" />
              <div className="absolute inset-0 bg-gradient-to-r from-white/50 via-transparent to-transparent" />
            </>
          )}
        </div>

        {/* Content */}
        <div className="relative z-10 w-full">
          <div className="container mx-auto px-6 md:px-10">

            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className={`inline-flex items-center gap-2 backdrop-blur-sm rounded-full px-3.5 py-1.5 mb-8 text-xs ${
                theme === 'light'
                  ? 'bg-card border border-border text-muted-foreground'
                  : 'bg-white/10 border border-white/15 text-white/80'
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#C13584] animate-pulse" />
              Join <strong className={`mx-1 ${theme === 'light' ? 'text-foreground' : 'text-white'}`}>500+</strong> Indian artists on IICA
            </motion.div>

            {/* Headline — cycle typing on first line, static second line */}
            <h1
              className={`font-sans font-black uppercase leading-[0.88] tracking-tight mb-6 ${
                theme === 'light' ? 'text-foreground' : 'text-white'
              }`}
              style={{ fontSize: 'clamp(3rem, 7vw, 5.5rem)' }}
            >
              <span className={theme === 'light' ? 'text-foreground' : 'text-white'}>{cyclingLine.slice(0, 11)}</span>
              <span className="gradient-text">{cyclingLine.slice(11)}</span>
              <span className="inline-block w-[3px] h-[0.8em] bg-[#C13584] ml-1.5 align-middle animate-pulse" />
              <br />
              <span className={theme === 'light' ? 'text-foreground' : 'text-white'}>BEYOND PERFORMANCE.</span>
            </h1>

            {/* Sub-copy — single line */}
            <p className={`text-base whitespace-nowrap mb-7 ${
              theme === 'light' ? 'text-muted-foreground' : 'text-white'
            }`}>
              Connect, brand, and grow through India's premier platform for performing artists.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3">
              <Link href="/membership">
                <button className="gradient-bg text-white h-11 px-7 text-sm font-semibold rounded-full hover:opacity-90 transition-opacity">
                  Become a Member →
                </button>
              </Link>
              <Link href="/artists">
                <button className={`h-11 px-7 text-sm font-medium rounded-full transition-all ${
                  theme === 'light'
                    ? 'bg-card border border-border text-foreground hover:bg-muted hover:shadow-md'
                    : 'bg-white/8 border border-white/25 text-white hover:bg-white/15 hover:border-white/40'
                }`}>
                  Explore Artists
                </button>
              </Link>
            </div>

            <p className={`text-xs mt-3 ${
              theme === 'light' ? 'text-muted-foreground' : 'text-gray-600'
            }`}>
              No card needed. Free to explore.
            </p>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          2. FEATURE CARDS — content-rich, hero overlap
          ══════════════════════════════════════════════ */}
      <section className={`relative z-20 -mt-14 md:-mt-16 transition-colors duration-300`}>
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {activeHeroCards.map((item: any, i: number) => {
              const iconMap: Record<string, React.ReactNode> = { TrendingUp: <TrendingUp className="w-6 h-6 text-white" />, RefreshCw: <RefreshCw className="w-6 h-6 text-white" /> };
              return (
                <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + i * 0.15, duration: 0.5 }}
                whileHover={{ y: -6 }}
                className={`group relative rounded-2xl overflow-hidden cursor-pointer transition-all duration-500 flex flex-col ${
                  theme === 'light'
                    ? 'bg-card border border-border shadow-xl hover:shadow-2xl'
                    : 'shadow-2xl shadow-black/60'
                }`}
              >
                {theme === 'dark' ? (
                  // Dark theme: image background with overlays
                  <>
                    <div className="absolute inset-0">
                      <img src={item.bgImage || item.bgimage} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                      <div className="absolute inset-0 bg-black/70" />
                      <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-25`} />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-black/30" />
                    </div>
                    <div className="relative z-10 p-8 flex flex-col flex-1">
                      <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${item.gradient} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                        {iconMap[item.icon] || <TrendingUp className="w-6 h-6 text-white" />}
                      </div>
                      <h3 className="text-white font-bold text-lg mb-3 leading-tight">{item.label || item.title}</h3>
                      <p className="text-gray-300 text-sm leading-relaxed mb-6 flex-1">{item.desc || item.description}</p>
                      <Link href={item.link || "/increase-earnings"}>
                        <button className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold text-sm px-6 py-2.5 rounded-full transition-colors w-fit">
                          Explore <ArrowRight className="w-4 h-4" />
                        </button>
                      </Link>
                    </div>
                  </>
                ) : (
                  // Light theme: white card with gradient accent
                  <div className="relative z-10 p-8 flex flex-col flex-1">
                    {/* Top gradient line */}
                    <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${item.gradient}`} />
                    
                    {/* Subtle gradient glow at top */}
                    <div className={`absolute top-0 left-0 right-0 h-32 bg-gradient-to-b ${item.gradient} opacity-5 pointer-events-none`} />
                    
                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${item.gradient} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                      {iconMap[item.icon] || <TrendingUp className="w-6 h-6 text-white" />}
                    </div>
                    <h3 className="text-foreground font-bold text-lg mb-3 leading-tight">{item.label || item.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-6 flex-1">{item.desc || item.description}</p>
                    <Link href={item.link || "/increase-earnings"}>
                      <button className="inline-flex items-center gap-2 bg-card border border-border hover:bg-accent/10 hover:border-accent text-foreground font-semibold text-sm px-6 py-2.5 rounded-full transition-colors w-fit">
                        Explore <ArrowRight className="w-4 h-4" />
                      </button>
                    </Link>
                  </div>
                )}
              </motion.div>
            )})}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          3. SERVICE TILES + APPOINTMENT — REDESIGNED
          ══════════════════════════════════════════════ */}
      <section className={`relative transition-colors duration-300 ${
        theme === 'light' ? 'bg-muted border-t border-border' : 'bg-black border-t border-white/5'
      }`}>
        
        {/* Header strip */}
        <div className={`pt-16 pb-10 text-center transition-colors ${
          theme === 'light' ? 'bg-muted border-b border-border' : 'bg-black border-b border-white/5'
        }`}>
          <div className="container mx-auto px-6">
            <p className={`text-xs tracking-[0.35em] uppercase mb-3 ${
              theme === 'light' ? 'text-muted-foreground' : 'text-gray-400'
            }`}>What We Offer</p>
            <h2 className="text-4xl md:text-5xl font-black leading-[1.1]">
              <span className="bg-gradient-to-r from-[#C13584] via-[#833AB4] to-[#E1306C] bg-clip-text text-transparent">
                Built for Artists,<br />Not Algorithms
              </span>
            </h2>
          </div>
        </div>

        {/* Service cards */}
        <div className="container mx-auto px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { 
                number: "01", 
                title: "Premium Artist Branding", 
                desc: "Technology-powered done-for-you services that ensure a seamless, decentralized brand ecosystem for the modern performing artist.",
                gradient: "from-[#C13584] to-[#E1306C]",
                glowLight: "rgba(193,53,132,0.08)",
                glowDark: "rgba(193,53,132,0.06)"
              },
              { 
                number: "02", 
                title: "LEGACY Brand Loyalty Program", 
                desc: "A world-class archival solution that guarantees celebration of your legacy, for lifetimes and generations to come.",
                gradient: "from-[#833AB4] to-[#C13584]",
                glowLight: "rgba(131,58,180,0.08)",
                glowDark: "rgba(131,58,180,0.06)"
              },
              { 
                number: "03", 
                title: "International Outreach Solutions", 
                desc: "Personalized brand solutions for touring artists — so your international audience gets 80X more engagement with you.",
                gradient: "from-[#405DE6] to-[#833AB4]",
                glowLight: "rgba(64,93,230,0.08)",
                glowDark: "rgba(64,93,230,0.06)"
              },
            ].map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12, duration: 0.5 }}
                whileHover={{ y: -4 }}
                className={`group relative rounded-2xl p-8 transition-all duration-300 ${
                  theme === 'light' 
                    ? 'bg-card border border-border shadow-md hover:shadow-lg' 
                    : ''
                }`}
                style={theme === 'dark' ? { 
                  background: `linear-gradient(135deg, ${s.glowDark}, #0d0d0d 60%)`, 
                  border: '1px solid rgba(255,255,255,0.06)' 
                } : {}}
              >
                {/* Top gradient line */}
                <div className={`absolute top-0 left-6 right-6 h-[2px] rounded-full bg-gradient-to-r ${s.gradient} opacity-40 group-hover:opacity-100 transition-opacity duration-300`} />
                
                <span className={`inline-block text-5xl font-black bg-gradient-to-r ${s.gradient} bg-clip-text text-transparent ${
                  theme === 'light' ? 'opacity-40' : 'opacity-60'
                } group-hover:opacity-100 transition-opacity mb-5`}>
                  {s.number}
                </span>
                <h4 className={`font-bold text-base mb-3 ${
                  theme === 'light' ? 'text-foreground' : 'text-white'
                }`}>
                  {s.title}
                </h4>
                <p className={`text-sm leading-relaxed ${
                  theme === 'light' ? 'text-muted-foreground' : 'text-gray-300'
                }`}>{s.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* CTA Button — full width with glow */}
          <div className="mt-12 text-center">
            <ConsultationModal>
              <button className="relative inline-flex items-center gap-2 bg-gradient-to-r from-[#C13584] via-[#833AB4] to-[#405DE6] text-white font-bold text-base px-10 py-4 rounded-full
                shadow-[0_0_40px_rgba(193,53,132,0.3)] hover:shadow-[0_0_60px_rgba(193,53,132,0.5)] 
                transition-all duration-300 hover:scale-105 active:scale-95
                before:absolute before:inset-0 before:rounded-full before:bg-gradient-to-r before:from-[#C13584] before:via-[#833AB4] before:to-[#405DE6] before:blur-xl before:opacity-40 before:-z-10">
                <span className="relative z-10">Book a FREE Consultation</span>
                <svg className="relative z-10 w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </button>
            </ConsultationModal>
            <p className={`text-xs mt-4 ${theme === 'light' ? 'text-muted-foreground' : 'text-gray-600'}`}>No credit card required · Free 30-min session</p>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          4. ARTISTS ARE TALKING
          ══════════════════════════════════════════════ */}
          <section className={`py-12 transition-colors duration-300 ${
        theme === 'light' ? 'bg-background border-t border-border' : 'bg-[#080808] border-t border-white/5'
      }`}>
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">

            {/* Left: big heading + YouTube */}
            <div>
              <h2 className={`font-sans font-black leading-[0.9] uppercase mb-6 ${
                theme === 'light' ? 'text-foreground' : 'text-white'
              }`} style={{ fontSize: 'clamp(2rem, 4.5vw, 3.5rem)' }}>
                ARTISTS<br />ARE<br />TALKING
              </h2>
              <div className={`rounded-xl overflow-hidden aspect-video max-w-lg ${
                theme === 'light' ? 'bg-gray-100 shadow-md' : 'bg-[#111]'
              }`}>
                <iframe
                  width="100%" height="100%" className="w-full h-full"
                  src={`https://www.youtube.com/embed/${extractYoutubeId(activeTestimonials[talkIdx].videoId)}?rel=0&modestbranding=1&autoplay=0`}
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
                  <div className={`rounded-xl overflow-hidden aspect-[4/3] mb-4 max-w-md ${
                    theme === 'light' ? 'bg-gray-100 shadow-md' : 'bg-[#111]'
                  }`}>
                    <img src={activeTestimonials[talkIdx].img} alt={activeTestimonials[talkIdx].name} className="w-full h-full object-cover" />
                  </div>
                  <blockquote className={`text-base font-medium leading-snug mb-4 max-w-md ${
                    theme === 'light' ? 'text-foreground' : 'text-white'
                  }`}>
                    "{activeTestimonials[talkIdx].quote}"
                  </blockquote>
                  <div className="flex items-center gap-3">
                    <img src={activeTestimonials[talkIdx].img} alt="" className="w-8 h-8 rounded-full object-cover" />
                    <div>
                      <p className={`font-semibold text-sm ${
                        theme === 'light' ? 'text-foreground' : 'text-white'
                      }`}>{activeTestimonials[talkIdx].name}</p>
                      <p className={`text-xs ${
                        theme === 'light' ? 'text-muted-foreground' : 'text-gray-500'
                      }`}>{activeTestimonials[talkIdx].role}</p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              <div className="flex items-center gap-3 mt-7">
                <button 
                  onClick={() => setTalkIdx(i => (i - 1 + activeTestimonials.length) % activeTestimonials.length)} 
                  className={`w-9 h-9 rounded-full border flex items-center justify-center transition-all ${
                    theme === 'light'
                      ? 'border-border hover:border-accent hover:bg-accent/10'
                      : 'border-white/20 hover:border-white/50 hover:bg-white/5'
                  }`}
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => setTalkIdx(i => (i + 1) % activeTestimonials.length)} 
                  className={`w-9 h-9 rounded-full border flex items-center justify-center transition-all ${
                    theme === 'light'
                      ? 'border-border hover:border-accent hover:bg-accent/10'
                      : 'border-white/20 hover:border-white/50 hover:bg-white/5'
                  }`}
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
                <span className={`text-xs ml-1 ${
                  theme === 'light' ? 'text-muted-foreground' : 'text-gray-600'
                }`}>{talkIdx + 1} / {activeTestimonials.length}</span>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* ══════════════════════════════════════════════
          5. IICA ARTISTS — Auto-scrolling carousel
          ══════════════════════════════════════════════ */}
      <section className={`py-20 overflow-hidden transition-colors duration-300 ${
        theme === 'light' 
          ? 'bg-muted border-t border-border' 
          : 'bg-gradient-to-r from-[#1a1a1a] via-[#222] to-[#1a1a1a] border-t border-white/5'
      }`}>
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-end mb-10">
            <div>
              <p className="text-[#C13584] tracking-[0.3em] uppercase text-xs font-medium mb-2">Our Roster</p>
              <h2 className={`font-serif text-4xl font-bold ${
                theme === 'light' ? 'text-foreground' : 'text-white'
              }`}>IICA Artists</h2>
            </div>
            <div className="flex items-center gap-2">
              <button 
                onClick={() => { const el = document.getElementById('artists-track'); if (el) el.scrollBy({ left: -320, behavior: 'smooth' }); }} 
                className={`w-9 h-9 rounded-full border flex items-center justify-center transition-all ${
                  theme === 'light'
                    ? 'border-border hover:border-accent hover:bg-accent/10'
                    : 'border-white/15 hover:border-white/40 hover:bg-white/5'
                }`}
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button 
                onClick={() => { const el = document.getElementById('artists-track'); if (el) el.scrollBy({ left: 320, behavior: 'smooth' }); }} 
                className={`w-9 h-9 rounded-full border flex items-center justify-center transition-all ${
                  theme === 'light'
                    ? 'border-border hover:border-accent hover:bg-accent/10'
                    : 'border-white/15 hover:border-white/40 hover:bg-white/5'
                }`}
              >
                <ChevronRight className="w-4 h-4" />
              </button>
              <Link href="/artists">
                <button className={`text-xs border rounded-full px-4 py-1.5 transition-all ml-2 ${
                  theme === 'light'
                    ? 'text-muted-foreground hover:text-foreground border-border hover:border-accent'
                    : 'text-gray-500 hover:text-white border-white/15 hover:border-white/30'
                }`}>
                  View All
                </button>
              </Link>
            </div>
          </div>

          {/* Carousel track */}
          <div id="artists-track" className="flex gap-6 overflow-x-auto scroll-smooth pb-2 [&::-webkit-scrollbar]:hidden">
            {activeArtists.map((artist, i) => (
              <div
                key={`${artist.slug}-${i}`}
                className="flex flex-col items-center gap-3 group flex-shrink-0"
                style={{ width: '160px' }}
              >
                <Link href={`/artist/${artist.slug}`}>
                  <div className={`w-32 h-32 sm:w-40 sm:h-40 rounded-full overflow-hidden border-2 border-transparent group-hover:border-[#C13584]/60 transition-all duration-300 cursor-pointer ${
                    theme === 'light' ? 'bg-gray-100' : 'bg-[#111]'
                  }`}>
                    <img
                      src={artist.image || ARTIST_AVATARS[i % ARTIST_AVATARS.length]}
                      alt={artist.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                </Link>
                <p className={`text-xs font-medium text-center truncate w-full ${
                  theme === 'light' ? 'text-foreground' : 'text-white'
                }`}>{artist.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          6. AWARDS — Redesigned Two-Panel Layout
          ══════════════════════════════════════════════ */}
      <AwardRecipients awards={awardsForSection} />

      {/* ══════════════════════════════════════════════
          7. ARTISTS - ख़बरें - आज़म — Weekly Talk Show
          ══════════════════════════════════════════════ */}
      <section className={`py-16 transition-colors duration-300 ${
        theme === 'light' 
          ? 'bg-muted border-t border-border' 
          : 'bg-black border-t border-white/5'
      }`}>
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-end mb-8">
            <div>
              <p className="text-[#C13584] tracking-[0.3em] uppercase text-xs font-medium mb-2">Weekly Talk Show</p>
              <h2 className={`font-serif text-3xl font-bold ${
                theme === 'light' ? 'text-foreground' : 'text-white'
              }`}>Artists — ख़बरें — आज़म</h2>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => { const el = document.getElementById('talkshow-track'); if (el) el.scrollBy({ left: -360, behavior: 'smooth' }); }} className={`w-9 h-9 rounded-full border flex items-center justify-center transition-all ${
                theme === 'light'
                  ? 'border-border hover:border-accent hover:bg-accent/10'
                  : 'border-white/20 hover:border-white/50 hover:bg-white/5'
              }`}><ChevronLeft className="w-4 h-4" /></button>
              <button onClick={() => { const el = document.getElementById('talkshow-track'); if (el) el.scrollBy({ left: 360, behavior: 'smooth' }); }} className={`w-9 h-9 rounded-full border flex items-center justify-center transition-all ${
                theme === 'light'
                  ? 'border-border hover:border-accent hover:bg-accent/10'
                  : 'border-white/20 hover:border-white/50 hover:bg-white/5'
              }`}><ChevronRight className="w-4 h-4" /></button>
            </div>
          </div>

          {/* YouTube video carousel */}
          <div id="talkshow-track" className="flex gap-5 overflow-x-auto scroll-smooth pb-2 [&::-webkit-scrollbar]:hidden">
            {activeTalkShow.map((video: any, i: number) => (
              <div key={i} className="flex-shrink-0 w-[320px]">
                <div className={`aspect-video rounded-xl overflow-hidden mb-3 ${
                  theme === 'light' 
                    ? 'bg-card border border-border' 
                    : 'bg-[#111] border border-white/5'
                }`}>
                  <iframe
                    width="100%"
                    height="100%"
                    src={`https://www.youtube.com/embed/${extractYoutubeId(video.videoid || video.videoId)}`}
                    title={video.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                  />
                </div>
                <h4 className={`font-semibold text-sm mb-1 ${
                  theme === 'light' ? 'text-foreground' : 'text-white'
                }`}>{video.title}</h4>
                <p className={`text-xs ${
                  theme === 'light' ? 'text-muted-foreground' : 'text-gray-500'
                }`}>{video.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
