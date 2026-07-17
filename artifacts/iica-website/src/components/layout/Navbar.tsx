'use client';

import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Volume2, VolumeX } from 'lucide-react';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { useTheme } from '@/lib/themeContext';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isVideoMuted, setIsVideoMuted] = useState(true);
  const [location] = useLocation();
  const { theme } = useTheme();

  const toggleVideoMute = () => {
    const video = document.querySelector('video');
    if (video) {
      video.muted = !video.muted;
      setIsVideoMuted(!isVideoMuted);
    }
  };

  useEffect(() => {
    let lastScrollY = 0;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 50);

      // Hide on scroll down, show on scroll up
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'About Us', path: '/about' },
    { label: 'Artists', path: '/artists' },
    { label: 'Jobs & Gigs', path: '/jobs' },
    { label: 'Events', path: '/events' },
    { label: "CEO's Desk", path: '/ceo' },
  ];

  return (
    <>
      <motion.nav
        animate={{ y: isVisible ? 0 : -100 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? theme === 'light'
              ? 'backdrop-blur-md bg-background/90 border-b border-border shadow-sm'
              : 'backdrop-blur-md bg-background/70 border-b border-white/10'
            : 'bg-transparent'
        }`}
      >
        {isScrolled && theme === 'dark' && (
          <div className="absolute bottom-0 left-0 right-0 h-[1px] gradient-bg" />
        )}
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/">
            <div className="flex items-center gap-2.5 cursor-pointer">
              <img
                src="/images/iica_LOGO.png"
                alt="IICA Logo"
                className="h-10 w-auto object-contain"
              />
              <div className="flex flex-col leading-none">
                <span className="font-serif text-3xl font-bold gradient-text tracking-wider leading-none">
                  I.I.C.A.
                </span>
                <span className="hidden md:block text-[9px] text-gray-500 tracking-[0.25em] uppercase mt-0.5">
                  International Indian Culture &amp; Arts
                </span>
              </div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link key={link.path} href={link.path}>
                <span
                  className={`text-sm tracking-wide transition-colors cursor-pointer ${
                    location === link.path 
                      ? theme === 'light'
                        ? 'text-foreground font-medium'
                        : 'text-white font-medium'
                      : theme === 'light'
                        ? 'text-muted-foreground hover:text-foreground'
                        : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {link.label}
                </span>
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <ThemeToggle />
          </div>

          {/* Video Mute Toggle — visible on all screens */}
          {location === '/' && (
            <button
              onClick={toggleVideoMute}
              className={`w-9 h-9 rounded-full flex items-center justify-center backdrop-blur-md transition-all duration-300 ${
                theme === 'light'
                  ? 'bg-muted/50 text-foreground hover:bg-muted border border-border/50'
                  : 'bg-white/10 text-white hover:bg-white/20 border border-white/15'
              }`}
              aria-label={isVideoMuted ? 'Unmute video' : 'Mute video'}
            >
              {isVideoMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>
          )}

          {/* Mobile Menu Toggle */}
          <button
            className={theme === 'light' ? 'md:hidden text-foreground' : 'md:hidden text-white'}
            onClick={() => setIsMobileMenuOpen(true)}
            aria-label="Open navigation menu"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className={`fixed inset-0 z-50 flex flex-col pt-24 px-8 ${
              theme === 'light'
                ? 'bg-background/95 backdrop-blur-xl'
                : 'bg-background/95 backdrop-blur-xl'
            }`}
          >
            <button
              className={theme === 'light' ? 'absolute top-6 right-6 text-foreground' : 'absolute top-6 right-6 text-white'}
              onClick={() => setIsMobileMenuOpen(false)}
              aria-label="Close navigation menu"
            >
              <X className="h-8 w-8" />
            </button>
            <div className="flex flex-col space-y-6">
              {navLinks.map((link) => (
                <Link key={link.path} href={link.path}>
                  <span
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`font-serif text-3xl cursor-pointer ${
                      location === link.path 
                        ? 'gradient-text' 
                        : theme === 'light'
                          ? 'text-muted-foreground hover:text-foreground'
                          : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    {link.label}
                  </span>
                </Link>
              ))}
              <div className="pt-8 space-y-4">
                <ThemeToggle />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
