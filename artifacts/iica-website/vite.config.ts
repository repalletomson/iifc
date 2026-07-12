import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

export default defineConfig({
  plugins: [react(), tailwindcss()],
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
