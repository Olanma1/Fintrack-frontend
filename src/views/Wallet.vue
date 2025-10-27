<template>
  <div class="min-h-full bg-gray-50">
    <Navbar />

    <main class="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 class="text-2xl font-bold text-gray-800 mb-6">Wallet</h1>

      <!-- Wallet Balance Card -->
      <div
        class="bg-indigo-500 text-white rounded-lg shadow-lg p-8 text-center mb-8 transition-all duration-300 hover:shadow-xl"
      >
        <p class="text-lg opacity-90">Current Balance</p>

        <div v-if="walletStore.loading" class="animate-pulse mt-2">
          <div class="h-8 w-32 bg-indigo-400 rounded mx-auto"></div>
        </div>

        <h2 v-else class="text-4xl text-white font-bold mt-2">
          ₦{{ walletStore.balance.toLocaleString() }}
        </h2>
      </div>

      <!-- Transactions -->
      <h2 class="text-lg font-semibold text-gray-800 mb-3">Recent Transactions</h2>

      <div
        v-if="walletStore.loading"
        class="bg-white rounded-lg shadow divide-y divide-gray-100 p-4 text-gray-400"
      >
        Loading transactions...
      </div>

      <div
        v-else-if="walletStore.recent_transactions.length === 0"
        class="bg-white rounded-lg shadow p-6 text-center text-gray-500"
      >
        No transactions yet.
      </div>

      <div
        v-else
        class="bg-white rounded-lg shadow divide-y divide-gray-100"
      >
        <div
          v-for="tx in walletStore.recent_transactions"
          :key="tx.id"
          class="p-4 flex justify-between items-center hover:bg-gray-50 transition"
        >
          <div>
            <p class="text-gray-800 font-medium">
              {{ tx.note || (tx.type === 'income' ? 'Credit' : 'Debit') }}
            </p>
            <p class="text-gray-500 text-sm">{{ new Date(tx.created_at).toLocaleDateString() }}</p>
          </div>

          <p
            :class="[
              'font-bold',
              tx.type === 'income' ? 'text-green-600' : 'text-red-500'
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

const walletStore = useWalletStore();

onMounted(() => {
  walletStore.fetchWallet();
});
</script>

