import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Briefcase, MapPin, Clock, ArrowRight, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useTheme } from '@/lib/themeContext';
import { useConfig } from '@/lib/configContext';
import { useToast } from '@/hooks/use-toast';

export default function Jobs() {
  const { theme } = useTheme();
  const { jobs: rawJobs, loading } = useConfig();
  const { toast } = useToast();
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  // Filter to active jobs only (exclude expired/draft), sorted by featured
  const jobs = useMemo(() => {
    return rawJobs
      .filter(j => {
        const s = (j.status || '').toLowerCase();
        return s !== 'expired' && s !== 'draft' && s !== 'closed';
      })
      .sort((a, b) => {
        // Featured first
        if ((a.featured || '').toLowerCase() === 'yes' && (b.featured || '').toLowerCase() !== 'yes') return -1;
        if ((a.featured || '').toLowerCase() !== 'yes' && (b.featured || '').toLowerCase() === 'yes') return 1;
        return 0;
      });
  }, [rawJobs]);

  // Derive categories from data
  const categories = useMemo(() => {
    const cats = new Set(jobs.map(j => j.category).filter(Boolean));
    return ['All', ...Array.from(cats).sort()];
  }, [jobs]);

  // Filter + search
  const filtered = useMemo(() => {
    let result = activeCategory === 'All' ? jobs : jobs.filter(j => j.category === activeCategory);
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(j =>
        j.title.toLowerCase().includes(q) ||
        j.location.toLowerCase().includes(q) ||
        (j.category || '').toLowerCase().includes(q)
      );
    }
    return result;
  }, [jobs, activeCategory, search]);

  const handleApply = (job: typeof jobs[0]) => {
    if (job.applylink && job.applylink.trim()) {
      window.open(job.applylink.trim(), '_blank', 'noopener,noreferrer');
    } else {
      toast({
        title: 'No application link',
        description: 'This opportunity has no external link yet. Please check back later or contact us for details.',
      });
    }
  };

  return (
    <div className="bg-background text-foreground min-h-screen pt-20 transition-colors duration-300">
      <div className="container mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h1 className="font-serif text-5xl md:text-6xl font-bold mb-6">Jobs & Gigs</h1>
          <p className={`text-lg ${theme === 'light' ? 'text-muted-foreground' : 'text-gray-400'}`}>
            Premium opportunities for performers, educators, and arts management professionals across the globe.
          </p>
        </motion.div>

        {/* Search + Category filters */}
        <div className="mb-12 flex flex-col md:flex-row gap-6 justify-between items-center">
          <div className="w-full md:w-1/2 relative">
            <Search className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 ${theme === 'light' ? 'text-muted-foreground' : 'text-gray-500'}`} />
            <Input
              placeholder="Search roles, skills, or locations..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className={`h-14 rounded-xl pl-12 pr-6 ${theme === 'light' ? 'bg-background border-input text-foreground' : 'bg-[#111] border-white/10 text-white'}`}
            />
          </div>
          <div className="flex flex-wrap gap-3 w-full md:w-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  activeCategory === cat
                    ? 'gradient-bg text-white'
                    : theme === 'light'
                      ? 'bg-muted border border-border text-foreground hover:bg-accent hover:text-white'
                      : 'bg-[#111] border border-white/10 text-gray-400 hover:text-white hover:bg-[#222]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Loading state */}
        {loading && (
          <div className="text-center py-20">
            <div className="w-8 h-8 border-2 border-[#C13584] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className={`text-sm ${theme === 'light' ? 'text-muted-foreground' : 'text-gray-500'}`}>Loading opportunities...</p>
          </div>
        )}

        {/* Jobs grid */}
        {!loading && (
          <>
            {filtered.length === 0 ? (
              <div className={`text-center py-20 ${theme === 'light' ? 'text-muted-foreground' : 'text-gray-600'}`}>
                <Briefcase className="w-12 h-12 mx-auto mb-4 opacity-40" />
                <p className="text-xl font-semibold">
                  {search || activeCategory !== 'All'
                    ? `No opportunities found${search ? ` for "${search}"` : ''}`
                    : 'No jobs or gigs available right now.'}
                </p>
                <p className="text-sm mt-2 opacity-70">Check back soon — new opportunities are added regularly.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {filtered.map((job, i) => (
                  <motion.div
                    key={job.id}
                    initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.01 }}
                    className={`p-8 rounded-2xl transition-all group flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 ${
                      theme === 'light'
                        ? 'bg-card border border-border shadow-sm hover:shadow-md hover:border-accent/50'
                        : 'glass-card border border-white/5 hover:border-[#833AB4]/50'
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-xs font-bold uppercase tracking-wider text-[#C13584] bg-[#C13584]/10 px-3 py-1 rounded-full">
                          {job.category || 'Opportunity'}
                        </span>
                        {(job.featured || '').toLowerCase() === 'yes' && (
                          <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded-full border border-amber-400/30">
                            Featured
                          </span>
                        )}
                      </div>
                      <h3 className={`font-serif text-2xl font-bold mb-4 ${theme === 'light' ? 'text-foreground' : 'text-white'}`}>
                        {job.title}
                      </h3>
                      <div className={`flex flex-wrap gap-4 text-sm ${theme === 'light' ? 'text-muted-foreground' : 'text-gray-400'}`}>
                        <div className="flex items-center"><MapPin className="w-4 h-4 mr-1.5" /> {job.location}</div>
                        {job.applyby && (
                          <div className="flex items-center"><Clock className="w-4 h-4 mr-1.5" /> Apply by: {job.applyby}</div>
                        )}
                      </div>
                    </div>

                    <Button
                      onClick={() => handleApply(job)}
                      className="gradient-bg text-white w-full sm:w-auto h-12 px-8 rounded-xl opacity-90 group-hover:opacity-100 shrink-0"
                    >
                      Apply Now <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </motion.div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
