import React from 'react';

interface SkeletonProps {
  className?: string;
  style?: React.CSSProperties;
  /** data-* attributes forwarded to the underlying div (e.g. data-sidebar) */
  [dataAttr: `data-${string}`]: string | undefined;
}

/** Single shimmer block — use like a div */
export function Skeleton({ className = '', style, ...rest }: SkeletonProps) {
  return (
    <div
      className={`animate-pulse rounded-lg bg-gray-200 dark:bg-white/8 ${className}`}
      style={style}
      {...rest}
    />
  );
}

/** Row of circular avatar skeletons — for the artists carousel on the home page */
export function ArtistCarouselSkeleton({ theme }: { theme: string }) {
  const light = theme === 'light';
  const shimmer = light ? 'bg-gray-200 animate-pulse' : 'bg-white/8 animate-pulse';
  return (
    <div className="flex gap-6 overflow-hidden pb-2">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="flex flex-col items-center gap-3 flex-shrink-0" style={{ width: '160px' }}>
          <div className={`w-32 h-32 sm:w-40 sm:h-40 rounded-full ${shimmer}`} />
          <div className={`h-3 w-20 rounded-full ${shimmer}`} />
        </div>
      ))}
    </div>
  );
}

/** Row of video card skeletons — for the talk show section on the home page */
export function TalkShowSkeleton({ theme }: { theme: string }) {
  const light = theme === 'light';
  const shimmer = light ? 'bg-gray-200 animate-pulse' : 'bg-white/8 animate-pulse';
  return (
    <div className="flex gap-5 overflow-hidden pb-2">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="flex-shrink-0 w-[320px]">
          <div className={`aspect-video rounded-xl mb-3 ${shimmer}`} />
          <div className={`h-3.5 w-3/4 rounded-full mb-2 ${shimmer}`} />
          <div className={`h-3 w-1/2 rounded-full ${shimmer}`} />
        </div>
      ))}
    </div>
  );
}

/** Testimonial card skeleton — for the "Artists Are Talking" section on the home page */
export function TestimonialSkeleton({ theme }: { theme: string }) {
  const light = theme === 'light';
  const shimmer = light ? 'bg-gray-200 animate-pulse' : 'bg-white/8 animate-pulse';
  const card = light ? 'bg-white border border-[#ece8e4]' : 'bg-[#161211]';
  return (
    <div className={`relative rounded-2xl overflow-hidden max-w-4xl mx-auto ${card}`}>
      <div className="grid grid-cols-1 md:grid-cols-[220px_1fr] gap-8 md:gap-10 p-8 md:p-14 items-center">
        {/* Left — avatar */}
        <div className="flex flex-col items-center gap-4">
          <div className={`w-[150px] h-[150px] rounded-full ${shimmer}`} />
          <div className={`h-2.5 w-20 rounded-full ${shimmer}`} />
        </div>
        {/* Right — quote lines */}
        <div className="space-y-3">
          <div className={`h-2.5 w-24 rounded-full ${shimmer}`} />
          <div className={`h-6 w-full rounded-lg ${shimmer}`} />
          <div className={`h-6 w-5/6 rounded-lg ${shimmer}`} />
          <div className={`h-6 w-4/6 rounded-lg ${shimmer}`} />
          <div className="flex items-center gap-3 pt-2">
            <div className={`w-7 h-0.5 rounded-full ${shimmer}`} />
            <div className="space-y-1.5">
              <div className={`h-3 w-28 rounded-full ${shimmer}`} />
              <div className={`h-2.5 w-20 rounded-full ${shimmer}`} />
            </div>
          </div>
        </div>
      </div>
      {/* Bottom bar */}
      <div className="flex items-center justify-between px-8 md:px-14 pb-10">
        <div className="flex gap-5">
          {[1, 2, 3].map(i => (
            <div key={i} className={`w-5 h-3 rounded-full ${shimmer}`} />
          ))}
        </div>
        <div className="flex gap-2.5">
          <div className={`w-[38px] h-[38px] rounded-full ${shimmer}`} />
          <div className={`w-[38px] h-[38px] rounded-full ${shimmer}`} />
        </div>
      </div>
      {/* Progress bar */}
      <div className={`h-[2px] w-1/3 ${shimmer}`} />
    </div>
  );
}
export function ArtistGridSkeleton({ theme }: { theme: string }) {
  const light = theme === 'light';
  const shimmer = light ? 'bg-gray-200 animate-pulse' : 'bg-white/8 animate-pulse';
  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-x-5 gap-y-8">
      {Array.from({ length: 18 }).map((_, i) => (
        <div key={i} className="flex flex-col items-center gap-2.5">
          <div className={`w-28 h-28 sm:w-36 sm:h-36 md:w-44 md:h-44 rounded-full ${shimmer}`} />
          <div className={`h-3 w-16 rounded-full ${shimmer}`} />
        </div>
      ))}
    </div>
  );
}
