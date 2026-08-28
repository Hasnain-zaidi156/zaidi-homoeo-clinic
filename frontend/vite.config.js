import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// The dev server proxies any /api request to the Express backend on port 5000,
// so the frontend and backend can run together without CORS headaches.
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      "/api": {
        target: "http://localhost:5000",
        changeOrigin: true,
      },
    },
  },
});
