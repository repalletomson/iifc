import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
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
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'backdrop-blur-md bg-black/70 border-b border-white/10'
            : 'bg-transparent'
        }`}
      >
        {isScrolled && (
          <div className="absolute bottom-0 left-0 right-0 h-[1px] gradient-bg" />
        )}
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/">
            <span className="font-serif text-3xl font-bold gradient-text cursor-pointer tracking-wider">
              IICA
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link key={link.path} href={link.path}>
                <span
                  className={`text-sm tracking-wide hover:text-white transition-colors cursor-pointer ${
                    location === link.path ? 'text-white font-medium' : 'text-gray-400'
                  }`}
                >
                  {link.label}
                </span>
              </Link>
            ))}
          </div>

          <div className="hidden md:block">
            <Link href="/membership">
              <Button className="gradient-bg text-white border-0 hover:opacity-90 transition-opacity">
                Become a Member
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-white"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </nav>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 20 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex flex-col pt-24 px-8"
          >
            <button
              className="absolute top-6 right-6 text-white"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <X className="h-8 w-8" />
            </button>
            <div className="flex flex-col space-y-6">
              {navLinks.map((link) => (
                <Link key={link.path} href={link.path}>
                  <span
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`font-serif text-3xl cursor-pointer ${
                      location === link.path ? 'gradient-text' : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    {link.label}
                  </span>
                </Link>
              ))}
              <div className="pt-8">
                <Link href="/membership">
                  <Button 
                    className="w-full gradient-bg text-white h-14 text-lg"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Become a Member
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
