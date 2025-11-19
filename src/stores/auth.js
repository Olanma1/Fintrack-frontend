import { defineStore } from "pinia";
import api from "../api/axios";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null,
    error: null,
    token: localStorage.getItem("token") || null,
  }),

  actions: {
    async register(payload) {
      await api.post("/register", payload);
      localStorage.setItem("pending_email", payload.email);
      window.location.href = "/verify-otp";
    },

    async login(email, password) {
      try {
        const { data } = await api.post("/login", { email, password });
        this.token = data.token;
        this.user = data.user;
        localStorage.setItem("token", data.token);
      } catch (error) {
        this.error = error.response?.data?.message || "Login failed";
        throw error; // rethrow so Login.vue can handle it
      }
    },

  async logout() {
      try {
        await api.post("/logout");
      } catch (error) {
        // It's fine if the token is already invalid or expired
      } finally {
        this.user = null;
        this.token = null;
        localStorage.removeItem("token");
      }
  },

    async fetchUser() {
      const { data } = await api.get("/user");
      this.user = data;
    },

    async updateProfile(formData) {
    try {
      const { data } = await api.post("/user/update", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });

      // Update the local user object immediately
      this.user = data.user;

      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  },
});
