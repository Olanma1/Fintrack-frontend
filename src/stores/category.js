import { defineStore } from "pinia";
import api from "../api/axios"; // same axios instance used in transaction.js

export const useCategoryStore = defineStore("categories", {
  state: () => ({
    categories: [],
    loading: false,
    error: null,
  }),

  actions: {
    async fetchCategories() {
      this.loading = true;
      this.error = null;
      try {
        const response = await api.get("/categories");
        this.categories = Array.isArray(response.data)
          ? response.data
          : response.data.data || [];
      } catch (err) {
        console.error("Failed to fetch categories:", err);
        this.error = "Failed to load categories";
      } finally {
        this.loading = false;
      }
    },
  },
});
