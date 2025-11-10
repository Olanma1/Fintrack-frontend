<template>
  <div :class="[theme.darkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-800', 'min-h-full transition-colors duration-300']">
    <Navbar />

    <main class="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 :class="theme.darkMode ? 'text-gray-100' : 'text-gray-800'" class="text-2xl font-bold mb-6">
        Expenses
      </h1>

      <!-- Total Expenses -->
      <div :class="[theme.darkMode ? 'bg-gray-800 text-gray-100' : 'bg-white text-gray-800', 'rounded-lg shadow p-4 mb-6 transition-colors duration-300']">
        <p :class="theme.darkMode ? 'text-gray-400' : 'text-gray-600'">Total Expenses</p>
        <h2 class="text-3xl font-semibold text-red-600">
          ₦{{ totalExpenses.toLocaleString() }}
        </h2>
      </div>

      <!-- Expense Transactions -->
      <div :class="[theme.darkMode ? 'bg-gray-800 text-gray-100' : 'bg-white text-gray-800', 'rounded-lg shadow overflow-hidden transition-colors duration-300']">
        <table class="min-w-full">
          <thead :class="[theme.darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600', 'uppercase text-sm']">
            <tr>
              <th class="px-6 py-3 text-left">Category</th>
              <th class="px-6 py-3 text-right">Amount</th>
              <th class="px-6 py-3 text-right">Date</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="transaction in expenseTransactions"
              :key="transaction.id"
              :class="[theme.darkMode ? 'border-gray-700 hover:bg-gray-700' : 'border-t hover:bg-gray-50', 'transition-colors duration-300']"
            >
              <td class="px-6 py-4">{{ transaction.category?.name || '—' }}</td>
              <td class="px-6 py-4 text-right text-red-500 font-semibold">
                ₦{{ Number(transaction.amount).toLocaleString() }}
              </td>
              <td :class="theme.darkMode ? 'text-gray-400' : 'text-gray-500'" class="px-6 py-4 text-right">
                {{ new Date(transaction.date).toLocaleDateString() }}
              </td>
            </tr>
          </tbody>
        </table>

        <p
          v-if="!expenseTransactions.length"
          :class="theme.darkMode ? 'text-gray-400' : 'text-gray-400'"
          class="text-center py-10"
        >
          No expense transactions yet.
        </p>
      </div>
    </main>
  </div>
</template>

<script setup>
import Navbar from "../components/Navbar.vue";
import { computed, onMounted } from "vue";
import { useTransactionStore } from "../stores/transaction";
import { useThemeStore } from "../stores/themeStore";

const transactionStore = useTransactionStore();
const theme = useThemeStore();

onMounted(() => {
  transactionStore.fetchTransactions();
});

const expenseTransactions = computed(() =>
  transactionStore.transactions.filter((t) => t.type === "expense")
);

const totalExpenses = computed(() =>
  expenseTransactions.value.reduce((sum, t) => sum + Number(t.amount), 0)
);
</script>
