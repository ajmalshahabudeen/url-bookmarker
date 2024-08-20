<template>
  <div>
    <DashHeader />
    <UContainer
      class="p-5 md:p-20 flex flex-wrap gap-5"
    >
      <p v-if="BookCatStore.categoryData.length === 0 && !BookCatStore.loading">
        No Categories yet
      </p>
      <div v-if="BookCatStore.loading" class="flex flex-wrap gap-5">
        <USkeleton class="h-20 w-20 rounded-2xl" v-for="index in 3" />
      </div>
      <div
        v-for="(Category, index) in BookCatStore.categoryData"
        class="flex flex-col gap-2 items-center"
      >
        <NuxtLink :to="`${currentPath}/${Category.categoryName}`">
          <UButton
            :label="Category.categoryName"
            :key="index"
            variant="outline"
            class="h-20 w-20 text-center text-xl rounded-tr-3xl overflow-y-auto text-nowrap no-scrollbar"
          />
        </NuxtLink>
        <UDropdown :items="items" :popper="{ placement: 'bottom-start' }">
          <UButton
            color="white"
            label="Options"
            variant="ghost"
            trailing-icon="i-heroicons-chevron-down-20-solid"
            @click="CatOptionID = Category.id"
          />
        </UDropdown>
      </div>
    </UContainer>
    <UModal v-model="isCatEditOpen">
      <div class="flex flex-col gap-5 p-5">
        <h1 class="text-3xl font-bold">Rename</h1>
        <form @submit.prevent="EditCatSubmit()">
          <UInput
            v-model="CatEditValue"
            placeholder="Rename Category"
            class="w-full"
            required
          />
          <UButton label="save" class="w-full mt-5" type="submit" />
        </form>
      </div>
    </UModal>
    <UModal v-model="isCatDelOpen">
      <div class="flex flex-col gap-5 p-5">
        <h1 class="text-3xl font-bold">Delete Url</h1>
        <div class="flex items-center w-full justify-end gap-5">
          <UButton
            label="Close"
            class="mt-5"
            type="button"
            @click="isCatDelOpen = false"
          />
          <UButton
            label="Delete"
            class="mt-5"
            type="button"
            color="red"
            variant="outline"
            @click="
              CatDelete()
            "
          />
        </div>
      </div>
    </UModal>
    <!-- <pre>{{ BookCatStore.categoryData }}</pre>
    <pre>{{ UrlStore.urlData }}</pre> -->
  </div>
</template>

<script lang="ts" setup>
import DashHeader from "~/components/dasboard/DashHeader.vue";
import { useGetBookmarksCategoryStore } from "~/stores/useBookmarksCategoryStore";
const BookCatStore = useGetBookmarksCategoryStore();
const route = useRoute();
const currentPath = route.path;
const toast = useToast();
const CatOptionID = ref("");
const CatEditValue = ref("");
const isCatEditOpen = ref(false);
const isCatDelOpen = ref(false);


BookCatStore.$subscribe((mutation, state) => {
  if (state.error) {
    toast.add({
      title: "Error",
      description: "Something went wrong",
      color: "red",
    });
  }
});

const items = [
  [
    {
      label: "Rename",
      icon: "tabler:edit-circle",
      click: () => {
        // console.log(CatOptionID.value);
        isCatEditOpen.value = true;
      },
    },
    {
      label: "Remove",
      icon: "tabler:trash-x",
      click: () => {
        isCatDelOpen.value = true;
        // console.log(CatOptionID.value);
        // BookCatStore.deleteBookmarkCategory(CatOptionID.value, currentPath);
      },
    },
  ],
];


const EditCatSubmit = () => {
  isCatEditOpen.value = false;
  BookCatStore.updateBookmarkCategory(CatOptionID.value, CatEditValue.value, currentPath);
};

const CatDelete = () => {
  isCatDelOpen.value = false;
  BookCatStore.deleteBookmarkCategory(CatOptionID.value, currentPath);
};

</script>

<style>
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
</style>
