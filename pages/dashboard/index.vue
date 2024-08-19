<template>
  <div>
    <DashHeader />
    <UContainer
      class="p-5 md:p-20 flex flex-wrap gap-5"
      v-if="FilterStore.filter === 'category'"
    >
      <div v-if="BookCatStore.loading" class="flex flex-wrap gap-5">
        <USkeleton class="h-20 w-20 rounded-2xl" v-for="index in 3" />
      </div>
      <div v-for="(Category, index) in BookCatStore.categoryData">
        <NuxtLink :to="`${currentPath}/${Category.categoryName}`">
          <UButton
            :label="Category.categoryName"
            :key="index"
            variant="outline"
            class="h-20 w-20 text-center text-xl rounded-tr-3xl"
          />
        </NuxtLink>
      </div>
    </UContainer>
    <UContainer
      class="p-5 md:p-20 flex flex-col gap-5 md:gap-7 w-full"
      v-if="FilterStore.filter === 'url'"
    >
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
          <UButton label="edit" icon="tabler:edit" variant="outline" />
          <UButton
            label="remove"
            icon="tabler:trash"
            variant="outline"
            color="red"
          />
        </div>
      </div>
    </UContainer>
    <!-- <pre>{{ BookCatStore.categoryData }}</pre> -->
    <!-- <pre>{{ UrlStore.urlData }}</pre> -->
  </div>
</template>

<script lang="ts" setup>
import copy from "copy-to-clipboard";
import DashHeader from "~/components/dasboard/DashHeader.vue";
import { useGetBookmarksCategoryStore } from "~/stores/useBookmarksCategoryStore";
const BookCatStore = useGetBookmarksCategoryStore();
const FilterStore = useMyUseFilterStore();
const UrlStore = useUrlsStore();
const route = useRoute();
const currentPath = route.path;
const toast = useToast();
const Copy = (text: string) => {
  copy(text);
  toast.add({ title: "copied!" });
};
const Visit = (url: string) => {
  navigateTo(url, { external: true, open: { target: "_blank" } });
};
</script>

<style>
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
</style>
