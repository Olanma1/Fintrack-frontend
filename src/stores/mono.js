import { defineStore } from "pinia";
import api from "../api/axios";
import { useTransactionStore } from "./transaction";

export const useMonoStore = defineStore("mono", {
  state: () => ({
    isLinking: false,
    isSyncing: false,
    monoInstance: null,
  }),

  actions: {
    async linkAccount() {
      this.isLinking = true;

      try {
        const response = await api.post("/mono/initiate");
        const { mono_url } = response.data;

        if (!mono_url) throw new Error("Mono URL not found in response");

        // Save token before anything else
        const token = localStorage.getItem("token");
        if (token) localStorage.setItem("monoAuthToken", token);

        // Load Mono Connect Widget
        const connect = new MonoConnect({
          key: "test_pk_s92rc2zibvvdrhqgn8za",
          onSuccess: async (data) => {
            console.log("Mono linked successfully:", data);
            const { code } = data;

            // Send code to backend
            await api.post("/mono/exchange", { code });

            alert("Your bank account has been successfully linked!");
            await this.syncTransactions();

            // Close widget
            connect.close();
          },
          onClose: () => {
            console.log("Mono widget closed");
          },
        });

        // Open the widget
        connect.open();
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
