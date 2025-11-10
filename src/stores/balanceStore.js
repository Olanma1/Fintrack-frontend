import { defineStore } from "pinia";
import api from "../api/axios";

export const useBalanceStore = defineStore("balance", {
  state: () => ({
    loading: false,
    summary: {
      total_income: 0,
      total_expense: 0,
      profit: 0,
      performance: 0,
    },
    monthlyReport: [],
  }),

  actions: {
    async fetchBalanceSummary() {
      this.loading = true;
      try {
        const res = await api.get("/balance-summary");
        this.summary = res.data.data.summary || res.data.data || {};
        this.monthlyReport = res.data.data.monthly_report || [];
      } catch (err) {
        console.error("Error fetching balance summary:", err);
      } finally {
        this.loading = false;
      }
    },
  },
});
