<template>
    <Navbar />

  <div class="min-h-screen bg-gray-50 p-6">
    <div class="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-6">
      <h1 class="text-2xl font-bold text-gray-800 mb-6">🎯 My Goals</h1>

      <!-- Add Goal Form -->
      <form @submit.prevent="handleAddGoal" class="mb-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        <input
          v-model="newGoal.name"
          placeholder="Goal name"
          class="border rounded-lg px-3 py-2 focus:ring focus:ring-blue-200"
          required
        />
        <input
          v-model.number="newGoal.target_amount"
          type="number"
          placeholder="Target amount"
          class="border rounded-lg px-3 py-2 focus:ring focus:ring-blue-200"
          required
        />
        <input
          v-model="newGoal.deadline"
          type="date"
          class="border rounded-lg px-3 py-2 focus:ring focus:ring-blue-200"
        />
        <button
          type="submit"
          class="col-span-full bg-indigo-500 text-white py-2 rounded-lg cursor-pointer hover:bg-indigo-400 transition"
        >
          Add Goal
        </button>
      </form>

      <!-- Goals List -->
      <div v-if="goalStore.loading" class="text-gray-500 text-center py-10">
        Loading goals...
      </div>

      <div v-else-if="goalStore.goals.length">
        <div
          v-for="goal in goalStore.goals"
          :key="goal.id"
          class="border-b py-4 flex justify-between items-center"
        >
          <div class="w-full pr-4">
            <h2 class="font-semibold text-gray-700">{{ goal.name }}</h2>
            <p class="text-sm text-gray-500">
              Target: ₦{{ goal.target_amount.toLocaleString() }}
              <span v-if="goal.deadline">
                | Deadline: {{ formatDate(goal.deadline) }}
              </span>
            </p>

            <!-- Progress bar -->
            <div class="w-full bg-gray-200 rounded-full h-2.5 mt-2">
              <div
                class="bg-green-500 h-2.5 rounded-full transition-all duration-500"
                :style="{ width: computeProgress(goal) + '%' }"
              ></div>
            </div>
            <p class="text-xs text-gray-500 mt-1">
              {{ computeProgress(goal).toFixed(0) }}% achieved
            </p>
          </div>

          <button
            @click="handleDeleteGoal(goal.id)"
            class="text-red-600 hover:text-red-800 text-sm font-medium"
          >
            Delete
          </button>
        </div>
      </div>

      <p v-else class="text-gray-500 text-center">
        No goals yet. Add one to get started!
      </p>
    </div>
  </div>
</template>

<script setup>
import Navbar from "../components/Navbar.vue";
import { ref, onMounted } from "vue";
import { useGoalStore } from "../stores/goals";

const goalStore = useGoalStore();

const newGoal = ref({
  name: "",
  target_amount: "",
  deadline: "",
});

const handleAddGoal = async () => {
  await goalStore.addGoal(newGoal.value);
  newGoal.value = { name: "", target_amount: "", deadline: "" };
};

const handleDeleteGoal = async (id) => {
  await goalStore.deleteGoal(id);
};

const computeProgress = (goal) => {
  // If your backend sends saved_amount, compute progress
  const saved = Number(goal.saved_amount || 0);
  const target = Number(goal.target_amount || 1);
  return Math.min((saved / target) * 100, 100);
};

const formatDate = (date) => new Date(date).toLocaleDateString();

onMounted(() => {
  goalStore.fetchGoals();
});
</script>
