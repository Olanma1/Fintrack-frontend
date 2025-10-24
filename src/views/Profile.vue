<template>
  <div class="min-h-full">
    <!-- Navbar -->
    <Navbar />

    <!-- Header -->
    <header class="relative bg-gray-800 after:pointer-events-none after:absolute after:inset-x-0 after:inset-y-0 after:border-y after:border-white/10">
      <!-- <div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <h1 class="text-3xl font-bold tracking-tight text-white">Profile</h1>
      </div> -->
    </header>

    <!-- Main content -->
    <main>
      <div class="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8 space-y-6">
        
        <!-- User Info Card -->
        <div class="bg-gray-800/50 border border-white/10 rounded-2xl p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 shadow-lg">
          <div class="flex items-center space-x-4">
            <img
              class="size-20 rounded-full outline -outline-offset-1 outline-black/10"
              :src="auth.user?.avatar || 'https://pixabay.com/illustrations/teacher-bookworm-glasses-professor-359311/'"
              alt="User Avatar"
            />
            <div>
              <h2 class="text-2xl font-semibold text-black">{{ auth.user?.name }}</h2>
              <p class="text-gray-800">{{ auth.user?.email }}</p>
              <p class="text-sm text-gray-800 mt-1">
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
        <div class="bg-gray-800/50 border border-white/10 rounded-2xl p-6 shadow-md">
          <h3 class="text-lg font-semibold text-white mb-4">Account Information</h3>
          <dl class="divide-y divide-white/10">
            <div class="py-3 grid grid-cols-3 gap-4">
              <dt class="text-sm font-medium text-gray-800">Full Name</dt>
              <dd class="col-span-2 text-sm text-gray-800">{{ auth.user?.name }}</dd>
            </div>
            <div class="py-3 grid grid-cols-3 gap-4">
              <dt class="text-sm font-medium text-gray-800">Email Address</dt>
              <dd class="col-span-2 text-sm text-gray-800">{{ auth.user?.email }}</dd>
            </div>
            <!-- <div class="py-3 grid grid-cols-3 gap-4">
              <dt class="text-sm font-medium text-gray-800">Username</dt>
              <dd class="col-span-2 text-sm text-gray-800">{{ auth.user?.avatar || 'not set' }}</dd>
            </div> -->
            <div class="py-3 grid grid-cols-3 gap-4">
              <dt class="text-sm font-medium text-gray-800">Joined</dt>
              <dd class="col-span-2 text-sm text-gray-800">
                {{ formatDate(auth.user?.created_at) }}
              </dd>
            </div>
          </dl>
        </div>

        <!-- Optional Section: Security Settings -->
        <div class="bg-gray-800/50 border border-white/10 rounded-2xl p-6 shadow-md">
          <h3 class="text-lg font-semibold text-gray-800 mb-4">Security</h3>
          <p class="text-sm text-gray-800 mb-4">
            Keep your account safe by updating your password regularly.
          </p>
          <button
            class="rounded-md bg-indigo-600 hover:bg-indigo-500 px-4 py-2 text-sm font-medium text-gray-800 focus:outline-2 focus:outline-offset-2 focus:outline-indigo-500"
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
import { onMounted } from 'vue'

const auth = useAuthStore()
const router = useRouter()

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
