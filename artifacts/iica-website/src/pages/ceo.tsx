import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Send } from 'lucide-react';
import { useTheme } from '@/lib/themeContext';
import { BlogViewer } from '@/components/sections/CeoDesk/BlogViewer';

export default function CEO() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const { theme } = useTheme();

  const handleSubscribe = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (email.trim()) {
      // Redirect to WhatsApp with newsletter subscription request
      const msg = `*IICA Newsletter Subscription*%0A%0A*Email:* ${encodeURIComponent(email)}%0A%0AI would like to subscribe to the IICA newsletter.`;
      window.open(`https://wa.me/918584853301?text=${msg}`, '_blank', 'noopener,noreferrer');
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <div className="bg-background text-foreground min-h-screen pt-16 transition-colors duration-300">

    

      {/* ══════════════════════════════════════════════
          CEO Blog Viewer — fetches posts from Google Sheets CSV
          ══════════════════════════════════════════════ */}
      <BlogViewer />

      {/* ── Thank you banner ── */}


      {/* ── Featured Reels ── */}
      {/* <section className={`py-16 transition-colors duration-300 ${
        theme === 'light' ? 'bg-background border-t border-border' : 'bg-[#0a0a0a] border-t border-white/8'
      }`}>
        <div className="container mx-auto px-6 max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
            <p className="text-[#C13584] text-xs tracking-[0.3em] uppercase font-medium mb-3">Watch & Get Inspired</p>
            <h2 className={`font-serif text-3xl font-bold mb-2 ${
              theme === 'light' ? 'text-foreground' : 'text-white'
            }`}>Featured Reels</h2>
            <p className={`text-sm ${
              theme === 'light' ? 'text-muted-foreground' : 'text-gray-400'
            }`}>Glimpses of our community's musical excellence</p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { name: "Debasmita Bhattacharya", code: "DWTkrJNEojX" },
              { name: "Sandipan Ganguly", code: "CQIjOHeAo3h" },
              { name: "Shatavisha Mukherjee", code: "DRl6iF2ibNS" },
            ].map((item, i) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
              >
                <ReelModal reelCode={item.code} name={item.name}>
                  <div className={`rounded-xl overflow-hidden cursor-pointer group ${
                    theme === 'light'
                      ? 'bg-white border border-border shadow-sm hover:shadow-md'
                      : 'bg-[#111] border border-white/5 hover:border-white/15'
                  } transition-all duration-300`}>
                    <div className="relative">
                      <iframe
                        src={`https://www.instagram.com/reel/${extractInstagramCode(item.code)}/embed/`}
                        className="w-full aspect-[9/16] pointer-events-none"
                        frameBorder="0"
                        scrolling="no"
                        allowTransparency={true}
                        loading="lazy"
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/10 transition-all duration-300">
                        <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-xl transform group-hover:scale-110">
                          <div className="w-0 h-0 border-t-[7px] border-t-transparent border-b-[7px] border-b-transparent border-l-[12px] border-l-black ml-0.5" />
                        </div>
                      </div>
                    </div>
                    <div className="p-3">
                      <p className={`text-xs font-medium text-center truncate ${
                        theme === 'light' ? 'text-foreground' : 'text-white'
                      }`}>{item.name}</p>
                      <p className={`text-[10px] text-center ${
                        theme === 'light' ? 'text-muted-foreground' : 'text-gray-500'
                      }`}>IICA Featured</p>
                    </div>
                  </div>
                </ReelModal>
              </motion.div>
            ))}
          </div>
        </div>
      </section> */}
            <section className={`py-10 transition-colors duration-300 ${
        theme === 'light' 
          ? 'bg-[#F8F7F5] border-b border-border' 
          : 'bg-[#0a0a0a] border-b border-white/8'
      }`}>
        <div className="container mx-auto px-6 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center space-y-3"
          >
            <p className={`leading-relaxed ${
              theme === 'light' ? 'text-muted-foreground' : 'text-gray-300'
            }`}>
              Thank you for visiting this page. Here, <strong className={theme === 'light' ? 'text-foreground' : 'text-white'}>Reshma Patra, CEO of Taanima Digital Private Limited</strong>, shares the most important announcements that are valuable to the community that we serve. We sincerely invite you to share your ideas and thoughts that would help us grow, together. Send your messages to:{' '}
              <a href="mailto:iica.app.2023@gmail.com" className="text-[#C13584] hover:underline">iica.app.2023@gmail.com</a>
            </p>
            <p className={`text-sm leading-relaxed ${
              theme === 'light' ? 'text-muted-foreground' : 'text-gray-400'
            }`}>
              We strive to engage in meaningful conversations with community members on a regular basis and will continue to conduct Zoom calls for this purpose. Subscribe to our newsletter below to receive information in time, directly in your email inbox.
            </p>
            <p className={`text-sm ${
              theme === 'light' ? 'text-muted-foreground' : 'text-gray-400'
            }`}>We appreciate your support at all times. Please visit us again. <strong className={theme === 'light' ? 'text-foreground' : 'text-white'}>Best Regards & Pranaams.</strong></p>
          </motion.div>
        </div>
      </section>

      {/* ── Newsletter ── */}
      <section className={`py-16 transition-colors duration-300 ${
        theme === 'light' ? 'bg-white border-t border-border' : 'bg-black'
      }`}>
        <div className="container mx-auto px-6 max-w-xl text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <p className="text-[#C13584] text-xs tracking-[0.3em] uppercase font-medium mb-3">Stay Connected</p>
            <h2 className={`font-serif text-3xl font-bold mb-2 ${
              theme === 'light' ? 'text-foreground' : 'text-white'
            }`}>IICA Newsletter</h2>
            <p className={`text-sm mb-8 ${
              theme === 'light' ? 'text-muted-foreground' : 'text-gray-400'
            }`}>Stay informed about our latest announcements, events, and artist spotlights.</p>

            {subscribed ? (
              <div className={`rounded-xl px-8 py-10 ${
                theme === 'light'
                  ? 'border border-border bg-card'
                  : 'border border-white/10 bg-[#0d0d0d]'
              }`}>
                <div className="w-12 h-12 rounded-full gradient-bg flex items-center justify-center mx-auto mb-4">
                  <Send className="w-5 h-5 text-white" />
                </div>
                <p className={`font-medium text-lg ${
                  theme === 'light' ? 'text-foreground' : 'text-white'
                }`}>Thank you for subscribing!</p>
                <p className={`text-sm mt-2 ${
                  theme === 'light' ? 'text-muted-foreground' : 'text-gray-400'
                }`}>We'll be in touch with meaningful updates.</p>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-3">
                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="email" value={email} onChange={e => setEmail(e.target.value)}
                    placeholder="Your Email Address" required
                    className={`flex-1 rounded-full px-5 py-3 text-sm transition-all ${
                      theme === 'light'
                        ? 'bg-card border border-border text-foreground placeholder:text-muted-foreground focus:border-accent focus:ring-1 focus:ring-accent'
                        : 'bg-[#0d0d0d] border border-white/10 text-white placeholder:text-gray-600 focus:border-[#833AB4]'
                    }`}
                  />
                  <button type="submit" className="gradient-bg text-white px-7 py-3 rounded-full text-sm font-semibold hover:opacity-90 transition-opacity">
                    Subscribe
                  </button>
                </div>
                <p className={`text-xs ${
                  theme === 'light' ? 'text-muted-foreground' : 'text-gray-600'
                }`}>We'll never spam you or sell your email. That's a promise.</p>
              </form>
            )}

            <div className={`mt-8 flex items-center justify-center text-sm gap-2 ${
              theme === 'light' ? 'text-muted-foreground' : 'text-gray-600'
            }`}>
              <Mail className="w-4 h-4" />
              <a href="mailto:iica.app.2023@gmail.com" className="text-[#C13584] hover:underline">iica.app.2023@gmail.com</a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
