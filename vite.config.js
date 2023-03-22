import { defineConfig } from 'vite'
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte'
import { svelte } from '@sveltejs/vite-plugin-svelte'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte({
    preprocess: vitePreprocess()
  })]
})
