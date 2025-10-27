import { createRouter, createWebHistory } from "vue-router";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import VerifyOtp from "../views/VerifyOtp.vue";
import Dashboard from "../views/Dashboard.vue";
import { useAuthStore } from "../stores/auth";
import Profile from "@/views/Profile.vue";
import Transactions from "../views/Transactions.vue";
import Wallet from "../views/Wallet.vue";
import Insights from "../views/Insights.vue";

const routes = [
  { path: "/login", component: Login },
  { path: "/register", component: Register },
  { path: "/verify-otp", component: VerifyOtp },
  { path: "/", component: Insights, meta: { requiresAuth: true } },
  { path: "/profile", component: Profile, meta: { requiresAuth: true } },
  { path: "/transactions", component: Transactions, meta: { requiresAuth: true } },
  { path: "/wallet", component: Wallet, meta: { requiresAuth: true } },
  { path: "/insights", component: Insights, meta: { requiresAuth: true } },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const auth = useAuthStore();
  if (to.meta.requiresAuth && !auth.token) next("/login");
  else next();
});

export default router;
