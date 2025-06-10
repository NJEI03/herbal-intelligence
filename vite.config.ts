import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: "::",
    port: 8080,
    proxy: {
      // Proxy API requests during development to avoid CORS issues
      '/api/prompt': {
        target: 'https://herbalai.deepxlabs.tech',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/prompt/, '/api/prompt'),
      },
    },
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
