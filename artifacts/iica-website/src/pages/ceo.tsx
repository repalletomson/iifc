import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Mail, Send, Quote } from 'lucide-react';

export default function CEO() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) { setSubscribed(true); setEmail(''); }
  };

  return (
    <div className="bg-black text-white min-h-screen pt-16">

      {/* ── Cinematic header ── */}
      <section className="relative overflow-hidden border-b border-white/8">
        <div className="absolute inset-0 bg-gradient-to-br from-[#833AB4]/15 via-transparent to-[#E1306C]/8 pointer-events-none" />
        <div className="container mx-auto px-6 py-16 max-w-5xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 items-start">

            {/* Portrait */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              className="lg:col-span-4"
            >
              <div className="sticky top-24">
                {/* Avatar */}
                <div className="relative mb-6">
                  <div className="w-full aspect-square rounded-2xl overflow-hidden bg-[#111] border border-white/8 flex items-center justify-center relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#833AB4]/30 via-transparent to-[#E1306C]/20" />
                    <div className="relative z-10 text-center">
                      <div className="w-28 h-28 rounded-full gradient-bg mx-auto mb-5 flex items-center justify-center text-white text-5xl font-serif font-bold shadow-xl shadow-[#833AB4]/30">R</div>
                      <h2 className="font-serif text-2xl font-bold text-white mb-1">Reshma Patra</h2>
                      <p className="text-[#C13584] text-xs tracking-wider uppercase font-medium">CEO, Taanima Digital Pvt. Ltd.</p>
                      <p className="text-gray-500 text-xs mt-2">Founder · IICA</p>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center text-gray-500 text-xs">
                    <Calendar className="w-3.5 h-3.5 mr-2 text-[#833AB4]" />
                    Published: 30.07.2023
                  </div>
                </div>

                {/* Key stats */}
                <div className="space-y-3">
                  {[
                    { label: "Artists Served", value: "500+" },
                    { label: "Years of Experience", value: "10+" },
                    { label: "Consulting Projects", value: "1500+" },
                  ].map((s, i) => (
                    <div key={i} className="flex justify-between items-center border-b border-white/5 pb-3">
                      <span className="text-gray-500 text-xs">{s.label}</span>
                      <span className="text-white font-bold text-sm">{s.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Letter */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.7 }}
              className="lg:col-span-8"
            >
              <p className="text-[#C13584] text-xs tracking-[0.3em] uppercase font-medium mb-3">A Message From Our CEO</p>
              <h1 className="font-serif text-4xl md:text-5xl font-bold mb-2 text-white">
                CEO's <span className="gradient-text">Desk</span>
              </h1>
              <div className="w-12 h-[2px] gradient-bg mb-10" />

              <h2 className="font-serif text-2xl font-bold mb-8 text-white">Namaskar Everyone</h2>

              <div className="space-y-5 text-gray-300 leading-relaxed text-[1rem]">
                <p>
                  It is with sincere gratitude and hope that I write this note, to welcome you to explore this web portal. The purpose of this web portal is multi-dimensional. <strong className="text-white">New Music Launchpad</strong> is the first idea we want to build upon, by sharing as much information as we can collect. But also, I request you to let us know and share new music whenever you come to know of some. You can easily share it via the WhatsApp chat at the bottom right of the landing page.
                </p>

                <p>
                  Secondly, we aim to update the <strong className="text-white">Jobs & Opportunities</strong> section once a month, so that job seekers get timely information and apply without delay.
                </p>

                <p>
                  We will reveal the <strong className="text-white">Featured, Courses & Workshops, International</strong> sections in the coming months. <strong className="text-white">Forum</strong> is the section for everybody who enjoys interacting with like-minded people, sharing their questions, and helping each other.
                </p>

                <p>
                  For now, we're ready with our offerings mentioned on the Home page as we are actively working with artists to build their brands and boost their brand values.
                </p>

                {/* Pull quote */}
                <div className="my-8 border-l-2 border-[#833AB4] pl-6 py-2">
                  <Quote className="w-5 h-5 text-[#833AB4] mb-2" />
                  <p className="text-gray-200 italic leading-relaxed">
                    From my personal experience of working with artists, I've seen that artists who have simple and small goals to pursue, usually are <em className="text-white not-italic font-medium">mentally prepared and energetically ready</em> to achieve those goals — while we assist them in structuring their thoughts and designing their portfolio of brand assets.
                  </p>
                </div>

                <p>
                  If you have some goals, no matter how clear or unclear they are right now, I'd be glad to hear from you. Because when we work together to pursue your goals, we advance Arts & Culture for humanity.
                </p>

                <p>
                  I conclude this note with a humble invitation to you to check our <strong className="text-white">The Showstoppers</strong> section, where we share Bands and Baithaks — the two rich avenues of gatherings where the highest quality of Indian artists engage in conversations with a LIVE audience to bring about peace and healing in the hearts of listeners.
                </p>

                <p>Thank you once again for stopping by. I appreciate your time and patience.</p>

                {/* Signature */}
                <div className="pt-8 border-t border-white/8">
                  <p className="text-gray-400 mb-1 text-sm">With love & regards,</p>
                  <p className="font-serif text-3xl gradient-text mb-1">Reshma Patra</p>
                  <p className="text-gray-500 text-sm">Chief Executive Officer, Taanima Digital Private Limited</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Thank you banner ── */}
      <section className="py-10 bg-[#0a0a0a] border-b border-white/8">
        <div className="container mx-auto px-6 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center space-y-3"
          >
            <p className="text-gray-300 leading-relaxed">
              Thank you for visiting this page. Here, <strong className="text-white">Reshma Patra, CEO of Taanima Digital Private Limited</strong>, shares the most important announcements that are valuable to the community that we serve. We sincerely invite you to share your ideas and thoughts that would help us grow, together. Send your messages to:{' '}
              <a href="mailto:iica.app.2023@gmail.com" className="text-[#C13584] hover:underline">iica.app.2023@gmail.com</a>
            </p>
            <p className="text-gray-400 text-sm leading-relaxed">
              We strive to engage in meaningful conversations with community members on a regular basis and will continue to conduct Zoom calls for this purpose. Subscribe to our newsletter below to receive information in time, directly in your email inbox.
            </p>
            <p className="text-gray-400 text-sm">We appreciate your support at all times. Please visit us again. <strong className="text-white">Best Regards & Pranaams.</strong></p>
          </motion.div>
        </div>
      </section>

      {/* ── Newsletter ── */}
      <section className="py-16 bg-black">
        <div className="container mx-auto px-6 max-w-xl text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <p className="text-[#C13584] text-xs tracking-[0.3em] uppercase font-medium mb-3">Stay Connected</p>
            <h2 className="font-serif text-3xl font-bold mb-2 text-white">IICA Newsletter</h2>
            <p className="text-gray-400 text-sm mb-8">Stay informed about our latest announcements, events, and artist spotlights.</p>

            {subscribed ? (
              <div className="rounded-xl border border-white/10 bg-[#0d0d0d] px-8 py-10">
                <div className="w-12 h-12 rounded-full gradient-bg flex items-center justify-center mx-auto mb-4">
                  <Send className="w-5 h-5 text-white" />
                </div>
                <p className="text-white font-medium text-lg">Thank you for subscribing!</p>
                <p className="text-gray-400 text-sm mt-2">We'll be in touch with meaningful updates.</p>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-3">
                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="email" value={email} onChange={e => setEmail(e.target.value)}
                    placeholder="Your Email Address" required
                    className="flex-1 bg-[#0d0d0d] border border-white/10 rounded-full px-5 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:border-[#833AB4] transition-colors text-sm"
                  />
                  <button type="submit" className="gradient-bg text-white px-7 py-3 rounded-full text-sm font-semibold hover:opacity-90 transition-opacity">
                    Subscribe
                  </button>
                </div>
                <p className="text-gray-600 text-xs">We'll never spam you or sell your email. That's a promise.</p>
              </form>
            )}

            <div className="mt-8 flex items-center justify-center text-gray-600 text-sm gap-2">
              <Mail className="w-4 h-4" />
              <a href="mailto:iica.app.2023@gmail.com" className="text-[#C13584] hover:underline">iica.app.2023@gmail.com</a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
