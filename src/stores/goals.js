import { defineStore } from "pinia";
import api from "../api/axios";

export const useGoalStore = defineStore("goals", {
  state: () => ({
    goals: [],
    loading: false,
    error: null,
  }),

  actions: {
    async fetchGoals() {
      this.loading = true;
      this.error = null;
      try {
        const response = await api.get("/goals");
        // Handle both array or paginated responses
        this.goals = Array.isArray(response.data)
          ? response.data
          : response.data.data || [];
      } catch (err) {
        console.error("Failed to fetch goals:", err);
        this.error = "Failed to load goals";
      } finally {
        this.loading = false;
      }
    },

    async addGoal(payload) {
      try {
        const response = await api.post("/goals", payload);
        const goal = response.data?.data || response.data;
        if (goal) {
          goal.target_amount = Number(goal.target_amount || 0);
          goal.created_at = goal.created_at || new Date().toISOString();
          this.goals.unshift(goal);
        }
      } catch (err) {
        console.error("Failed to add goal:", err);
        this.error = "Failed to create goal";
      }
    },

    async updateGoal(id, payload) {
      try {
        const response = await api.put(`/goals/${id}`, payload);
        const updatedGoal = response.data?.data || response.data;
        if (updatedGoal) {
          const index = this.goals.findIndex((g) => g.id === id);
          if (index !== -1) this.goals[index] = updatedGoal;
        }
      } catch (err) {
        console.error("Failed to update goal:", err);
        this.error = "Failed to update goal";
      }
    },

    async deleteGoal(id) {
      try {
        await api.delete(`/goals/${id}`);
        this.goals = this.goals.filter((g) => g.id !== id);
      } catch (err) {
        console.error("Failed to delete goal:", err);
        this.error = "Failed to delete goal";
      }
    },
  },
});
