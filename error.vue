<script setup lang="ts">
import type { NuxtError } from "#app";

const props = defineProps({
  error: Object as () => NuxtError,
});
</script>

<template>
  <div class="flex flex-col gap-5 items-center justify-center min-h-[90vh]">
    <h1 class="text-5xl font-matemasie">{{ error.statusCode }}</h1>
    <p class="text-xl">{{ error.message }}</p>
    <NuxtLink to="/">
      <UButton label="Go Back" size="xl" variant="outline" />
    </NuxtLink>
  </div>
</template>
