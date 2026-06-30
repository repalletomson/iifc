import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'wouter';
import { TrendingUp, ArrowRight, DollarSign, Target, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCounter } from '@/hooks/use-counter';
import { useTheme } from '@/lib/themeContext';

function AnimatedPercent() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const count = useCounter(80, 2500, isInView);

  return <span ref={ref}>{count}%</span>;
}

export default function IncreaseEarnings() {
  const { theme } = useTheme();
  const steps = [
    {
      icon: <Target className="w-8 h-8 text-[#C13584]" />,
      title: "Strategic Positioning",
      desc: "We analyze your current brand value and reposition you targeting high-paying global platforms, elite corporate events, and premium festivals."
    },
    {
      icon: <Award className="w-8 h-8 text-[#833AB4]" />,
      title: "Value Enhancement",
      desc: "Through SEO optimization, verified digital presence, and high-quality portfolio creation, we justify premium pricing for your performances."
    },
    {
      icon: <DollarSign className="w-8 h-8 text-[#E1306C]" />,
      title: "Monetization Channels",
      desc: "Unlock new revenue streams including masterclasses, brand endorsements, digital rights, and exclusive patron subscriptions."
    }
  ];

  return (
    <div className="bg-background text-foreground min-h-screen pt-20 transition-colors duration-300">
      {/* Hero */}
      <section className="relative py-24 md:py-32 overflow-hidden flex items-center min-h-[70vh]">
        <div className={`absolute inset-0 z-0 ${theme === 'light' ? 'bg-muted' : 'bg-[#0a0a0a]'}`} />
        <div className={`absolute inset-0 z-0 ${theme === 'light' ? 'bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#833AB4]/5 via-background to-background' : 'bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#833AB4]/20 via-black to-black'}`} />
        
        <div className="container relative z-10 mx-auto px-6 text-center">
          <motion.h1 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="font-serif text-8xl md:text-[12rem] font-bold gradient-text leading-none mb-6"
          >
            <AnimatedPercent />
          </motion.h1>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className={`text-3xl md:text-5xl font-serif font-bold mb-8 ${theme === 'light' ? 'text-foreground' : 'text-white'}`}
          >
            Increase Your Earnings
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className={`text-xl max-w-2xl mx-auto mb-12 ${theme === 'light' ? 'text-muted-foreground' : 'text-gray-300'}`}
          >
            Stop negotiating. Start commanding. Learn how IICA's premium artist branding methodology increases your perceived and actual market value.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Link href="/membership">
              <Button className="gradient-bg text-white h-14 px-10 text-lg hover:opacity-90">
                Start Your Journey
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* The Process */}
      <section className={`py-24 transition-colors duration-300 ${theme === 'light' ? 'bg-muted border-t border-border' : 'bg-black'}`}>
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className={`font-serif text-4xl md:text-5xl font-bold mb-6 ${theme === 'light' ? 'text-foreground' : 'text-white'}`}>The 3-Step Methodology</h2>
            <p className={`max-w-2xl mx-auto text-lg ${theme === 'light' ? 'text-muted-foreground' : 'text-gray-400'}`}>Our proven framework transforms talented performers into highly sought-after cultural brands.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`p-10 rounded-3xl relative overflow-hidden group border transition-colors ${
                  theme === 'light'
                    ? 'bg-card border-border shadow-md hover:shadow-lg'
                    : 'bg-[#0d0d0d] border-white/8'
                }`}
              >
                <div className={`absolute top-0 right-0 font-serif text-[8rem] font-bold -mt-10 -mr-4 transition-colors ${
                  theme === 'light' ? 'text-foreground/[0.02] group-hover:text-[#C13584]/5' : 'text-white/5 group-hover:text-[#C13584]/10'
                }`}>
                  {i + 1}
                </div>
                <div className="relative z-10">
                  <div className="mb-8">{step.icon}</div>
                  <h3 className={`font-serif text-2xl font-bold mb-4 ${theme === 'light' ? 'text-foreground' : 'text-white'}`}>{step.title}</h3>
                  <p className={`leading-relaxed ${theme === 'light' ? 'text-muted-foreground' : 'text-gray-400'}`}>{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className={`py-24 transition-colors duration-300 ${theme === 'light' ? 'bg-muted border-t border-border' : 'bg-[#0a0a0a]'}`}>
        <div className="container mx-auto px-6 max-w-4xl text-center">
          <div className={`p-12 md:p-16 rounded-3xl border transition-colors ${
            theme === 'light'
              ? 'bg-card border-border shadow-lg'
              : 'bg-[#0d0d0d] border-white/8'
          }`}>
            <TrendingUp className="w-12 h-12 text-[#d4a853] mx-auto mb-8" />
            <p className={`font-serif text-2xl md:text-3xl italic leading-relaxed mb-10 ${theme === 'light' ? 'text-muted-foreground' : 'text-gray-200'}`}>
              "Before IICA, I was playing 15 concerts a month to make ends meet. Now, I play 4 premium concerts a month at a 300% higher fee. They didn't change my music; they changed how the world perceived my music."
            </p>
            <div>
              <div className={`font-bold text-xl ${theme === 'light' ? 'text-foreground' : 'text-white'}`}>S. Banerjee</div>
              <div className="text-[#C13584] text-sm uppercase tracking-widest mt-1">IICA Member Artist</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className={`py-24 text-center transition-colors duration-300 ${theme === 'light' ? 'bg-muted border-t border-border' : 'bg-black'}`}>
        <div className="container mx-auto px-6">
          <h2 className={`font-serif text-4xl font-bold mb-8 ${theme === 'light' ? 'text-foreground' : 'text-white'}`}>Ready to Elevate Your Worth?</h2>
          <Link href="/membership">
            <Button className="gradient-bg text-white h-16 px-12 text-xl hover:opacity-90 rounded-full">
              Apply for Membership <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
