import { defineStore } from "pinia";
import api from "../api/axios";
import { useTransactionStore } from "./transaction";

export const useMonoStore = defineStore("mono", {
  state: () => ({
    isLinking: false,
    isSyncing: false,
  }),

  actions: {
    async linkAccount() {
      this.isLinking = true;

      try {
        const response = await api.post("/mono/initiate");
        const monoUrl = response.data.mono_url;

        if (!monoUrl) throw new Error("Mono URL not found in response");

        // Save auth token before redirect
        const token = localStorage.getItem("token");
        if (token) localStorage.setItem("monoAuthToken", token);

        // ✅ Open Mono in a new tab (no popup)
        window.open(monoUrl, "_blank");
      } catch (error) {
        console.error("Mono initiate error:", error);
        alert("Failed to start Mono connection");
      } finally {
        this.isLinking = false;
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
  },
});
