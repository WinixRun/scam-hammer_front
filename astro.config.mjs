import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
<<<<<<< HEAD
  integrations: [tailwind(), react()],
  output: 'server',
=======
  integrations: [tailwind()],
>>>>>>> parent of dfde34a (update charts)
  server: {
    port: 4321,
  },
});
