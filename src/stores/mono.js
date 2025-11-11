import { defineStore } from "pinia";
import api from "../api/axios";

export const useMonoStore = defineStore("mono", {
  state: () => ({
    isLinking: false,
    isSyncing: false,
  }),

  actions: {
    async waitForMonoSDK() {
      return new Promise((resolve, reject) => {
        let attempts = 0;
        const check = setInterval(() => {
          attempts++;
          if (window.MonoConnect) {
            clearInterval(check);
            resolve(window.MonoConnect);
          }
          if (attempts > 20) { // wait ~4 seconds
            clearInterval(check);
            reject("Mono SDK failed to load");
          }
        }, 200);
      });
    },

    async linkAccount() {
      this.isLinking = true;

      try {
        const MonoConnect = await this.waitForMonoSDK();

        const config = {
          key: import.meta.env.VITE_MONO_PUBLIC_KEY,
          scope: "auth",
          onSuccess: async (response) => {
            console.log("Mono success:", response);
            try {
              await api.post("/mono/exchange", { code: response.code });
              alert("✅ Bank linked successfully!");
            } catch (error) {
              console.error(error);
              alert("❌ Error linking account");
            }
          },
          onClose: () => {
            console.log("User closed Mono widget.");
          },
        };

        const connect = new MonoConnect(config);
        connect.setup();
        connect.open();
      } catch (err) {
        alert("Mono SDK not loaded. Please refresh and try again.");
        console.error(err);
      } finally {
        this.isLinking = false;
      }
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
});
