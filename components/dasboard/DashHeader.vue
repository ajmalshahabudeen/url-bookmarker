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
        @click="BookisOpen = true"
      />
      <UButton
        variant="outline"
        icon="mdi:plus-circle-outline"
        label="Add Category"
        @click="CatisOpen = true"
      />
      <!-- <p>{{ route.path }}</p> -->
    </UContainer>
    <UModal v-model="BookisOpen">
      <div class="flex flex-col gap-5 p-5">
        <h1 class="text-3xl font-bold">Add Bookmark</h1>
        <form @submit.prevent="addUrlSubmit">
          <UInput
            v-model="newUrl"
            placeholder="new url"
            class="w-full"
            required
          />
          <UButton
            label="Add to Bookmarks"
            class="w-full mt-5"
            type="submit"
          />
        </form>
      </div>
    </UModal>
    <UModal v-model="CatisOpen">
      <div class="flex flex-col gap-5 p-5">
        <h1 class="text-3xl font-bold">Add Category</h1>
        <form @submit.prevent="addCatSubmit">
          <UInput
            v-model="catName"
            placeholder="new category"
            class="w-full"
            required
          />
          <UButton
            label="create category"
            class="w-full mt-5"
            type="submit"
          />
        </form>
      </div>
    </UModal>
  </div>
</template>

<script lang="ts" setup>
import {useGetBookmarksCategoryStore} from '~/stores/useBookmarksCategoryStore'
const BookCatStore = useGetBookmarksCategoryStore()
const UrlStore = useUrlsStore()
const FilterStore = useMyUseFilterStore()
const route = useRoute()
const path = route.path
const BookisOpen = ref(false)
const CatisOpen = ref(false)
const newUrl = ref("")
const catName = ref("")
onMounted(() => {
  BookCatStore.getBookmarkCategory(path)
  UrlStore.getBookmarkUrl(path)
})

const refresh = () => {
  BookCatStore.$reset()
  BookCatStore.getBookmarkCategory(path)
  UrlStore.$reset()
  UrlStore.getBookmarkUrl(path)
}

const addUrlSubmit = () => {
  UrlStore.addBookmarkUrl(path, newUrl.value)
  BookisOpen.value = false
}

const addCatSubmit = () => {
  BookCatStore.addBookmarkCategory(catName.value, path)
  CatisOpen.value = false
}

</script>

<style>
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
</style>
