import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Calendar } from 'lucide-react';
import { PostCard } from '@/components/sections/CeoDesk/PostCard';
import { parseContent, RenderContent } from '@/components/sections/CeoDesk/parseContent';
import { useTheme } from '@/lib/themeContext';
import { fetchCSV } from '@/lib/googleSheets';

// ─── Blog cache (sessionStorage) ─────────────────────────────────────────────
const BLOG_CACHE_KEY = 'iica-blog-cache-v1';
const BLOG_CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes

interface BlogCacheEnvelope {
  rows: string[][];
  savedAt: number;
}

function readBlogCache(): { rows: string[][]; isStale: boolean } | null {
  try {
    const raw = sessionStorage.getItem(BLOG_CACHE_KEY);
    if (!raw) return null;
    const envelope: BlogCacheEnvelope = JSON.parse(raw);
    if (!envelope?.rows || !Array.isArray(envelope.rows)) return null;
    const isStale = Date.now() - (envelope.savedAt ?? 0) > BLOG_CACHE_TTL_MS;
    return { rows: envelope.rows, isStale };
  } catch {
    return null;
  }
}

function writeBlogCache(rows: string[][]) {
  try {
    const envelope: BlogCacheEnvelope = { rows, savedAt: Date.now() };
    sessionStorage.setItem(BLOG_CACHE_KEY, JSON.stringify(envelope));
  } catch { /* quota exceeded */ }
}

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

function parseBlogRows(rows: string[][]): Post[] {
  if (!rows || rows.length < 2) return [];
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

/* ── Minimal skeleton loader ── */
function BlogSkeleton({ theme }: { theme: string }) {
  const light = theme === 'light';
  const shimmer = light ? 'bg-gray-200 animate-pulse' : 'bg-white/8 animate-pulse';
  return (
    <section className={`transition-colors duration-300 ${light ? 'bg-[#F8F7F5] border-b border-border' : 'bg-[#0a0a0a] border-b border-white/8'}`}>
      <div className="container mx-auto px-6 py-12 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Main column */}
          <div className="lg:col-span-2 space-y-5">
            <div className={`h-3 w-32 rounded-full ${shimmer}`} />
            <div className={`h-8 w-3/4 rounded-lg ${shimmer}`} />
            <div className={`h-4 w-48 rounded-full ${shimmer}`} />
            <div className={`h-px w-12 ${shimmer}`} />
            <div className="space-y-3 pt-2">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className={`h-4 rounded-full ${shimmer}`} style={{ width: `${85 - i * 5}%` }} />
              ))}
            </div>
            <div className="space-y-3 pt-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className={`h-4 rounded-full ${shimmer}`} style={{ width: `${90 - i * 8}%` }} />
              ))}
            </div>
            <div className="flex items-center gap-2 pt-4">
              <div className={`w-8 h-8 rounded-full ${shimmer}`} />
              <div className="space-y-1.5">
                <div className={`h-3 w-28 rounded-full ${shimmer}`} />
                <div className={`h-2.5 w-20 rounded-full ${shimmer}`} />
              </div>
            </div>
          </div>
          {/* Sidebar */}
          <aside className="lg:col-span-1 space-y-3">
            <div className={`h-5 w-32 rounded-lg mb-2 ${shimmer}`} />
            {[1, 2, 3].map((i) => (
              <div key={i} className={`rounded-xl p-4 space-y-2 ${light ? 'bg-white border border-border' : 'bg-[#111] border border-white/5'}`}>
                <div className={`h-3 w-full rounded-full ${shimmer}`} />
                <div className={`h-2.5 w-2/3 rounded-full ${shimmer}`} />
              </div>
            ))}
          </aside>
        </div>
        {/* Centered label */}
        <p className={`text-center text-xs mt-8 ${light ? 'text-muted-foreground' : 'text-gray-600'}`}>
          Loading blogs, please wait…
        </p>
      </div>
    </section>
  );
}

export function BlogViewer() {
  const { theme } = useTheme();
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);

  // Seed from cache for instant render; null = no cache yet (show skeleton)
  const [fetchedRows, setFetchedRows] = useState<string[][] | null>(() => {
    const cached = readBlogCache();
    return cached ? cached.rows : null;
  });
  // Only show loading skeleton when there's no cached data to show
  const [loading, setLoading] = useState(() => readBlogCache() === null);
  const [fetchError, setFetchError] = useState<string | null>(null);

  useEffect(() => {
    const cached = readBlogCache();
    let cancelled = false;

    async function load(isBackground: boolean) {
      try {
        const rows = await fetchCSV(CEO_BLOG_CSV);
        if (!cancelled) {
          setFetchedRows(rows);
          setFetchError(null);
          writeBlogCache(rows);
          if (!isBackground) setLoading(false);
        }
      } catch (err) {
        if (!cancelled && !isBackground) {
          setFetchedRows(prev => prev ?? []);
          setFetchError(err instanceof Error ? err.message : 'Failed to load blog posts');
          setLoading(false);
        }
      }
    }

    if (!cached) {
      load(false);
    } else if (cached.isStale) {
      load(true /* background */);
    }

    return () => { cancelled = true; };
  }, []);

  // Show skeleton while fetching
  if (loading) return <BlogSkeleton theme={theme} />;

  const posts = parseBlogRows(fetchedRows ?? []);
  const selectedPost = posts.find((p) => p.id === selectedPostId) || posts[0];

  // Network error with no cached data — show error state with retry
  if (fetchError && posts.length === 0) {
    return (
      <section className={`transition-colors duration-300 ${theme === 'light' ? 'bg-[#F8F7F5] border-b border-border' : 'bg-[#0a0a0a] border-b border-white/8'}`}>
        <div className="container mx-auto px-6 py-24 max-w-6xl text-center space-y-4">
          <p className={`text-lg font-semibold ${theme === 'light' ? 'text-foreground' : 'text-white'}`}>
            Could not load blog posts
          </p>
          <p className={`text-sm ${theme === 'light' ? 'text-muted-foreground' : 'text-gray-500'}`}>{fetchError}</p>
          <button
            onClick={() => {
              setLoading(true);
              setFetchError(null);
              fetchCSV(CEO_BLOG_CSV)
                .then(rows => { setFetchedRows(rows); writeBlogCache(rows); setLoading(false); })
                .catch(err => { setFetchError(err instanceof Error ? err.message : 'Failed to load'); setLoading(false); });
            }}
            className="inline-flex items-center gap-2 rounded-full bg-[#C13584] px-5 py-2 text-sm font-medium text-white hover:bg-[#a82d70] transition-colors"
          >
            Retry
          </button>
        </div>
      </section>
    );
  }

  // No posts (no error, just empty sheet)
  if (!selectedPost) {
    return (
      <section className={`transition-colors duration-300 ${theme === 'light' ? 'bg-[#F8F7F5] border-b border-border' : 'bg-[#0a0a0a] border-b border-white/8'}`}>
        <div className={`text-center py-24 ${theme === 'light' ? 'text-muted-foreground' : 'text-gray-600'}`}>
          <p className="text-lg font-semibold">No posts yet.</p>
          <p className="text-sm mt-1 opacity-60">Check back soon for updates from our CEO.</p>
        </div>
      </section>
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
