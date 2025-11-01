<template>
  <div class="min-h-full bg-gray-50">
    <Navbar />

    <main class="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center mb-8">
        <h1 class="text-2xl font-bold text-gray-800">Transactions</h1>

        <button
          @click="showForm = !showForm"
          class="rounded-md bg-indigo-500 px-4 py-2 text-white font-medium hover:bg-indigo-400 transition"
        >
          + Add Transaction
        </button>
      </div>

      <!-- ⚠️ Error Notification -->
      <div
        v-if="transactionStore.error"
        class="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded"
      >
        {{ transactionStore.error }}
      </div>

      <!-- Create / Edit Form -->
      <div v-if="showForm" class="bg-white rounded-lg shadow p-6 mb-8">
        <form @submit.prevent="saveTransaction" class="space-y-4">
          <!-- Type -->
          <div>
            <label class="block text-sm font-medium text-gray-600">Type</label>
            <select
              v-model="form.type"
              class="w-full rounded-md bg-indigo-50 text-gray-700 px-3 py-2 focus:ring-2 focus:ring-indigo-500"
            >
              <option disabled value="">Select type</option>
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
          </div>

          <!-- Category -->
          <div v-if="form.type">
            <label class="block text-sm font-medium text-gray-600">Category</label>
            <select
              v-model="form.category_id"
              class="w-full rounded-md bg-indigo-50 text-gray-700 px-3 py-2 focus:ring-2 focus:ring-indigo-500"
            >
              <option disabled value="">Select category</option>
              <option v-for="cat in filteredCategories" :key="cat.id" :value="cat.id">
                {{ cat.name }}
              </option>
            </select>
          </div>

          <!-- Goal -->
          <div>
            <label class="block text-sm font-medium text-gray-600">Goal</label>
            <select
              v-model="form.goal_id"
              class="w-full rounded-md bg-indigo-50 text-gray-700 px-3 py-2 focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">No Goal</option>
              <option v-for="goal in goalStore.goals" :key="goal.id" :value="goal.id">
                {{ goal.name }} — ₦{{ goal.target_amount.toLocaleString() }}
              </option>
            </select>
          </div>

          <!-- Amount -->
          <div>
            <label class="block text-sm font-medium text-gray-600">Amount</label>
            <input
              type="number"
              v-model="form.amount"
              class="w-full rounded-md bg-indigo-50 px-3 py-2 text-gray-700 focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter amount"
            />
          </div>

          <!-- Note -->
          <div>
            <label class="block text-sm font-medium text-gray-600">Note</label>
            <input
              v-model="form.note"
              class="w-full rounded-md bg-indigo-50 px-3 py-2 text-gray-700 focus:ring-2 focus:ring-indigo-500"
              placeholder="Optional note"
            />
          </div>

          <button
            type="submit"
            :disabled="transactionStore.creating || transactionStore.updating"
            class="w-full bg-indigo-500 text-white py-2 rounded-md font-semibold hover:bg-indigo-400 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span v-if="editingTransaction">
              {{ transactionStore.updating ? "Updating..." : "Update Transaction" }}
            </span>
            <span v-else>
              {{ transactionStore.creating ? "Saving..." : "Save Transaction" }}
            </span>
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

      <div v-else class="bg-white rounded-lg shadow divide-y divide-gray-100">
        <div
          v-for="tx in transactionStore.transactions"
          :key="tx.id"
          class="p-4 flex justify-between items-center hover:bg-gray-50 transition"
        >
          <div>
            <p class="text-gray-800 font-semibold">
              {{ tx.note || tx.category?.name || tx.type }}
            </p>
            <p class="text-sm text-gray-500">{{ formatDate(tx.created_at) }}</p>
            <p class="text-xs text-gray-400 capitalize">
              {{ tx.type }} • {{ tx.category?.name || "Uncategorized" }}
              <span v-if="tx.goal">• Goal: {{ tx.goal.name }}</span>
            </p>
          </div>

          <div class="flex items-center gap-3">
            <p
              :class="tx.type === 'income' ? 'text-green-600' : 'text-red-500'"
              class="font-bold"
            >
              {{ tx.type === 'income' ? '+' : '-' }}
              ₦{{ Number(tx.amount ?? 0).toLocaleString() }}
            </p>

            <button
              @click="editTransaction(tx)"
              class="text-blue-600 hover:text-blue-800 text-sm font-medium"
            >
              Edit
            </button>

            <button
              @click="transactionStore.deleteTransaction(tx.id)"
              class="text-red-600 hover:text-red-800 text-sm font-medium"
              :disabled="transactionStore.loading"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import Navbar from "../components/Navbar.vue";
import { ref, computed, onMounted } from "vue";
import { useTransactionStore } from "../stores/transaction";
import { useCategoryStore } from "../stores/category";
import { useGoalStore } from "../stores/goals";

const transactionStore = useTransactionStore();
const categoryStore = useCategoryStore();
const goalStore = useGoalStore();

const showForm = ref(false);
const editingTransaction = ref(null);

const form = ref({
  type: "",
  category_id: "",
  goal_id: "",
  amount: "",
  note: "",
});

const categories = computed(() => categoryStore.categories);
const filteredCategories = computed(() => {
  if (!form.value.type) return [];
  return categories.value.filter((cat) => cat.type === form.value.type);
});

const createTransaction = async () => {
  await transactionStore.addTransaction(form.value);
  await goalStore.fetchGoals();
  form.value = { type: "", category_id: "", goal_id: "", amount: "", note: "" };
  showForm.value = false;
};

const editTransaction = (tx) => {
  editingTransaction.value = tx;
  form.value = { ...tx };
  showForm.value = true;
};

const saveTransaction = async () => {
  if (editingTransaction.value) {
    await transactionStore.updateTransaction(editingTransaction.value.id, form.value);
  } else {
    await createTransaction();
  }
  editingTransaction.value = null;
  showForm.value = false;
};

const formatDate = (date) => new Date(date).toLocaleDateString();

onMounted(async () => {
  await categoryStore.fetchCategories();
  await goalStore.fetchGoals();
  await transactionStore.fetchTransactions();
});
</script>
