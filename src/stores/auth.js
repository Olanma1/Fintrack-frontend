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
      const { data } = await api.post("/register", payload);
      this.token = data.token;
      this.user = data.user;
      localStorage.setItem("token", data.token);
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
