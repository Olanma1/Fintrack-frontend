import { defineStore } from "pinia";
import api from "../api/axios";

export const useTransactionStore = defineStore("transactions", {
  state: () => ({
    transactions: [],
    loading: false,
    error: null,
  }),

  actions: {
    async fetchTransactions() {
      this.loading = true;
      this.error = null;
      try {
        const response = await api.get("/transactions");
        // Handle both array or paginated response
        this.transactions = Array.isArray(response.data)
          ? response.data
          : response.data.data || [];
      } catch (err) {
        console.error("Failed to fetch transactions:", err);
        this.error = "Failed to load transactions";
      } finally {
        this.loading = false;
      }
    },

    async addTransaction(payload) {
      try {
        const response = await api.post("/transactions", payload);
        const transaction = response.data?.data || response.data;
        if (transaction) {
          // Format amount or date if necessary
          transaction.amount = Number(transaction.amount || 0);
          transaction.created_at = transaction.created_at || new Date().toISOString();
          this.transactions.unshift(transaction);
        }
      } catch (err) {
        console.error("Failed to add transaction:", err);
        this.error = "Failed to create transaction";
      }
    },

    async deleteTransaction(id) {
      try {
        await api.delete(`/transactions/${id}`);
        this.transactions = this.transactions.filter((t) => t.id !== id);
      } catch (err) {
        console.error("Failed to delete transaction:", err);
        this.error = "Failed to delete transaction";
      }
    },
  },
});
