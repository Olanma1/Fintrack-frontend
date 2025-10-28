<template>
  <div class="min-h-full bg-gray-50">
    <Navbar />

    <main class="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 class="text-2xl font-bold text-gray-800 mb-6">Income</h1>

      <!-- Total Income -->
      <div class="bg-white rounded-lg shadow p-4 mb-6">
        <p class="text-gray-600">Total Income</p>
        <h2 class="text-3xl font-semibold text-green-600">
          ₦{{ totalIncome.toLocaleString() }}
        </h2>
      </div>

      <!-- Income Transactions -->
      <div class="bg-white rounded-lg shadow overflow-hidden">
        <table class="min-w-full">
          <thead class="bg-gray-100 text-gray-600 uppercase text-sm">
            <tr>
              <th class="px-6 py-3 text-left">Title</th>
              <th class="px-6 py-3 text-left">Category</th>
              <th class="px-6 py-3 text-right">Amount</th>
              <th class="px-6 py-3 text-right">Date</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="transaction in incomeTransactions"
              :key="transaction.id"
              class="border-t hover:bg-gray-50"
            >
              <td class="px-6 py-4">{{ transaction.title }}</td>
              <td class="px-6 py-4">{{ transaction.category?.name || '—' }}</td>
              <td class="px-6 py-4 text-right text-green-600">
                ₦{{ Number(transaction.amount).toLocaleString() }}
              </td>
              <td class="px-6 py-4 text-right text-gray-500">
                {{ new Date(transaction.date).toLocaleDateString() }}
              </td>
            </tr>
          </tbody>
        </table>

        <p
          v-if="!incomeTransactions.length"
          class="text-gray-400 text-center py-10"
        >
          No income transactions yet.
        </p>
      </div>
    </main>
  </div>
</template>

<script setup>
import Navbar from "../components/Navbar.vue";
import { computed, onMounted } from "vue";
import { useTransactionStore } from "../stores/transaction";

const transactionStore = useTransactionStore();

onMounted(() => {
  transactionStore.fetchTransactions();
});

const incomeTransactions = computed(() =>
  transactionStore.transactions.filter((t) => t.type === "income")
);

const totalIncome = computed(() =>
  incomeTransactions.value.reduce((sum, t) => sum + Number(t.amount), 0)
);
</script>
