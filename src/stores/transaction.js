import { defineStore } from "pinia";
import api from "../api/axios";

export const useTransactionStore = defineStore("transactions", {
  state: () => ({
    transactions: [],
    loading: false,
    creating: false,
    updating: false,
    error: null,
  }),

  actions: {
    setError(message) {
      this.error = message;
      console.error("Transaction Store Error:", message);
      setTimeout(() => {
        this.error = null;
      }, 5000);
    },

    async fetchTransactions() {
      this.loading = true;
      this.error = null;
      try {
        const response = await api.get("/transactions");
        this.transactions = Array.isArray(response.data)
          ? response.data
          : response.data.data || [];
      } catch (err) {
        this.setError(err.response?.data?.message || "Failed to load transactions");
      } finally {
        this.loading = false;
      }
    },

    async addTransaction(payload) {
      this.creating = true;
      this.error = null;
      try {
        const response = await api.post("/transactions", payload);
        const transaction = response.data?.data || response.data;
        if (transaction) {
          transaction.amount = Number(transaction.amount || 0);
          transaction.created_at = transaction.created_at || new Date().toISOString();
          this.transactions.unshift(transaction);
        }
      } catch (err) {
        this.setError(
          err.response?.data?.message || "Failed to create transaction. Please try again."
        );
      } finally {
        this.creating = false;
      }
    },

    // ✅ Make sure THIS function is inside the actions block
    async updateTransaction(id, payload) {
      this.updating = true;
      this.error = null;
      try {
        const response = await api.put(`/transactions/${id}`, payload);
        const updated = response.data?.data || response.data;

        const index = this.transactions.findIndex((t) => t.id === id);
        if (index !== -1) {
          this.transactions[index] = { ...this.transactions[index], ...updated };
        }
      } catch (err) {
        this.setError(err.response?.data?.message || "Failed to update transaction");
      } finally {
        this.updating = false;
      }
    },

    async deleteTransaction(id) {
      this.loading = true;
      this.error = null;
      try {
        await api.delete(`/transactions/${id}`);
        this.transactions = this.transactions.filter((t) => t.id !== id);
      } catch (err) {
        this.setError(err.response?.data?.message || "Failed to delete transaction");
      } finally {
        this.loading = false;
      }
    },
  },
});
