<template>
  <div class="w-full flex justify-center">
    <UContainer
      class="inline-flex gap-4 max-w-full overflow-x-auto no-scrollbar my-5"
    >
      <UButton
        variant="ghost"
        icon="tabler:arrow-back-up"
        label="Back"
        @click="router.back()"
      />
      <UButton
        variant="outline"
        icon="material-symbols:refresh-rounded"
        label="Refresh"
        @click="refresh"
      />
      <UButton
        variant="solid"
        icon="mdi:plus-circle-outline"
        label="Add Category"
        @click="CatisOpen = true"
      />
      <!-- <p>{{ route.path }}</p> -->
    </UContainer>
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
const route = useRoute()
const router = useRouter()
const path = route.path
const CatisOpen = ref(false)
const catName = ref("")
onMounted(() => {
  BookCatStore.$reset()
  BookCatStore.getBookmarkCategory(path)
})

const refresh = () => {
  BookCatStore.$reset()
  BookCatStore.getBookmarkCategory(path)
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
