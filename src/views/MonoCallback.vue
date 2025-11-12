<template>
  <div
    :class="[theme.darkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-800', 'min-h-screen flex flex-col items-center justify-center p-6']"
  >
    <h1 class="text-2xl font-bold mb-4">Bank Account Linked!</h1>
    <p class="mb-6 text-center">
      Your bank account has been successfully connected.<br />
      Status: <span class="font-semibold">{{ status }}</span><br />
      Reason: <span class="font-semibold">{{ reason }}</span>
    </p>

    <button
      @click="goToTransactions"
      class="bg-indigo-500 hover:bg-indigo-400 text-white px-6 py-2 rounded font-medium transition"
    >
      Go to Transactions
    </button>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import api from "../api/axios";
import { useMonoStore } from "../stores/mono";
import { useThemeStore } from "../stores/themeStore";

const route = useRoute();
const router = useRouter();
const mono = useMonoStore();
const theme = useThemeStore();

const status = route.query.status || "unknown";
const reason = route.query.reason || "unknown";

onMounted(async () => {
  const code = route.query.code;
  const savedToken = localStorage.getItem("monoAuthToken");

  if (savedToken) {
    localStorage.setItem("token", savedToken);
    localStorage.removeItem("monoAuthToken");
  }

  if (code) {
    try {
      await api.post("/mono/exchange", { code });
      await mono.syncTransactions();

      // ✅ Update the URL to show linked status
      const params = new URLSearchParams({
        status: "linked",
        reason: "account_linked",
      });
      window.history.replaceState({}, "", `?${params.toString()}`);
    } catch (err) {
      console.error("Mono exchange failed:", err);
    }
  }
});

const goToTransactions = () => {
  router.push("/transactions");
};
</script>
