<template>
  <NuxtPwaManifest />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
  <UNotifications />
</template>
<script lang="ts" setup>

useHead({
  title: 'BookMarker',
  meta: [
    { name: 'description', content: 'An awesome bookmark manager.' },
    { name: 'google-site-verification', content: 'XAIUyWxtFzt6NL3RTFDFpBWSyZ8unmcB94rtsvzC8fY' }
  ],
  htmlAttrs: {
    lang: 'en'
  },
  link: [
    {
      rel: 'icon',
      type: 'image/x-icon',
      href: '/favicon.ico'
    }
  ]
})
// <meta name="google-site-verification" content="XAIUyWxtFzt6NL3RTFDFpBWSyZ8unmcB94rtsvzC8fY" />
useSeoMeta({
  title: 'BookMarker',
  ogTitle: 'BookMarker',
  twitterTitle: 'BookMarker',
  twitterDescription: 'An awesome bookmark manager.',
  ogUrl: 'https://myurlbookmarker.vercel.app',
  description: 'An awesome bookmark manager.',
  ogDescription: 'An awesome bookmark manager.',
  ogImage: 'https://myurlbookmarker.vercel.app/bookmarker.png',
  twitterCard: 'summary_large_image',
  twitterImage: 'https://myurlbookmarker.vercel.app/bookmarker.png',
  author: 'Ajmal Shahabudeen',
  publisher: 'Ajmal Shahabudeen',
  googlebot: 'notranslate'
  
})

</script>