import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { VitePWA } from "vite-plugin-pwa";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      devOptions: {
        enabled: false,
      },
      registerType: "autoUpdate",
      injectRegister: "auto",
      includeAssets: [
        "favicon.svg",
        "favicon.png",
        "favicon-16x16.png",
        "favicon-32x32.png",
        "favicon-180x180.png",
        "favicon-192x192.png",
        "favicon-512x512.png",
      ],
      manifest: {
        name: "Ticky Toe",
        short_name: "Ticky Toe",
        description: "Fast Paced tic tac toe game with friends",
        theme_color: "#ffffff",
        background_color: "#ffffff",
        display: "standalone",
        icons: [
          {
            src: "favicon-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "favicon-180x180.png",
            sizes: "180x180",
            type: "image/png",
          },
          {
            src: "favicon-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
      workbox: {
        globPatterns: ["**/*.{js,css,html,svg,png,ttf}"],
        navigateFallback: "/index.html",
      },
    }),
  ],
});
