<template>
  <div
    :class="[theme.darkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-800', 'min-h-screen flex flex-col items-center justify-center p-6']"
  >
    <h1 class="text-2xl font-bold mb-4">Bank Account Linked!</h1>
    <p class="mb-6 text-center">
      Your bank account has been successfully connected.
      <br />
      Status: <span class="font-semibold">{{ status }}</span>
      <br />
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
import { useMonoStore } from "../stores/mono";
import { useThemeStore } from "../stores/themeStore";

const route = useRoute();
const router = useRouter();
const mono = useMonoStore();
const theme = useThemeStore();

// Capture query params safely
const status = route.query.status || "unknown";
const reason = route.query.reason || "unknown";

// On mount, optionally sync transactions from Mono
onMounted(async () => {
  const savedToken = localStorage.getItem("monoAuthToken");
  if (savedToken) {
    localStorage.setItem("token", savedToken);
    localStorage.removeItem("monoAuthToken");
  }

  if (status === "linked" && reason === "account_linked") {
    try {
      await mono.syncTransactions(); // your store action to fetch/sync bank transactions
    } catch (err) {
      console.error("Failed to sync bank transactions:", err);
    }
  }
});

// Button to navigate back to transactions page
const goToTransactions = () => {
  router.push("/transactions"); // no query params here
};
</script>
