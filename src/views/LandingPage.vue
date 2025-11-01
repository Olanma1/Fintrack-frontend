<template>
  <div class="min-h-screen flex flex-col bg-gray-50 text-gray-800">
    <!-- Navbar -->
    <nav class="bg-white shadow-sm py-4">
      <div class="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <h1 class="text-2xl font-bold text-indigo-600">FinTrack</h1>
        <div class="space-x-4">
          <RouterLink to="/login" class="text-gray-700 hover:text-indigo-600">Login</RouterLink>
          <RouterLink
            to="/register"
            class="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
          >
            Get Started
          </RouterLink>
        </div>
      </div>
    </nav>

    <!-- Hero Section -->
    <section class="flex flex-col-reverse md:flex-row items-center justify-between py-16 px-6 max-w-7xl mx-auto">
      <div class="md:w-1/2 mt-10 md:mt-0">
        <h2 class="text-4xl font-extrabold text-gray-900 leading-tight mb-4">
          Take Control of Your Finances with <span class="text-indigo-600">FinTrack</span>
        </h2>
        <p class="text-gray-600 mb-6">
          FinTrack helps you manage income, expenses, and savings effortlessly. 
          Set goals, analyze spending, and make smarter financial decisions — all in one place.
        </p>
        <RouterLink
          to="/register"
          class="bg-indigo-600 text-white px-6 py-3 rounded-lg text-lg hover:bg-indigo-700 transition"
        >
          Start Tracking Now
        </RouterLink>
      </div>

      <div class="md:w-1/2 flex justify-center">
    <img src="/public/finance.svg" 
        alt="Dashboard illustration" 
        class="w-full max-w-md rounded-2xl shadow-lg" 
    />
      </div>
    </section>

    <!-- Core Values -->
    <section class="bg-white py-16">
      <div class="max-w-7xl mx-auto px-6 text-center">
        <h3 class="text-2xl font-bold text-gray-900 mb-10">Our Core Values</h3>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="p-6 rounded-lg shadow-md hover:shadow-lg transition bg-gray-50">
            <img
              src="https://cdn-icons-png.flaticon.com/512/3534/3534131.png"
              class="w-16 mx-auto mb-4"
              alt="Simplicity"
            />
            <h4 class="text-lg font-semibold mb-2">Simplicity</h4>
            <p class="text-gray-600">
              Designed to be intuitive and easy to use — manage your money without the stress.
            </p>
          </div>
          <div class="p-6 rounded-lg shadow-md hover:shadow-lg transition bg-gray-50">
            <img
              src="https://cdn-icons-png.flaticon.com/512/3064/3064197.png"
              class="w-16 mx-auto mb-4"
              alt="Security"
            />
            <h4 class="text-lg font-semibold mb-2">Security</h4>
            <p class="text-gray-600">
              Your data is safe with us. FinTrack uses secure encryption to protect your finances.
            </p>
          </div>
          <div class="p-6 rounded-lg shadow-md hover:shadow-lg transition bg-gray-50">
            <img
              src="https://cdn-icons-png.flaticon.com/512/942/942799.png"
              class="w-16 mx-auto mb-4"
              alt="Empowerment"
            />
            <h4 class="text-lg font-semibold mb-2">Empowerment</h4>
            <p class="text-gray-600">
              We help you make confident, informed financial decisions that shape your future.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Features -->
    <section class="py-16 bg-indigo-50">
      <div class="max-w-7xl mx-auto px-6 text-center">
        <h3 class="text-2xl font-bold text-gray-900 mb-10">What You Can Do with FinTrack</h3>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
            <img
              src="https://cdn-icons-png.flaticon.com/512/993/993724.png"
              class="w-14 mx-auto mb-4"
              alt="Track Transactions"
            />
            <h4 class="font-semibold text-lg mb-2">Track Transactions</h4>
            <p class="text-gray-600">
              Log income and expenses effortlessly, and visualize your spending patterns.
            </p>
          </div>

          <div class="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
            <img
              src="https://cdn-icons-png.flaticon.com/512/584/584092.png"
              class="w-14 mx-auto mb-4"
              alt="Set Financial Goals"
            />
            <h4 class="font-semibold text-lg mb-2">Set Financial Goals</h4>
            <p class="text-gray-600">
              Define your targets — like savings or investments — and track your progress visually.
            </p>
          </div>

          <div class="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
            <img
              src="https://cdn-icons-png.flaticon.com/512/3468/3468334.png"
              class="w-14 mx-auto mb-4"
              alt="Gain Insights"
            />
            <h4 class="font-semibold text-lg mb-2">Gain Insights</h4>
            <p class="text-gray-600">
              Access analytics and visual reports that help you understand your money flow.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-16 text-center bg-indigo-600 text-white">
      <h3 class="text-3xl font-semibold mb-4">Ready to Take Control?</h3>
      <p class="text-lg mb-6">
        Join thousands of users already managing their finances smarter with FinTrack.
      </p>
      <RouterLink
        to="/register"
        class="bg-white text-indigo-600 font-semibold px-6 py-3 rounded-lg hover:bg-gray-100 transition"
      >
        Get Started for Free
      </RouterLink>
    </section>

    <!-- Footer -->
    <footer class="bg-gray-900 text-gray-400 text-center py-6">
      <p>© {{ new Date().getFullYear() }} FinTrack. All rights reserved.</p>
    </footer>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

onMounted(() => {
  const token = localStorage.getItem("token"); 
  if (token) {
    router.push("/insights");
  }
});
</script>
