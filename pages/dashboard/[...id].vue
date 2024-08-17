<template>
  <div>
    Hi {{ route.params.id }}
  </div>
</template>

<script lang="ts" setup>
const route = useRoute()

</script>

<style>

</style>