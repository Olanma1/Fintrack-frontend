import { defineStore } from "pinia";
import api from "../api/axios";

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
        const stateToken = response.data.state_token;

        if (!monoUrl) throw new Error("Mono URL not found");

        // Save state token in localStorage before leaving
        localStorage.setItem("monoStateToken", stateToken);

        // Open Mono Connect in a new popup window
        const width = 500;
        const height = 700;
        const left = window.screenX + (window.innerWidth - width) / 2;
        const top = window.screenY + (window.innerHeight - height) / 2;

        window.open(
          monoUrl,
          "_blank",
          `width=${width},height=${height},top=${top},left=${left}`
        );
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
    },
  },
});
