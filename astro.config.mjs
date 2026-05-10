// @ts-check
import { defineConfig } from 'astro/config'
import tailwindcss from '@tailwindcss/vite'
import sitemap from '@astrojs/sitemap'
import icon from 'astro-icon'

export default defineConfig({
  site: 'https://mfjtools.com',
  base: '/',

  vite: {
    plugins: [tailwindcss()],
  },

  integrations: [icon(), sitemap()],

  output: 'static',
  trailingSlash: 'always',
  build: {
    format: 'file',
  },
})
