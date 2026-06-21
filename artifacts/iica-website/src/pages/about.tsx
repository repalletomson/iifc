import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Globe, Users, Trophy, Award, Heart, Shield, Star, Zap } from 'lucide-react';
import { useCounter } from '@/hooks/use-counter';

function AnimatedCounter({ end, suffix = "", prefix = "" }: { end: number, suffix?: string, prefix?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const count = useCounter(end, 2000, isInView);

  return (
    <span ref={ref} className="font-serif text-5xl font-bold gradient-text">
      {prefix}{count}{suffix}
    </span>
  );
}

export default function About() {
  const timeline = [
    { year: "2015", title: "Foundation", description: "IICA was established with a vision to organize the unorganized sector of classical arts." },
    { year: "2018", title: "Global Expansion", description: "Opened first international chapters in London and New York." },
    { year: "2021", title: "Digital Revolution", description: "Launched the digital platform connecting artists worldwide." },
    { year: "2024", title: "Legacy Program", description: "Introduced the SEO-powered artist branding initiatives." },
  ];

  const values = [
    { icon: <Heart className="w-8 h-8 text-[#C13584]" />, title: "Authenticity", desc: "Preserving the true essence of Indian classical arts." },
    { icon: <Shield className="w-8 h-8 text-[#833AB4]" />, title: "Integrity", desc: "Building long-term legacy over short-term gains." },
    { icon: <Star className="w-8 h-8 text-[#E1306C]" />, title: "Excellence", desc: "Premium quality in every aspect of promotion." },
    { icon: <Zap className="w-8 h-8 text-[#d4a853]" />, title: "Innovation", desc: "Modern technology meeting ancient traditions." },
  ];

  return (
    <div className="bg-black text-white min-h-screen pt-20">
      {/* Hero */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[#0a0a0a]" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#833AB4]/20 via-[#C13584]/10 to-transparent pointer-events-none" />
        <div className="container relative z-10 mx-auto px-6 text-center max-w-4xl">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-serif text-5xl md:text-7xl font-bold mb-6"
          >
            Empowering the <br/><span className="gradient-text">Cultural Guardians</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-300"
          >
            IICA is dedicated to elevating Indian classical and traditional arts on the global stage through premium branding and strategic collaborations.
          </motion.p>
        </div>
      </section>

      {/* Impact Counters */}
      <section className="py-20 border-y border-white/10 bg-black/50">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
            <div>
              <AnimatedCounter end={500} suffix="+" />
              <div className="text-gray-400 mt-2 font-medium tracking-wide uppercase text-sm">Artists Empowered</div>
            </div>
            <div>
              <AnimatedCounter end={50} suffix="+" />
              <div className="text-gray-400 mt-2 font-medium tracking-wide uppercase text-sm">Global Events</div>
            </div>
            <div>
              <AnimatedCounter end={15} suffix="+" />
              <div className="text-gray-400 mt-2 font-medium tracking-wide uppercase text-sm">Countries</div>
            </div>
            <div>
              <AnimatedCounter end={8} suffix="+" />
              <div className="text-gray-400 mt-2 font-medium tracking-wide uppercase text-sm">Major Awards</div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-24 bg-[#0a0a0a]">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="glass-card p-12 rounded-3xl"
            >
              <Globe className="w-16 h-16 text-[#833AB4] mb-8" />
              <h2 className="font-serif text-3xl font-bold mb-6">Our Mission</h2>
              <p className="text-gray-400 text-lg leading-relaxed">
                To create a sustainable, premium ecosystem for Indian performing artists that bridges the gap between raw talent and global market demand through strategic branding, technology, and international networking.
              </p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="glass-card p-12 rounded-3xl"
            >
              <Trophy className="w-16 h-16 text-[#C13584] mb-8" />
              <h2 className="font-serif text-3xl font-bold mb-6">Our Vision</h2>
              <p className="text-gray-400 text-lg leading-relaxed">
                To see Indian classical arts recognized and compensated at par with Western classical arts globally, where our artists are celebrated as premium cultural ambassadors and thought leaders.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-black">
        <div className="container mx-auto px-6">
          <h2 className="font-serif text-4xl font-bold mb-16 text-center">Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-card p-8 rounded-2xl text-center hover:border-[#833AB4]/50 transition-colors"
              >
                <div className="mb-6 flex justify-center">{value.icon}</div>
                <h3 className="font-bold text-xl mb-3">{value.title}</h3>
                <p className="text-gray-400 text-sm">{value.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24 bg-[#0a0a0a]">
        <div className="container mx-auto px-6 max-w-4xl">
          <h2 className="font-serif text-4xl font-bold mb-16 text-center">Our Journey</h2>
          <div className="relative border-l-2 border-[#833AB4]/30 ml-4 md:ml-0 md:left-1/2">
            {timeline.map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className={`mb-12 relative pl-8 md:pl-0 md:w-1/2 ${i % 2 === 0 ? 'md:pr-12 md:text-right md:left-[-50%]' : 'md:pl-12 md:left-1/2'}`}
              >
                <div className="absolute w-4 h-4 rounded-full gradient-bg left-[-9px] md:left-[-9px] top-2 z-10" />
                <span className="text-[#C13584] font-bold text-xl block mb-2">{item.year}</span>
                <h3 className="font-serif text-2xl font-bold mb-3">{item.title}</h3>
                <p className="text-gray-400">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
