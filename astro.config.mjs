import mdx from '@astrojs/mdx';
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://gabrielalmd.github.io',
  integrations: [mdx()],
});
