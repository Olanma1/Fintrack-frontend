// stores/mono.js
import { defineStore } from "pinia";
import { ref } from "vue";
import { loadMonoSDK } from "../utils/Mono";
import api from "../api/axios";
import { useToast } from "vue-toastification";

export const useMonoStore = defineStore("mono", () => {
  const isLinking = ref(false);
  const sdkLoaded = ref(false);
  const toast = useToast();

  const loadSDK = async () => {
    try {
      await loadMonoSDK();
      sdkLoaded.value = true;
    } catch (err) {
      console.error("Mono SDK load failed", err);
      throw err;
    }
  };

  const linkAccount = async () => {
    isLinking.value = true;
    try {
      await loadSDK();

      if (!window.MonoConnect) throw new Error("MonoConnect not available");

      const widget = new window.MonoConnect({
        key: import.meta.env.VITE_MONO_PUBLIC_KEY,
        scope: "auth",
        onSuccess: async ({ code }) => {
          try {
            await api.post("/mono/exchange", { code });
            toast.success("✅ Bank linked successfully!");
          } catch (err) {
            console.error(err);
            toast.error("❌ Error linking account");
          }
        },
        onClose: () => console.log("Mono widget closed"),
      });

      widget.setup();
      widget.open();
    } catch (err) {
      console.error(err);
      toast.error("Mono SDK failed to load or initialize.");
    } finally {
      isLinking.value = false;
    }
  };

  return { isLinking, sdkLoaded, loadSDK, linkAccount };
});
