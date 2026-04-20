import { defineConfig } from 'astro/config';

// marketplace.lemonzestdigital.com — static build
// Served by nginx:alpine via bind-mount on dist/ (see ops/docker-compose.marketplace.yml)
export default defineConfig({
  site: 'https://marketplace.lemonzestdigital.com',
  trailingSlash: 'ignore',
  build: {
    format: 'directory', // /produits/marketing-agence-fr/index.html
    assets: '_assets',
    inlineStylesheets: 'auto',
  },
  compressHTML: true,
  devToolbar: { enabled: false },
});
