<template>
  <div class="min-h-full bg-gray-50">
    <Navbar />

    <main class="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 class="text-2xl font-bold text-gray-800 mb-6">Expenses</h1>

      <!-- Total Expenses -->
      <div class="bg-white rounded-lg shadow p-4 mb-6">
        <p class="text-gray-600">Total Expenses</p>
        <h2 class="text-3xl font-semibold text-red-600">
          ₦{{ totalExpenses.toLocaleString() }}
        </h2>
      </div>

      <!-- Expense Transactions -->
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
              v-for="transaction in expenseTransactions"
              :key="transaction.id"
              class="border-t hover:bg-gray-50"
            >
              <td class="px-6 py-4">{{ transaction.title }}</td>
              <td class="px-6 py-4">{{ transaction.category?.name || '—' }}</td>
              <td class="px-6 py-4 text-right text-red-600">
                ₦{{ Number(transaction.amount).toLocaleString() }}
              </td>
              <td class="px-6 py-4 text-right text-gray-500">
                {{ new Date(transaction.date).toLocaleDateString() }}
              </td>
            </tr>
          </tbody>
        </table>

        <p
          v-if="!expenseTransactions.length"
          class="text-gray-400 text-center py-10"
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

const transactionStore = useTransactionStore();

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
