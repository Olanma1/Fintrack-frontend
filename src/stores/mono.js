import { defineStore } from "pinia";
import api from "../api/axios";
import { useTransactionStore } from "./transaction"; // adjust if your store file has a different name

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

        // Save current user token before redirect
        const token = localStorage.getItem("token");
        if (token) {
          localStorage.setItem("monoAuthToken", token);
        }

        // Open Mono in popup instead of full redirect
        const width = 500;
        const height = 700;
        const left = window.screenX + (window.innerWidth - width) / 2;
        const top = window.screenY + (window.innerHeight - height) / 2;

        const popup = window.open(
          monoUrl,
          "MonoLink",
          `width=${width},height=${height},top=${top},left=${left}`
        );

        // Optionally listen for when popup closes
        const checkPopup = setInterval(() => {
          if (popup.closed) {
            clearInterval(checkPopup);
            window.location.href = "/mono-callback"; // Return to callback page
          }
        }, 500);
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
