import React from 'react';
import { useRoute } from 'wouter';
import { motion } from 'framer-motion';
import { MapPin, ArrowLeft, Trophy, Calendar, ExternalLink, Mic2, Music } from 'lucide-react';
import { Link } from 'wouter';
import { ARTISTS } from '@/data/artists';
import { Button } from '@/components/ui/button';
import NotFound from './not-found';

export default function ArtistProfile() {
  const [, params] = useRoute('/artist/:slug');
  const slug = params?.slug;
  const artist = ARTISTS.find(a => a.slug === slug);

  if (!artist) return <NotFound />;

  const isAniket = artist.slug === 'aniket-chakravarty';

  return (
    <div className="bg-black text-white min-h-screen">

      {/* ── Cinematic Hero ── */}
      <div className="relative h-[55vh] md:h-[72vh] w-full overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/20 z-10" />

        {artist.image ? (
          <img src={artist.image} alt={artist.name} className="w-full h-full object-cover object-top" />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-[#0d0d0d] via-[#833AB4]/10 to-[#0d0d0d]" />
        )}

        <div className="absolute bottom-0 left-0 w-full z-20 pb-12">
          <div className="container mx-auto px-6">
            <Link href="/artists">
              <button className="flex items-center text-gray-500 hover:text-white mb-6 text-sm transition-colors">
                <ArrowLeft className="w-4 h-4 mr-2" /> Back to Directory
              </button>
            </Link>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              {(artist as any).tags ? (
                <div className="flex flex-wrap gap-2 mb-4">
                  {(artist as any).tags.map((tag: string) => (
                    <span key={tag} className="text-xs text-[#C13584] bg-[#C13584]/10 border border-[#C13584]/20 rounded-full px-3 py-1">{tag}</span>
                  ))}
                </div>
              ) : (
                <div className="inline-block px-3 py-1 rounded-full gradient-bg text-white text-xs font-medium mb-4">
                  {(artist as any).instrument || (artist as any).style || artist.profession}
                </div>
              )}

              <h1 className="font-serif text-4xl md:text-6xl font-bold mb-3">{artist.name}</h1>
              <p className="text-gray-400 text-base mb-3">{artist.profession}</p>
              <div className="flex items-center text-gray-500 text-sm">
                <MapPin className="w-4 h-4 mr-1.5 text-[#C13584]" />
                {artist.city}, {artist.country}
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* ── Domain Tags (Aniket style) ── */}
      {isAniket && (
        <div className="border-b border-white/8 bg-[#080808]">
          <div className="container mx-auto px-6 py-5">
            <div className="flex flex-wrap gap-2 items-center">
              <span className="text-gray-600 text-xs uppercase tracking-wider mr-2">Domain</span>
              {["Sarod", "Educator", "LIVE Concert Performer", "Community Builder", "Recording Artist"].map(d => (
                <span key={d} className="text-xs text-gray-300 border border-white/10 rounded-full px-3 py-1 bg-[#0d0d0d]">{d}</span>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">

          {/* ── Left: Bio & Journey ── */}
          <div className="lg:col-span-2 space-y-16">

            {/* Bio */}
            <section>
              <SectionHeading>Journey</SectionHeading>
              {isAniket ? (
                <div className="space-y-8">
                  <div>
                    <h3 className="text-[#C13584] uppercase tracking-[0.2em] text-xs font-semibold mb-4">The Young Sarod Exponent</h3>
                    {((artist as any).fullBio || [artist.bio]).map((para: string, i: number) => (
                      <p key={i} className="text-gray-400 leading-relaxed mb-4 text-[0.975rem]">{para}</p>
                    ))}
                  </div>

                  {(artist as any).journey && (
                    <div>
                      <h3 className="text-[#C13584] uppercase tracking-[0.2em] text-xs font-semibold mb-4">An Intense Journey of Rigour, Passion, Love</h3>
                      {(artist as any).journey.map((para: string, i: number) => (
                        <p key={i} className="text-gray-400 leading-relaxed mb-4 text-[0.975rem]">{para}</p>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <div className="space-y-4 text-gray-400 leading-relaxed text-[0.975rem]">
                  <p>{artist.bio}</p>
                </div>
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
                      className="flex items-start gap-3 text-gray-400 text-sm py-2 border-b border-white/5 last:border-0"
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
                  <p key={i} className="text-gray-400 leading-relaxed mb-4 text-[0.975rem]">{para}</p>
                ))}
                <p className="text-gray-600 text-xs italic mt-4 border-l-2 border-white/10 pl-4">
                  The aforementioned content shared about the journey of Aniket Chakravarty is copyright protected and it cannot be shared or distributed without written permission from Taanima Digital Private Limited.
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
                      <p className="text-gray-300 italic text-sm leading-relaxed mb-2">"{q.text}"</p>
                      <cite className="text-gray-600 text-xs not-italic uppercase tracking-wider">— {q.source}</cite>
                    </blockquote>
                  ))}
                </div>
              </section>
            )}

            {/* Life Journey Timeline */}
            {artist.milestones && artist.milestones.length > 0 && (
              <section>
                <SectionHeading>Life Timeline</SectionHeading>
                <div className="relative border-l border-white/10 ml-3 space-y-10">
                  {artist.milestones.map((milestone, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -15 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      className="relative pl-8"
                    >
                      <div className="absolute w-3 h-3 rounded-full gradient-bg left-[-7px] top-1.5" />
                      <span className="text-[#C13584] font-bold text-sm">{milestone.year}</span>
                      <h4 className="font-serif text-lg font-bold text-white mt-1 mb-1">{milestone.title}</h4>
                      <p className="text-gray-500 text-sm leading-relaxed">{milestone.description}</p>
                    </motion.div>
                  ))}
                </div>
              </section>
            )}

            {/* Media */}
            <section>
              <SectionHeading>Media</SectionHeading>
              <div className="aspect-video w-full rounded-xl overflow-hidden border border-white/8 bg-[#0d0d0d]">
                <iframe
                  width="100%"
                  height="100%"
                  src={`https://www.youtube.com/embed/${(artist as any).videoPlaceholder || 'dQw4w9WgXcQ'}`}
                  title={`${artist.name} — Performance`}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              {/* Instagram Reel Placeholder */}
              <div className="mt-4 border border-white/8 rounded-xl bg-[#0d0d0d] flex items-center justify-center p-10 text-center">
                <div>
                  <Music className="w-8 h-8 text-[#C13584] mx-auto mb-3" />
                  <p className="text-gray-600 text-sm">Instagram Reel — Coming Soon</p>
                  <a href="#" className="text-[#833AB4] text-xs mt-2 inline-flex items-center hover:underline">
                    View on Instagram <ExternalLink className="w-3 h-3 ml-1" />
                  </a>
                </div>
              </div>
            </section>
          </div>

          {/* ── Right: Sidebar ── */}
          <div className="space-y-6">

            {/* Booking */}
            <div className="border border-white/8 rounded-2xl p-8 bg-[#0a0a0a] sticky top-24">
              <h3 className="font-serif text-xl font-bold mb-6 flex items-center gap-2">
                <Mic2 className="w-5 h-5 text-[#C13584]" /> Booking Inquiry
              </h3>
              <form className="space-y-3" onSubmit={e => e.preventDefault()}>
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full bg-black border border-white/10 rounded-md px-4 py-3 text-white text-sm placeholder:text-gray-700 focus:outline-none focus:border-[#833AB4] transition-colors"
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  className="w-full bg-black border border-white/10 rounded-md px-4 py-3 text-white text-sm placeholder:text-gray-700 focus:outline-none focus:border-[#833AB4] transition-colors"
                />
                <textarea
                  placeholder="Event Details"
                  rows={4}
                  className="w-full bg-black border border-white/10 rounded-md px-4 py-3 text-white text-sm placeholder:text-gray-700 focus:outline-none focus:border-[#833AB4] transition-colors resize-none"
                />
                <Button className="w-full gradient-bg text-white h-11 text-sm hover:opacity-90">
                  Send Inquiry
                </Button>
              </form>
            </div>

            {/* Awards */}
            {artist.awards && artist.awards.length > 0 && (
              <div className="border border-white/8 rounded-2xl p-8 bg-[#0a0a0a]">
                <h3 className="font-serif text-xl font-bold mb-6 flex items-center gap-2 text-[#d4a853]">
                  <Trophy className="w-5 h-5" /> Awards & Recognition
                </h3>
                <div className="space-y-4">
                  {artist.awards.map((award, index) => (
                    <div key={index} className="flex justify-between items-start gap-3 border-b border-white/5 pb-4 last:border-0 last:pb-0">
                      <span className="text-gray-300 text-sm leading-relaxed">{award.title}</span>
                      <span className="text-[#d4a853] text-sm shrink-0 font-medium">{award.year}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tags */}
            {isAniket && (
              <div className="border border-white/8 rounded-2xl p-8 bg-[#0a0a0a]">
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">Genre Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {["#IndianClassical", "#Sarod", "#Hindustani", "#Classical", "#LivePerformance", "#MaiharGharana"].map(tag => (
                    <span key={tag} className="text-xs text-gray-400 border border-white/10 rounded-full px-3 py-1 bg-black">{tag}</span>
                  ))}
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
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
