import { defineStore } from "pinia";

type FilePath = {
  id: string;
  userId: string | null;
  categoryName: string | null;
  categoryPath: string | null;
}


export const useFilePathStore = defineStore({
  id: "filePathStore",
  state: () => ({
    filePaths: [] as FilePath[],
  }),
  actions: {
    async getAllPaths () {
      const res = await $fetch("/api/bookmark/getAllfilePaths")
      this.filePaths = res as FilePath[]
    }
  },
  persist: true,
});
