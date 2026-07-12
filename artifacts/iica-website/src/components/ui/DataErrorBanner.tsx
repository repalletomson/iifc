/**
 * DataErrorBanner
 *
 * Shows a dismissable top banner when one or more Google Sheets endpoints fail.
 * Only renders when `failedSheets` is non-empty. The rest of the site continues
 * to function with cached or partial data.
 */
import React, { useState } from 'react';
import { AlertTriangle, X, RefreshCw } from 'lucide-react';
import { useConfig } from '@/lib/configContext';

// Human-readable labels for each sheet key
const SHEET_LABELS: Record<string, string> = {
  testimonials: 'Testimonials',
  talkShow: 'Talk Show Videos',
  instagramAwards: 'Instagram Awards',
  instagramPromo: 'Instagram Promos',
  instagramCollab: 'Instagram Collabs',
  awards: 'Award Recipients',
  artists: 'Artists',
  heroCards: 'Hero Cards',
  jobs: 'Jobs',
};

export function DataErrorBanner() {
  const { failedSheets, refresh, loading } = useConfig();
  const [dismissed, setDismissed] = useState(false);

  // Nothing to show
  if (dismissed || failedSheets.length === 0) return null;

  const labels = failedSheets.map(k => SHEET_LABELS[k] ?? k);

  return (
    <div
      role="alert"
      aria-live="polite"
      className="fixed top-0 left-0 right-0 z-[9999] flex items-start gap-3 px-4 py-3
        bg-amber-50 border-b border-amber-200 shadow-sm
        dark:bg-amber-950/80 dark:border-amber-800 dark:text-amber-100
        text-amber-900 text-sm backdrop-blur-sm"
    >
      <AlertTriangle className="w-4 h-4 mt-0.5 shrink-0 text-amber-600 dark:text-amber-400" aria-hidden="true" />

      <p className="flex-1 leading-snug">
        <span className="font-semibold">Some content couldn't load: </span>
        {labels.join(', ')}.{' '}
        Showing cached data where available.
      </p>

      <div className="flex items-center gap-2 shrink-0">
        <button
          onClick={() => { setDismissed(false); refresh(); }}
          disabled={loading}
          aria-label="Retry loading data"
          className="flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full
            bg-amber-100 hover:bg-amber-200 disabled:opacity-50 disabled:cursor-not-allowed
            dark:bg-amber-800/50 dark:hover:bg-amber-800 transition-colors"
        >
          <RefreshCw className={`w-3 h-3 ${loading ? 'animate-spin' : ''}`} aria-hidden="true" />
          Retry
        </button>

        <button
          onClick={() => setDismissed(true)}
          aria-label="Dismiss this warning"
          className="p-1 rounded-full hover:bg-amber-100 dark:hover:bg-amber-800/50 transition-colors"
        >
          <X className="w-4 h-4" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
