<template>
  <div class="min-h-full bg-gray-50">
    <Navbar />

    <main class="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 class="text-2xl font-bold text-gray-800 mb-6">Insights</h1>

      <!-- Loading State -->
      <div v-if="insightStore.loading" class="text-gray-500 text-center py-12">
        Loading insights...
      </div>

      <!-- Chart Section -->
      <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <!-- Income vs Expense -->
        <div class="bg-white p-6 rounded-lg shadow">
          <h2 class="text-lg font-semibold text-gray-700 mb-4">Income vs Expenses</h2>
          <BarChart
            v-if="incomeExpenseData.datasets[0].data.some(v => v !== 0)"
            :chart-data="incomeExpenseData"
          />

          <p v-else class="text-gray-400 text-center py-10">No income/expense data yet</p>
        </div>

        <!-- Spending by Category -->
        <div class="bg-white p-6 rounded-lg shadow">
          <h2 class="text-lg font-semibold text-gray-700 mb-4">Spending by Category</h2>
          <PieChart
            v-if="categoryData.labels.length"
            :chart-data="categoryData"
          />
          <p v-else class="text-gray-400 text-center py-10">No category data yet</p>
        </div>

        <!-- Goals Progress -->
<div class="bg-white p-6 rounded-lg shadow md:col-span-2">
  <h2 class="text-lg font-semibold text-gray-700 mb-4">Goals Progress</h2>

  <div v-if="insightStore.goals.length" class="space-y-4">
    <div
      v-for="goal in insightStore.goals"
      :key="goal.name"
      class="border border-gray-100 rounded-lg p-4"
    >
      <div class="flex justify-between mb-2">
        <h3 class="font-medium text-gray-800">{{ goal.name }}</h3>
        <span class="text-sm text-gray-600">{{ goal.progress }}%</span>
      </div>
      <div class="w-full bg-gray-200 rounded-full h-3">
        <div
          class="h-3 rounded-full transition-all duration-500"
          :class="goal.progress >= 75 ? 'bg-green-500' : 'bg-emerald-700'"
          :style="{ width: goal.progress + '%' }"
        ></div>
      </div>
    </div>
  </div>

  <p v-else class="text-gray-400 text-center py-10">
    No goals available yet
  </p>
</div>

      </div>
    </main>
  </div>
</template>

<script setup>
import Navbar from "../components/Navbar.vue";
import { computed, onMounted } from "vue";
import { BarChart, PieChart } from "vue-chart-3";
import { Chart, registerables } from "chart.js";
import { useInsightStore } from "../stores/insight";

Chart.register(...registerables);

const insightStore = useInsightStore();

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
      data: [
        Number(insightStore.totals.income || 0),
        Number(insightStore.totals.expense || 0),
      ],
    },
  ],
}));

const categoryData = computed(() => ({
  labels: insightStore.category_breakdown.map((c) => c.name),
  datasets: [
    {
      backgroundColor: [
        "#4f46e5",
        "#6366f1",
        "#818cf8",
        "#a5b4fc",
        "#c7d2fe",
      ],
      data: insightStore.category_breakdown.map((c) => Number(c.total || 0)),
    },
  ],
}));
</script>
