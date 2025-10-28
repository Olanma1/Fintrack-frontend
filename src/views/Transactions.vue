<template>
  <div class="min-h-full bg-gray-50">
    <Navbar />

    <main class="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="flex justify-between items-center mb-8">
        <h1 class="text-2xl font-bold text-gray-800">Transactions</h1>
        <button
          @click="showForm = !showForm"
          class="rounded-md bg-indigo-500 px-4 py-2 text-white font-medium hover:bg-indigo-400 transition"
        >
          + Add Transaction
        </button>
      </div>

      <!-- Transaction Form -->
      <div v-if="showForm" class="bg-white rounded-lg shadow p-6 mb-8">
        <form @submit.prevent="createTransaction" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-600">Type</label>
            <select
              v-model="form.type"
              class="w-full rounded-md bg-indigo-500/5 text-gray-700 px-3 py-2 outline-indigo-500/10 focus:outline-2 focus:outline-indigo-500"
            >
              <option disabled value="">Select type</option>
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-600">Amount</label>
            <input
              type="number"
              v-model="form.amount"
              class="w-full rounded-md bg-indigo-500/5 px-3 py-2 text-gray-700 outline-indigo-500/10 focus:outline-2 focus:outline-indigo-500"
              placeholder="Enter amount"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-600">Note</label>
            <input
              v-model="form.note"
              class="w-full rounded-md bg-indigo-500/5 px-3 py-2 text-gray-700 outline-indigo-500/10 focus:outline-2 focus:outline-indigo-500"
              placeholder="Optional note"
            />
          </div>

          <button
            type="submit"
            class="w-full bg-indigo-500 text-white py-2 rounded-md font-semibold hover:bg-indigo-400 cursor-pointer transition"
          >
            Save Transaction
          </button>
        </form>
      </div>

      <!-- Transactions List -->
      <div v-if="transactionStore.loading" class="text-center text-gray-400">
        Loading transactions...
      </div>

      <div
        v-else-if="transactionStore.transactions.length === 0"
        class="bg-white rounded-lg shadow p-6 text-center text-gray-500"
      >
        No transactions found.
      </div>

      <div
        v-else
        class="bg-white rounded-lg shadow divide-y divide-gray-100"
      >
        <div
          v-for="tx in transactionStore.transactions"
          :key="tx.id"
          class="p-4 flex justify-between items-center hover:bg-gray-50 transition"
        >
          <div>
            <p class="text-gray-800 font-semibold">{{ tx.note || tx.type }}</p>
            <p class="text-sm text-gray-500">{{ formatDate(tx.created_at) }}</p>
          </div>
          <p
            :class="tx.type === 'income' ? 'text-green-600' : 'text-red-500'"
            class="font-bold"
          >
            {{ tx.type === 'income' ? '+' : '-' }} ₦{{ Number(tx.amount ?? 0).toLocaleString() }}
          </p>

        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import Navbar from "../components/Navbar.vue";
import { ref, onMounted } from "vue";
import { useTransactionStore } from "../stores/transaction";

const showForm = ref(false);
const form = ref({ type: "", amount: "", note: "" });
const transactionStore = useTransactionStore();

const createTransaction = async () => {
  if (!form.value.type || !form.value.amount) return;
  await transactionStore.addTransaction(form.value);
  form.value = { type: "", amount: "", note: "" };
  showForm.value = false;
};

const formatDate = (date) => new Date(date).toLocaleDateString();

onMounted(() => {
  transactionStore.fetchTransactions();
});
</script>
