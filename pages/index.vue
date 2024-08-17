<template>
  <div
    class="flex flex-col gap-5 items-start md:items-center justify-center min-h-[80vh] md:min-h-[90vh] px-5"
  >
    <p
      class="text-4xl md:text-5xl tracking-widest font-extralight animate__animated animate__fadeInDown"
    >
      Welcome to <span class="font-matemasie"> BookMarker </span>
    </p>
    <p class="text-2xl md:text-3xl tracking-widest font-medium">
      An awesome bookmark manager.
    </p>
    <NuxtLink to="/login">
    <UButton
      icon="material-symbols:line-end-arrow-outline-rounded"
      size="xl"
      color="primary"
      variant="solid"
      label="Get Started"
      trailing
    />
    </NuxtLink>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  auth: false,
});
</script>

<style></style>
