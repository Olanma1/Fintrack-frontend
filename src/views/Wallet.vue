<template>
  <div :class="[theme.darkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-800', 'min-h-full transition-colors duration-300']">
    <Navbar />

    <main class="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 :class="theme.darkMode ? 'text-gray-100' : 'text-gray-800'" class="text-2xl font-bold mb-6">
        Wallet
      </h1>

      <!-- Wallet Balance Card -->
      <div
        :class="[
          theme.darkMode ? 'bg-indigo-600 text-white' : 'bg-indigo-500 text-white',
          'rounded-lg shadow-lg p-8 text-center mb-8 transition-all duration-300 hover:shadow-xl'
        ]"
      >
        <p class="text-lg opacity-90">Current Balance</p>

        <div v-if="walletStore.loading" class="animate-pulse mt-2">
          <div :class="[theme.darkMode ? 'bg-indigo-400' : 'bg-indigo-400', 'h-8 w-32 rounded mx-auto']"></div>
        </div>

        <h2 v-else class="text-4xl font-bold mt-2">
          ₦{{ walletStore.balance.toLocaleString() }}
        </h2>
      </div>

      <!-- Transactions -->
      <h2 :class="theme.darkMode ? 'text-gray-100' : 'text-gray-800'" class="text-lg font-semibold mb-3">
        Recent Transactions
      </h2>

      <!-- Loading -->
      <div
        v-if="walletStore.loading"
        :class="[theme.darkMode ? 'bg-gray-800 text-gray-400 divide-gray-700' : 'bg-white text-gray-400 divide-gray-100', 'rounded-lg shadow divide-y p-4 transition-colors duration-300']"
      >
        Loading transactions...
      </div>

      <!-- Empty State -->
      <div
        v-else-if="walletStore.recent_transactions.length === 0"
        :class="[theme.darkMode ? 'bg-gray-800 text-gray-400' : 'bg-white text-gray-500', 'rounded-lg shadow p-6 text-center transition-colors duration-300']"
      >
        No transactions yet.
      </div>

      <!-- Transactions List -->
      <div
        v-else
        :class="[theme.darkMode ? 'bg-gray-800 divide-gray-700 text-gray-100' : 'bg-white divide-gray-100 text-gray-800', 'rounded-lg shadow transition-colors duration-300']"
      >
        <div
          v-for="tx in walletStore.recent_transactions"
          :key="tx.id"
          :class="[theme.darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50', 'p-4 flex justify-between items-center transition-colors duration-300']"
        >
          <div>
            <p class="font-medium">
              {{ tx.note || (tx.type === 'income' ? 'Credit' : 'Debit') }}
            </p>
            <p :class="theme.darkMode ? 'text-gray-400' : 'text-gray-500'" class="text-sm">
              {{ new Date(tx.created_at).toLocaleDateString() }}
            </p>
          </div>

          <p
            :class="[
              'font-bold',
              tx.type === 'income' ? 'text-green-400' : 'text-red-500'
            ]"
          >
            {{ tx.type === 'income' ? '+' : '-' }} ₦{{ tx.amount.toLocaleString() }}
          </p>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import Navbar from "../components/Navbar.vue";
import { onMounted } from "vue";
import { useWalletStore } from "../stores/wallet";
import { useThemeStore } from "../stores/themeStore";

const walletStore = useWalletStore();
const theme = useThemeStore();

onMounted(() => {
  walletStore.fetchWallet();
});
</script>
