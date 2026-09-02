import React, { useState, useEffect } from 'react';
import { SiWhatsapp } from 'react-icons/si';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '@/lib/themeContext';

const WHATSAPP_NUMBER = '919901709963'; // +91 85848 53301 → digits only
const DEFAULT_MESSAGE = "Hi! I'd like to connect with IICA.";

export function WhatsAppFloating() {
  const { theme } = useTheme();
  const [showBubble, setShowBubble] = useState(true);

  // Auto-hide the bubble after 8 seconds
  useEffect(() => {
    const timer = setTimeout(() => setShowBubble(false), 8000);
    return () => clearTimeout(timer);
  }, []);

  const handleClick = () => {
    setShowBubble(false);
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(DEFAULT_MESSAGE)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    // On mobile (<lg) push up above the 56px bottom nav bar + 16px clearance.
    // On desktop (lg+) sit at the normal bottom-6 position.
    <div
      className="fixed right-6 z-50 flex flex-col items-end gap-2 lg:bottom-6"
      style={{
        bottom: 'calc(56px + env(safe-area-inset-bottom) + 16px)',
      }}
    >
      {/* Chat bubble tooltip */}
      <AnimatePresence>
        {showBubble && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className={`relative max-w-[200px] px-4 py-3 rounded-2xl rounded-br-sm shadow-lg cursor-pointer ${
              theme === 'light'
                ? 'bg-white text-foreground border border-border shadow-md'
                : 'bg-[#1a1a1a] text-white border border-white/10 shadow-xl'
            }`}
            onClick={handleClick}
          >
            <p className="text-sm leading-snug">Hey 👋 Say hi to connect!</p>
            {/* Triangle pointer */}
            <div className={`absolute -bottom-1.5 right-6 w-3 h-3 rotate-45 ${
              theme === 'light' ? 'bg-white border-r border-b border-border' : 'bg-[#1a1a1a] border-r border-b border-white/10'
            }`} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* WhatsApp button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleClick}
        className="w-14 h-14 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow"
        aria-label="Chat on WhatsApp"
      >
        <SiWhatsapp className="w-7 h-7" />
      </motion.button>
    </div>
  );
}
