import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { TrendingUp, Briefcase, BookOpen, ArrowRight, Zap, Globe, Heart } from 'lucide-react';
import { useCounter } from '@/hooks/use-counter';
import { Link } from 'wouter';

function AnimatedCounter({ end, suffix = "" }: { end: number; suffix?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const count = useCounter(end, 2000, isInView);
  return (
    <span ref={ref} className="font-sans font-black text-white" style={{ fontSize: 'clamp(3rem, 7vw, 5.5rem)' }}>
      {count}{suffix}
    </span>
  );
}

const PILLARS = [
  { icon: <TrendingUp className="w-6 h-6 text-[#C13584]" />, title: "GROW TOGETHER", desc: "Celebrate good music, new music, all musicians, sound engineers, and artists engaged in production of audio/visual media in Arts & Entertainment." },
  { icon: <Briefcase className="w-6 h-6 text-[#833AB4]" />, title: "BRANDING WITH PURPOSE", desc: "Nurture the culture of branding with purpose, for sustainable benefits to artists, educators, students, and the community at large." },
  { icon: <BookOpen className="w-6 h-6 text-[#d4a853]" />, title: "LEARNING BUSINESS CONCEPTS", desc: "Lifelong learning is KEY to growth. Our national & international campaigns are designed for premium artists eager to make significant leaps in business." },
];

export default function About() {
  return (
    <div className="bg-black text-white min-h-screen pt-16">

      {/* ── Cinematic mission header ── */}
      <section className="relative overflow-hidden border-b border-white/8 py-20">
        <div className="absolute inset-0 bg-gradient-to-br from-[#833AB4]/12 via-transparent to-[#E1306C]/8 pointer-events-none" />

        <div className="container mx-auto px-6 max-w-5xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <p className="text-[#C13584] text-xs tracking-[0.35em] uppercase font-medium mb-4">Our Mission</p>
            <h1 className="font-sans font-black uppercase leading-[0.92] tracking-tight text-white mb-8" style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}>
              EMPOWERING<br />
              <span className="gradient-text">1 MILLION</span><br />
              ARTISTS.
            </h1>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="max-w-3xl space-y-5">
            <p className="text-gray-300 text-lg leading-relaxed">
              We are on a mission to help <strong className="text-white">1 MILLION artists</strong> achieve their professional goals, using innovative branding tools designed in a structured infrastructure powered by technology — leading to steady growth in their brand values.
            </p>
            <p className="text-gray-400 leading-relaxed">
              We design growth strategies uniquely suited to individual artists, offering a world-class <strong className="gradient-text font-semibold">LEGACY solution</strong> that lives beyond their lifetimes. Our team of trained music educators, technology leaders, digital marketing experts, and branding coaches have achieved early success helping performing arts professionals earn <strong className="text-white">40X more revenue</strong>.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Stats — huge numbers like EVEN / District ── */}
      <section className="py-16 bg-[#080808] border-b border-white/8">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-3 divide-x divide-white/8 max-w-4xl mx-auto">
            {[
              { end: 5000, suffix: "+", label: "Portfolio Design Projects" },
              { end: 1500, suffix: "+", label: "Educators' Consulting Projects" },
              { end: 10, suffix: "+", label: "Years of Experience" },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="px-6 md:px-10 py-8 text-center"
              >
                <AnimatedCounter end={stat.end} suffix={stat.suffix} />
                <p className="text-gray-500 text-xs uppercase tracking-wider mt-2">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── "What makes us different" ── */}
      <section className="py-20">
        <div className="container mx-auto px-6 max-w-5xl">

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-16">
            <p className="text-[#C13584] text-xs tracking-[0.35em] uppercase font-medium mb-3">Technology-Powered Legacy Solution</p>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-white">For Celebrating Indian Performing Arts & Culture</h2>
            <div className="w-12 h-[2px] gradient-bg mt-5" />
          </motion.div>

          {/* Big PURPOSE word */}
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, scale: 0.92 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="font-sans font-black uppercase gradient-text"
              style={{ fontSize: 'clamp(4rem, 15vw, 11rem)', lineHeight: 1 }}
            >
              PURPOSE
            </motion.h2>
            <p className="text-gray-600 tracking-[0.5em] uppercase text-xs mt-2">Our Reason For Being</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PILLARS.map((pillar, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="border border-white/8 rounded-2xl p-8 bg-[#0a0a0a] hover:border-white/16 transition-colors"
              >
                <div className="mb-5 w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">{pillar.icon}</div>
                <h3 className="font-bold text-xs tracking-wider uppercase text-white mb-3">{pillar.title}</h3>
                <p className="text-gray-500 leading-relaxed text-sm">{pillar.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3 impact cards ── */}
      <section className="py-12 bg-[#080808] border-y border-white/8">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { icon: <Zap className="w-5 h-5 text-[#C13584]" />, title: "40X Revenue Growth", desc: "Proven methodology to multiply performing arts income." },
              { icon: <Globe className="w-5 h-5 text-[#833AB4]" />, title: "Global Reach", desc: "Connect with international audiences and collaborators." },
              { icon: <Heart className="w-5 h-5 text-[#d4a853]" />, title: "Legacy Building", desc: "Brand documentation that outlives any single performance." },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="flex items-start gap-4 p-6 rounded-xl bg-[#0d0d0d] border border-white/6"
              >
                <div className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center shrink-0">{item.icon}</div>
                <div>
                  <h4 className="font-bold text-white text-sm mb-1">{item.title}</h4>
                  <p className="text-gray-500 text-xs leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Vivekananda quote ── */}
      <section className="py-16 bg-black">
        <div className="container mx-auto px-6 max-w-3xl text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div className="text-5xl text-[#833AB4] mb-4 font-serif leading-none">"</div>
            <blockquote className="font-serif text-xl md:text-2xl italic text-[#C13584] leading-relaxed mb-6">
              Whatever you think that you will be. If you think yourself weak, weak you will be; if you think yourself strong, strong you will be.
            </blockquote>
            <cite className="text-gray-500 text-xs not-italic tracking-wider uppercase">— Swami Vivekananda</cite>
          </motion.div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 border-t border-white/8 bg-[#080808]">
        <div className="container mx-auto px-6 max-w-2xl text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <p className="text-gray-300 text-lg leading-relaxed mb-8">
              If you are a professional performing artist eager to make steady progress in your career path, we welcome you to explore our Premium Artist offerings. <strong className="text-white">Talk to us!</strong>
            </p>
            <Link href="/membership">
              <button className="gradient-bg text-white h-11 px-8 text-sm font-semibold rounded-full hover:opacity-90 transition-opacity flex items-center gap-2 mx-auto">
                Premium Artist Offerings <ArrowRight className="w-4 h-4" />
              </button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
