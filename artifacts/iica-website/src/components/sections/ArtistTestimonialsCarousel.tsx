import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { useTheme } from '@/lib/themeContext';

export interface TestimonialItem {
  name?: string;
  city?: string;
  quote: string;
}

interface ArtistTestimonialsCarouselProps {
  testimonials?: TestimonialItem[];
}

const GOLD_STAR = '#d4a853';

function StarRating() {
  return (
    <div className="flex items-center justify-center gap-1 mb-4">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          className="w-4 h-4"
          fill={GOLD_STAR}
          stroke={GOLD_STAR}
          strokeWidth={1}
        />
      ))}
    </div>
  );
}

export function ArtistTestimonialsCarousel({ testimonials = [] }: ArtistTestimonialsCarouselProps) {
  const { theme } = useTheme();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const autoAdvanceRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const total = testimonials.length;

  // Create an extended array for infinite loop feel (triple the array)
  const extendedTestimonials = [...testimonials, ...testimonials, ...testimonials];
  // Map to virtual index in the middle copy
  const virtualStart = total;
  const displayIndex = virtualStart + (currentIndex % total);

  const goTo = useCallback((index: number) => {
    setCurrentIndex(((index % total) + total) % total);
  }, [total]);

  const goNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % total);
  }, [total]);

  const goPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  // Auto-advance every 4 seconds
  useEffect(() => {
    if (isPaused || total <= 1) return;
    autoAdvanceRef.current = setInterval(goNext, 4000);
    return () => {
      if (autoAdvanceRef.current) clearInterval(autoAdvanceRef.current);
    };
  }, [isPaused, goNext, total]);

  // Determine which 3 cards to show
  const visibleCards = [-1, 0, 1].map((offset) => {
    const idx = ((displayIndex + offset) % extendedTestimonials.length + extendedTestimonials.length) % extendedTestimonials.length;
    return { ...extendedTestimonials[idx], offset, key: `${idx}-${offset}` };
  });

  // All hooks have been called — safe to bail out now
  if (total === 0) return null;

  return (
    <section
      className={`py-16 transition-colors duration-300 ${
        theme === 'light'
          ? 'bg-white border-t border-border'
          : 'bg-[#080808] border-t border-white/5'
      }`}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-10">
          <p className="text-[#C13584] tracking-[0.3em] uppercase text-xs font-medium mb-2">
            Testimonials
          </p>
          <h2 className={`font-serif text-3xl font-bold ${
            theme === 'light' ? 'text-foreground' : 'text-white'
          }`}>
            What People Say
          </h2>
        </div>

        {/* Carousel container */}
        <div className="relative max-w-4xl mx-auto">
          {/* Left Arrow */}
          {total > 1 && (
            <button
              onClick={goPrev}
              className={`absolute left-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full border flex items-center justify-center transition-all ${
                theme === 'light'
                  ? 'border-border bg-white hover:border-accent hover:bg-accent/10 shadow-md'
                  : 'border-white/10 bg-[#0a0a0a] hover:border-white/30 hover:bg-[#111]'
              }`}
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          )}

          {/* Cards viewport */}
          <div className="overflow-hidden px-12">
            <div className="flex items-center justify-center gap-4 md:gap-6 min-h-[220px]">
              <AnimatePresence mode="popLayout">
                {visibleCards.map((card) => {
                  const isCenter = card.offset === 0;
                  return (
                    <motion.div
                      key={card.key}
                      initial={{ opacity: 0, scale: 0.85 }}
                      animate={{
                        opacity: isCenter ? 1 : 0.5,
                        scale: isCenter ? 1 : 0.9,
                        y: isCenter ? -8 : 0,
                      }}
                      exit={{ opacity: 0, scale: 0.85 }}
                      transition={{ duration: 0.4, ease: 'easeInOut' }}
                      className={`flex-shrink-0 w-[260px] md:w-[300px] rounded-2xl p-6 border transition-colors ${
                        isCenter
                          ? theme === 'light'
                            ? 'bg-white border-border shadow-xl z-10'
                            : 'bg-[#111] border-white/10 shadow-2xl shadow-black/50 z-10'
                          : theme === 'light'
                            ? 'bg-card/50 border-border/50 shadow-sm'
                            : 'bg-[#0a0a0a] border-white/5'
                      }`}
                    >
                      {/* 5 Gold Stars */}
                      <StarRating />

                      {/* Quote */}
                      <blockquote
                        className={`text-center text-sm leading-relaxed italic ${
                          theme === 'light' ? 'text-muted-foreground' : 'text-gray-300'
                        }`}
                        style={{
                          display: '-webkit-box',
                          WebkitLineClamp: 5,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden',
                        }}
                      >
                        "{card.quote}"
                      </blockquote>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          </div>

          {/* Right Arrow */}
          {total > 1 && (
            <button
              onClick={goNext}
              className={`absolute right-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full border flex items-center justify-center transition-all ${
                theme === 'light'
                  ? 'border-border bg-white hover:border-accent hover:bg-accent/10 shadow-md'
                  : 'border-white/10 bg-[#0a0a0a] hover:border-white/30 hover:bg-[#111]'
              }`}
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Dot indicators */}
        {total > 1 && (
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className={`h-1.5 rounded-full transition-all ${
                  i === currentIndex
                    ? 'w-8 gradient-bg'
                    : theme === 'light'
                      ? 'w-2 bg-border hover:bg-muted-foreground/30'
                      : 'w-2 bg-white/20 hover:bg-white/40'
                }`}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
