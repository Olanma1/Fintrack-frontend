import { defineStore } from "pinia";
import api from "../api/axios";
import { useTransactionStore } from "./transaction";

export const useMonoStore = defineStore("mono", {
  state: () => ({
    isLinking: false,
    isLinked: false,
    isSyncing: false,
  }),

  actions: {
    async exchangeCode(code) {
      const transactionStore = useTransactionStore();

      try {
        this.isLinking = true;

        await api.post("/mono/exchange", { code });
        this.isLinked = true;

        // ⤵ Immediately update transactions on the UI
        await transactionStore.fetchTransactions();
        await this.syncTransactions(); // also refresh after sync
      } catch (err) {
        console.error("Mono code exchange failed:", err);
      } finally {
        this.isLinking = false;
      }
    },

    async syncTransactions() {
      const transactionStore = useTransactionStore();

      try {
        this.isSyncing = true;

        await api.get("/mono/sync");

        // ⤵ After syncing on backend, re-fetch list
        await transactionStore.fetchTransactions();
      } catch (err) {
        console.error("Failed to sync transactions:", err);
      } finally {
        this.isSyncing = false;
      }
    },

    async unlinkAccount() {
      const transactionStore = useTransactionStore();

      try {
        await api.post("/mono/unlink");

        this.isLinked = false;

        transactionStore.transactions = [];

        // ⤵ Ensure UI refreshes properly
        await transactionStore.fetchTransactions();
      } catch (err) {
        console.error("Unlink error:", err);
        throw err;
      }
    },
  },
});
