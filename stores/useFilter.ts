import { defineStore } from "pinia";

export const useMyUseFilterStore = defineStore({
  id: "myUseFilterStore",
  state: () => ({
    filter: "category",
    viewAll: false,
  }),
  actions: {
    setFilter(filter: string) {
      this.filter = filter;
      this.viewAll = false;
    },
    toggleFilter() {
      this.filter = this.filter === "category" ? "url" : "category";
      this.viewAll = false;
    },
    setViewAll() {
      this.viewAll = !this.viewAll;
      this.viewAll === true
        ? (this.filter = "")
        : (this.filter = "url");
    },
  },
  persist: true,
});
