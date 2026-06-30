import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'wouter';
import { RefreshCw, Search, ShieldCheck, Zap, Globe, ArrowRight, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/lib/themeContext';

export default function RelaunchBrand() {
  const { theme } = useTheme();
  const challenges = [
    { title: "Invisible Online Presence", desc: "Your name doesn't appear when organizers search for artists." },
    { title: "Fragmented Identity", desc: "Scattered YouTube links and unstructured social media." },
    { title: "Outdated Promotional Material", desc: "Low-quality recordings representing high-quality art." },
    { title: "Local Limitation", desc: "Struggling to break out of the local performance circuit." }
  ];

  const solutions = [
    {
      icon: <Search className="w-8 h-8 text-[#833AB4]" />,
      title: "SEO-Optimized Profile",
      desc: "Rank on page 1 of Google when global organizers search for artists in your category."
    },
    {
      icon: <ShieldCheck className="w-8 h-8 text-[#C13584]" />,
      title: "Verified Artist Status",
      desc: "Gain the IICA verified badge, establishing immediate trust with international curators."
    },
    {
      icon: <Zap className="w-8 h-8 text-[#E1306C]" />,
      title: "HD Media Kit",
      desc: "Professional press kits, EPKs, and high-fidelity video representations of your work."
    },
    {
      icon: <Globe className="w-8 h-8 text-[#d4a853]" />,
      title: "Global Distribution",
      desc: "Your profile presented directly to our network of international festival curators."
    }
  ];

  return (
    <div className="bg-background text-foreground min-h-screen pt-20 transition-colors duration-300">
      {/* Hero */}
      <section className={`relative py-24 md:py-32 overflow-hidden border-b ${theme === 'light' ? 'border-border' : 'border-white/10'}`}>
        <div className="container relative z-10 mx-auto px-6 max-w-5xl">
          <div className="flex justify-center mb-8">
            <motion.div
              initial={{ rotate: -180, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              transition={{ duration: 1 }}
            >
              <RefreshCw className="w-20 h-20 text-[#C13584]" />
            </motion.div>
          </div>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-serif text-5xl md:text-7xl font-bold mb-6 text-center leading-tight"
          >
            Prepare to Succeed as a <br/>
            <span className="gradient-text">Performing Arts Professional</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className={`text-xl text-center max-w-3xl mx-auto mb-10 ${theme === 'light' ? 'text-muted-foreground' : 'text-gray-300'}`}
          >
            It's time to shed the outdated amateur image. Relaunch your brand with the polished, premium aesthetic that commands respect worldwide.
          </motion.p>
        </div>
      </section>

      {/* Challenges vs Solutions */}
      <section className={`py-24 ${theme === 'light' ? 'bg-muted' : 'bg-[#0a0a0a]'}`}>
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            
            {/* The Old Way */}
            <div>
              <h2 className={`font-serif text-3xl font-bold mb-8 ${theme === 'light' ? 'text-muted-foreground' : 'text-gray-400'}`}>The Amateur Approach</h2>
              <div className="space-y-4">
                {challenges.map((item, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className={`p-6 rounded-xl border flex items-start transition-colors ${
                      theme === 'light'
                        ? 'border-red-200 bg-red-50'
                        : 'border-red-900/30 bg-red-900/5'
                    }`}
                  >
                    <XCircle className="w-6 h-6 text-red-500 mr-4 shrink-0 mt-1" />
                    <div>
                      <h4 className={`font-bold mb-1 ${theme === 'light' ? 'text-foreground' : 'text-gray-300'}`}>{item.title}</h4>
                      <p className={`text-sm ${theme === 'light' ? 'text-muted-foreground' : 'text-gray-500'}`}>{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* The IICA Way */}
            <div>
              <h2 className="font-serif text-3xl font-bold mb-8 gradient-text">The IICA Advantage</h2>
              <div className="space-y-4">
                {solutions.map((item, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className={`p-6 rounded-xl border flex items-start transition-colors ${
                      theme === 'light'
                        ? 'bg-card border-border shadow-sm'
                        : 'bg-[#0d0d0d] border-white/8'
                    }`}
                  >
                    <div className="mr-4 shrink-0 mt-1">{item.icon}</div>
                    <div>
                      <h4 className={`font-bold mb-1 ${theme === 'light' ? 'text-foreground' : 'text-white'}`}>{item.title}</h4>
                      <p className={`text-sm ${theme === 'light' ? 'text-muted-foreground' : 'text-gray-400'}`}>{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Process Timeline */}
      <section className={`py-24 transition-colors duration-300 ${theme === 'light' ? 'bg-background' : 'bg-black'}`}>
        <div className="container mx-auto px-6 max-w-4xl">
          <h2 className={`font-serif text-4xl font-bold mb-16 text-center ${theme === 'light' ? 'text-foreground' : 'text-white'}`}>The Relaunch Process</h2>
          
          <div className="space-y-12">
            {[
              { phase: "Phase 1: Audit", desc: "Comprehensive review of your digital footprint, assets, and current brand perception." },
              { phase: "Phase 2: Strategy", desc: "Developing a custom narrative, identifying your unique selling proposition in the cultural market." },
              { phase: "Phase 3: Production", desc: "Creating the IICA profile, generating SEO content, and organizing your media." },
              { phase: "Phase 4: Launch", desc: "Publishing your new identity and submitting to our global network of curators." }
            ].map((step, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="flex items-start"
              >
                <div className={`w-16 h-16 rounded-full flex items-center justify-center font-serif text-2xl font-bold gradient-text shrink-0 mr-6 border ${
                  theme === 'light' ? 'bg-card border-border' : 'bg-[#0d0d0d] border-white/8'
                }`}>
                  0{i+1}
                </div>
                <div className="pt-2">
                  <h3 className={`text-2xl font-bold mb-2 ${theme === 'light' ? 'text-foreground' : 'text-white'}`}>{step.phase}</h3>
                  <p className={`text-lg ${theme === 'light' ? 'text-muted-foreground' : 'text-gray-400'}`}>{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className={`py-24 text-center border-t transition-colors duration-300 ${theme === 'light' ? 'bg-muted border-border' : 'bg-[#0a0a0a] border-white/10'}`}>
        <div className="container mx-auto px-6">
          <h2 className={`font-serif text-4xl font-bold mb-6 ${theme === 'light' ? 'text-foreground' : 'text-white'}`}>Your Audience is Waiting.</h2>
          <p className={`text-xl mb-10 max-w-2xl mx-auto ${theme === 'light' ? 'text-muted-foreground' : 'text-gray-400'}`}>Don't let poor branding hold back phenomenal talent. Relaunch with IICA today.</p>
          <Link href="/membership">
            <Button className="gradient-bg text-white h-16 px-12 text-xl hover:opacity-90 rounded-full">
              Start Relaunch <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
