import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { TrendingUp, Briefcase, BookOpen, ArrowRight } from 'lucide-react';
import { useCounter } from '@/hooks/use-counter';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';

function AnimatedCounter({ end, suffix = "", prefix = "" }: { end: number, suffix?: string, prefix?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const count = useCounter(end, 2000, isInView);

  return (
    <span ref={ref} className="font-serif text-5xl md:text-6xl font-bold gradient-text">
      {prefix}{count}{suffix}
    </span>
  );
}

export default function About() {
  const pillars = [
    {
      icon: <TrendingUp className="w-8 h-8 text-[#C13584]" />,
      title: "GROW TOGETHER",
      desc: "Celebrate good music, new music, all musicians, sound engineers, and artists engaged in production of audio/visual media in Arts & Entertainment",
    },
    {
      icon: <Briefcase className="w-8 h-8 text-[#833AB4]" />,
      title: "BRANDING WITH PURPOSE",
      desc: "Nurture the culture of branding with purpose, for sustainable benefits to artists, educators, students, and the community at large",
    },
    {
      icon: <BookOpen className="w-8 h-8 text-[#d4a853]" />,
      title: "LEARNING BUSINESS CONCEPTS",
      desc: "Lifelong learning attitude is KEY to growth of any individual, artist, nation. Our national & international campaigns are designed for premium artists eager to make significant leaps in business",
    },
  ];

  return (
    <div className="bg-black text-white min-h-screen pt-20">

      {/* Mission Header */}
      <section className="py-20 border-b border-white/8">
        <div className="container mx-auto px-6 max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <p className="text-gray-300 text-lg leading-relaxed mb-8">
              We are on a mission to help <strong className="text-white">1 MILLION artists</strong> to achieve their professional goals, by using innovative branding tools designed in a structured infrastructure powered by technology, leading to a steady growth in their brand values. We design growth strategies uniquely suited to individual artists, in order to offer them a world-class <strong className="gradient-text">LEGACY solution</strong> that lives beyond their lifetimes.
            </p>
            <p className="text-gray-400 leading-relaxed">
              We are a team of trained music educators, technology leaders, digital marketing experts, copywriting specialists and branding coaches who achieved early success in helping performing arts professionals earn <strong className="text-white">40X more revenue</strong>, on a regular basis. Buy the book available on Amazon and Flipkart, written by our CEO — Reshma Patra, to learn about the proven methods and scientific insights that artists and educators use, to pursue artistic fulfillment and achieve financial goals.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-[#0a0a0a] border-b border-white/8">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center max-w-4xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <AnimatedCounter end={5000} suffix="+" />
              <div className="text-gray-400 mt-3 font-medium tracking-wide text-sm uppercase">Portfolio Design Projects</div>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
              <AnimatedCounter end={1500} suffix="+" />
              <div className="text-gray-400 mt-3 font-medium tracking-wide text-sm uppercase">Educators' Consulting Projects</div>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
              <AnimatedCounter end={10} suffix="+" />
              <div className="text-gray-400 mt-3 font-medium tracking-wide text-sm uppercase">Years of Experience</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Purpose Section */}
      <section className="py-24">
        <div className="container mx-auto px-6 max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="text-[#C13584] tracking-[0.25em] uppercase text-sm font-medium mb-4">Technology-Powered Legacy Solution</p>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-white mb-2">
              For Celebrating Indian Performing Arts & Culture
            </h2>
            <div className="w-20 h-[2px] gradient-bg mx-auto mt-6" />
          </motion.div>

          <div className="text-center mb-20">
            <motion.h1
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="font-serif text-6xl md:text-8xl font-bold gradient-text"
            >
              PURPOSE
            </motion.h1>
            <div className="mt-2 text-gray-600 tracking-[0.5em] uppercase text-xs">Our Reason For Being</div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pillars.map((pillar, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12 }}
                className="border border-white/8 rounded-2xl p-8 bg-[#0a0a0a] hover:border-white/15 transition-colors"
              >
                <div className="mb-6">{pillar.icon}</div>
                <h3 className="font-bold text-sm tracking-wider uppercase text-white mb-4">{pillar.title}</h3>
                <p className="text-gray-400 leading-relaxed text-sm">{pillar.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Vivekananda Quote */}
      <section className="py-16 bg-[#0a0a0a] border-y border-white/8">
        <div className="container mx-auto px-6 max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="text-5xl text-[#833AB4] mb-6 font-serif">"</div>
            <blockquote className="font-serif text-xl md:text-2xl italic text-[#C13584] leading-relaxed mb-6">
              Whatever you think that you will be. If you think yourself weak, weak you will be; if you think yourself strong, strong you will be
            </blockquote>
            <cite className="text-gray-500 text-sm not-italic tracking-wider uppercase">— Swami Vivekananda</cite>
          </motion.div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-24 bg-black">
        <div className="container mx-auto px-6 max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-gray-300 text-lg leading-relaxed mb-8">
              If you are a professional performing artist eager to make steady progress in your career path ahead, we welcome you to explore our Premium Artist offerings. And, remember, <strong className="text-white">"Premium Artist"</strong> is nothing but a mindset. We help you set goals suited to your unique talents & we facilitate your journey in achieving those goals with confidence.{' '}
              <strong className="text-white">Talk to us!</strong>
            </p>
            <Link href="/membership">
              <Button className="gradient-bg text-white h-13 px-10 text-base hover:opacity-90 flex items-center gap-2 mx-auto">
                Premium Artist Offerings <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
