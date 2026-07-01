import React, { createContext, useContext, useEffect, useState } from 'react';
import type { Testimonial, TalkShowVideo, InstagramReel, AwardRecipient, SheetArtist, Job } from '@/lib/googleSheets';
import {
  fetchTestimonials, fetchTalkShow, fetchInstagramAwards,
  fetchInstagramPromo, fetchInstagramCollab, fetchAwards,
  fetchArtists, fetchHeroCards, fetchJobs,
} from '@/lib/googleSheets';

interface ConfigData {
  testimonials: Testimonial[];
  talkShow: TalkShowVideo[];
  instagramAwards: InstagramReel[];
  instagramPromo: InstagramReel[];
  instagramCollab: InstagramReel[];
  awards: AwardRecipient[];
  artists: SheetArtist[];
  heroCards: any[];
  jobs: Job[];
  loading: boolean;
  refresh: () => void;
}

const ConfigContext = createContext<ConfigData>({
  testimonials: [], talkShow: [], instagramAwards: [],
  instagramPromo: [], instagramCollab: [], awards: [],
  artists: [], heroCards: [], jobs: [], loading: true, refresh: () => {},
});

export function ConfigProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<Omit<ConfigData, 'refresh'>>({
    testimonials: [], talkShow: [], instagramAwards: [],
    instagramPromo: [], instagramCollab: [], awards: [],
    artists: [], heroCards: [], jobs: [], loading: true,
  });

  const load = async () => {
    setData(prev => ({ ...prev, loading: true }));
    try {
      const [testimonials, talkShow, instagramAwards, instagramPromo, instagramCollab, awards, artists, heroCards, jobs] =
        await Promise.all([
          fetchTestimonials(), fetchTalkShow(), fetchInstagramAwards(),
          fetchInstagramPromo(), fetchInstagramCollab(), fetchAwards(),
          fetchArtists(), fetchHeroCards(), fetchJobs(),
        ]);
      console.log('📊 Google Sheets data loaded:', {
        testimonials: testimonials.length,
        talkShow: talkShow.length,
        instagramAwards: instagramAwards.length,
        instagramPromo: instagramPromo.length,
        instagramCollab: instagramCollab.length,
        awards: awards.length,
        artists: artists.length,
        heroCards: heroCards.length,
        jobs: jobs.length,
      });
      setData({ testimonials, talkShow, instagramAwards, instagramPromo, instagramCollab, awards, artists, heroCards, jobs, loading: false });
    } catch (err) {
      console.error('❌ Failed to load config from Google Sheets:', err);
      setData(prev => ({ ...prev, loading: false }));
    }
  };

  useEffect(() => { load(); }, []);

  return (
    <ConfigContext.Provider value={{ ...data, refresh: load }}>
      {children}
    </ConfigContext.Provider>
  );
}

export function useConfig() {
  return useContext(ConfigContext);
}
