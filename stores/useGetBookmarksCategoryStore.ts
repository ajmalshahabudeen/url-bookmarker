import { defineStore } from "pinia";
import { AddBookmarkCategory, GetBookmarkCategory } from "~/utils/bookmark/category";

export const useGetBookmarksCategoryStore = defineStore({
  id: "useGetBookmarksCategoryStore",
  state: () => {
    return {
      categoryData: [] as CatData[],
      loading: false,
      error: false,
      errorMessage: "",
    };
  },
  actions: {
    async getBookmarkCategory(path: string) {
      const data = await GetBookmarkCategory(path);
      this.categoryData = data as CatData[];
    },
    async addBookmarkCategory(categoryName: string, path: string) {
      await AddBookmarkCategory(categoryName, path);
    },
  },
  persist: true,
});

interface CatData {
  id: string;
  categoryName: string;
  categoryPath: string;
}
