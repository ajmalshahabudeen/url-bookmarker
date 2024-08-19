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
      this.loading = true;
      const data = await GetBookmarkCategory(path);
      if (data === null) {
        this.error = true;
        this.loading = false;
        this.errorMessage = "Error getting bookmark category";
        return;
      }
      this.categoryData = data as CatData[];
      this.loading = false;
    },
    async addBookmarkCategory(categoryName: string, path: string) {
      this.loading = true;
      const res = await AddBookmarkCategory(categoryName, path);
      if (!res) {
        this.error = true;
        this.errorMessage = "Error adding bookmark category";
        return;
      }
      this.loading = false;
      this.getBookmarkCategory(path);
    },
  },
  persist: true,
});

interface CatData {
  id: string;
  categoryName: string;
  categoryPath: string;
}
