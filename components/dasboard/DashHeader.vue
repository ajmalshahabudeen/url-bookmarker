<template>
  <div>
    <UContainer
      class="inline-flex gap-4 max-w-full overflow-x-auto no-scrollbar my-5"
    >
      <UButton
        variant="outline"
        icon="material-symbols:filter-alt-outline-sharp"
        label="Filter"
      />
      <UButton
        variant="outline"
        icon="material-symbols:refresh-rounded"
        label="Refresh"
        @click="BookCatStore.getBookmarkCategory('/test')"
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
      <p>{{ route.path }}</p>
    </UContainer>
  </div>
</template>

<script lang="ts" setup>
import {useGetBookmarksCategoryStore} from '~/stores/useGetBookmarksCategoryStore'
const BookCatStore = useGetBookmarksCategoryStore()

const route = useRoute()

</script>

<style>
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
</style>
