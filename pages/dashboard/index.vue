<template>
  <div>
    <DashHeader />
    <!-- <UButton label="Add" @click="Add" /> -->
     <div v-for="Category, index in CategoryData">
      {{ Category.categoryName }}
     </div>
    <!-- <pre>{{ CategoryData }}</pre> -->
  </div>
</template>

<script lang="ts" setup>
import DashHeader from '~/components/dasboard/DashHeader.vue';
import { AddBookmarkCategory, GetBookmarkCategory } from '~/utils/bookmark/category';

const Add = async () => {
  await AddBookmarkCategory("test", "/test")
}

type CatData = {
  id: string
  categoryName: string
  categoryPath: string
}

const CategoryData = ref<CatData[]>()

const Get = async () => {
  await GetBookmarkCategory("/test").then((res:any) => {
    console.log(res)
    CategoryData.value = res
  })
}

onMounted(() => {
  Get()
})

</script>

<style>

</style>