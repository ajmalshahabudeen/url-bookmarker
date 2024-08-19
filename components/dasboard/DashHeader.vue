<template>
  <div class="w-full flex justify-center">
    <UContainer
      class="inline-flex gap-4 max-w-full overflow-x-auto no-scrollbar my-5"
    >
      <UButton
        variant="outline"
        icon="material-symbols:filter-alt-outline-sharp"
        :label="FilterStore.filter && FilterStore.filter"
        @click="FilterStore.toggleFilter"
      />
      <UButton
        variant="outline"
        icon="material-symbols:refresh-rounded"
        label="Refresh"
        @click="refresh"
      />
      <UButton
        variant="outline"
        icon="mdi:plus-circle-outline"
        label="Add Bookmark"
      />
      <UButton
        variant="outline"
        icon="mdi:plus-circle-outline"
        label="Add Category"
      />
      <!-- <p>{{ route.path }}</p> -->
    </UContainer>
  </div>
</template>

<script lang="ts" setup>
import {useGetBookmarksCategoryStore} from '~/stores/useBookmarksCategoryStore'
const BookCatStore = useGetBookmarksCategoryStore()
const UrlStore = useUrlsStore()
const FilterStore = useMyUseFilterStore()
const route = useRoute()
const path = route.path

onMounted(() => {
  BookCatStore.getBookmarkCategory(path)
  UrlStore.getBookmarkUrl(path)
})

const refresh = () => {
  BookCatStore.$reset()
  BookCatStore.getBookmarkCategory(path)
}

</script>

<style>
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
</style>
