import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useCounter } from '@/hooks/use-counter';
import { useTheme } from '@/lib/themeContext';
import { ConsultationModal } from '@/components/sections/ConsultationModal';

function AnimatedPercent() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const count = useCounter(80, 2500, isInView);
  return <span ref={ref}>{count}%</span>;
}

const steps = [
  {
    number: "STEP 1",
    title: "Designing Your Portfolio of Digital Brand Assets",
    intro: "Developing your 5-year plan of creating digital assets based on your personalized tastes, talents, & creative aptitude",
    items: [
      { label: "Capture:", desc: "Capture leads using our Apps, website, surveys, forms, calendars & more" },
      { label: "Nurture:", desc: "Industry-standard branding practices in your brand assets nomenclature, Newsletters, FB Pages, Instagram & more" },
      { label: "Close:", desc: "Use our strategic tools within App to collect reviews, payments, schedule appointments and track analytics" },
    ],
  },
  {
    number: "STEP 2",
    title: "Building your branding & sales engine",
    intro: "Setting up all the tools you need in One App. (a flat suite-platform that enables brand visibility & sales, for performing artists & educators without having to rely on multiple third-parties)",
    items: [
      { label: "Create Brandpage, Portfolio Channels, Events Listings:", desc: "" },
      { label: "", desc: "Our intuitive App allows visibility of your brand name, with video channels, and you can create your performances & events listings" },
      { label: "Your Brand Archive:", desc: "" },
      { label: "", desc: "Built right in to the ability to celebrate your LEGACY. You can invite your students & external audience into the rich treasure trove" },
      { label: "Online Audience Interaction:", desc: "" },
      { label: "", desc: "The major step for many artistic brands is to capture new audience appointments. Our built-in calendar application solves the problem in a straightforward flow" },
    ],
  },
  {
    number: "STEP 3",
    title: "Nurture Audience into Brand Ambassadors",
    intro: "The backbone of iica.app is what you are able to accomplish after you design your portfolio and engage with your in-App audience",
    items: [
      { label: "Easily Launch Brand Loyalty Campaigns:", desc: "" },
      { label: "", desc: "Our multi-tier content channels allow you to reward engaging audience and capture engaged responses from them" },
      { label: "Offer Promotional Advantage to Audience Members:", desc: "" },
      { label: "", desc: "Reward winning audience members as brand ambassadors so as to expand your horizons, organically" },
      { label: "Run International Outreach Programmes:", desc: "" },
      { label: "", desc: "Our data intelligence and market insights gathered from foreign countries enable your decision-making process about succeeding as a brand, internationally" },
    ],
  },
];

export default function IncreaseEarnings() {
  const { theme } = useTheme();
  const light = theme === 'light';

  return (
    <div className={`min-h-screen pt-20 transition-colors duration-300 ${light ? 'bg-background text-foreground' : 'bg-black text-gray-100'}`}>

      {/* ── Hero Title ── */}
      <section className={`py-16 text-center transition-colors ${light ? 'bg-background' : 'bg-black'}`}>
        <div className="container mx-auto px-6 max-w-3xl">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-serif text-3xl md:text-4xl font-bold mb-6 text-[#C13584]"
          >
            Increase Your Artistic Brand Earnings by 80%
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className={`text-sm md:text-base leading-relaxed space-y-3 text-left ${light ? 'text-muted-foreground' : 'text-gray-300'}`}
          >
            <p>
              <strong className={light ? 'text-foreground' : 'text-white'}>Premium artistic brands</strong> are built by artists who take{' '}
              <em>strategic steps towards growing their brand value at national and international levels</em>, and those who do not limit their potential to winning local + national awards, performing at a few prestigious concerts, or receiving accolades from credible institutions of repute.
            </p>
            <p>
              However, even they are leaving money on table, due to manual processes of managing their portfolios & project delivery schedules. It is high time you leverage the{' '}
              <em>power of technology and intelligent process re-engineering</em> in order to increase your earnings by 80%, without any increase in stressful overload.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Your Artistic Brand Must Succeed ── */}
      <section className={`py-8 text-center border-y transition-colors ${light ? 'bg-muted border-border' : 'bg-[#0a0a0a] border-white/8'}`}>
        <div className="container mx-auto px-6 max-w-3xl">
          <h2 className="font-serif text-2xl font-bold mb-4 text-[#C13584]">Your Artistic Brand Must Succeed</h2>
          <p className={`text-sm md:text-base leading-relaxed ${light ? 'text-muted-foreground' : 'text-gray-300'}`}>
            Our technology-powered done-for-you services implement{' '}
            <em>proven strategies</em> to ensure a seamless and decentralized model of operating your professional portfolio, while you relax, stay focused into performing arts, without wasting hours of pain and research. In a{' '}
            <em>structured manner of designing your portfolio</em>, we offer award-winning solutions so that your brand succeeds.
          </p>
        </div>
      </section>

      {/* ── So, What Exactly Do We Do ── */}
      <section className={`py-12 text-center transition-colors ${light ? 'bg-background' : 'bg-black'}`}>
        <div className="container mx-auto px-6">
          <h2 className={`font-serif text-2xl md:text-3xl font-bold ${light ? 'text-foreground' : 'text-white'}`}>
            So, What Exactly Do We Do?
          </h2>
          <p className="font-serif text-2xl md:text-3xl font-bold text-[#C13584]">
            A Step-wise Clarity is Provided Below
          </p>
        </div>
      </section>

      {/* ── Steps ── */}
      <section className={`pb-16 transition-colors ${light ? 'bg-background' : 'bg-black'}`}>
        <div className="container mx-auto px-6 max-w-3xl space-y-8">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`rounded-2xl p-8 border transition-colors ${
                light
                  ? 'bg-card border-border shadow-sm'
                  : 'bg-[#0d0d0d] border-white/8'
              }`}
            >
              <p className="text-xs font-bold tracking-widest text-[#833AB4] uppercase mb-1">{step.number}</p>
              <h3 className={`font-serif text-xl font-bold mb-3 ${light ? 'text-foreground' : 'text-white'}`}>{step.title}</h3>
              {step.intro && (
                <p className={`text-sm mb-4 leading-relaxed ${light ? 'text-muted-foreground' : 'text-gray-400'}`}>{step.intro}</p>
              )}
              <ul className="space-y-2">
                {step.items.map((item, j) => (
                  <li key={j} className={`text-sm leading-relaxed flex gap-2 ${light ? 'text-muted-foreground' : 'text-gray-300'}`}>
                    {item.label && (
                      <span className={`font-semibold shrink-0 ${light ? 'text-foreground' : 'text-white'}`}>{item.label}</span>
                    )}
                    {item.desc && <span>{item.desc}</span>}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Book Free Consultation ── */}
      <section className={`py-12 border-t transition-colors ${light ? 'bg-muted border-border' : 'bg-[#0a0a0a] border-white/8'}`}>
        <div className="container mx-auto px-6 max-w-3xl text-center space-y-4">
          <p className={`text-sm leading-relaxed ${light ? 'text-muted-foreground' : 'text-gray-400'}`}>
            Also, once you sign up as a Premium Artist, we will send you a FREE copy of the book titled{' '}
            <em className={light ? 'text-foreground' : 'text-gray-200'}>"Creative Communication Excellence in Arts & Entertainment"</em>, a Powerful Six-Step Process To Live In Deep Creativity And Financial Abundance In 2023 & Beyond.
          </p>
          <ConsultationModal>
            <button className="relative inline-flex items-center gap-2 bg-gradient-to-r from-[#C13584] via-[#833AB4] to-[#405DE6] text-white font-bold text-base px-10 py-4 rounded-full
              shadow-[0_0_40px_rgba(193,53,132,0.3)] hover:shadow-[0_0_60px_rgba(193,53,132,0.5)]
              transition-all duration-300 hover:scale-105 active:scale-95
              before:absolute before:inset-0 before:rounded-full before:bg-gradient-to-r before:from-[#C13584] before:via-[#833AB4] before:to-[#405DE6] before:blur-xl before:opacity-40 before:-z-10">
              <span className="relative z-10">Book a FREE Consultation</span>
              <svg className="relative z-10 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          </ConsultationModal>
          {/* <p className={`text-xs ${light ? 'text-muted-foreground' : 'text-gray-600'}`}>No credit card required · Free 30-min session</p> */}
        </div>
      </section>

    </div>
  );
}
