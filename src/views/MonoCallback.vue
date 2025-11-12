<template>
  <div class="min-h-screen flex flex-col items-center justify-center p-6">
    <h1 class="text-2xl font-bold mb-4">Bank Account Linked!</h1>
    <p class="mb-6 text-center">
      Status: <span class="font-semibold">{{ status }}</span>
      <br />
      Reason: <span class="font-semibold">{{ reason }}</span>
    </p>
    <button @click="goToTransactions" class="bg-indigo-500 hover:bg-indigo-400 text-white px-6 py-2 rounded">
      Go to Transactions
    </button>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useMonoStore } from "../stores/mono";

const route = useRoute();
const router = useRouter();
const mono = useMonoStore();

// Capture query params
const status = route.query.status || "unknown";
const reason = route.query.reason || "unknown";

onMounted(async () => {
  const stateToken = route.query.state || localStorage.getItem("monoStateToken");

  if (stateToken) {
    // Restore auth token for API calls
    localStorage.setItem("token", stateToken);
    localStorage.removeItem("monoStateToken");
  }

  // Sync transactions only if account linked
  if (status === "linked" && reason === "account_linked") {
    try {
      await mono.syncTransactions();
    } catch (err) {
      console.error("Failed to sync bank transactions:", err);
    }
  }
});

const goToTransactions = () => router.push("/transactions");
</script>
