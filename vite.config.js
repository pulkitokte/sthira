import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",

      // Assets to include in precache beyond the build output
      includeAssets: ["icons/icon.svg", "offline.html"],

      // Web App Manifest — auto-injected into index.html by the plugin
      manifest: {
        name: "Sthira — Wellness & Movement Companion",
        short_name: "Sthira",
        description:
          "A calm wellness companion for students and focused individuals. Morning routines, study break recovery, eye relaxation, hydration, and daily wellness reflection.",
        theme_color: "#FBF8F2",
        background_color: "#FBF8F2",
        display: "standalone",
        orientation: "portrait-primary",
        scope: "/",
        start_url: "/",
        categories: ["health", "lifestyle", "productivity"],
        icons: [
          {
            src: "icons/icon-192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "icons/icon-512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "icons/icon-512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
          },
          {
            src: "icons/icon.svg",
            sizes: "any",
            type: "image/svg+xml",
          },
        ],
      },

      // Workbox service worker configuration
      workbox: {
        // Precache all built assets
        globPatterns: ["**/*.{js,css,html,ico,png,svg,woff,woff2}"],

        // SPA routing: serve cached index.html for all navigation requests
        // so React Router handles routes correctly while offline.
        // The full app loads from cache — all localStorage data remains intact.
        navigateFallback: "/index.html",

        // Don't intercept the offline fallback page itself
        navigateFallbackDenylist: [/^\/offline\.html/],

        // Cache Google Fonts so the app looks correct offline
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: "CacheFirst",
            options: {
              cacheName: "google-fonts-stylesheets",
              expiration: {
                maxEntries: 4,
                maxAgeSeconds: 60 * 60 * 24 * 365, // 1 year
              },
              cacheableResponse: { statuses: [0, 200] },
            },
          },
          {
            urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
            handler: "CacheFirst",
            options: {
              cacheName: "google-fonts-webfonts",
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365,
              },
              cacheableResponse: { statuses: [0, 200] },
            },
          },
        ],
      },
    }),
  ],
});
