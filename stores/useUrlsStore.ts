import { defineStore } from 'pinia'
import { AddBookmarks, DeleteBookmarks, GetBookmarks, UpdateBookmarks } from '~/utils/bookmark/url';

export const useUrlsStore = defineStore({
  id: 'useUrlsStore',
  state: () => {
    return {
      urlData: [] as UrlData[],
      loading: false,
      error: false,
      errorMessage: "",
    };
  },
  actions: {
    async getBookmarkUrl(path: string) {
      this.loading = true;
      const data = await GetBookmarks(path);
      if (data === null) {
        this.error = true;
        this.loading = false;
        this.errorMessage = "Error getting bookmark url";
        return;
      }
      this.urlData = data as UrlData[];
      this.loading = false;
    },
    async addBookmarkUrl(categoryPath: string, bookmarkUrl: string) {
      this.urlData = [] as UrlData[];
      this.loading = true;
      const res = await AddBookmarks(categoryPath, bookmarkUrl);
      if (!res) {
        this.error = true;
        this.loading = false;
        this.errorMessage = "Error adding bookmark url";
        return;
      } 
      this.loading = false;
      this.getBookmarkUrl(categoryPath);
    },
    async deleteBookmarkUrl(id: string, path: string) {
      this.urlData = [] as UrlData[];
      this.loading = true;
      const res = await DeleteBookmarks(id);
      if (!res) {
        this.error = true;
        this.errorMessage = "Error deleting bookmark url";
        return;
      }
      this.getBookmarkUrl(path);
    },
    async UpdateBookmarks(id: string, url: string, path: string) {
      this.urlData = [] as UrlData[];
      this.loading = true;
      const res = await UpdateBookmarks(id, url);
      if (!res) {
        this.error = true;
        this.errorMessage = "Error updating bookmark url";
        return;
      }
      this.getBookmarkUrl(path);
    }
  }
})

interface UrlData {
  id: string
  userId: string
  bookmarkedCategory: string
  bookmarkedUrl: string
}