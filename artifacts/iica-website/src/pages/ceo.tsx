import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Mail, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function CEO() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <div className="bg-black text-white min-h-screen pt-20">
      {/* Intro Banner */}
      <section className="border-b border-white/8 py-12 bg-[#0a0a0a]">
        <div className="container mx-auto px-6 max-w-4xl text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <p className="text-gray-300 leading-relaxed mb-4">
              Thank you for visiting this page. Here, <strong className="text-white">Reshma Patra, CEO of Taanima Digital Private Limited</strong>, shares the most important announcements that are valuable to the community that we serve. We sincerely invite you to share your ideas and thoughts that would help us grow, together. In that context, send your messages to the email ID:{' '}
              <a href="mailto:iica.app.2023@gmail.com" className="text-[#C13584] hover:underline">iica.app.2023@gmail.com</a>
            </p>
            <p className="text-gray-400 leading-relaxed mb-4">
              We strive to engage in meaningful conversations with community members on regular basis and will continue to conduct Zoom calls for the purpose. Information about such meetings will be shared here, appropriately.
            </p>
            <p className="text-gray-400 leading-relaxed mb-4">
              Subscribe to our NEWSLETTER below so that you receive the information in time, in your email inbox.
            </p>
            <p className="text-gray-400">
              We appreciate your support at all times. Please visit us again. Best Regards & Pranaams.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Message */}
      <section className="py-20">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 items-start">

            {/* Portrait Column */}
            <div className="lg:col-span-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="sticky top-28"
              >
                <div className="rounded-2xl overflow-hidden border border-white/10 bg-[#0d0d0d]">
                  <div className="aspect-[4/5] w-full bg-[#111] flex flex-col items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#833AB4]/20 via-transparent to-[#C13584]/10" />
                    <div className="relative z-10 text-center p-8">
                      <div className="w-24 h-24 rounded-full gradient-bg mx-auto mb-6 flex items-center justify-center text-white text-4xl font-serif font-bold">R</div>
                      <p className="text-gray-400 text-sm mb-2 italic">Namaste and Welcome to iica.app</p>
                      <h2 className="font-serif text-2xl font-bold text-white">Reshma Patra</h2>
                      <p className="text-[#C13584] text-sm mt-2 tracking-wider uppercase font-medium">CEO, Taanima Digital Pvt. Ltd.</p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex items-center text-gray-500 text-sm">
                  <Calendar className="w-4 h-4 mr-2 text-[#833AB4]" />
                  Published: 30.07.2023
                </div>
              </motion.div>
            </div>

            {/* Message Column */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-8"
            >
              <h1 className="font-serif text-4xl md:text-5xl font-bold mb-3">
                CEO's <span className="gradient-text">Desk</span>
              </h1>
              <div className="w-16 h-[2px] gradient-bg mb-10" />

              <h2 className="font-serif text-2xl font-bold mb-8 text-white">Namaskar Everyone</h2>

              <div className="space-y-6 text-gray-300 leading-relaxed text-[1.0625rem]">
                <p>
                  It is with sincere gratitude and hope that I write this note with, to welcome you to explore this web portal. The purpose of this web portal is multi-dimensional. <strong className="text-white">New Music Launchpad</strong> is the first idea we want to build upon, by sharing as much of information as we can collect. But also, I request you to let us know and share new music whenever you come to know of some. You can easily share it via the WhatsApp chat at the bottom right of landing page.
                </p>

                <p>
                  Secondly, we aim to update the <strong className="text-white">Jobs &amp; Opportunities</strong> section once in a month, so that job seekers get timely information and apply without delay.
                </p>

                <p>
                  We will reveal the <strong className="text-white">Featured, Courses &amp; Workshops, International</strong> sections in the coming months. <strong className="text-white">Forum</strong> is the section for everybody who enjoys interacting with like-minded people, share their questions, and help each other.
                </p>

                <p>
                  For now, we're ready with our offerings mentioned on the Home page as we are actively working with artists to build their brands and boost their brand values.
                </p>

                <div className="border-l-3 border-l-[3px] border-[#833AB4] pl-6 py-2 my-8">
                  <p className="text-gray-300">
                    From my personal experience of working with artists, I've seen that artists who have simple and small goals to pursue, usually are <em className="text-white">mentally prepared and energetically ready</em>, to achieve those goals while we assist them in structuring their thoughts, and design their portfolio of brand assets.
                  </p>
                </div>

                <p>
                  If you have some goals, nomatter how clear or unclear they are right now, I'd be glad to hear from you. Because, when we work together to pursue your goals, we advance Arts &amp; Culture, for humanity.
                </p>

                <p>
                  I conclude this note with a humble invitation to you to check our <strong className="text-white">The Showstoppers</strong> section, where we share Bands and Baithaks, the <em>two rich avenues</em> of gatherings where the highest quality of Indian artists engage in conversations with LIVE audience to bring about peace and healing in the hearts of them.
                </p>

                <p>Thank you once again for stopping by. I appreciate your time and patience.</p>

                <div className="pt-6 border-t border-white/8">
                  <p className="text-gray-400 mb-1">Love,</p>
                  <p className="font-serif text-2xl gradient-text">Reshma Patra</p>
                  <p className="text-gray-500 text-sm mt-1">Chief Executive Officer, Taanima Digital Private Limited</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 bg-[#0a0a0a] border-t border-white/8">
        <div className="container mx-auto px-6 max-w-2xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-serif text-3xl font-bold mb-3 gradient-text">IICA Newsletter</h2>
            <p className="text-gray-400 mb-8">Stay informed about our latest announcements, events, and artist spotlights.</p>

            {subscribed ? (
              <div className="rounded-xl border border-white/10 bg-[#0d0d0d] px-8 py-10">
                <div className="w-12 h-12 rounded-full gradient-bg flex items-center justify-center mx-auto mb-4">
                  <Send className="w-5 h-5 text-white" />
                </div>
                <p className="text-white font-medium text-lg">Thank you for subscribing!</p>
                <p className="text-gray-400 text-sm mt-2">We'll be in touch with meaningful updates.</p>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-4">
                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your Email Address"
                    required
                    className="flex-1 bg-[#0d0d0d] border border-white/10 rounded-md px-5 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:border-[#833AB4] transition-colors"
                  />
                  <Button type="submit" className="gradient-bg text-white px-8 py-3 h-auto">
                    Subscribe
                  </Button>
                </div>
                <p className="text-gray-600 text-xs">
                  **We'll never spam you with irrelevant silly emails. We will never sell or share your email address with ANYONE. That's a promise**
                </p>
              </form>
            )}

            <div className="mt-10 flex items-center justify-center text-gray-600 text-sm">
              <Mail className="w-4 h-4 mr-2" />
              Reach us directly: <a href="mailto:iica.app.2023@gmail.com" className="text-[#C13584] ml-1 hover:underline">iica.app.2023@gmail.com</a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
