// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  // Static output. No adapter, no SSR.
  output: 'static',
  // Canonical + Open Graph URLs are resolved against this.
  site: 'https://kevincharlie.dev',

  integrations: [react()],

  vite: {
    plugins: [tailwindcss()]
  }
});