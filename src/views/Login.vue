<template>
  <div class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm text-center">
      <!-- Stylish Logo -->

      <h2 class="mt-6 text-center text-2xl font-bold tracking-tight text-indigo-500">
        Login to 
        <span class="justify-center items-center text-2xl font-bold tracking-wide">
          <span class="text-indigo-500 text-3xl font-extrabold -mr-1" style="font-family: 'Dancing Script', cursive;">F</span>
          <span class="text-gray-800">in</span>
          <span class="text-indigo-500 text-3xl font-extrabold -mr-1" style="font-family: 'Dancing Script', cursive;">T</span>
          <span class="text-gray-800">rack</span>
        </span>
      </h2>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <!-- 🔥 Error Message -->
      <div
        v-if="errorMessage"
        class="mb-4 rounded-md bg-red-50 p-3 text-sm text-red-600 border border-red-200"
      >
        {{ errorMessage }}
      </div>

      <form @submit.prevent="login" class="space-y-6">
        <div>
          <label for="email" class="block text-sm font-medium text-gray-500">Email address</label>
          <div class="mt-2">
            <input
              v-model="email"
              type="email"
              name="email"
              id="email"
              autocomplete="email"
              required
              class="block w-full rounded-md bg-indigo-500/5 px-3 py-1.5 text-base text-gray-600 outline-1 -outline-offset-1 outline-indigo-500/10 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm"
            />
          </div>
        </div>

        <div>
          <label for="password" class="block text-sm font-medium text-gray-500">Password</label>
          <div class="mt-2">
            <input
              v-model="password"
              type="password"
              name="password"
              id="password"
              autocomplete="current-password"
              required
              class="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-gray-600 outline-1 -outline-offset-1 outline-indigo-500/10 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm"
            />
          </div>
        </div>

        <div class="text-sm">
          <router-link
            to="/register"
            class="font-semibold text-indigo-600 hover:text-indigo-300"
          >
            Don't have an account? Sign up!
          </router-link>
        </div>

        <div>
          <button
            type="submit"
            :disabled="loading"
            class="flex w-full justify-center rounded-md px-3 py-1.5 text-sm font-semibold text-white 
            focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500
            transition-colors duration-150"
            :class="loading 
              ? 'bg-indigo-300 cursor-not-allowed' 
              : 'bg-indigo-500 hover:bg-indigo-400 cursor-pointer'"
          >
            <span v-if="loading" class="flex items-center gap-2">
              <svg
                class="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
              </svg>
              Logging in...
            </span>
            <span v-else>Login</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useAuthStore } from "../stores/auth";
import { useRouter } from "vue-router";

const email = ref("");
const password = ref("");
const errorMessage = ref("");
const loading = ref(false);

const router = useRouter();
const auth = useAuthStore();

const login = async () => {
  errorMessage.value = "";
  loading.value = true;
  try {
    await auth.login(email.value, password.value);
    router.push("/insights");
  } catch (err) {
    errorMessage.value =
      err.response?.data?.message || "Invalid credentials. Please try again.";
  } finally {
    loading.value = false;
  }
};
</script>
