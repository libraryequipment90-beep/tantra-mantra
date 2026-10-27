import { defineConfig } from 'vite'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  server: {
    host: '0.0.0.0',
    port: 5173,
    allowedHosts: ['.monkeycode-ai.live']
  },
  preview: {
    host: '0.0.0.0',
    port: 5173,
    allowedHosts: ['.monkeycode-ai.live']
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(root, 'index.html'),
        blog: resolve(root, 'blog.html'),
        homePuja: resolve(root, 'blog/home-puja.html'),
        negativeEnergy: resolve(root, 'blog/negative-energy.html'),
        mantraChanting: resolve(root, 'blog/mantra-chanting.html'),
        yantras: resolve(root, 'blog/yantras.html'),
        consultation: resolve(root, 'blog/consultation.html'),
        sacredFire: resolve(root, 'blog/sacred-fire.html')
      }
    }
  }
})
