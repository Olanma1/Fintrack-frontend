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
              @click="openEditModal"
              class="rounded-md bg-indigo-600 cursor-pointer hover:bg-indigo-500 px-4 py-2 text-sm font-medium text-white"
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

      <!-- Edit Profile Modal -->
<div v-if="showEditModal"
  class="fixed inset-0 bg-black/30 dark:bg-black/20 backdrop-blur-sm flex items-center justify-center z-50">
  
  <div class="bg-white dark:bg-gray-700 p-6 rounded-2xl w-full max-w-md shadow-xl">
    <h2 class="text-lg font-semibold mb-4 dark:text-gray-100">Edit Profile</h2>

    <form @submit.prevent="updateUserProfile">
      
      <label class="block text-sm mb-1 dark:text-gray-200">Full Name</label>
      <input
        v-model="form.name"
        class="w-full px-3 py-2 rounded border dark:bg-gray-600 dark:text-white dark:border-gray-500"
      />

      <label class="block text-sm mt-4 mb-1 dark:text-gray-200">Avatar</label>
      <input
        type="file"
        @change="handleAvatar"
        class="w-full mt-1 px-3 py-2 rounded border cursor-pointer 
               dark:bg-gray-600 dark:text-gray-200 dark:border-gray-500"
      />

      <button
        class="mt-4 w-full cursor-pointer bg-indigo-600 text-white py-2 rounded hover:bg-indigo-500"
      >
        Update
      </button>
    </form>

    <button
      @click="showEditModal = false"
      class="mt-3 w-full py-2 cursor-pointer rounded bg-gray-300 dark:bg-gray-600 dark:text-gray-100 hover:bg-gray-400 dark:hover:bg-gray-500"
    >
      Cancel
    </button>
  </div>
</div>


    </main>
  </div>

  <!-- Toast Notification -->
<div
  v-if="toast.show"
  :class="[
    'fixed top-5 right-5 px-4 py-3 rounded-lg shadow-lg text-white z-50 transition-all duration-300',
    toast.type === 'success' ? 'bg-green-600' : 'bg-red-600'
  ]"
>
  {{ toast.message }}
</div>

</template>

<script setup>
import Navbar from '../components/Navbar.vue'
import { useAuthStore } from '../stores/auth'
import { useRouter } from 'vue-router'
import { useThemeStore } from "../stores/themeStore";
import { onMounted } from 'vue'
import { ref } from "vue";

const toast = ref({
  show: false,
  type: "success",
  message: "",
});

const showToast = (type, message) => {
  toast.value = { show: true, type, message };
  setTimeout(() => (toast.value.show = false), 3000);
};

const auth = useAuthStore()
const router = useRouter()
const theme = useThemeStore()
const showEditModal = ref(false);

const form = ref({
  name: "",
  avatar: null
});

// When opening the modal, fill form with current user data
const openEditModal = () => {
  form.value.name = auth.user?.name || "";
  form.value.avatar = null;
  showEditModal.value = true;
};



const handleAvatar = (e) => {
  form.value.avatar = e.target.files[0];
};

const updateUserProfile = async () => {
  const formData = new FormData();
  formData.append("name", form.value.name);
  if (form.value.avatar) formData.append("avatar", form.value.avatar);

  try {
    await auth.updateProfile(formData);
    await auth.fetchUser();

    showEditModal.value = false;
    showToast("success", "Profile updated successfully!");
  } catch (error) {
    console.log(error);
    showToast("error", "Failed to update profile");
  }
};



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
