<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50">
    <div class="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">
      <h2 class="text-2xl font-bold mb-6 text-center text-gray-800">Verify Your Account</h2>

      <form @submit.prevent="verifyOtp">
        <div class="mb-4">
          <label class="block text-gray-600 mb-1">Email</label>
          <input
            v-model="email"
            type="email"
            placeholder="Enter your email"
            class="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div class="mb-6">
          <label class="block text-gray-600 mb-1">OTP Code</label>
          <input
            v-model="otp"
            type="text"
            placeholder="Enter 6-digit OTP"
            class="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <button
          type="submit"
          class="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          :disabled="loading"
        >
          {{ loading ? "Verifying..." : "Verify OTP" }}
        </button>

        <p class="mt-4 text-center text-sm text-gray-600">
          Didn’t get the code?
          <button type="button" @click="resendOtp" class="text-blue-600 font-medium hover:underline">
            Resend OTP
          </button>
        </p>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import api from "../api/axios";
import { useAuthStore } from "../stores/auth";

const router = useRouter();
const auth = useAuthStore();

const email = ref("");
email.value = localStorage.getItem("pending_email") || "";
const otp = ref("");
const loading = ref(false);

const verifyOtp = async () => {
  try {
    loading.value = true;
    const { data } = await api.post("/verify-otp", {
      email: email.value,
      otp: otp.value,
    });

    auth.token = data.token;
    auth.user = data.user;
    localStorage.setItem("token", data.token);

    router.push("/"); 
  } catch (error) {
    alert(error.response?.data?.message || "Invalid OTP. Try again.");
  } finally {
    loading.value = false;
  }
};

const resendOtp = async () => {
  try {
    await api.post("/resend-otp", { email: email.value });
    alert("A new OTP has been sent to your email.");
  } catch (error) {
    alert(error.response?.data?.message || "Error resending OTP.");
  }
};
</script>
