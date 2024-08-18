<template>
  <div>
    <DashHeader />

    Hi {{ route.path }}
  </div>
</template>

<script lang="ts" setup>
import DashHeader from '~/components/dasboard/DashHeader.vue';

const route = useRoute()

</script>

<style>

</style>