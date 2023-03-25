import { defineConfig } from 'vite'
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    svelte({
      preprocess: vitePreprocess()
    }),
    VitePWA({
      registerType: 'autoUpdate',
      workbox: {
        globPatterns: ['**/*.{js,css,html,svg,png,ico}']
      },
      manifest: {
        name: "Kostky",
        description: "Aplikace pro zaznamenávání bodů v kostkách",
        short_name: "Kostky",
        icons: [
          {
            src: "android-chrome-192x192.png",
            sizes: "192x192",
            type: "image/png"
          },
          {
            src: "android-chrome-512x512.png",
            sizes: "512x512",
            type: "image/png"
          },
          {
            src: "safari-pinned-tab.svg",
            sizes: "any",
            type: "image/svg",
            purpose: "any maskable"
          }
        ],
        theme_color: "#ffffff",
        background_color: "#ffffff",
        display: "standalone"
      }
    })
  ]
})
