import { defineStore } from "pinia";
import { GetBookmarkCategory } from "~/utils/bookmark/category";

export const useGetBookmarksCategoryStore = defineStore({
  id: "useGetBookmarksCategoryStore",
  state: () => {
    return {
      categoryData: [] as CatData[],
    };
  },
  actions: {
    async getBookmarkCategory(path: string) {
      const data = await GetBookmarkCategory(path);
      this.categoryData = data as CatData[];
    },
  },
  persist: true,
});

interface CatData {
  id: string;
  categoryName: string;
  categoryPath: string;
}
