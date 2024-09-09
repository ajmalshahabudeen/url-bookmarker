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

});