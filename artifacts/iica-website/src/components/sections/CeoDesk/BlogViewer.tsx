import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Calendar } from 'lucide-react';
import { PostCard } from '@/components/sections/CeoDesk/PostCard';
import { parseContent, RenderContent } from '@/components/sections/CeoDesk/parseContent';
import { useTheme } from '@/lib/themeContext';
import { fetchCSV } from '@/lib/googleSheets';

interface Post {
  id: string;
  title: string;
  author: string;
  designation: string;
  published_date: string;
  content: string;
  is_active: string;
}

const CEO_BLOG_CSV =
  'https://docs.google.com/spreadsheets/d/e/2PACX-1vSUFSlj-UBGtze4kDvT5dsivlZEwTjgs4AVtRYuSzXyUvGwlQYeWJ3M38mhCxJzxbAUcSIrQARvgd4U/pub?gid=0&single=true&output=csv';

const FALLBACK_POST: Post = {
  id: '1',
  title: 'Namaskar Everyone',
  author: 'Reshma Patra',
  designation: 'CEO, Taanima Digital Pvt. Ltd.',
  published_date: '30.07.2023',
  content: `It is with sincere gratitude and hope that I write this note, to welcome you to explore this web portal. The purpose of this web portal is multi-dimensional. **New Music Launchpad** is the first idea we want to build upon, by sharing as much information as we can collect.

Secondly, we aim to update the **Jobs & Opportunities** section once a month, so that job seekers get timely information and apply without delay.

We will reveal the **Featured, Courses & Workshops, International** sections in the coming months. **Forum** is the section for everybody who enjoys interacting with like-minded people, sharing their questions, and helping each other.

> From my personal experience of working with artists, I've seen that artists who have simple and small goals to pursue, usually are *mentally prepared and energetically ready* to achieve those goals — while we assist them in structuring their thoughts and designing their portfolio of brand assets.

Thank you once again for stopping by. I appreciate your time and patience.`,
  is_active: 'TRUE',
};

function parseBlogRows(rows: string[][]): Post[] {
  if (!rows || rows.length < 2) return [FALLBACK_POST];
  const headers = rows[0].map((h) => h.toLowerCase().trim());
  return rows
    .slice(1)
    .map((row) => {
      const obj: Record<string, string> = {};
      headers.forEach((h, i) => (obj[h] = (row[i] || '').trim()));
      return {
        id: obj.id || '',
        title: obj.title || '',
        author: obj.author || '',
        designation: obj.designation || '',
        published_date: obj.published_date || '',
        content: obj.content || '',
        is_active: obj.is_active || 'TRUE',
      };
    })
    .filter((p) => p.title)
    .sort((a, b) => new Date(b.published_date).getTime() - new Date(a.published_date).getTime());
}

export function BlogViewer() {
  const { theme } = useTheme();
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);
  const [fetchedRows, setFetchedRows] = useState<string[][] | null>(null);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const rows = await fetchCSV(CEO_BLOG_CSV);
        if (!cancelled) setFetchedRows(rows);
      } catch {
        if (!cancelled) setFetchedRows([]);
      }
    }
    load();
    return () => { cancelled = true; };
  }, []);

  const posts = useMemo(() => parseBlogRows(fetchedRows ?? []), [fetchedRows]);
  const selectedPost = posts.find((p) => p.id === selectedPostId) || posts[0];

  if (!selectedPost) {
    return (
      <div className="flex items-center justify-center py-24">
        <div className="w-8 h-8 border-2 border-[#C13584] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <section className={`transition-colors duration-300 ${theme === 'light' ? 'bg-[#F8F7F5] border-b border-border' : 'bg-[#0a0a0a] border-b border-white/8'}`}>
      <div className="container mx-auto px-6 py-12 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* LEFT — Main blog content (70%) */}
          <div className="lg:col-span-2">
            <motion.div
              key={selectedPost.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* Eyebrow */}
              <p className="text-[#C13584] text-xs tracking-[0.3em] uppercase font-medium mb-3">
                A Message From Our CEO
              </p>

              {/* Title */}
              <h1 className={`font-serif text-3xl md:text-4xl font-bold mb-3 leading-tight ${theme === 'light' ? 'text-foreground' : 'text-white'}`}>
                {selectedPost.title}
              </h1>

              {/* Author + designation + date */}
              <div className="flex flex-wrap items-center gap-2 text-sm mb-8">
                <span className={`font-medium ${theme === 'light' ? 'text-foreground' : 'text-white'}`}>
                  {selectedPost.author}
                </span>
                <span className="text-[#C13584] text-xs tracking-wider uppercase font-medium">
                  {selectedPost.designation}
                </span>
                <span className={`w-1 h-1 rounded-full ${theme === 'light' ? 'bg-muted-foreground/40' : 'bg-gray-600'}`} />
                <span className={`flex items-center gap-1 text-xs ${theme === 'light' ? 'text-muted-foreground' : 'text-gray-500'}`}>
                  <Calendar className="w-3.5 h-3.5" />
                  {selectedPost.published_date}
                </span>
              </div>

              <div className="w-12 h-[2px] gradient-bg mb-10" />

              {/* Parsed content */}
              <RenderContent blocks={parseContent(selectedPost.content)} theme={theme} />

              {/* Signature */}
              <div className={`pt-8 mt-10 ${theme === 'light' ? 'border-t border-border' : 'border-t border-white/8'}`}>
                <p className={`mb-1 text-sm ${theme === 'light' ? 'text-muted-foreground' : 'text-gray-400'}`}>
                  With love & regards,
                </p>
                <p className="font-serif text-3xl gradient-text mb-1">{selectedPost.author}</p>
                <p className={`text-sm ${theme === 'light' ? 'text-muted-foreground' : 'text-gray-500'}`}>
                  {selectedPost.designation}
                </p>
              </div>
            </motion.div>
          </div>

          {/* RIGHT — Sidebar (30%) */}
          <aside className="lg:col-span-1">
            <div className="lg:sticky lg:top-24">
              <h3 className={`font-serif text-xl font-bold mb-5 ${theme === 'light' ? 'text-foreground' : 'text-white'}`}>
                Previous Posts
              </h3>
              <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-1">
                {posts.map((post) => (
                  <PostCard
                    key={post.id}
                    post={post}
                    isActive={selectedPost?.id === post.id}
                    onClick={() => setSelectedPostId(post.id)}
                    theme={theme}
                  />
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
