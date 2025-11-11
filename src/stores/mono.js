import { defineStore } from "pinia";
import api from "../api/axios";

export const useMonoStore = defineStore("mono", {
  state: () => ({
    isLinking: false,
  }),
  actions: {
    linkAccount() {
      this.isLinking = true;

      // Ensure Mono script is loaded globally
      const MonoConnect = window.MonoConnect;
      if (!MonoConnect) {
        alert("Mono SDK not loaded. Please refresh the page.");
        this.isLinking = false;
        return;
      }

      const monoConnect = new MonoConnect({
        key: import.meta.env.VITE_MONO_PUBLIC_KEY, // ✅ set this in .env
        onSuccess: async ({ code }) => {
          try {
            await api.post("/mono/exchange", { code });
            alert("✅ Bank linked successfully!");
          } catch (error) {
            console.error(error);
            alert("❌ Error linking account");
          } finally {
            this.isLinking = false;
          }
        },
        onClose: () => {
          this.isLinking = false;
        },
      });

      monoConnect.setup();
      monoConnect.open();
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

