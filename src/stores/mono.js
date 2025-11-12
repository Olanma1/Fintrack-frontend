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

        // Save the auth token before redirecting
        const token = localStorage.getItem("token");
        if (token) localStorage.setItem("monoAuthToken", token);

        // Open popup
        const width = 500;
        const height = 700;
        const left = window.screenX + (window.innerWidth - width) / 2;
        const top = window.screenY + (window.innerHeight - height) / 2;

        const popup = window.open(
          monoUrl,
          "MonoPopup",
          `width=${width},height=${height},top=${top},left=${left}`
        );

        // ✅ Listen for success message from popup
        const handleMessage = async (event) => {
          if (event.origin !== window.location.origin) return;

          if (event.data?.monoStatus === "linked") {
            // Restore token
            const savedToken = localStorage.getItem("monoAuthToken");
            if (savedToken) {
              localStorage.setItem("token", savedToken);
              localStorage.removeItem("monoAuthToken");
            }

            // Sync transactions automatically
            await this.syncTransactions();

            // Show confirmation in main app
            const params = new URLSearchParams({
              status: "linked",
              reason: "account_linked",
            });
            window.history.replaceState({}, "", `?${params.toString()}`);

            // Close popup and remove listener
            popup.close();
            window.removeEventListener("message", handleMessage);
          }
        };

        window.addEventListener("message", handleMessage);
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
