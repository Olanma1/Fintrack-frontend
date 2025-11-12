<template>
  <div :class="[theme.darkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-800', 'min-h-full transition-colors duration-300']">
    <Navbar />

    <main class="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center mb-8 flex-wrap gap-3">
        <h1 :class="theme.darkMode ? 'text-gray-100' : 'text-gray-800'" class="text-2xl font-bold">
          Transactions
        </h1>

        <div class="flex gap-3">
          <!-- 🔗 Link Bank Account Button -->
          <button
              @click="mono.linkAccount"
              :disabled="mono.isLinking"
              class="rounded-md bg-indigo-500 px-4 py-2 text-white font-medium hover:bg-indigo-400 transition"
            >
              {{ mono.isLinking ? 'Connecting...' : '🔗 Link Bank Account' }}
          </button>



          <!-- ➕ Add Transaction Button -->
          <button
            @click="showForm = !showForm"
            class="rounded-md bg-indigo-500 px-4 py-2 text-white font-medium hover:bg-indigo-400 transition"
          >
            + Add Transaction
          </button>
        </div>
      </div>

      <!-- Error Notification -->
      <div
        v-if="transactionStore.error"
        :class="[theme.darkMode ? 'bg-red-800 text-red-200 border-red-700' : 'bg-red-100 text-red-700 border-red-400', 'mb-4 border px-4 py-3 rounded']"
      >
        {{ transactionStore.error }}
      </div>

      <!-- Create / Edit Form -->
      <div v-if="showForm" :class="[theme.darkMode ? 'bg-gray-800 border border-white/10 text-gray-100' : 'bg-white border border-gray-200 text-gray-800', 'rounded-lg shadow p-6 mb-8 transition-colors duration-300']">
        <form @submit.prevent="saveTransaction" class="space-y-4">
          <!-- Type -->
          <div>
            <label :class="theme.darkMode ? 'text-gray-200' : 'text-gray-600'" class="block text-sm font-medium">Type</label>
            <select
              v-model="form.type"
              :class="[theme.darkMode ? 'bg-gray-700 text-gray-100 focus:ring-indigo-400' : 'bg-indigo-50 text-gray-700 focus:ring-indigo-500', 'w-full rounded-md px-3 py-2 focus:ring-2']"
            >
              <option disabled value="">Select type</option>
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
          </div>

          <!-- Category -->
          <div v-if="form.type">
            <label :class="theme.darkMode ? 'text-gray-200' : 'text-gray-600'" class="block text-sm font-medium">Category</label>
            <select
              v-model="form.category_id"
              :class="[theme.darkMode ? 'bg-gray-700 text-gray-100 focus:ring-indigo-400' : 'bg-indigo-50 text-gray-700 focus:ring-indigo-500', 'w-full rounded-md px-3 py-2 focus:ring-2']"
            >
              <option disabled value="">Select category</option>
              <option v-for="cat in filteredCategories" :key="cat.id" :value="cat.id">
                {{ cat.name }}
              </option>
            </select>
          </div>

          <!-- Tax -->
          <div>
            <label :class="theme.darkMode ? 'text-gray-200' : 'text-gray-600'" class="block text-sm font-medium">Tax (Optional)</label>
            <select
              v-model="form.tax_id"
              :class="[theme.darkMode ? 'bg-gray-700 text-gray-100 focus:ring-indigo-400' : 'bg-indigo-50 text-gray-700 focus:ring-indigo-500', 'w-full rounded-md px-3 py-2 focus:ring-2']"
            >
              <option value="">No Tax</option>
              <option v-for="tax in taxes" :key="tax.id" :value="tax.id">
                {{ tax.name }} — {{ tax.rate }}%
              </option>
            </select>
          </div>

          <!-- Amount -->
          <div>
            <label :class="theme.darkMode ? 'text-gray-200' : 'text-gray-600'" class="block text-sm font-medium">Amount</label>
            <input
              type="number"
              v-model="form.amount"
              :class="[theme.darkMode ? 'bg-gray-700 text-gray-100 focus:ring-indigo-400' : 'bg-indigo-50 text-gray-700 focus:ring-indigo-500', 'w-full rounded-md px-3 py-2 focus:ring-2']"
              placeholder="Enter amount"
            />
          </div>

          <!-- Note -->
          <div>
            <label :class="theme.darkMode ? 'text-gray-200' : 'text-gray-600'" class="block text-sm font-medium">Note</label>
            <input
              v-model="form.note"
              :class="[theme.darkMode ? 'bg-gray-700 text-gray-100 focus:ring-indigo-400' : 'bg-indigo-50 text-gray-700 focus:ring-indigo-500', 'w-full rounded-md px-3 py-2 focus:ring-2']"
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
      <div v-if="transactionStore.loading" :class="theme.darkMode ? 'text-gray-400' : 'text-gray-500'" class="text-center">
        Loading transactions...
      </div>

      <div
        v-else-if="transactionStore.transactions.length === 0"
        :class="[theme.darkMode ? 'bg-gray-800 text-gray-300 border border-white/10' : 'bg-white text-gray-500 border border-gray-200', 'rounded-lg shadow p-6 text-center transition-colors duration-300']"
      >
        No transactions found.
      </div>

      <div v-else :class="[theme.darkMode ? 'bg-gray-800 text-gray-100 divide-white/10' : 'bg-white text-gray-800 divide-gray-100', 'rounded-lg shadow transition-colors duration-300']">
        <div
          v-for="tx in transactionStore.transactions"
          :key="tx.id"
          :class="[theme.darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50', 'p-4 flex justify-between items-center transition']"
        >
          <div>
            <p :class="theme.darkMode ? 'text-gray-100 font-semibold' : 'text-gray-800 font-semibold'">
              {{ tx.note || tx.category?.name || tx.type }}
            </p>
            <p :class="theme.darkMode ? 'text-gray-400 text-sm' : 'text-gray-500 text-sm'">{{ formatDate(tx.created_at) }}</p>
            <p :class="theme.darkMode ? 'text-gray-300 text-xs' : 'text-gray-400 text-xs'" class="capitalize">
              {{ tx.type }} • {{ tx.category?.name || "Uncategorized" }}
              <span v-if="tx.goal">• Goal: {{ tx.goal.name }}</span>
            </p>
          </div>

          <div class="flex items-center gap-3">
            <p
              :class="tx.type === 'income' ? 'text-green-500 font-bold' : 'text-red-500 font-bold'"
            >
              {{ tx.type === 'income' ? '+' : '-' }}
              ₦{{ Number(tx.amount ?? 0).toLocaleString() }}
            </p>

            <button :class="[theme.darkMode ? 'text-blue-400 hover:text-blue-200' : 'text-blue-600 hover:text-blue-800', 'text-sm font-medium']" @click="editTransaction(tx)">
              Edit
            </button>

            <button
              :class="[theme.darkMode ? 'text-red-400 hover:text-red-200' : 'text-red-600 hover:text-red-800', 'text-sm font-medium']"
              @click="transactionStore.deleteTransaction(tx.id)"
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
import { useThemeStore } from "../stores/themeStore";
import { useToast } from "vue-toastification";
import { useMonoStore } from "../stores/mono";

const mono = useMonoStore();
const toast = useToast();
const transactionStore = useTransactionStore();
const categoryStore = useCategoryStore();
const goalStore = useGoalStore();
const theme = useThemeStore();

const showForm = ref(false);
const editingTransaction = ref(null);
const monoSdkLoaded = ref(false);

const form = ref({
  type: "",
  category_id: "",
  goal_id: "",
  amount: "",
  note: "",
});

const categories = computed(() => categoryStore.categories);
const filteredCategories = computed(() => form.value.type ? categories.value.filter(c => c.type === form.value.type) : []);

const formatDate = (date) => new Date(date).toLocaleDateString();

// Form handlers
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
  try {
    if (editingTransaction.value) {
      await transactionStore.updateTransaction(editingTransaction.value.id, form.value);
      toast.success("Transaction updated successfully");
    } else {
      await createTransaction();
      toast.success("Transaction created successfully");
    }
  } catch (err) {
    console.error(err);
    toast.error(transactionStore.error || "Something went wrong while saving the transaction.");
  } finally {
    editingTransaction.value = null;
    showForm.value = false;
  }
};

// Preload Mono SDK on mount
onMounted(async () => {
  await categoryStore.fetchCategories();
  await goalStore.fetchGoals();
  await transactionStore.fetchTransactions();

  if (route.query.status === 'linked') {
        // do something (e.g., show success message)
        console.log("Bank account linked successfully!");

        // Clean up the URL (remove ?status=linked)
        router.replace({ path: route.path });
      }
});


</script>
