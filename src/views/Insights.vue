<template>
  <div :class="['min-h-full transition-colors duration-300', theme.darkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-800']">
    <Navbar />

    <main class="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 class="text-2xl font-bold mb-6">Insights</h1>

      <!-- Loading State -->
      <div v-if="insightStore.loading" :class="theme.darkMode ? 'text-gray-400 text-center py-12' : 'text-gray-500 text-center py-12'">
        Loading insights...
      </div>

      <!-- Chart Section -->
      <div v-else class="grid grid-cols-4 md:grid-cols-2 gap-8">
        <!-- Income vs Expense -->
        <div :class="['p-6 rounded-lg shadow transition-colors duration-300', theme.darkMode ? 'bg-gray-800' : 'bg-white']">
          <h2 :class="theme.darkMode ? 'text-lg font-semibold mb-4 text-gray-200' : 'text-lg font-semibold mb-4 text-gray-700'">Income vs Expenses</h2>

          <Bar
            v-if="incomeExpenseData.datasets[0].data.some(v => v !== 0)"
            :data="incomeExpenseData"
            :options="barOptions"
          />

          <p v-else :class="theme.darkMode ? 'text-gray-400 text-center py-10' : 'text-gray-400 text-center py-10'">
            No income/expense data yet
          </p>
        </div>

        <!-- Spending by Category -->
        <div :class="['p-6 rounded-lg shadow flex flex-col transition-colors duration-300', theme.darkMode ? 'bg-gray-800' : 'bg-white']">
          <h2 :class="theme.darkMode ? 'text-lg font-semibold mb-4 text-gray-200' : 'text-lg font-semibold mb-4 text-gray-700'">
            Spending by Category
          </h2>

          <div class="relative h-64">
            <Pie
              v-if="categoryData.labels.length"
              :data="categoryData"
              :options="pieOptions"
            />
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import Navbar from "../components/Navbar.vue";
import { computed, onMounted } from "vue";
import { useInsightStore } from "../stores/insight";
import { useThemeStore } from "../stores/themeStore";
import { Bar, Pie } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  ArcElement,
} from "chart.js";

// Register chart.js components
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, ArcElement);

const insightStore = useInsightStore();
const theme = useThemeStore();

onMounted(async () => {
  await insightStore.fetchInsights();
});

const incomeExpenseData = computed(() => ({
  labels: ["Income", "Expense"],
  datasets: [
    {
      label: "Amount (₦)",
      backgroundColor: ["#4f46e5", "#f43f5e"],
      borderRadius: 6,
      data: [Number(insightStore.totals.income || 0), Number(insightStore.totals.expense || 0)],
    },
  ],
}));

const categoryData = computed(() => ({
  labels: insightStore.category_breakdown.map((c) => c.name),
  datasets: [
    {
      backgroundColor: ["#4f46e5", "#6366f1", "#818cf8", "#a5b4fc", "#c7d2fe"],
      data: insightStore.category_breakdown.map((c) => Number(c.total || 0)),
    },
  ],
}));

// Chart options with dark/light theme adaptation
const barOptions = computed(() => ({
  responsive: true,
  plugins: {
    legend: {
      display: true,
      labels: {
        color: theme.darkMode ? '#D1D5DB' : '#374151', // text-gray-300 / text-gray-700
      },
    },
  },
}));

const pieOptions = computed(() => ({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "bottom",
      labels: {
        color: theme.darkMode ? '#D1D5DB' : '#374151',
      },
    },
  },
}));
</script>
