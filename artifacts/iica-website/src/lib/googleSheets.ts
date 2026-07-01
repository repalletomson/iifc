// Google Sheets Data Service
// Each tab is published as a separate Google Sheet → CSV

// Published CSV URLs (replace pubhtml with pub?output=csv)
const CSV_URLS = {
  testimonials: "https://docs.google.com/spreadsheets/d/e/2PACX-1vR2s3mBXzYp6n5siYZUr0SBXkF9JOniL31PKnlAVeCKMnHg5BybGJ-x_T8tshEyJSDGdvKGq_XGDXd2/pub?gid=1468348840&single=true&output=csv",
  talkShow: "https://docs.google.com/spreadsheets/d/e/2PACX-1vQGWLqP6GT5Xa2LIacbLFcj-2ycqpC8P74f3pIdgcqBUxi1AwDbLzuZLDTLEm15CBCtzHFZJAyoNVYA/pub?gid=633442719&single=true&output=csv",
  instagramAwards: "https://docs.google.com/spreadsheets/d/e/2PACX-1vRFLxpm93IX_b9PkCM-Vjma45pIgYQN5_Pl-6QlX_irNj9e_ktP8gzba-qfPoeZCPFMiH1CGQNT7wqB/pub?gid=316317826&single=true&output=csv",
  instagramPromo: "https://docs.google.com/spreadsheets/d/e/2PACX-1vS-_oXJycsVt-EYLCfCuVZkqOlKsLDQFcZXNhZ53YjHI8OejVfIVjts12bKprhlARfikr6_38YppW28/pub?gid=1561296631&single=true&output=csv",
  instagramCollab: "https://docs.google.com/spreadsheets/d/e/2PACX-1vTtQvfVInDEFBAAYii2pf1MGi-xXv8DdN_ODzk6ocaPQukTQuS9fl5d-N2eloGJQAfeQxWnNLvBJTZQ/pub?gid=215887681&single=true&output=csv",
  awards: "https://docs.google.com/spreadsheets/d/e/2PACX-1vQYfuxxiAuDyza7FsazUYoBY_HHclzCIRpG04w7h7gEm1nURuqf4sPaBgoLXLrJp1mgaHS0fZRqNGPy/pub?gid=2131563256&single=true&output=csv",
  artists: "https://docs.google.com/spreadsheets/d/e/2PACX-1vQKXgRDO7m1O17pUoCTx49PE7nt9G9UKoc4JxeoOyfECi7kArKKnRy0yW4twqK43ySuXbuq-KpSFg1J/pub?gid=1242756051&single=true&output=csv",
  heroCards: "https://docs.google.com/spreadsheets/d/e/2PACX-1vSXgAuM8u9tTP5M8rrxvoZZ-P44QlklBGGc1TQBxWVf9_6pAFF3LH1J8UTsnrPzY8bIGMEjiyg05sMH/pub?gid=1674246266&single=true&output=csv",
  jobs: "https://docs.google.com/spreadsheets/d/e/2PACX-1vRf81aCyWeegLnPdFD_E1ZEWXbWbkMgYGvu4AXp7FFcA57uEboXyQKPe9VL08FILEZFzqj0H0JYa5_L/pub?gid=2122055784&single=true&output=csv",
};

// Fetch and parse CSV with proper quoted-field handling (including multi-line fields)
export async function fetchCSV(url: string): Promise<string[][]> {
  // Add cache-busting timestamp to bypass Google & browser cache
  const cacheBustedUrl = url + (url.includes('?') ? '&' : '?') + '_t=' + Date.now();
  const res = await fetch(cacheBustedUrl, { cache: 'no-store' });
  if (!res.ok) throw new Error(`Failed to fetch CSV: ${res.status}`);
  const text = await res.text();
  if (!text.trim()) return [];
  return parseCSVFull(text);
}

/**
 * Parse CSV text with support for multi-line quoted fields.
 * Handles newlines inside quoted cells, escaped quotes (""), and Windows \r\n.
 */
function parseCSVFull(text: string): string[][] {
  const rows: string[][] = [];
  let currentRow: string[] = [];
  let currentField = '';
  let inQuotes = false;

  for (let i = 0; i < text.length; i++) {
    const ch = text[i];

    if (inQuotes) {
      if (ch === '"') {
        if (text[i + 1] === '"') {
          // Escaped quote inside quoted field → single quote
          currentField += '"';
          i++;
        } else {
          // Closing quote
          inQuotes = false;
        }
      } else {
        // Inside quotes: preserve ALL characters including newlines
        currentField += ch;
      }
    } else {
      if (ch === '"') {
        // Opening quote
        inQuotes = true;
      } else if (ch === ',') {
        // End of field
        currentRow.push(currentField.trim());
        currentField = '';
      } else if (ch === '\n') {
        // End of row
        currentRow.push(currentField.trim());
        currentField = '';
        rows.push(currentRow);
        currentRow = [];
      } else if (ch === '\r') {
        // Skip \r (Windows CRLF)
      } else {
        currentField += ch;
      }
    }
  }

  // Push last field + row (if any content)
  currentRow.push(currentField.trim());
  if (currentRow.some(f => f !== '')) {
    rows.push(currentRow);
  }

  return rows;
}

function rowsToObjects(rows: string[][]) {
  if (rows.length < 2) return [];
  const headers = rows[0].map(h => h.toLowerCase().trim());
  return rows.slice(1).map(row => {
    const obj: Record<string, string> = {};
    headers.forEach((h, i) => obj[h] = row[i] || '');
    return obj;
  });
}

// ============================================================
// Data fetching
// ============================================================
// ── URL Helpers: accept full URLs OR raw codes ──

/** Extract YouTube video ID from a full URL (watch, embed, shorts, youtu.be) or return the raw ID as-is */
export function extractYoutubeId(urlOrId: string): string {
  if (!urlOrId) return '';
  const s = urlOrId.trim();
  // Already a raw 11-char ID
  if (/^[a-zA-Z0-9_-]{11}$/.test(s)) return s;
  // youtu.be/VIDEO_ID
  const short = s.match(/youtu\.be\/([a-zA-Z0-9_-]{11})/);
  if (short) return short[1];
  // youtube.com/watch?v=VIDEO_ID
  const watch = s.match(/[?&]v=([a-zA-Z0-9_-]{11})/);
  if (watch) return watch[1];
  // youtube.com/embed/VIDEO_ID
  const embed = s.match(/\/embed\/([a-zA-Z0-9_-]{11})/);
  if (embed) return embed[1];
  // youtube.com/shorts/VIDEO_ID
  const shorts = s.match(/\/shorts\/([a-zA-Z0-9_-]{11})/);
  if (shorts) return shorts[1];
  // Fallback: return as-is
  return s;
}

/** Extract Instagram reel code from a full URL or return the raw code as-is */
export function extractInstagramCode(urlOrId: string): string {
  if (!urlOrId) return '';
  const s = urlOrId.trim();
  // Already a raw code (no slashes)
  if (!s.includes('/')) return s;
  // instagram.com/reel/CODE or instagram.com/reel/CODE/
  const match = s.match(/instagram\.com\/reel\/([a-zA-Z0-9_-]+)/);
  if (match) return match[1];
  // Fallback: return as-is
  return s;
}

export interface Testimonial { name: string; role: string; quote: string; img: string; videoid: string; }
export interface TalkShowVideo { title: string; videoid: string; desc: string; }
export interface InstagramReel { name: string; reelcode: string; }
export interface AwardRecipient { name: string; award: string; year: string; body: string; description: string; reelcode: string; }
export interface SheetArtist { name: string; slug: string; profession: string; instrument: string; style: string; city: string; country: string; tags: string; bio: string; image: string; journey: string; youtubevideo: string; testimonials: string; }
export interface Job { id: string; title: string; category: string; location: string; applyby: string; applylink: string; status: string; featured: string; }

/** A journey section parsed from `## Heading\ntext...` format */
export interface JourneySection {
  heading: string;
  content: string[];
}

/**
 * Parse journey text with `## Subheading` markers into structured sections.
 * Lines starting with `## ` become headings; everything else is content.
 * Example input:
 *   ## Early Life
 *   Paragraph one.
 *   Paragraph two.
 *   ## Career
 *   Paragraph three.
 */
export function parseJourney(text: string): JourneySection[] {
  if (!text || !text.trim()) return [];
  const lines = text.trim().split('\n');
  const sections: JourneySection[] = [];
  let currentHeading = '';
  let currentContent: string[] = [];

  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed.startsWith('## ')) {
      // Save previous section
      if (currentHeading || currentContent.length > 0) {
        sections.push({ heading: currentHeading, content: [...currentContent] });
      }
      currentHeading = trimmed.slice(3).trim();
      currentContent = [];
    } else if (trimmed) {
      currentContent.push(trimmed);
    } else if (currentContent.length > 0) {
      // Blank line = paragraph break within current section
      // We'll keep it as a separator for paragraph splitting
      currentContent.push('');
    }
  }
  // Save last section
  if (currentHeading || currentContent.length > 0) {
    sections.push({ heading: currentHeading, content: currentContent.filter(p => p !== '') });
  }
  return sections;
}

export async function fetchTestimonials(): Promise<Testimonial[]> {
  const rows = await fetchCSV(CSV_URLS.testimonials);
  return rowsToObjects(rows) as unknown as Testimonial[];
}

export async function fetchTalkShow(): Promise<TalkShowVideo[]> {
  const rows = await fetchCSV(CSV_URLS.talkShow);
  return rowsToObjects(rows) as unknown as TalkShowVideo[];
}

export async function fetchInstagramAwards(): Promise<InstagramReel[]> {
  const rows = await fetchCSV(CSV_URLS.instagramAwards);
  return rowsToObjects(rows) as unknown as InstagramReel[];
}

export async function fetchInstagramPromo(): Promise<InstagramReel[]> {
  const rows = await fetchCSV(CSV_URLS.instagramPromo);
  return rowsToObjects(rows) as unknown as InstagramReel[];
}

export async function fetchInstagramCollab(): Promise<InstagramReel[]> {
  const rows = await fetchCSV(CSV_URLS.instagramCollab);
  return rowsToObjects(rows) as unknown as InstagramReel[];
}

export async function fetchAwards(): Promise<AwardRecipient[]> {
  const rows = await fetchCSV(CSV_URLS.awards);
  return rowsToObjects(rows) as unknown as AwardRecipient[];
}

export async function fetchArtists(): Promise<SheetArtist[]> {
  const rows = await fetchCSV(CSV_URLS.artists);
  return rowsToObjects(rows) as unknown as SheetArtist[];
}

export async function fetchHeroCards() {
  const rows = await fetchCSV(CSV_URLS.heroCards);
  return rowsToObjects(rows);
}

export async function fetchJobs(): Promise<Job[]> {
  const rows = await fetchCSV(CSV_URLS.jobs);
  return rowsToObjects(rows) as unknown as Job[];
}
