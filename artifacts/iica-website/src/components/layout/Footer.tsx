import React from 'react';
import { Link } from 'wouter';
import { SiInstagram, SiYoutube, SiFacebook } from 'react-icons/si';

function StatCounter({ end, label }: { end: string; label: string }) {
  return (
    <div>
      <p className="text-gray-400 text-sm mb-1">{label}</p>
      <p className="text-white font-black text-5xl md:text-6xl tracking-tight leading-none">{end}</p>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="bg-black border-t border-white/10">

      {/* Main footer body */}
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 items-start">

          {/* LEFT — tagline */}
          <div>
            <Link href="/">
              <span className="font-serif text-3xl font-black gradient-text cursor-pointer tracking-wider block mb-6">
                IICA
              </span>
            </Link>
            <p className="gradient-text font-bold text-xl md:text-2xl leading-snug max-w-[22ch]">
              The professional home for the Indian culture, performing arts & entertainment community worldwide.
            </p>
          </div>

          {/* CENTRE — contact + social */}
          <div className="space-y-6">
            <div>
              <p className="text-gray-500 text-xs uppercase tracking-widest mb-1">E-mail:</p>
              <a href="mailto:iica.app.2023@gmail.com" className="text-white text-sm hover:text-[#C13584] transition-colors">
                iica.app.2023@gmail.com
              </a>
            </div>
            <div>
              <p className="text-gray-500 text-xs uppercase tracking-widest mb-1">Address:</p>
              <p className="text-white text-sm leading-relaxed">
                07/3, 2nd Floor, 18th Main Road, Jayanagara,<br />
                Near CNR Kalvanamantapam, Bangalore-560041,<br />
                Karnataka, India
              </p>
            </div>
            <div className="flex items-center gap-4 pt-2">
              <a
                href="https://www.facebook.com/iica.app"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full border border-white/15 flex items-center justify-center text-gray-400 hover:text-white hover:border-white/40 transition-all"
              >
                <SiFacebook className="w-4 h-4" />
              </a>
              <a
                href="https://www.instagram.com/iica.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full border border-white/15 flex items-center justify-center text-gray-400 hover:text-[#C13584] hover:border-[#C13584]/40 transition-all"
              >
                <SiInstagram className="w-4 h-4" />
              </a>
              <a
                href="https://www.youtube.com/@iica.app"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full border border-white/15 flex items-center justify-center text-gray-400 hover:text-red-500 hover:border-red-500/40 transition-all"
              >
                <SiYoutube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* RIGHT — stats */}
          <div className="space-y-7">
            <StatCounter end="5000+" label="Portfolio Design Projects:" />
            <StatCounter end="1500+" label="Educators' Consulting Projects:" />
            <StatCounter end="10+" label="Years of Experience:" />
          </div>

        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/8">
        <div className="container mx-auto px-6 py-5 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-gray-600">
          <p>© 2023 International Indian Culture & Arts (IICA) | Designed By <span className="text-gray-500">THE GRAPH O CODE</span></p>
          <div className="flex gap-6">
            <Link href="/terms"><span className="hover:text-white transition-colors cursor-pointer">Terms and Conditions</span></Link>
            <Link href="/privacy"><span className="hover:text-white transition-colors cursor-pointer">Privacy Policy</span></Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
