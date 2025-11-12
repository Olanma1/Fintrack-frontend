<template>
  <div
    :class="[theme.darkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-800', 'min-h-screen flex flex-col items-center justify-center p-6']"
  >
    <h1 class="text-2xl font-bold mb-4">Bank Account Linked!</h1>
    <p class="mb-6 text-center">Your bank account has been successfully connected.</p>

    <button
      @click="goToTransactions"
      class="bg-indigo-500 hover:bg-indigo-400 text-white px-6 py-2 rounded font-medium transition"
    >
      Go to Transactions
    </button>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { useThemeStore } from "../stores/themeStore";
const router = useRouter();
const theme = useThemeStore();
const goToTransactions = () => router.push("/transactions");
</script>
