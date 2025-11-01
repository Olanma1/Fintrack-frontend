import { defineStore } from "pinia";
import api from "../api/axios";

export const useInsightStore = defineStore("insights", {
  state: () => ({
    totals: { income: 0, expense: 0 },
    category_breakdown: [],
    goals: [],
    loading: false,
  }),

  actions: {
    async fetchInsights() {
      this.loading = true;
      try {
        const { data } = await api.get("/insights/summary");

        this.totals = {
          income: Number(data.total_income || 0),
          expense: Number(data.total_expenses || 0),
        };

        this.category_breakdown = Array.isArray(data.top_spending_categories)
          ? data.top_spending_categories.map((c) => ({
              name: c.category?.name || "Unknown",
              type: c.category?.type || "unknown",
              total: Number(c.total || 0),
            }))
          : [];

        this.goals = Array.isArray(data.goals) ? data.goals : [];
      } catch (error) {
        console.error("Failed to fetch insights:", error);
      } finally {
        this.loading = false;
      }
    },
  },
});
