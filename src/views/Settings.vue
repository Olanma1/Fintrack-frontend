<template>
  <div :class="[theme.darkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900', 'min-h-screen transition-colors duration-300']">
    <Navbar />

    <main class="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8 space-y-8">
      <h1 class="text-3xl font-bold">Settings</h1>

      <!-- Theme & Preferences -->
      <section :class="theme.darkMode ? 'bg-gray-800 border-gray-700 text-gray-100' : 'bg-gray-100 border-gray-300 text-gray-900'" class="rounded-lg shadow p-6 space-y-4 transition-colors duration-300">
        <h2 class="text-xl font-semibold">Theme & Preferences</h2>

        <!-- Dark Mode Toggle -->
        <div class="flex items-center justify-between">
          <span>Dark Mode</span>
          <label :class="['relative inline-block w-10 h-5 rounded-full transition-colors duration-300', theme.darkMode ? 'bg-indigo-600' : 'bg-gray-300']">
            <input type="checkbox" v-model="theme.darkMode" class="opacity-0 w-0 h-0" />
            <span :class="['absolute left-0 top-0 w-5 h-5 bg-white rounded-full shadow transition-transform duration-300', theme.darkMode ? 'translate-x-5' : 'translate-x-0']"></span>
          </label>
        </div>

        <!-- Currency Select -->
        <div>
          <label class="block mb-1">Currency</label>
          <select v-model="preferences.currency" :class="theme.darkMode ? 'bg-gray-700 text-gray-100' : 'bg-white text-gray-900'" class="w-full rounded-md px-3 py-2 focus:ring-2 focus:ring-indigo-500 transition-colors duration-300">
            <option value="NGN">₦ Nigerian Naira</option>
            <option value="USD">$ US Dollar</option>
            <option value="EUR">€ Euro</option>
          </select>
        </div>
      </section>

      <!-- Notifications -->
      <section :class="theme.darkMode ? 'bg-gray-800 border-gray-700 text-gray-100' : 'bg-gray-100 border-gray-300 text-gray-900'" class="rounded-lg shadow p-6 space-y-4 transition-colors duration-300">
        <h2 class="text-xl font-semibold">Notifications</h2>
        <div class="space-y-2">
          <div class="flex items-center justify-between">
            <span>Push Notifications</span>
            <label :class="['relative inline-block w-10 h-5 rounded-full transition-colors duration-300', notifications.push ? 'bg-indigo-600' : theme.darkMode ? 'bg-gray-700' : 'bg-gray-300']">
              <input type="checkbox" v-model="notifications.push" class="opacity-0 w-0 h-0" />
              <span :class="['absolute left-0 top-0 w-5 h-5 bg-white rounded-full shadow transition-transform duration-300', notifications.push ? 'translate-x-5' : 'translate-x-0']"></span>
            </label>
          </div>

          <div class="flex items-center justify-between">
            <span>Email Reports</span>
            <label :class="['relative inline-block w-10 h-5 rounded-full transition-colors duration-300', notifications.emailReports ? 'bg-indigo-600' : theme.darkMode ? 'bg-gray-700' : 'bg-gray-300']">
              <input type="checkbox" v-model="notifications.emailReports" class="opacity-0 w-0 h-0" />
              <span :class="['absolute left-0 top-0 w-5 h-5 bg-white rounded-full shadow transition-transform duration-300', notifications.emailReports ? 'translate-x-5' : 'translate-x-0']"></span>
            </label>
          </div>
        </div>
      </section>

      <!-- Security & Privacy -->
      <section :class="theme.darkMode ? 'bg-gray-800 border-gray-700 text-gray-100' : 'bg-gray-100 border-gray-300 text-gray-900'" class="rounded-lg shadow p-6 space-y-4 transition-colors duration-300">
        <h2 class="text-xl font-semibold">Security & Privacy</h2>
        <div class="space-y-2">
          <button :class="theme.darkMode ? 'bg-red-600 hover:bg-red-500 text-white' : 'bg-red-500 hover:bg-red-400 text-white'" class="w-full px-4 py-2 rounded-md font-medium transition-colors duration-300">Change Password</button>
          <button :class="theme.darkMode ? 'bg-red-600 hover:bg-red-500 text-white' : 'bg-red-500 hover:bg-red-400 text-white'" class="w-full px-4 py-2 rounded-md font-medium transition-colors duration-300">Delete this account</button>
        </div>
      </section>

      <!-- App Info -->
      <section :class="theme.darkMode ? 'bg-gray-800 border-gray-700 text-gray-100' : 'bg-gray-100 border-gray-300 text-gray-900'" class="rounded-lg shadow p-6 space-y-4 transition-colors duration-300">
        <h2 class="text-xl font-semibold">App Info</h2>
        <p>Version 1.0.0</p>
        <button :class="theme.darkMode ? 'bg-green-600 hover:bg-green-500 text-white' : 'bg-green-500 hover:bg-green-400 text-white'" class="w-full px-4 py-2 rounded-md font-medium transition-colors duration-300">Contact Support</button>
      </section>
    </main>
  </div>
</template>

<script setup>
import Navbar from "../components/Navbar.vue";
import { ref } from "vue";
import { useThemeStore } from "../stores/themeStore";

const theme = useThemeStore();
const preferences = ref({ currency: "NGN" });
const notifications = ref({ push: true, emailReports: false });
</script>
