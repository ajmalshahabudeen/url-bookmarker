<template>
  <div>
    <DashHeader />
     <div v-for="Category, index in BookCatStore.categoryData">
      <NuxtLink :to="`${Category.categoryPath}`">
      {{ Category.categoryName }}
      </NuxtLink>
     </div>
    <pre>{{ BookCatStore.categoryData }}</pre>
  </div>
</template>

<script lang="ts" setup>
import DashHeader from '~/components/dasboard/DashHeader.vue';
import {useGetBookmarksCategoryStore} from '~/stores/useGetBookmarksCategoryStore'
const BookCatStore = useGetBookmarksCategoryStore()



</script>

<style>

</style>