import { defineConfig, Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';
import fs from 'fs';

const BASE_URL = 'https://www.iica.app';
const DEFAULT_OG_IMAGE = `${BASE_URL}/opengraph.jpg`;

// Per-route meta configuration for social sharing
const ROUTE_META: Record<string, { title: string; description: string; image?: string; url: string }> = {
  '/': {
    title: 'IICA — International Indian Culture & Arts',
    description: "India's premier platform for performing artists. Build your brand, grow your earnings, and connect with 500+ Indian artists worldwide.",
    url: `${BASE_URL}/`,
  },
  '/about': {
    title: 'About IICA — Empowering 1 Million Artists',
    description: "We are on a mission to help 1 MILLION artists achieve their professional goals using innovative branding tools powered by technology.",
    url: `${BASE_URL}/about`,
  },
  '/artists': {
    title: 'Artists — IICA',
    description: 'Discover 500+ talented Indian performing artists on IICA. Explore artist profiles, events, and more.',
    url: `${BASE_URL}/artists`,
  },
  '/events': {
    title: 'Events — IICA',
    description: 'Explore upcoming and past events featuring Indian performing artists on IICA.',
    url: `${BASE_URL}/events`,
  },
  '/jobs': {
    title: 'Jobs — IICA',
    description: 'Find performing arts opportunities and jobs on IICA — the platform for Indian artists.',
    url: `${BASE_URL}/jobs`,
  },
  '/ceo': {
    title: "CEO's Message — IICA",
    description: 'A message from the CEO of IICA on our mission to empower Indian performing artists worldwide.',
    url: `${BASE_URL}/ceo`,
  },
  '/increase-earnings': {
    title: 'Increase Your Earnings — IICA',
    description: 'Learn how IICA helps performing artists achieve 40X revenue growth through proven branding and business strategies.',
    url: `${BASE_URL}/increase-earnings`,
  },
  '/relaunch-brand': {
    title: 'Relaunch Your Brand — IICA',
    description: 'Relaunch and reinvent your artist brand with IICA. Reach new audiences and build a lasting legacy.',
    url: `${BASE_URL}/relaunch-brand`,
  },
};

function buildMetaTags(meta: typeof ROUTE_META[string]): string {
  const image = meta.image ?? DEFAULT_OG_IMAGE;
  return `
    <!-- Open Graph -->
    <meta property="og:title" content="${meta.title}" />
    <meta property="og:description" content="${meta.description}" />
    <meta property="og:image" content="${image}" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:image:type" content="image/jpeg" />
    <meta property="og:url" content="${meta.url}" />
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="IICA" />
    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${meta.title}" />
    <meta name="twitter:description" content="${meta.description}" />
    <meta name="twitter:image" content="${image}" />`;
}

// Vite plugin: after build, generate per-route HTML files with static meta tags
function perRouteMetaPlugin(): Plugin {
  return {
    name: 'per-route-meta',
    closeBundle() {
      const distDir = path.resolve(__dirname, 'dist');
      const baseHtml = fs.readFileSync(path.join(distDir, 'index.html'), 'utf-8');

      for (const [route, meta] of Object.entries(ROUTE_META)) {
        if (route === '/') continue; // root index.html already has correct tags

        // Replace the OG block in the base HTML with route-specific tags
        const metaTags = buildMetaTags(meta);
        const routeHtml = baseHtml
          .replace(/<title>[^<]*<\/title>/, `<title>${meta.title}</title>`)
          .replace(/<meta name="description"[^>]*\/?>/, `<meta name="description" content="${meta.description}" />`)
          .replace(/<!-- Open Graph -->[\s\S]*?<meta name="twitter:image"[^>]*\/?>/, metaTags.trim());

        const routeDir = path.join(distDir, route);
        fs.mkdirSync(routeDir, { recursive: true });
        fs.writeFileSync(path.join(routeDir, 'index.html'), routeHtml, 'utf-8');
        console.log(`✓ Generated ${route}/index.html`);
      }
    },
  };
}

export default defineConfig({
  plugins: [react(), tailwindcss(), perRouteMetaPlugin()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 5173,
    open: true,
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Animation library
          'vendor-motion': ['framer-motion'],
          // Form/validation libraries
          'vendor-forms': ['react-hook-form', '@hookform/resolvers', 'zod'],
          // UI primitives (Radix)
          'vendor-ui': [
            '@radix-ui/react-dialog',
            '@radix-ui/react-label',
            '@radix-ui/react-slot',
            '@radix-ui/react-toast',
          ],
          // Icons
          'vendor-icons': ['lucide-react', 'react-icons'],
          // Routing
          'vendor-router': ['wouter'],
        },
      },
    },
    // Raise the warning threshold slightly since we're now splitting
    chunkSizeWarningLimit: 600,
  },
});
