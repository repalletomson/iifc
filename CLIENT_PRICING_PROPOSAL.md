# IICA Website — Client Pricing Proposal

> **Prepared for:** Client Pitch  
> **Date:** July 2026  
> **Project:** Indian Institute of Culture & Arts (IICA) — Full Website  

---

## 1. Project Overview

A fully dynamic, data-driven artist platform built with **React 19 + TypeScript + Vite**, featuring **Google Sheets as a free CMS backend**, dual light/dark theme, rich animations, and 11 SEO-optimized pages. The client can update ALL content (artists, jobs, testimonials, events, awards, blog posts) via Google Sheets — no coding or CMS subscription required.

---

## 2. Page-by-Page Breakdown

| # | Page | Route | Complexity | Key Features |
|---|---|---|---|---|
| 1 | **Home** | `/` | 🔴 High | Hero video background, cycle-typing animation, testimonials carousel, awards section, talk show video carousel, hero cards, artist showcase grid, consultation modal CTA |
| 2 | **About** | `/about` | 🟡 Medium | Cinematic mission header, animated stat counters (in-view), PURPOSE typography, 3 pillars |
| 3 | **Artists** | `/artists` | 🟡 Medium | Search bar, genre filter chips, dynamic grid — 100% Google Sheets-driven |
| 4 | **Artist Profile** | `/artist/:slug` | 🔴 High | Dynamic routing, data merging (local + Sheets), markdown journey parser, YouTube gallery, testimonials carousel, Instagram embeds, SEO per artist |
| 5 | **Events** | `/events` | 🟡 Medium | Featured auto-advancing carousel, category filters, toast notifications |
| 6 | **Jobs & Gigs** | `/jobs` | 🟡 Medium | Search + dynamic category filters, featured/active badges, external apply links, Sheets-driven |
| 7 | **Membership** | `/membership` | 🔴 High | Zod-validated 5-field form, WhatsApp redirect, Instagram reels showcase (2 scrollable rows), multiple benefit sections |
| 8 | **Increase Earnings** | `/increase-earnings` | 🟢 Low-Med | Animated 80% counter, 3-step methodology, CTA |
| 9 | **Relaunch Brand** | `/relaunch-brand` | 🟢 Low-Med | Challenges vs Solutions comparison, 4 solution cards, CTA |
| 10 | **CEO's Desk** | `/ceo` | 🔴 High | Blog viewer from Google Sheets, markdown parser (bold/italic/lists/quotes), Instagram reels grid, newsletter form |
| 11 | **Not Found** | `*` | 🟢 Low | Custom 404 |

---

## 3. Google Sheets CMS Integration (10 Data Sources)

The entire website is powered by **10 Google Sheets** acting as a free, no-code CMS:

| # | Sheet | Purpose | Used On |
|---|---|---|---|
| 1 | `testimonials` | Artist testimonials (name, role, quote, video) | Home, Artist Profile |
| 2 | `talkShow` | YouTube talk show episodes | Home |
| 3 | `instagramAwards` | Instagram award reels | Home, Membership |
| 4 | `instagramPromo` | Promotional Instagram reels | Membership |
| 5 | `instagramCollab` | Collaboration Instagram reels | Membership |
| 6 | `awards` | Award recipients with reel codes | Home |
| 7 | `artists` | Artist profiles (name, bio, tags, journey, YouTube, image) | Artists, Artist Profile, Home |
| 8 | `heroCards` | Homepage hero card content | Home |
| 9 | `jobs` | Job listings with status/featured flags | Jobs |
| 10 | `CEO Blog` | Blog posts with markdown content | CEO's Desk |

### Custom CSV Parser Features:
- Multi-line quoted fields (cells containing newlines)
- Escaped double-quotes (`""`)
- Windows `\r\n` line ending support
- Automatic cache-busting timestamps
- YouTube URL → Video ID extraction (watch/embed/shorts/youtu.be)
- Instagram URL → Reel code + content type extraction
- Image path sanitization (backslash → forward slash, space encoding)
- Journey text parser (`## Subheading` → structured JSON sections)

---

## 4. Additional Technical Features

| Feature | Details |
|---|---|
| **Dual Theme System** | Full light/dark mode, localStorage persistence, system preference auto-detection, all 55+ components themed |
| **55+ UI Components** | Customized shadcn/ui library (accordion, dialog, carousel, form, toast, sidebar, chart, calendar, etc.) |
| **Framer Motion Animations** | Page transitions, scroll-triggered reveal, auto-advancing carousels, animated counters, cycle-typing text |
| **Form System** | 2 validated forms (Membership + Consultation), React Hook Form + Zod schemas, WhatsApp submission |
| **Responsive Design** | Mobile-first approach, all 11 pages fully responsive across devices |
| **WhatsApp Integration** | Floating WhatsApp button + form-to-WhatsApp message redirect |
| **SEO Optimization** | Semantic HTML, meta tags, proper SPA routing, artist-level SEO |
| **Deployment** | Vercel serverless deploy with SPA rewrites |

---

## 5. Pricing

### Total Project Cost: ₹19,000

| Phase | Screens | Deliverable | Price (₹) |
|---|---|---|---|
| Frontend | 11 | 11 pages, 55+ components, animations | 10,000 |
| Google Sheets CMS | 10 | 10 data sources, custom CSV parser, data merging | 5,000 |
| Forms + WhatsApp + Responsive | 2 | 2 validated forms, modal, toast notifications, mobile-first responsive | 1,500 |
| Deployment + Hosting + SEO | All | Vercel deploy, hosting, meta tags, routing, rewrites | 2,500 |
| **TOTAL** | **11** | | **₹19,000** |

---

## 6. Tech Stack

| Category | Technology |
|---|---|
| Framework | React 19 + TypeScript |
| Build Tool | Vite |
| Styling | Tailwind CSS + Radix UI (shadcn/ui) |
| Animation | Framer Motion |
| Forms | React Hook Form + Zod |
| Routing | Wouter (SPA) |
| Data Fetching | @tanstack/react-query |
| Icons | Lucide React + React Icons |
| Hosting | Vercel |
| CMS | Google Sheets (published CSV) |

---

## 7. What the Client Can Manage Without a Developer

After handover, the client can update the following **without touching any code** — just edit the Google Sheets:

- ✅ Add/remove/edit artist profiles
- ✅ Post new job listings
- ✅ Update testimonials
- ✅ Add new events (future)
- ✅ Modify award recipients
- ✅ Change homepage hero card content
- ✅ Publish CEO blog posts (with rich markdown formatting)
- ✅ Update Instagram reel embeds
- ✅ Manage talk show video links

---

## 8. Deliverables

1. Full source code (React + TypeScript)
2. Deployed website on Vercel (live URL)
3. Google Sheets setup guide (which columns to edit)
4. 30 days post-launch bug-fix support

---

> **Contact for questions or to proceed with the project.**

---

## 9. Invoice Summary — Quick Overview

### Project: IICA Website (Indian Institute of Culture & Arts)

**11-Screen Responsive Website** built with React 19 + TypeScript + Vite, deployed on Vercel.

---

### 📄 Screens Delivered

| # | Screen | Route |
|---|--------|-------|
| 1 | Home | `/` |
| 2 | About Us | `/about` |
| 3 | Artists Directory | `/artists` |
| 4 | Artist Profile (dynamic) | `/artist/:slug` |
| 5 | Events | `/events` |
| 6 | Jobs & Gigs | `/jobs` |
| 7 | Membership | `/membership` |
| 8 | Increase Earnings | `/increase-earnings` |
| 9 | Relaunch Brand | `/relaunch-brand` |
| 10 | CEO's Desk | `/ceo` |
| 11 | 404 Not Found | `*` |

---

### 🎨 Theme & Design

- **Dual Theme:** Light & Dark mode with toggle
- **Persistence:** User preference saved to localStorage + auto-detects system preference
- **Color Palette:** Instagram-inspired gradient (Purple `#833AB4` → Pink `#C13584` → Rose `#E1306C`)
- **Typography:** Serif headings + Sans-serif body, bold uppercase hero typography
- **55+ Custom UI Components:** Full shadcn/ui component library themed for both modes
- **Animations:** Framer Motion — page transitions, scroll reveals, auto carousels, animated counters, cycle-typing text
- **Responsive:** Mobile-first, all 11 screens fully responsive

---

### 🔌 Integrations

| Integration | Details |
|---|---|
| **Google Sheets CMS** | 10 data sources (artists, jobs, testimonials, events, awards, blog, reels, hero cards) |
| **WhatsApp** | Floating button + form-to-WhatsApp redirect for membership & consultation |
| **YouTube** | Embedded video gallery, URL-to-ID extraction |
| **Instagram** | Reel embeds, URL-to-code extraction |
| **Vercel** | Serverless hosting + automatic deployments |

---

### 💰 Invoice Breakdown

| Item | Qty | Rate (₹) | Amount (₹) |
|---|---|---|---|
| Frontend Development (11 screens, 55+ components, animations) | 1 | 10,000 | 10,000 |
| Google Sheets CMS Integration (10 data sources, custom CSV parser) | 1 | 5,000 | 5,000 |
| Forms + WhatsApp + Responsive Design | 1 | 1,500 | 1,500 |
| Deployment + Hosting + SEO (Vercel) | 1 | 2,500 | 2,500 |
| **GRAND TOTAL** | | | **₹19,000** |
