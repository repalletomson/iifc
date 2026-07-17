import React from 'react';
import { useRoute } from 'wouter';
import { motion } from 'framer-motion';
import { MapPin, ArrowLeft, Trophy, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'wouter';
import { ARTISTS } from '@/data/artists';
import { useConfig } from '@/lib/configContext';
import { useTheme } from '@/lib/themeContext';
import { extractYoutubeId, parseJourney, parseAwards, parseLifeTimeline } from '@/lib/googleSheets';
import type { JourneySection, ParsedAward, ParsedTimelineEntry } from '@/lib/googleSheets';
import NotFound from './not-found';
import { ArtistTestimonialsCarousel } from '@/components/sections/ArtistTestimonialsCarousel';

const ARTIST_AVATARS = [
  "https://images.unsplash.com/photo-1619983081593-e2ba5b543168?w=400&q=80",
  "https://images.unsplash.com/photo-1509059852496-f3822ae057bf?w=400&q=80",
  "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&q=80",
  "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&q=80",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80",
  "https://images.unsplash.com/photo-1520810627419-35e6bce42bca?w=400&q=80",
  "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&q=80",
  "https://images.unsplash.com/photo-1499952127939-9bbf5af6c51c?w=400&q=80",
  "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&q=80",
  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80",
  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80",
  "https://images.unsplash.com/photo-1463453091185-61582044d556?w=400&q=80",
];

export default function ArtistProfile() {
  const [, params] = useRoute('/artist/:slug');
  const slug = params?.slug;
  const { theme } = useTheme();
  const config = useConfig();

  // Find artist in local static data (has rich fields: milestones, performances, etc.)
  const localArtist = ARTISTS.find(a => a.slug === slug);

  // Find artist in Google Sheets data (has admin-editable fields: name, profession, tags, etc.)
  const sheetArtist = config.artists.find(a => a.slug === slug);

  // Merge: Google Sheets data takes priority for basic fields, local for rich fields
  const artist = localArtist
    ? {
        ...localArtist,
        // Override basic fields from Google Sheets if available
        ...(sheetArtist ? {
          name: sheetArtist.name || localArtist.name,
          profession: sheetArtist.profession || localArtist.profession,
          city: sheetArtist.city || localArtist.city,
          country: sheetArtist.country || localArtist.country,
          bio: sheetArtist.bio || localArtist.bio,
          image: sheetArtist.image || localArtist.image,
          tags: sheetArtist.tags
            ? sheetArtist.tags.split(',').map((t: string) => t.trim()).filter(Boolean)
            : localArtist.tags,
          social_media: sheetArtist.social_media || '',
        } : {}),
      }
    : (sheetArtist ? {
        // If no local data exists, build minimal artist from Google Sheets
        id: sheetArtist.slug,
        slug: sheetArtist.slug,
        name: sheetArtist.name,
        profession: sheetArtist.profession,
        instrument: (sheetArtist as any).instrument || '',
        style: (sheetArtist as any).style || '',
        city: sheetArtist.city,
        country: sheetArtist.country,
        tags: sheetArtist.tags ? sheetArtist.tags.split(',').map((t: string) => t.trim()).filter(Boolean) : [],
        image: sheetArtist.image,
        bio: sheetArtist.bio,
        social_media: sheetArtist.social_media || '',
        milestones: [],
        awards: [],
      } as any
      : null);

  // While Google Sheets data is still loading, or if artists list is empty (not yet fetched),
  // show a skeleton instead of the NotFound page — avoids flash-of-404 on hard reload
  // and handles the cache-miss race condition where loading=false but artists=[].
  if (!artist) {
    if (config.loading || config.artists.length === 0) {
      return (
        <div className="min-h-screen pt-24">
          <div className="container mx-auto px-6 pb-10">
            {/* Back button placeholder */}
            <div className="h-5 w-32 rounded bg-muted animate-pulse mb-8" />
            <div className="flex flex-col md:flex-row items-start gap-8 md:gap-12">
              {/* Avatar skeleton */}
              <div className="w-40 h-40 md:w-52 md:h-52 rounded-full bg-muted animate-pulse shrink-0" />
              {/* Details skeleton */}
              <div className="flex-1 pt-2 space-y-3">
                <div className="h-4 w-24 rounded bg-muted animate-pulse" />
                <div className="h-10 w-64 rounded bg-muted animate-pulse" />
                <div className="h-4 w-40 rounded bg-muted animate-pulse" />
                <div className="h-4 w-32 rounded bg-muted animate-pulse" />
              </div>
            </div>
          </div>
          <div className="container mx-auto px-6 py-10 space-y-4">
            <div className="h-4 w-full rounded bg-muted animate-pulse" />
            <div className="h-4 w-5/6 rounded bg-muted animate-pulse" />
            <div className="h-4 w-4/6 rounded bg-muted animate-pulse" />
            <div className="h-4 w-full rounded bg-muted animate-pulse" />
            <div className="h-4 w-3/4 rounded bg-muted animate-pulse" />
          </div>
        </div>
      );
    }
    // Distinguish "data genuinely missing" from "fetch failed"
    if (config.error && config.artists.length === 0) {
      return (
        <div className="bg-background text-foreground min-h-screen pt-24 flex items-center justify-center">
          <div className="text-center space-y-4 px-6">
            <p className="text-lg font-semibold">Unable to load artist data</p>
            <p className={`text-sm ${theme === 'light' ? 'text-muted-foreground' : 'text-gray-500'}`}>
              {config.error}
            </p>
            <button
              onClick={config.refresh}
              className="inline-flex items-center gap-2 rounded-full bg-[#C13584] px-5 py-2 text-sm font-medium text-white hover:bg-[#a82d70] transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> Retry
            </button>
          </div>
        </div>
      );
    }
    return <NotFound />;
  }

  const isAniket = artist.slug === 'aniket-chakravarty';

  // Parse journey from Google Sheets (primary), fall back to local data
  const journeySections: JourneySection[] = sheetArtist?.journey
    ? parseJourney(sheetArtist.journey)
    : [];

  const hasSheetJourney = journeySections.length > 0;
  const hasLocalJourney = !!(artist as any).fullBio || !!(artist as any).journey;

  // ── Awards from Google Sheets (comma-separated "name,year" per line) ──
  const sheetAwards: ParsedAward[] = sheetArtist?.awards
    ? parseAwards(sheetArtist.awards)
    : [];

  // ── Life Timeline from Google Sheets (comma-separated "year,info,subinfo" per line) ──
  const sheetTimeline: ParsedTimelineEntry[] = sheetArtist?.lifetimeline
    ? parseLifeTimeline(sheetArtist.lifetimeline)
    : [];

  // Merge awards: sheet data takes priority, fall back to local data
  const mergedAwards: ParsedAward[] = sheetAwards.length > 0
    ? sheetAwards
    : ((artist as any).awards || []).map((a: any) => ({ title: a.title, year: a.year }));

  // Merge timeline: sheet data takes priority, fall back to local milestones
  const mergedTimeline: ParsedTimelineEntry[] = sheetTimeline.length > 0
    ? sheetTimeline
    : ((artist as any).milestones || []).map((m: any) => ({ year: m.year, title: m.title, description: m.description }));

  // ── YouTube album from artist sheet (comma-separated URLs) ──
  const youtubeUrls = sheetArtist?.youtubevideo
    ? sheetArtist.youtubevideo.split(',').map((u: string) => u.trim()).filter(Boolean)
    : [];
  const youtubeVideos = youtubeUrls.map((url: string) => ({
    videoId: extractYoutubeId(url),
    title: artist.name,
  }));

  // ── Testimonials from artist sheet (comma-separated quotes) ──
  const sheetTestimonials = sheetArtist?.testimonials
    ? sheetArtist.testimonials.split(',').map((q: string) => q.trim()).filter(Boolean)
    : [];
  const artistTestimonials = sheetTestimonials.map((quote: string) => ({
    name: artist.name,
    city: artist.city || artist.country || '',
    quote,
  }));

  return (
    <div className="bg-background text-foreground min-h-screen pt-24">

      {/* ── Compact horizontal header: circle photo + details ── */}
      <div className={`container mx-auto px-6 pb-10 border-b transition-colors ${theme === 'light' ? 'border-border' : 'border-white/8'}`}>
        <Link href="/artists">
          <button className={`flex items-center mb-8 text-sm transition-colors ${theme === 'light' ? 'text-muted-foreground hover:text-foreground' : 'text-gray-500 hover:text-white'}`}>
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to All Artists
          </button>
        </Link>

        <div className="flex flex-col md:flex-row items-start gap-8 md:gap-12">
          {/* Circle photo */}
          <div className={`w-40 h-40 md:w-52 md:h-52 rounded-full overflow-hidden border-2 shrink-0 ${theme === 'light' ? 'bg-muted border-border' : 'bg-[#111] border-white/10'}`}>
            <img
              src={artist.image || ARTIST_AVATARS[0]}
              alt={artist.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src = ARTIST_AVATARS[0];
              }}
            />
          </div>

          {/* Details */}
          <div className="flex-1 pt-2">
            {(artist as any).tags ? (
              <div className="flex flex-wrap gap-2 mb-3">
                {(artist as any).tags.map((tag: string) => (
                  <span key={tag} className="text-xs text-[#C13584] bg-[#C13584]/10 border border-[#C13584]/20 rounded-full px-3 py-1">{tag}</span>
                ))}
              </div>
            ) : null}

            <h1 className="font-serif text-3xl md:text-5xl font-bold mb-2">{artist.name}</h1>
            <p className={`text-base mb-3 ${theme === 'light' ? 'text-muted-foreground' : 'text-gray-400'}`}>{artist.profession}</p>

            {isAniket && (
              <div className="flex flex-wrap gap-2 mb-4">
                {["Sarod", "Educator", "LIVE Concert Performer", "Community Builder", "Recording Artist"].map(d => (
                  <span key={d} className={`text-[11px] rounded-full px-2.5 py-0.5 border ${theme === 'light' ? 'text-muted-foreground border-border bg-muted' : 'text-gray-400 border-white/10 bg-[#0d0d0d]'}`}>{d}</span>
                ))}
              </div>
            )}

            <div className={`flex items-center gap-4 text-sm flex-wrap ${theme === 'light' ? 'text-muted-foreground' : 'text-gray-500'}`}>
              <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-[#C13584]" />{artist.city}, {artist.country}</span>

              {/* Social media icons — parsed from social_media column (order: instagram, youtube, facebook) */}
              {(() => {
                const links = ((artist as any).social_media || '').split(',').map((s: string) => s.trim()).filter(Boolean);
                const [instagram, facebook, youtube] = links;
                return (
                  <span className="flex items-center gap-3">
                    {instagram && (
                      <a href={instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram"
                        className="hover:opacity-70 transition-opacity" style={{ color: '#E1306C' }}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                          <circle cx="12" cy="12" r="4"/>
                          <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/>
                        </svg>
                      </a>
                    )}
                    {facebook && (
                      <a href={facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook"
                        className="hover:opacity-70 transition-opacity" style={{ color: '#1877F2' }}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M24 12.07C24 5.41 18.63 0 12 0S0 5.41 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.04V9.41c0-3.02 1.8-4.7 4.54-4.7 1.31 0 2.68.24 2.68.24v2.97h-1.51c-1.49 0-1.95.93-1.95 1.88v2.27h3.32l-.53 3.5h-2.79V24C19.61 23.1 24 18.1 24 12.07z"/>
                        </svg>
                      </a>
                    )}
                    {youtube && (
                      <a href={youtube} target="_blank" rel="noopener noreferrer" aria-label="YouTube"
                        className="hover:opacity-70 transition-opacity" style={{ color: '#FF0000' }}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2 31.2 31.2 0 0 0 0 12a31.2 31.2 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1A31.2 31.2 0 0 0 24 12a31.2 31.2 0 0 0-.5-5.8zM9.7 15.5V8.5l6.3 3.5-6.3 3.5z"/>
                        </svg>
                      </a>
                    )}
                  </span>
                );
              })()}
            </div>
          </div>
        </div>
      </div>

      {/* ── Bio + Journey ── */}
      <div className="container mx-auto px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

          <div className="lg:col-span-2 space-y-10">
            {/* Bio / Life Journey */}
            <section>
              <SectionHeading>Life Journey</SectionHeading>
              {hasSheetJourney ? (
                /* ── Journey from Google Sheets (with ## sub-headings) ── */
                <div className="space-y-8">
                  {journeySections.map((section, si) => (
                    <div key={si}>
                      {section.heading && (
                        <h3 className={`font-serif text-lg font-bold mb-3 ${
                          theme === 'light' ? 'text-foreground' : 'text-white'
                        }`}>{section.heading}</h3>
                      )}
                      {section.content.map((para, pi) => (
                        <p key={pi} className={`leading-relaxed text-[0.95rem] ${
                          pi < section.content.length - 1 ? 'mb-4' : ''
                        } ${theme === 'light' ? 'text-muted-foreground' : 'text-gray-400'}`}>{para}</p>
                      ))}
                    </div>
                  ))}
                </div>
              ) : hasLocalJourney ? (
                /* ── Local rich journey data (Aniket-style) ── */
                <div className="space-y-6">
                  {((artist as any).fullBio || [artist.bio]).map((para: string, i: number) => (
                    <p key={i} className={`leading-relaxed text-[0.95rem] ${theme === 'light' ? 'text-muted-foreground' : 'text-gray-400'}`}>{para}</p>
                  ))}
                  {(artist as any).journey && (artist as any).journey.map((para: string, i: number) => (
                    <p key={`j-${i}`} className={`leading-relaxed text-[0.95rem] ${theme === 'light' ? 'text-muted-foreground' : 'text-gray-400'}`}>{para}</p>
                  ))}
                </div>
              ) : (
                /* ── Simple bio fallback ── */
                <p className={`leading-relaxed text-[0.95rem] ${theme === 'light' ? 'text-muted-foreground' : 'text-gray-400'}`}>{artist.bio}</p>
              )}
            </section>

            {/* Performances */}
            {isAniket && (artist as any).performances && (
              <section>
                <SectionHeading>Selected Performances</SectionHeading>
                <ul className="space-y-2">
                  {(artist as any).performances.map((perf: string, i: number) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.03 }}
                      className={`flex items-start gap-3 text-sm py-2 border-b last:border-0 ${theme === 'light' ? 'text-muted-foreground border-border' : 'text-gray-400 border-white/5'}`}
                    >
                      <span className="w-1.5 h-1.5 rounded-full gradient-bg mt-2 shrink-0" />
                      {perf}
                    </motion.li>
                  ))}
                </ul>
              </section>
            )}

            {/* Sur Sadhak Festival */}
            {isAniket && (artist as any).festival && (
              <section>
                <SectionHeading>{(artist as any).festival.title}</SectionHeading>
                {(artist as any).festival.content.map((para: string, i: number) => (
                  <p key={i} className={`leading-relaxed mb-4 text-[0.975rem] ${theme === 'light' ? 'text-muted-foreground' : 'text-gray-400'}`}>{para}</p>
                ))}
                <p className={`text-xs italic mt-4 pl-4 border-l-2 ${theme === 'light' ? 'text-muted-foreground border-border' : 'text-gray-600 border-white/10'}`}>
                  The aforementioned content shared about the journey of Aniket Chakravarty is copyright protected and it cannot be shared or distributed without written permission from  IICA.
                </p>
              </section>
            )}

            {/* Press Quotes */}
            {isAniket && (artist as any).pressQuotes && (
              <section>
                <SectionHeading>Press & Media</SectionHeading>
                <div className="space-y-6">
                  {(artist as any).pressQuotes.map((q: any, i: number) => (
                    <blockquote key={i} className="border-l-2 border-[#833AB4] pl-5 py-1">
                      <p className={`italic text-sm leading-relaxed mb-2 ${theme === 'light' ? 'text-muted-foreground' : 'text-gray-300'}`}>"{q.text}"</p>
                      <cite className={`text-xs not-italic uppercase tracking-wider ${theme === 'light' ? 'text-muted-foreground' : 'text-gray-600'}`}>— {q.source}</cite>
                    </blockquote>
                  ))}
                </div>
              </section>
            )}

            {/* Life Journey Timeline */}
            {mergedTimeline.length > 0 && (
              <section>
                <SectionHeading>Highlights by Timeline</SectionHeading>
                <div className={`relative ml-3 space-y-10 ${theme === 'light' ? 'border-l border-border' : 'border-l border-white/10'}`}>
                  {mergedTimeline.map((entry, index: number) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -15 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      className="relative pl-8"
                    >
                      <div className="absolute w-3 h-3 rounded-full gradient-bg left-[-7px] top-1.5" />
                      <span className="text-[#C13584] font-bold text-sm">{entry.year}</span>
                      <h4 className={`font-serif text-lg font-bold mt-1 mb-1 ${theme === 'light' ? 'text-foreground' : 'text-white'}`}>{entry.title}</h4>
                      <p className={`text-sm leading-relaxed ${theme === 'light' ? 'text-muted-foreground' : 'text-gray-500'}`}>{entry.description}</p>
                    </motion.div>
                  ))}
                </div>
              </section>
            )}

            {/* ── YouTube Album Carousel ── */}
          </div>

          {/* ── Right: Sidebar ── */}
          <div className="space-y-6">

            {/* Awards */}
            {mergedAwards.length > 0 && (
              <div className={`border rounded-2xl p-8 transition-colors ${theme === 'light' ? 'bg-card border-border' : 'bg-[#0a0a0a] border-white/8'}`}>
                <h3 className="font-serif text-xl font-bold mb-6 flex items-center gap-2 text-[#d4a853]">
                  <Trophy className="w-5 h-5" /> Awards & Recognition
                </h3>
                <div className="space-y-4">
                  {mergedAwards.map((award, index: number) => (
                    <div key={index} className={`flex justify-between items-start gap-3 pb-4 last:pb-0 border-b last:border-0 ${theme === 'light' ? 'border-border' : 'border-white/5'}`}>
                      <span className={`text-sm leading-relaxed ${theme === 'light' ? 'text-foreground' : 'text-gray-300'}`}>{award.title}</span>
                      <span className="text-[#d4a853] text-sm shrink-0 font-medium">{award.year}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tags */}
            {isAniket && (
              <div className={`border rounded-2xl p-8 transition-colors ${theme === 'light' ? 'bg-card border-border' : 'bg-[#0a0a0a] border-white/8'}`}>
                <h3 className={`text-sm font-semibold uppercase tracking-wider mb-4 ${theme === 'light' ? 'text-muted-foreground' : 'text-gray-500'}`}>Genre Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {["#IndianClassical", "#Sarod", "#Hindustani", "#Classical", "#LivePerformance", "#MaiharGharana"].map(tag => (
                    <span key={tag} className={`text-xs rounded-full px-3 py-1 border ${theme === 'light' ? 'text-muted-foreground border-border bg-muted' : 'text-gray-400 border-white/10 bg-black'}`}>{tag}</span>
                  ))}
                </div>
              </div>
            )}
          </div>

        </div>
      </div>

      {/* ═══ {artist.name} Album — YouTube Video Carousel ═══ */}
      {youtubeVideos.length > 0 && (
        <section className={`py-16 transition-colors duration-300 ${
          theme === 'light'
            ? 'bg-muted border-t border-border'
            : 'bg-black border-t border-white/5'
        }`}>
          <div className="container mx-auto px-6">
            <div className="flex justify-between items-end mb-8">
              <div>
                <p className="text-[#C13584] tracking-[0.3em] uppercase text-xs font-medium mb-2">Watch & Listen</p>
                <h2 className={`font-serif text-3xl font-bold ${
                  theme === 'light' ? 'text-foreground' : 'text-white'
                }`}>{artist.name} Album</h2>
              </div>
              {youtubeVideos.length > 1 && (
                <div className="flex items-center gap-2">
                  <button onClick={() => { const el = document.getElementById('artist-album-track'); if (el) el.scrollBy({ left: -360, behavior: 'smooth' }); }} className={`w-9 h-9 rounded-full border flex items-center justify-center transition-all ${
                    theme === 'light' ? 'border-border hover:border-accent hover:bg-accent/10' : 'border-white/20 hover:border-white/50 hover:bg-white/5'
                  }`}><ChevronLeft className="w-4 h-4" /></button>
                  <button onClick={() => { const el = document.getElementById('artist-album-track'); if (el) el.scrollBy({ left: 360, behavior: 'smooth' }); }} className={`w-9 h-9 rounded-full border flex items-center justify-center transition-all ${
                    theme === 'light' ? 'border-border hover:border-accent hover:bg-accent/10' : 'border-white/20 hover:border-white/50 hover:bg-white/5'
                  }`}><ChevronRight className="w-4 h-4" /></button>
                </div>
              )}
            </div>
            <div id="artist-album-track" className="flex gap-5 overflow-x-auto scroll-smooth pb-2 [&::-webkit-scrollbar]:hidden">
              {youtubeVideos.map((video: any, i: number) => (
                <div key={i} className="flex-shrink-0 w-[320px]">
                  <div className={`aspect-video rounded-xl overflow-hidden mb-3 ${
                    theme === 'light' ? 'bg-card border border-border' : 'bg-[#111] border border-white/5'
                  }`}>
                    <iframe width="100%" height="100%"
                      src={`https://www.youtube.com/embed/${video.videoId}`}
                      title={video.title} frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen className="w-full h-full"
                    />
                  </div>
                  <h4 className={`font-semibold text-sm ${theme === 'light' ? 'text-foreground' : 'text-white'}`}>{video.title}</h4>
                  <p className={`text-xs ${theme === 'light' ? 'text-muted-foreground' : 'text-gray-500'}`}>Track {i + 1} of {youtubeVideos.length}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ═══ Testimonials Carousel ═══ */}
      <ArtistTestimonialsCarousel testimonials={artistTestimonials} />

    </div>
  );
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-serif text-2xl font-bold mb-6 flex items-center">
      <span className="w-6 h-[2px] gradient-bg mr-4 inline-block shrink-0" />
      {children}
    </h2>
  );
}
