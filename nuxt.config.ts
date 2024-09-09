// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  css: ["~/assets/css/main.css"],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  devtools: { enabled: true },
  modules: [
    "@nuxt/icon",
    "nuxtjs-naive-ui",
    "@nuxt/ui",
    "@nuxt/fonts",
    "@sidebase/nuxt-auth",
    "@pinia/nuxt",
    "@pinia-plugin-persistedstate/nuxt",
    "@nuxtjs/sitemap",
    "@vite-pwa/nuxt",
  ],
  colorMode: {
    preference: "system", // default value of $colorMode.preference
  },
  fonts: {
    families: [
      {
        name: "Poppins",
        weights: [100, 200, 300, 400, 500, 600, 700, 800, 900],
        provider: "google",
      },
      {
        name: "Matemasie",
        provider: "google",
      },
    ],
  },
  auth: {
    globalAppMiddleware: true,
    provider: {
      type: "authjs",
    },
  },
  site: {
    url: 'https://myurlbookmarker.vercel.app',
    name: 'BookMarker',
  },
  pwa: {
    strategies: "generateSW",
    registerType: "autoUpdate",
    devOptions: {
      enabled: true,
    },
    manifest: {
      name: "BookMarker",
      short_name: "BookMarker",
      start_url: "/",
      description: "An awesome bookmark manager.",
      categories: ["Bookmark Manager"],
      icons: [
        {
          src: "/pwa-64x64.png",
          sizes: "64x64",
          type: "image/png",
        },
        {
          src: "/pwa-192x192.png",
          sizes: "192x192",
          type: "image/png",
        },
        {
          src: "/pwa-512x512.png",
          sizes: "512x512",
          type: "image/png",
        },
      ],
      lang: "en",
      display: "fullscreen",
      theme_color: "#ffffff",
      background_color: "#000000",
    },
  }

});