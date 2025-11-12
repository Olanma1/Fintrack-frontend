import { defineStore } from "pinia";
import api from "../api/axios";

export const useMonoStore = defineStore("mono", {
  state: () => ({
    isLinking: false,
  }),

  actions: {
    async linkAccount() {
      this.isLinking = true;

      try {
        const response = await api.post("/mono/initiate");
        const monoUrl = response.data.mono_url;

        if (!monoUrl) throw new Error("Mono URL not found in response");

        // Redirect user to Mono Connect
        window.location.href = monoUrl;

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
    const response = await api.get("/mono/sync");
    // update your transaction store
    transactionStore.setTransactions(response.data.transactions);
  } catch (err) {
    console.error(err);
  } finally {
    this.isSyncing = false;
  }
}

  },
});
