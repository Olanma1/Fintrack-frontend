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
    async linkAccount() {
      this.isLinking = true;
      try {
        // No popup or window handling needed, vue-mono handles this
        console.log("Ready to open Mono widget");
      } catch (err) {
        console.error("Mono initiate error:", err);
      } finally {
        this.isLinking = false;
      }
    },

    async exchangeCode(code) {
      try {
        // Send the code to your backend to exchange for account_id
        await api.post("/mono/exchange", { code });
        this.isLinked = true;
        await this.syncTransactions();
      } catch (err) {
        console.error("Mono code exchange failed:", err);
      }
    },

    async syncTransactions() {
      try {
        this.isSyncing = true;
        const transactionStore = useTransactionStore();
        const response = await api.get("/mono/sync");
        transactionStore.setTransactions(response.data.transactions);
      } catch (err) {
        console.error("Failed to sync transactions:", err);
      } finally {
        this.isSyncing = false;
      }
    },

    async unlinkAccount() {
      try {
        const res = await api.post("/mono/unlink");
        this.isLinked = false;

        const transactionStore = useTransactionStore();
        transactionStore.transactions = [];

        return res.data;
      } catch (err) {
        console.error("Unlink error:", err);
        throw err;
      }
    },
  },
  
});
