/**
 * LiteYouTube — YouTube facade component.
 * Renders a thumbnail + play button instead of loading the full YouTube iframe immediately.
 * The real iframe is only mounted when the user clicks play, preventing YouTube's heavy
 * scripts (base.js ~3.1 MB, ~3 s main-thread time) from blocking page load.
 */
import React, { useState } from 'react';

interface LiteYouTubeProps {
  videoId: string;
  title: string;
  className?: string;
}

export function LiteYouTube({ videoId, title, className = '' }: LiteYouTubeProps) {
  const [activated, setActivated] = useState(false);

  if (!videoId) return null;

  // YouTube thumbnail — mqdefault is 320×180, good quality without fetching extra resources
  const thumbUrl = `https://i.ytimg.com/vi/${videoId}/mqdefault.jpg`;

  if (activated) {
    return (
      <iframe
        width="100%"
        height="100%"
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
        title={title}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className={`w-full h-full ${className}`}
      />
    );
  }

  return (
    <button
      type="button"
      onClick={() => setActivated(true)}
      aria-label={`Play video: ${title}`}
      className={`relative w-full h-full bg-black overflow-hidden group cursor-pointer border-0 p-0 ${className}`}
      style={{ display: 'block' }}
    >
      {/* Thumbnail */}
      <img
        src={thumbUrl}
        alt={title}
        loading="lazy"
        decoding="async"
        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
      />
      {/* Dark overlay on hover */}
      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300" />
      {/* Play button */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-14 h-14 rounded-full bg-red-600 group-hover:bg-red-500 flex items-center justify-center shadow-xl transition-all duration-300 group-hover:scale-110">
          {/* Triangle play icon */}
          <svg
            viewBox="0 0 24 24"
            fill="white"
            className="w-6 h-6 ml-1"
            aria-hidden="true"
          >
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
      </div>
      {/* Video title */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent px-3 pb-2 pt-6">
        <p className="text-white text-xs font-medium truncate text-left">{title}</p>
      </div>
    </button>
  );
}
