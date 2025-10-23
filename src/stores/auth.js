import { defineStore } from "pinia";
import api from "../api/axios";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null,
    token: localStorage.getItem("token") || null,
  }),

  actions: {
    async login(email, password) {
      const { data } = await api.post("/login", { email, password });
      this.token = data.token;
      this.user = data.user;
      localStorage.setItem("token", data.token);
    },

    async register(payload) {
      await api.post("/register", payload);
      localStorage.setItem("pending_email", payload.email);
      window.location.href = "/verify-otp";
    },

    async logout() {
      await api.post("/logout");
      this.user = null;
      this.token = null;
      localStorage.removeItem("token");
    },

    async fetchUser() {
      const { data } = await api.get("/user");
      this.user = data;
    },
  },
});
