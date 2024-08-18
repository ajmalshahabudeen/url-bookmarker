<template>
  <div>
    <DashHeader />
    <div
      v-for="(Category, index) in BookCatStore.categoryData"
      class="p-5 md:p-20"
    >
      <NuxtLink :to="`/dashboard/${Category.categoryName}`">
        <UButton
          :label="Category.categoryName"
          :key="index"
          variant="outline"
          class="h-20 w-20 text-center text-xl rounded-tr-3xl"
        />
      </NuxtLink>
    </div>
    <!-- <pre>{{ BookCatStore.categoryData }}</pre> -->
  </div>
</template>

<script lang="ts" setup>
import DashHeader from "~/components/dasboard/DashHeader.vue";
import { useGetBookmarksCategoryStore } from "~/stores/useGetBookmarksCategoryStore";
const BookCatStore = useGetBookmarksCategoryStore();
</script>

<style></style>
