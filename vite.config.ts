import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import cesium from 'vite-plugin-cesium';

export default defineConfig({
  plugins: [
    react(),
    cesium(), // plugin Cesium
  ],
  resolve: {
    alias: {
      // pour utiliser "cesium" proprement dans les imports
      cesium: 'cesium',
    },
  },
  server: {
    port: 1234,
  },
});
