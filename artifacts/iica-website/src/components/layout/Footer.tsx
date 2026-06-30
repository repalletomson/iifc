'use client';

import React from 'react';
import { Link } from 'wouter';
import { SiInstagram, SiYoutube, SiFacebook } from 'react-icons/si';
import { useTheme } from '@/lib/themeContext';

function StatCounter({ end, label, theme }: { end: string; label: string; theme: 'light' | 'dark' }) {
  return (
    <div>
      <p className={`text-sm mb-1 ${theme === 'light' ? 'text-muted-foreground' : 'text-gray-400'}`}>{label}</p>
      <p className={`font-black text-5xl md:text-6xl tracking-tight leading-none ${theme === 'light' ? 'text-foreground' : 'text-white'}`}>{end}</p>
    </div>
  );
}

export function Footer() {
  const { theme } = useTheme();
  
  return (
    <footer className={`border-t transition-colors duration-300 ${
      theme === 'light' 
        ? 'bg-background border-border' 
        : 'bg-black border-white/8'
    }`}>

      {/* Main footer body */}
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 items-start">

          {/* LEFT — tagline */}
          <div>
            <Link href="/">
              <span className="font-serif text-3xl font-black gradient-text cursor-pointer tracking-wider block leading-none">
                IICA
              </span>
              <span className={`block text-[10px] tracking-[0.25em] uppercase mt-1 mb-6 ${theme === 'light' ? 'text-muted-foreground' : 'text-gray-500'}`}>
                Advancing Arts & Culture for Humanity
              </span>
            </Link>
            <p className="gradient-text font-bold text-xl md:text-2xl leading-snug max-w-[22ch]">
              The professional home for the Indian culture, performing arts & entertainment community worldwide.
            </p>
          </div>

          {/* CENTRE — contact + social */}
          <div className="space-y-6">
            <div>
              <p className={`text-xs uppercase tracking-widest mb-1 ${theme === 'light' ? 'text-muted-foreground' : 'text-gray-500'}`}>E-mail:</p>
              <a href="mailto:iica.app.2023@gmail.com" className={`text-sm transition-colors ${theme === 'light' ? 'text-foreground hover:text-[#C13584]' : 'text-white hover:text-[#C13584]'}`}>
                iica.app.2023@gmail.com
              </a>
            </div>
            <div>
              <p className={`text-xs uppercase tracking-widest mb-1 ${theme === 'light' ? 'text-muted-foreground' : 'text-gray-500'}`}>Address:</p>
              <p className={`text-sm leading-relaxed ${theme === 'light' ? 'text-foreground' : 'text-white'}`}>
                07/3, 2nd Floor, 18th Main Road, Jayanagara,<br />
                Near CNR Kalvanamantapam, Bangalore-560041,<br />
                Karnataka, India
              </p>
            </div>
            <div className="flex items-center gap-4 pt-2">
              <a
                href="https://www.facebook.com/iica.app.official"
                target="_blank"
                rel="noopener noreferrer"
                className={`w-9 h-9 rounded-full border flex items-center justify-center transition-all ${
                  theme === 'light'
                    ? 'border-border text-muted-foreground hover:text-foreground hover:border-foreground/40'
                    : 'border-white/15 text-gray-400 hover:text-white hover:border-white/40'
                }`}
              >
                <SiFacebook className="w-4 h-4" />
              </a>
              <a
                href="https://www.instagram.com/iica.app_official/"
                target="_blank"
                rel="noopener noreferrer"
                className={`w-9 h-9 rounded-full border flex items-center justify-center transition-all ${
                  theme === 'light'
                    ? 'border-border text-muted-foreground hover:text-[#C13584] hover:border-[#C13584]/40'
                    : 'border-white/15 text-gray-400 hover:text-[#C13584] hover:border-[#C13584]/40'
                }`}
              >
                <SiInstagram className="w-4 h-4" />
              </a>
              <a
                href="https://www.youtube.com/@iicaApp"
                target="_blank"
                rel="noopener noreferrer"
                className={`w-9 h-9 rounded-full border flex items-center justify-center transition-all ${
                  theme === 'light'
                    ? 'border-border text-muted-foreground hover:text-red-500 hover:border-red-500/40'
                    : 'border-white/15 text-gray-400 hover:text-red-500 hover:border-red-500/40'
                }`}
              >
                <SiYoutube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* RIGHT — stats */}
          <div className="space-y-7">
            <StatCounter end="5000+" label="Portfolio Design Projects:" theme={theme} />
            <StatCounter end="1500+" label="Educators' Consulting Projects:" theme={theme} />
            <StatCounter end="10+" label="Years of Experience:" theme={theme} />
          </div>

        </div>
      </div>

      {/* Bottom bar */}
      <div className={`border-t transition-colors ${theme === 'light' ? 'border-border' : 'border-white/8'}`}>
        <div className={`container mx-auto px-6 py-5 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs ${theme === 'light' ? 'text-muted-foreground' : 'text-gray-600'}`}>
          <p>© 2023 International Indian Culture & Arts (IICA) | Designed By <span className={theme === 'light' ? 'text-muted-foreground' : 'text-gray-500'}>THE GRAPH O CODE</span></p>
          <div className="flex gap-6">
            <Link href="/terms"><span className={`transition-colors cursor-pointer ${theme === 'light' ? 'hover:text-foreground' : 'hover:text-white'}`}>Terms and Conditions</span></Link>
            <Link href="/privacy"><span className={`transition-colors cursor-pointer ${theme === 'light' ? 'hover:text-foreground' : 'hover:text-white'}`}>Privacy Policy</span></Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
