<template>
  <div :class="[theme.darkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-800', 'min-h-full transition-colors duration-300']">
    <!-- Navbar -->
    <Navbar />

    <!-- Header -->
    <header class="relative" :class="theme.darkMode ? 'bg-gray-800 after:border-white/10' : 'bg-gray-200 after:border-gray-300'">
      <!-- optional header content -->
    </header>

    <!-- Main content -->
    <main>
      <div class="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8 space-y-6">
        
        <!-- User Info Card -->
        <div :class="['rounded-2xl p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 shadow-lg transition-colors duration-300', theme.darkMode ? 'bg-gray-800/50 border border-white/10' : 'bg-white border border-gray-200']">
          <div class="flex items-center space-x-4">
            <img
              class="size-20 rounded-full outline -outline-offset-1 outline-black/10"
              :src="auth.user?.avatar || 'https://pixabay.com/illustrations/teacher-bookworm-glasses-professor-359311/'"
              alt="User Avatar"
            />
            <div>
              <h2 :class="theme.darkMode ? 'text-gray-100' : 'text-black'" class="text-2xl font-semibold">{{ auth.user?.name }}</h2>
              <p :class="theme.darkMode ? 'text-gray-300' : 'text-gray-800'">{{ auth.user?.email }}</p>
              <p :class="theme.darkMode ? 'text-gray-400' : 'text-gray-800'" class="text-sm mt-1">
                Joined on {{ formatDate(auth.user?.created_at) }}
              </p>
            </div>
          </div>

          <div class="flex space-x-3">
            <button
              class="rounded-md bg-indigo-600 cursor-pointer hover:bg-indigo-500 px-4 py-2 text-sm font-medium text-white focus:outline-2 focus:outline-offset-2 focus:outline-indigo-500"
            >
              Edit Profile
            </button>
            <button
              @click="logout"
              class="rounded-md bg-red-600/80 cursor-pointer hover:bg-red-500 px-4 py-2 text-sm font-medium text-white focus:outline-2 focus:outline-offset-2 focus:outline-red-500"
            >
              Sign Out
            </button>
          </div>
        </div>

        <!-- Account Details -->
        <div :class="['rounded-2xl p-6 shadow-md transition-colors duration-300', theme.darkMode ? 'bg-gray-800/50 border border-white/10' : 'bg-white border border-gray-200']">
          <h3 :class="theme.darkMode ? 'text-gray-100' : 'text-gray-800'" class="text-lg font-semibold mb-4">Account Information</h3>
          <dl :class="theme.darkMode ? 'divide-white/10' : 'divide-gray-200'">
            <div class="py-3 grid grid-cols-3 gap-4">
              <dt :class="theme.darkMode ? 'text-gray-300' : 'text-gray-800'" class="text-sm font-medium">Full Name</dt>
              <dd :class="theme.darkMode ? 'text-gray-100' : 'text-gray-800'" class="col-span-2 text-sm">{{ auth.user?.name }}</dd>
            </div>
            <div class="py-3 grid grid-cols-3 gap-4">
              <dt :class="theme.darkMode ? 'text-gray-300' : 'text-gray-800'" class="text-sm font-medium">Email Address</dt>
              <dd :class="theme.darkMode ? 'text-gray-100' : 'text-gray-800'" class="col-span-2 text-sm">{{ auth.user?.email }}</dd>
            </div>
            <div class="py-3 grid grid-cols-3 gap-4">
              <dt :class="theme.darkMode ? 'text-gray-300' : 'text-gray-800'" class="text-sm font-medium">Joined</dt>
              <dd :class="theme.darkMode ? 'text-gray-100' : 'text-gray-800'" class="col-span-2 text-sm">
                {{ formatDate(auth.user?.created_at) }}
              </dd>
            </div>
          </dl>
        </div>

        <!-- Security Settings -->
        <div :class="['rounded-2xl p-6 shadow-md transition-colors duration-300', theme.darkMode ? 'bg-gray-800/50 border border-white/10' : 'bg-white border border-gray-200']">
          <h3 :class="theme.darkMode ? 'text-gray-100' : 'text-gray-800'" class="text-lg font-semibold mb-4">Security</h3>
          <p :class="theme.darkMode ? 'text-gray-300' : 'text-gray-800'" class="text-sm mb-4">
            Keep your account safe by updating your password regularly.
          </p>
          <button
            class="rounded-md bg-indigo-600 hover:bg-indigo-500 px-4 py-2 text-sm font-medium text-white focus:outline-2 focus:outline-offset-2 focus:outline-indigo-500"
          >
            Change Password
          </button>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import Navbar from '../components/Navbar.vue'
import { useAuthStore } from '../stores/auth'
import { useRouter } from 'vue-router'
import { useThemeStore } from "../stores/themeStore";
import { onMounted } from 'vue'

const auth = useAuthStore()
const router = useRouter()
const theme = useThemeStore()

const logout = async () => {
  try {
    await auth.logout()
    router.push('/login')
  } catch (error) {
    console.error('Logout failed:', error)
  }
}

const formatDate = (dateString) => {
  if (!dateString) return 'Unknown'
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}

onMounted(async () => {
  if (!auth.user) {
    await auth.fetchUser()
  }
})
</script>
