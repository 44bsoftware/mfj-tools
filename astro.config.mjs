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
    // 'directory' emits e.g. dist/about/index.html, which Cloudflare Pages serves at /about/
    // directly without the 308 trailing-slash-strip redirect that 'file' triggers.
    format: 'directory',
  },
})
