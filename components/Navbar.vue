<template>
  <nav class="flex justify-between items-center bg-gray-100 p-4 mb-4">
    <h1 class="font-bold text-xl">💰 FinTrack</h1>
    <div class="flex gap-4">
      <router-link to="/">Dashboard</router-link>
      <router-link to="/transactions">Transactions</router-link>
      <button @click="logout">Logout</button>
    </div>
  </nav>
</template>

<script setup>
import { useAuthStore } from "../stores/auth";
import { useRouter } from "vue-router";

const auth = useAuthStore();
const router = useRouter();

const logout = async () => {
  await auth.logout();
  router.push("/login");
};
</script>
