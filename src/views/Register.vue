<template>
  <div class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <img
        class="mx-auto h-10 w-auto"
        src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
        alt="Your Company"
      />
      <h2
        class="mt-10 text-center text-2xl font-bold tracking-tight text-indigo-500"
      >
        Sign up on FinTrack
      </h2>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <!-- Error Message -->
      <div
        v-if="errorMessage"
        class="mb-4 rounded-md bg-red-100 p-3 text-sm text-red-600 border border-red-300"
      >
        {{ errorMessage }}
      </div>

      <form @submit.prevent="register" class="space-y-6">
        <div>
          <label
            for="name"
            class="block text-sm font-medium text-gray-500"
            >Name</label
          >
          <div class="mt-2">
            <input
              v-model="name"
              type="text"
              name="name"
              id="name"
              autocomplete="name"
              required
              class="block w-full rounded-md bg-indigo-500/5 px-3 py-1.5 text-base text-gray-500 outline outline-1 outline-indigo-500/10 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm"
            />
          </div>
        </div>

        <div>
          <label
            for="email"
            class="block text-sm font-medium text-gray-500"
            >Email address</label
          >
          <div class="mt-2">
            <input
              v-model="email"
              type="email"
              name="email"
              id="email"
              autocomplete="email"
              required
              class="block w-full rounded-md bg-indigo-500/5 px-3 py-1.5 text-base text-gray-500 outline outline-1 outline-indigo-500/10 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm"
            />
          </div>
        </div>

        <div>
          <label
            for="password"
            class="block text-sm font-medium text-gray-500"
            >Password</label
          >
          <div class="mt-2">
            <input
              v-model="password"
              type="password"
              name="password"
              id="password"
              autocomplete="new-password"
              required
              class="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-gray-500 outline outline-1 outline-indigo-500/10 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm"
            />
          </div>
        </div>

        <div class="text-sm">
          <a
            href="/login"
            class="font-semibold text-indigo-600 hover:text-indigo-300"
            >Already have an account? Sign in!</a
          >
        </div>

        <div>
          <button
            type="submit"
            :disabled="loading"
            class="flex w-full justify-center items-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            <span v-if="loading" class="animate-spin mr-2 border-2 border-white border-t-transparent rounded-full w-4 h-4"></span>
            {{ loading ? "Signing up..." : "Sign up" }}
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

const name = ref("");
const email = ref("");
const password = ref("");
const password_confirmation = ref("");
const loading = ref(false);
const errorMessage = ref(null);
const auth = useAuthStore();
const router = useRouter();

const register = async () => {
  loading.value = true;
  errorMessage.value = null;

  try {
    await auth.register({
      name: name.value,
      email: email.value,
      password: password.value,
      password_confirmation: password.value,
    });
  } catch (error) {
    // Handle server or validation errors
    errorMessage.value =
      error.response?.data?.message || "Registration failed. Please try again.";
  } finally {
    loading.value = false;
  }
};
</script>
