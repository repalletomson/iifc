import type { Event } from '@/lib/googleSheets';

// ─── Constants ────────────────────────────────────────────────────────────────
export const WHATSAPP_NUMBER = '919542758814';
export const DEFAULT_UPI_ID  = '9542758814@ybl';
export const DEFAULT_QR      = 'https://drive.google.com/thumbnail?id=1OkGlPWk5Ezyaw4lLjPasKui4--Awfu5y&sz=w600';

/**
 * Google Apps Script Web App URL.
 * Deploy your Apps Script (see README) and paste the URL here.
 * Leave empty to skip the sheet POST (form still works, just won't save to sheet).
 */
export const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbw99sKi--GYxIfCFcgHQ3Cq-VGpnTn1Ojjcisa0-D1GQuDEj0ZzxA_3SYKFxR9LMVh24A/exec';

// ─── Helpers ──────────────────────────────────────────────────────────────────

/** Build a UPI deep-link (mobile only) */
export function buildUpiLink(upiId: string, amount: string, note: string): string {
  const params = new URLSearchParams({
    pa: upiId.trim(),
    pn: 'IICA Events',
    am: amount.trim(),
    cu: 'INR',
    tn: note.trim(),
  });
  return `upi://pay?${params.toString()}`;
}

/** Extract Google Drive file ID from any Drive URL */
export function extractDriveId(url: string): string {
  if (!url) return '';
  const m = url.match(/\/d\/([a-zA-Z0-9_-]+)/) ||
            url.match(/[?&]id=([a-zA-Z0-9_-]+)/);
  return m ? m[1] : '';
}

/**
 * Return a URL that works in <img> tags for both Drive and regular URLs.
 * Drive share links → thumbnail endpoint (bypasses CORS).
 * Regular URLs → returned as-is.
 */
export function toImgUrl(url: string, size = 'w800'): string {
  if (!url) return '';
  if (url.includes('thumbnail?id=')) return url;
  const id = extractDriveId(url);
  if (id) return `https://drive.google.com/thumbnail?id=${id}&sz=${size}`;
  return url;
}

/** Slug from event id or title */
export function eventSlug(event: Event): string {
  return event.id || event.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

// ─── Dummy data ───────────────────────────────────────────────────────────────
export const DUMMY_EVENTS: Event[] = [
  {
    id: '1',
    title: 'IICA Annual Classical Music Summit 2025',
    description: `A grand confluence of India's finest classical musicians. Witness live performances, masterclasses, and award ceremonies celebrating the legacy of Indian performing arts.

This three-day summit brings together over 100 artists from across the country for performances, panel discussions, and exclusive networking sessions. Attendees will have the opportunity to meet and learn from Padma awardees, Grammy-nominated composers, and internationally touring performers.

**What to expect:**
- Opening night gala performance
- Morning masterclasses across 5 disciplines
- Afternoon panel: "The Future of Indian Classical Music"
- Awards ceremony on Day 3
- Networking dinner with artists

Seats are limited. Register early to secure your spot.`,
    price: '999',
    date: 'September 25–27, 2025',
    venue: 'The Leela Palace',
    city: 'New Delhi',
    category: 'Summit',
    image: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=1200&q=80',
    upi_id: DEFAULT_UPI_ID,
    qr_image: DEFAULT_QR,
    ticket_link: '',
    status: 'upcoming',
    featured: 'yes',
  },
  {
    id: '2',
    title: 'Hindustani Vocal Masterclass with Pandit Narsimha Joshi',
    description: `An exclusive hands-on masterclass on Hindustani vocal techniques, ragas, and performance etiquette. Limited seats — only 20 participants.

Pandit Narsimha Joshi is a Padma Shri recipient with over 40 years of concert experience. This rare 6-hour intensive session covers:

- Raga identification and emotional mapping
- Sur, laya, and taal fundamentals
- Stage presence and performance psychology
- Recordings critique of your own performances
- Q&A with Panditji

Suitable for intermediate and advanced vocalists. Beginners with a year of training are also welcome.`,
    price: '1500',
    date: 'October 12, 2025',
    venue: 'IICA Studio',
    city: 'Mumbai',
    category: 'Workshop',
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=1200&q=80',
    upi_id: DEFAULT_UPI_ID,
    qr_image: DEFAULT_QR,
    ticket_link: '',
    status: 'upcoming',
    featured: 'no',
  },
  {
    id: '3',
    title: 'IICA Kathak & Bharatanatyam Evening',
    description: `An enchanting evening of classical dance forms featuring IICA's celebrated dance artists. Celebrating the beauty of Indian classical dance through storytelling and rhythm.

The program includes solo performances by three nationally acclaimed artists, followed by a collaborative jugalbandi finale that brings Kathak and Bharatanatyam together on one stage — a rare and memorable spectacle.

Doors open at 6:30 PM. Performance begins at 7:00 PM. Light refreshments will be served during the interval.`,
    price: '500',
    date: 'November 5, 2025',
    venue: 'Rabindra Sadan',
    city: 'Kolkata',
    category: 'Performance',
    image: 'https://images.unsplash.com/photo-1508700929628-666bc8bd84ea?w=1200&q=80',
    upi_id: DEFAULT_UPI_ID,
    qr_image: DEFAULT_QR,
    ticket_link: '',
    status: 'active',
    featured: 'no',
  },
  {
    id: '4',
    title: 'Artist Branding & Digital Growth Workshop',
    description: `Learn how to build your personal brand as a performing artist using social media, SEO, and digital marketing. Conducted by IICA's senior branding coaches.

This full-day workshop is designed specifically for performing artists who want to grow their online presence, attract international bookings, and build a legacy beyond their performances.

**Topics covered:**
- Building your artist website that ranks on Google
- Instagram strategy for classical artists
- YouTube monetisation for performers
- Email marketing and fan engagement
- How to pitch yourself to international festivals

Laptop required. Lunch and materials included in registration fee.`,
    price: '750',
    date: 'October 28, 2025',
    venue: 'ITC Gardenia',
    city: 'Bangalore',
    category: 'Workshop',
    image: 'https://images.unsplash.com/photo-1551818255-e6e10975bc17?w=1200&q=80',
    upi_id: DEFAULT_UPI_ID,
    qr_image: DEFAULT_QR,
    ticket_link: '',
    status: 'active',
    featured: 'no',
  },
  {
    id: '5',
    title: 'IICA Instagram Awards Ceremony 2025',
    description: `The annual ceremony honouring India's most influential artists on Instagram. Red carpet, live performances, and award presentations in one spectacular evening.

This is a free event open to all IICA members and the public. The ceremony recognises artists across 12 categories including Most Inspiring Classical Artist, Best Music Video, and the IICA Legacy Award.

Dress code: Formal / Traditional Indian attire encouraged.`,
    price: '0',
    date: 'December 15, 2025',
    venue: 'Taj Lands End',
    city: 'Mumbai',
    category: 'Awards',
    image: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=1200&q=80',
    upi_id: DEFAULT_UPI_ID,
    qr_image: DEFAULT_QR,
    ticket_link: '',
    status: 'upcoming',
    featured: 'yes',
  },
  {
    id: '6',
    title: 'Flute & Strings — An Evening of Fusion',
    description: `Experience an unforgettable evening where classical bansuri meets contemporary strings. A rare collaboration featuring IICA artists from across genres.

The performance features Pt. Uma Shankar on bansuri alongside a quartet of string musicians trained in both Carnatic and Western classical traditions. The evening explores the intersection of ragas and chord progressions, creating music that is rooted in tradition yet entirely new.

Suitable for all ages. No prior knowledge of classical music required.`,
    price: '599',
    date: 'November 22, 2025',
    venue: 'Alliance Française',
    city: 'Hyderabad',
    category: 'Concert',
    image: 'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?w=1200&q=80',
    upi_id: DEFAULT_UPI_ID,
    qr_image: DEFAULT_QR,
    ticket_link: '',
    status: 'active',
    featured: 'no',
  },
  {
    id: '7',
    title: 'IICA Members Networking Meetup — Hyderabad',
    description: `An informal networking evening exclusively for IICA members in Hyderabad. Meet fellow artists, share experiences, and explore collaboration opportunities.

No agenda, no presentations — just great conversation, chai, and music.`,
    price: '0',
    date: 'October 5, 2025',
    venue: 'TBA',
    city: 'Hyderabad',
    category: 'Meetup',
    image: '',
    upi_id: '',
    qr_image: '',
    ticket_link: '',
    status: 'upcoming',
    featured: 'no',
  },
  {
    id: '8',
    title: 'Tabla Intensive — Weekend Workshop',
    description: `A two-day intensive workshop for tabla players at all levels. Covers fundamental strokes, compositions in teen taal and ek taal, and performance tips from a seasoned guru.

Bring your tabla. Limited to 15 participants. Certificate provided.`,
    price: '1200',
    date: 'November 15–16, 2025',
    venue: 'TBA',
    city: 'Pune',
    category: 'Workshop',
    image: '',
    upi_id: DEFAULT_UPI_ID,
    qr_image: DEFAULT_QR,
    ticket_link: '',
    status: 'upcoming',
    featured: 'no',
  },
];
