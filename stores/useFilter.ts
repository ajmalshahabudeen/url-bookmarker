import { defineStore } from 'pinia'

export const useMyUseFilterStore = defineStore({
  id: 'myUseFilterStore',
  state: () => ({ 
    filter: 'category'
  }),
  actions: {
    setFilter(filter: string) {
      this.filter = filter
    },
    toggleFilter() {
      this.filter = this.filter === 'category' ? 'url' : 'category'
    }
  },
  persist: true
})
