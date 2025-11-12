<template>
  <div class="min-h-screen flex flex-col items-center justify-center">
    <h1 class="text-xl font-bold mb-4">Linking Bank Account...</h1>
    <p class="text-gray-600 mb-6">Please wait while we sync your bank transactions.</p>

    <button
      v-if="finished"
      @click="goToTransactions"
      class="px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-400"
    >
      Go to Transactions
    </button>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { useMonoStore } from "../stores/mono";

const router = useRouter();
const mono = useMonoStore();
const finished = ref(false);

const goToTransactions = () => {
  router.push("/transactions");
};

onMounted(async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const status = urlParams.get("status");
  const reason = urlParams.get("reason");

  if (status === "linked" && reason === "account_linked") {
    // Call your store method to sync bank transactions
    try {
      await mono.syncTransactions();
      finished.value = true;
    } catch (error) {
      console.error("Failed to sync bank transactions:", error);
      finished.value = true; // still allow user to proceed
    }
  }
});
</script>
