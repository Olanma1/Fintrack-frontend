import { createRouter, createWebHistory } from "vue-router";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import VerifyOtp from "../views/VerifyOtp.vue";
import Dashboard from "../views/Dashboard.vue";
// import Transactions from "../views/Transactions.vue";
import { useAuthStore } from "../stores/auth";

const routes = [
  { path: "/login", component: Login },
  { path: "/register", component: Register },
  { path: "/verify-otp", component: VerifyOtp },
  { path: "/", component: Dashboard, meta: { requiresAuth: true } },
  // { path: "/transactions", component: Transactions, meta: { requiresAuth: true } },
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
