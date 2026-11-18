import { resolve } from 'path'
import { defineConfig } from 'vite';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';

export default defineConfig({
  base: '/future-tech/',
  plugins: [
    ViteImageOptimizer({
      // Плагин работает только при сборке (vite build),
      // чтобы не замедлять dev-сервер

      // Настройки для растровой графики
      png: {
        quality: 80, // Сжатие с потерями (0-100)
      },
      jpeg: {
        quality: 75,
      },

      // Настройки для современных веб-форматов
      webp: {
        quality: 80,
        lossless: false,
      },
      avif: {
        quality: 70, // AVIF сжимает лучше, поэтому можно ставить качество ниже
        lossless: false,
      },

      // Векторная графика
      svg: {
        multipass: true, // Прогоняет SVG через оптимизатор несколько раз
        plugins: [
          {
            name: 'preset-default',
            params: {
              overrides: {
                removeViewBox: false, // Важно оставить для адаптивности SVG
              },
            },
          },
        ],
      },
    }),
  ],
  build: {
    rolldownOptions: {
      input: {
        home: resolve(__dirname, 'index.html'),
        blog: resolve(__dirname, 'blog.html'),
        news: resolve(__dirname, 'news.html'),
        podcasts: resolve(__dirname, 'podcasts.html'),
        resources: resolve(__dirname, 'resources.html'),
        contacts: resolve(__dirname, 'contacts.html'),
      }
    }
  }
});