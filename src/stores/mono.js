import { defineStore } from "pinia";
import api from "../api/axios";

export const useMonoStore = defineStore("mono", {
  state: () => ({
    isLinking: false,
  }),
  actions: {
    async linkAccount() {
  this.isLinking = true;

  // Wait until Mono SDK is available
  const waitForMono = () =>
    new Promise((resolve, reject) => {
      let tries = 0;
      const check = () => {
        if (window.MonoConnect) return resolve(window.MonoConnect);
        tries++;
        if (tries > 20) return reject("Mono SDK not loaded");
        setTimeout(check, 250);
      };
      check();
    });

  try {
    const MonoConnect = await waitForMono();

    const monoConnect = new MonoConnect({
      key: import.meta.env.VITE_MONO_PUBLIC_KEY,
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
  } catch (err) {
    alert(err);
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

