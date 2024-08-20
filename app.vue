<template>
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
  ],
})

useSeoMeta({
  title: 'BookMarker',
  ogTitle: 'BookMarker',
  description: 'An awesome bookmark manager.',
  ogDescription: 'An awesome bookmark manager.',
  ogImage: 'https://example.com/image.png',
  twitterCard: 'summary_large_image',
})

</script>