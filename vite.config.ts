import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  root: './',
  base: "/PROJECT-FRONTEND-DDI/", 
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'] 
  },
  esbuild: {
    loader: 'jsx',
    include: /src\/.*\.jsx?$/,
    exclude: []
  },
  server: {
    port: 3000, 
  },
});
