import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "../stores/auth";

import LandingPage from "../views/LandingPage.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import VerifyOtp from "../views/VerifyOtp.vue";
import Profile from "../views/Profile.vue";
import Transactions from "../views/Transactions.vue";
import Wallet from "../views/Wallet.vue";
import Insights from "../views/Insights.vue";
import Goals from "../views/Goals.vue";
import Expense from "../views/Expense.vue";
import Income from "../views/Income.vue";
import BalanceSheet from "../views/BalanceSheet.vue";

const routes = [
  { path: "/", component: LandingPage },
  { path: "/login", component: Login },
  { path: "/register", component: Register },
  { path: "/verify-otp", component: VerifyOtp },

  // { path: "/insi", component: Insights, meta: { requiresAuth: true } },
  { path: "/profile", component: Profile, meta: { requiresAuth: true } },
  { path: "/transactions", component: Transactions, meta: { requiresAuth: true } },
  { path: "/wallet", component: Wallet, meta: { requiresAuth: true } },
  { path: "/goals", component: Goals, meta: { requiresAuth: true } },
  { path: "/expenses", component: Expense, meta: { requiresAuth: true } },
  { path: "/income", component: Income, meta: { requiresAuth: true } },
  { path: "/insights", component: Insights, meta: { requiresAuth: true } },
  { path: "/balance", component: BalanceSheet, meta: { requiresAuth: true } },

];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const auth = useAuthStore();
  const token = localStorage.getItem("token");

  if (to.meta.requiresAuth && !token) {
    next("/login");
  }
  else if ((to.path === "/login" || to.path === "/register" || to.path === "/verify-otp") && token) {
    next("/insights");
  }
  else if (to.path === "/" && token) {
    next("/insights");
  } 
  else {
    next();
  }
});

export default router;
