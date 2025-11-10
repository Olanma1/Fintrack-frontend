<template>
  <Navbar/>
  <div
    :class="[
      'p-8 min-h-screen transition-colors duration-300',
      theme.darkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-800'
    ]"
  >
    <h1 class="text-2xl font-bold mb-6">📊 Balance Sheet</h1>

    <div v-if="balanceStore.loading" :class="theme.darkMode ? 'text-gray-400' : 'text-gray-500'">
      Loading summary...
    </div>

    <div v-else>
      <!-- PDF container -->
      <div
        id="pdf-report"
        :class="[
          'shadow-md rounded-lg p-6 transition-colors duration-300',
          theme.darkMode ? 'bg-gray-800 text-gray-100' : 'bg-white text-gray-800'
        ]"
      >
        <!-- Header -->
        <div
          :class="[
            'text-center mb-8 border-b pb-4',
            theme.darkMode ? 'border-gray-700' : 'border-gray-200'
          ]"
        >
          <h2 class="text-2xl font-bold">FinTrack Financial Report</h2>
          <p :class="theme.darkMode ? 'text-gray-400 mt-1 text-sm' : 'text-gray-500 mt-1 text-sm'">
            Generated on
            {{ new Date().toLocaleDateString('en-NG', { year: 'numeric', month: 'long', day: 'numeric' }) }}
          </p>
        </div>

        <div class="grid md:grid-cols-2 gap-6">
          <div>
            <p class="text-lg">
              Total Income:
              <span class="text-green-600 font-semibold">
                ₦{{ balanceStore.summary.total_income.toLocaleString() }}
              </span>
            </p>
            <p class="text-lg">
              Total Expense:
              <span class="text-red-500 font-semibold">
                ₦{{ balanceStore.summary.total_expense.toLocaleString() }}
              </span>
            </p>
            <p class="text-lg mt-2">
              Profit:
              <span :class="balanceStore.summary.profit >= 0 ? 'text-green-600' : 'text-red-500'">
                ₦{{ balanceStore.summary.profit.toLocaleString() }}
              </span>
            </p>
            <p :class="theme.darkMode ? 'text-gray-400 text-sm mt-1' : 'text-gray-500 text-sm mt-1'">
              Performance:
              <span class="font-semibold">{{ balanceStore.summary.performance ?? 'N/A' }}%</span>
            </p>
          </div>

          <div class="flex justify-end items-center">
            <button
              @click="downloadReport"
              class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 cursor-pointer rounded-lg shadow"
            >
              ⬇ Download Financial Report
            </button>
          </div>
        </div>

        <div class="mt-10">
          <Bar :data="chartData" :options="chartOptions" :height="100" />
        </div>

        <!-- Footer / Branding -->
        <div
          :class="[
            'text-center text-xs mt-10 border-t pt-4',
            theme.darkMode ? 'text-gray-400 border-gray-700' : 'text-gray-400 border-gray-100'
          ]"
        >
          © {{ new Date().getFullYear() }} FinTrack Ltd. | Confidential Financial Summary
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Navbar from "../components/Navbar.vue";
import { onMounted, computed } from "vue";
import { useBalanceStore } from "../stores/balanceStore";
import { useThemeStore } from "../stores/themeStore";
import { Bar } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const balanceStore = useBalanceStore();
const theme = useThemeStore();

onMounted(() => {
  balanceStore.fetchBalanceSummary();
});

// Chart data
const chartData = computed(() => ({
  labels: balanceStore.monthlyReport.map((m) => m.month),
  datasets: [
    {
      label: "Income",
      backgroundColor: "#16a34a",
      data: balanceStore.monthlyReport.map((m) => m.income),
    },
    {
      label: "Expenses",
      backgroundColor: "#dc2626",
      data: balanceStore.monthlyReport.map((m) => m.expense),
    },
  ],
}));

const chartOptions = {
  responsive: true,
  plugins: {
    legend: { position: "top" },
    title: { display: true, text: "Monthly Income vs Expenses" },
  },
};

// PDF download
const downloadReport = async () => {
  const element = document.getElementById("pdf-report");
  if (!element) return;

  try {
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      backgroundColor: theme.darkMode ? "#1f2937" : "#ffffff",
      willReadFrequently: true,
      onclone: (clonedDoc) => {
        clonedDoc.querySelectorAll("*").forEach((el) => {
          const style = window.getComputedStyle(el);
          if (style.color.includes("oklch")) el.style.color = theme.darkMode ? "#f9fafb" : "#111827";
          if (style.backgroundColor.includes("oklch")) el.style.backgroundColor = theme.darkMode ? "#1f2937" : "#ffffff";
          if (style.borderColor.includes("oklch")) el.style.borderColor = theme.darkMode ? "#374151" : "#e5e7eb";
        });
      },
    });

    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });

    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save(`Financial_Report_${new Date().toISOString().split("T")[0]}.pdf`);
  } catch (err) {
    console.error("Error generating PDF:", err);
    alert("Unable to generate PDF. Please try again.");
  }
};
</script>

<style scoped>
#pdf-report {
  font-family: "Inter", sans-serif;
  transition: background-color 0.3s, color 0.3s;
}
</style>
