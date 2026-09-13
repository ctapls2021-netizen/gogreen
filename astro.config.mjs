// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  redirects: {
    '/home-insultation': '/home-insulation',
    '/solar-energy': '/energy-solar'
  },
  vite: {
    plugins: [tailwindcss()]
  }
});