<template>
  <div
    :class="[
      theme.darkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900',
      'min-h-screen transition-colors duration-300'
    ]"
  >
    <!-- Navbar -->
    <Navbar />

    <!-- Main -->
    <main class="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8 space-y-6">

      <!-- Page Title -->
      <h1 class="text-3xl font-bold" :class="theme.darkMode ? 'text-gray-100' : 'text-gray-800'">
        Settings
      </h1>

      <!-- Theme & Preferences -->
      <section
        :class="[
          'rounded-2xl p-6 shadow-lg transition-colors duration-300',
          theme.darkMode ? 'bg-gray-800/50 border border-white/10' : 'bg-white border border-gray-200'
        ]"
      >
        <h2 class="text-lg font-semibold mb-4"
            :class="theme.darkMode ? 'text-gray-100' : 'text-gray-800'">
          Theme & Preferences
        </h2>

        <!-- Dark Mode -->
        <div class="flex items-center justify-between py-2">
          <span :class="theme.darkMode ? 'text-gray-300' : 'text-gray-800'">
            Dark Mode
          </span>

          <label
            :class="[
              'relative inline-block w-10 h-5 rounded-full cursor-pointer transition-colors duration-300',
              theme.darkMode ? 'bg-indigo-600' : 'bg-gray-300'
            ]"
          >
            <input type="checkbox" v-model="theme.darkMode" class="opacity-0 w-0 h-0" />
            <span
              :class="[
                'absolute left-0 top-0 w-5 h-5 bg-white rounded-full shadow transition-transform duration-300',
                theme.darkMode ? 'translate-x-5' : 'translate-x-0'
              ]"
            ></span>
          </label>
        </div>

        <!-- Currency -->
        <div class="mt-4">
          <label class="block mb-1 text-sm"
                 :class="theme.darkMode ? 'text-gray-300' : 'text-gray-700'">Currency</label>

          <select
            v-model="preferences.currency"
            :class="[
              'w-full rounded-md px-3 py-2 focus:ring-2 focus:ring-indigo-500 transition-colors duration-300',
              theme.darkMode ? 'bg-gray-700 text-gray-100 border-gray-600' : 'bg-white text-gray-900 border-gray-300'
            ]"
          >
            <option value="NGN">₦ Nigerian Naira</option>
            <option value="USD">$ US Dollar</option>
            <option value="EUR">€ Euro</option>
          </select>
        </div>
      </section>

      <!-- Notifications -->
      <section
        :class="[
          'rounded-2xl p-6 shadow-lg transition-colors duration-300',
          theme.darkMode ? 'bg-gray-800/50 border border-white/10' : 'bg-white border border-gray-200'
        ]"
      >
        <h2 class="text-lg font-semibold mb-4"
            :class="theme.darkMode ? 'text-gray-100' : 'text-gray-800'">
          Notifications
        </h2>

        <div class="space-y-4">
          <!-- Push -->
          <div class="flex items-center justify-between">
            <span :class="theme.darkMode ? 'text-gray-300' : 'text-gray-800'">Push Notifications</span>

            <label
              :class="[
                'relative inline-block w-10 h-5 rounded-full cursor-pointer transition-colors duration-300',
                notifications.push ? 'bg-indigo-600' :
                theme.darkMode ? 'bg-gray-700' : 'bg-gray-300'
              ]"
            >
              <input type="checkbox" v-model="notifications.push" class="opacity-0 w-0 h-0" />
              <span
                :class="[
                  'absolute left-0 top-0 w-5 h-5 bg-white rounded-full shadow transition-transform duration-300',
                  notifications.push ? 'translate-x-5' : 'translate-x-0'
                ]"
              ></span>
            </label>
          </div>

          <!-- Email Reports -->
          <div class="flex items-center justify-between">
            <span :class="theme.darkMode ? 'text-gray-300' : 'text-gray-800'">Email Reports</span>

            <label
              :class="[
                'relative inline-block w-10 h-5 rounded-full cursor-pointer transition-colors duration-300',
                notifications.emailReports ? 'bg-indigo-600' :
                theme.darkMode ? 'bg-gray-700' : 'bg-gray-300'
              ]"
            >
              <input type="checkbox" v-model="notifications.emailReports" class="opacity-0 w-0 h-0" />
              <span
                :class="[
                  'absolute left-0 top-0 w-5 h-5 bg-white rounded-full shadow transition-transform duration-300',
                  notifications.emailReports ? 'translate-x-5' : 'translate-x-0'
                ]"
              ></span>
            </label>
          </div>
        </div>
      </section>

      <!-- Security -->
      <section
        :class="[
          'rounded-2xl p-6 shadow-lg transition-colors duration-300',
          theme.darkMode ? 'bg-gray-800/50 border border-white/10' : 'bg-white border border-gray-200'
        ]"
      >
        <h2 class="text-lg font-semibold mb-4"
            :class="theme.darkMode ? 'text-gray-100' : 'text-gray-800'">
          Security & Privacy
        </h2>

        <div class="space-y-3">
          <button
            class="w-full px-4 py-2 cursor-pointer rounded-md font-medium transition-colors duration-300"
            :class="theme.darkMode ? 'bg-indigo-600 hover:bg-indigo-500 text-white'
                                   : 'bg-indigo-600 hover:bg-indigo-500 text-white'"
          >
            Change Password
          </button>

        <button
            @click="showDeleteModal = true"
            class="w-full cursor-pointer bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition"
            >
            Delete Account
        </button>

        </div>
      </section>

      <!-- App Info -->
      <section
        :class="[
          'rounded-2xl p-6 shadow-lg transition-colors duration-300',
          theme.darkMode ? 'bg-gray-800/50 border border-white/10' : 'bg-white border border-gray-200'
        ]"
      >
        <h2 class="text-lg font-semibold mb-4"
            :class="theme.darkMode ? 'text-gray-100' : 'text-gray-800'">
          App Info
        </h2>

        <p :class="theme.darkMode ? 'text-gray-300' : 'text-gray-700'">Version 1.0.0</p>

        <button
          class="mt-4 w-full px-4 py-2 rounded-md font-medium transition-colors duration-300"
          :class="theme.darkMode ? 'bg-green-600 hover:bg-green-500 text-white'
                                 : 'bg-green-600 hover:bg-green-500 text-white'"
        >
          Contact Support
        </button>
      </section>

      <!-- Delete Account Confirmation Modal -->
<div
  v-if="showDeleteModal"
  class="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50"
>
  <div
    :class="[theme.darkMode ? 'bg-gray-800 text-gray-100' : 'bg-white text-gray-800',
            'w-80 rounded-xl shadow-lg p-6']"
  >
    <h2 class="text-lg font-semibold">Delete Account?</h2>

    <p class="text-sm mt-2"
      :class="theme.darkMode ? 'text-gray-300' : 'text-gray-600'">
      This will permanently disable your account and remove access to FinTrack.
      Are you sure you want to continue?
    </p>

    <div class="flex justify-end gap-3 mt-6">
      <button
        @click="showDeleteModal = false"
        :class="[theme.darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300',
                'px-4 py-2 rounded-md transition']"
      >
        Cancel
      </button>

      <button
        @click="confirmDelete"
        class="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
      >
        Yes, Delete
      </button>
    </div>
  </div>
</div>

    </main>
  </div>
</template>


<script setup>
import Navbar from "../components/Navbar.vue";
import { ref } from "vue";
import { useThemeStore } from "../stores/themeStore";
import { useAuthStore } from "@/stores/auth";
import { useRouter } from "vue-router";

const auth = useAuthStore();
const router = useRouter();
const showDeleteModal = ref(false);

const theme = useThemeStore();
const preferences = ref({ currency: "NGN" });
const notifications = ref({ push: true, emailReports: false });

const deleteAccount = async () => {
  try {
    await auth.deleteAccount();
    router.push("/login");

    toast.value = {
      show: true,
      type: "success",
      message: "Account deleted successfully.",
    };

    setTimeout(() => (toast.value.show = false), 3000);

  } catch (error) {
    toast.value = {
      show: true,
      type: "error",
      message: "Failed to delete account.",
    };

    setTimeout(() => (toast.value.show = false), 3000);
  }
};

const confirmDelete = async () => {
  await deleteAccount();
  showDeleteModal.value = false;
};


</script>
