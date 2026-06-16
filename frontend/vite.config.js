import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// 프론트: 4599, 백엔드 API: 4600 (프록시)
export default defineConfig({
  plugins: [react()],
  server: {
    port: 4599,
    proxy: {
      "/api": {
        target: "http://localhost:4600",
        changeOrigin: true,
      },
    },
  },
});
