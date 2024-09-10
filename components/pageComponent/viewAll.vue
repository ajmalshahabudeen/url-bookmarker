<template>
  <div v-if="FilterStore.viewAll">
    <div class="flex flex-row gap-5 mx-10 pt-5">
      <UContainer
        class="w-1/2 p-5 md:p-20 flex flex-wrap gap-10 max-h-[80vh] overflow-y-auto custom-scrollbar"
      >
        <p
          v-if="BookCatStore.categoryData.length === 0 && !BookCatStore.loading"
        >
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
      <UContainer
        class="w-1/2 p-5 md:p-20 flex flex-col gap-5 md:gap-7 max-h-[80vh] overflow-y-auto custom-scrollbar"
      >
        <p v-if="UrlStore.urlData.length === 0 && !UrlStore.loading">
          No Urls yet
        </p>
        <div v-if="UrlStore.loading" class="flex flex-col gap-5">
          <USkeleton class="h-10 w-full rounded-2xl" v-for="index in 3" />
        </div>
        <div
          v-for="(Url, index) in UrlStore.urlData"
          class="w-full flex items-center justify-around border border-primary shadow-lg p-2 rounded-3xl"
        >
          <p class="pl-4">{{ index + 1 }}.</p>
          <p
            class="ml-3 px-2 w-full overflow-y-auto text-nowrap no-scrollbar rounded-2xl"
          >
            {{ Url.bookmarkedUrl }}
          </p>
          <div
            class="ml-5 px-5 flex items-center gap-5 w-full overflow-y-auto no-scrollbar rounded-2xl"
          >
            <UButton
              label="visit"
              icon="tabler:circle-arrow-up-right"
              @click="Visit(Url.bookmarkedUrl)"
              variant="ghost"
            />
            <UButton
              label="copy"
              icon="tabler:copy"
              @click="Copy(Url.bookmarkedUrl)"
            />
            <UButton
              label="edit"
              icon="tabler:edit"
              variant="outline"
              @click="editButtonClicked(Url.id, Url.bookmarkedUrl)"
            />

            <UButton
              label="remove"
              icon="tabler:trash"
              variant="outline"
              color="red"
              @click="isDelUrlOpen = true"
            />
            <UModal v-model="isDelUrlOpen">
              <div class="flex flex-col gap-5 p-5">
                <h1 class="text-3xl font-bold">Delete Url</h1>
                <div class="flex items-center w-full justify-end gap-5">
                  <UButton
                    label="Close"
                    class="mt-5"
                    type="button"
                    @click="isDelUrlOpen = false"
                  />
                  <UButton
                    label="Delete"
                    class="mt-5"
                    type="button"
                    color="red"
                    variant="outline"
                    @click="UrlStore.deleteBookmarkUrl(Url.id, currentPath)"
                  />
                </div>
              </div>
            </UModal>
          </div>
        </div>
      </UContainer>
    </div>
    <UModal v-model="isEditUrlOpen">
      <div class="flex flex-col gap-5 p-5">
        <h1 class="text-3xl font-bold">Update Url</h1>
        <form @submit.prevent="EditUrlSubmit()">
          <UInput
            v-model="urlValue"
            placeholder="Update Url"
            class="w-full"
            required
          />
          <UButton label="save" class="w-full mt-5" type="submit" />
        </form>
      </div>
    </UModal>
    <UModal v-model="isCatEditOpen">
      <div class="flex flex-col gap-5 p-5">
        <h1 class="text-3xl font-bold">Rename</h1>
        <form @submit.prevent="EditCatSubmit()">
          <p class="text-sm text-orange-400 text-center pb-1">
            under development, may lose data
          </p>
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
            @click="CatDelete()"
          />
        </div>
      </div>
    </UModal>
  </div>
</template>

<script lang="ts" setup>
import copy from "copy-to-clipboard";
import { useGetBookmarksCategoryStore } from "~/stores/useBookmarksCategoryStore";
const BookCatStore = useGetBookmarksCategoryStore();
const FilterStore = useMyUseFilterStore();
const UrlStore = useUrlsStore();
const route = useRoute();
const currentPath = route.path;
const toast = useToast();
const isEditUrlOpen = ref(false);
const isDelUrlOpen = ref(false);
const urlValue = ref("");
const urlValueId = ref("");
const CatOptionID = ref("");
const CatEditValue = ref("");
const isCatEditOpen = ref(false);
const isCatDelOpen = ref(false);

const Copy = (text: string) => {
  copy(text);
  toast.add({ title: "copied!" });
};
const Visit = (url: string) => {
  navigateTo(url, { external: true, open: { target: "_blank" } });
};

UrlStore.$subscribe((mutation, state) => {
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

const editButtonClicked = (id: string, url: string) => {
  urlValue.value = url;
  urlValueId.value = id;
  isEditUrlOpen.value = true;
};

const EditUrlSubmit = () => {
  isEditUrlOpen.value = false;
  UrlStore.UpdateBookmarks(urlValueId.value, urlValue.value, currentPath);
};

const EditCatSubmit = () => {
  isCatEditOpen.value = false;
  BookCatStore.updateBookmarkCategory(
    CatOptionID.value,
    CatEditValue.value,
    currentPath
  );
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

.custom-scrollbar::-webkit-scrollbar {
  @media screen and (min-width: 768px) {
    background-color: transparent;
    border-radius: 10px;
  }
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: transparent;
}

.custom-scrollbar:hover::-webkit-scrollbar-thumb {
  background-color: #73de81;
  border-radius: 10px;
  border: 4px solid transparent;
  background-clip: content-box;
}
</style>
