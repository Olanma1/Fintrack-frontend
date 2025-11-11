import { defineStore } from "pinia";
import api from "../api/axios";

export const useMonoStore = defineStore("mono", {
  state: () => ({
    isLinking: false,
  }),
  actions: {
    async linkAccount() {
      this.isLinking = true;

      // Wait for Mono script to load
      if (!window.MonoConnect) {
        alert("Mono SDK not yet loaded. Please try again in a few seconds.");
        this.isLinking = false;
        return;
      }

      // Mono vanilla JS config
      const config = {
        key: import.meta.env.VITE_MONO_PUBLIC_KEY, // your public key
        scope: "auth",
        onSuccess: async function (response) {
          console.log("Mono success:", response);

          try {
            // Send the code to your Laravel backend for token exchange
            await api.post("/mono/exchange", { code: response.code });
            alert("✅ Bank linked successfully!");
          } catch (error) {
            console.error(error);
            alert("❌ Error linking account");
          }
        },
        onClose: function () {
          console.log("User closed Mono widget.");
        },
      };

      // Create and open widget
      const connect = new window.MonoConnect(config);
      connect.setup();
      connect.open();

      this.isLinking = false;
    },
  },

    async syncTransactions() {
      this.isSyncing = true;

      try {
        const { data } = await api.get("/mono/sync");
        alert(data.message || "✅ Transactions imported successfully!");
      } catch (error) {
        console.error(error);
        alert("❌ Error importing transactions");
      } finally {
        this.isSyncing = false;
      }
    },
  },
);

