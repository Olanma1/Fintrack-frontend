<template>
  <Disclosure as="nav" class="bg-gray-800/50" v-slot="{ open }">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="flex h-16 items-center justify-between">
        <div class="flex items-center">
          <div class="shrink-0">
            <img
              class="size-8"
              src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
              alt="Your Company"
            />
          </div>
          <div class="ml-4 text-indigo-500 font-bold">💰 FinTrack</div>
          <div class="hidden md:block">
            <div class="ml-10 flex items-baseline space-x-4">
            <router-link
                v-for="item in navigation"
                :key="item.name"
                :to="item.href"
                :class="[
                  isActive(item.href)
                    ? 'bg-gray-700 text-white font-semibold shadow-sm'
                    : 'text-gray-300 hover:bg-white/10 hover:text-white',
                  'rounded-md px-3 py-2 text-sm transition-all duration-150'
                ]"
                :aria-current="isActive(item.href) ? 'page' : undefined"
              >
                {{ item.name }}
            </router-link>
            </div>
          </div>
        </div>

        <div class="hidden md:block">
          <div class="ml-4 flex items-center md:ml-6">
            <button
              type="button"
              class="relative rounded-full p-1 text-gray-400 hover:text-white cursor-pointer focus:outline-2 focus:outline-offset-2 focus:outline-indigo-500"
            >
              <span class="sr-only">View notifications</span>
              <BellIcon class="size-6" aria-hidden="true" />
            </button>

            <!-- Profile dropdown -->
            <Menu as="div" class="relative ml-3">
              <MenuButton
                class="relative flex max-w-xs items-center cursor-pointer rounded-full hover:white focus-visible:outline-2 focus-outline:outline-offset-2 focus-visible:outline-white"
              >
                <span class="sr-only">Open user menu</span>
                <img
                  class="size-8 rounded-full outline -outline-offset-1 outline-white/10"
                  :src="auth.user?.avatar || 'https://via.placeholder.com/100?text=User'"
                  alt=""
                />
              </MenuButton>

              <transition
                enter-active-class="transition ease-out duration-100"
                enter-from-class="transform opacity-0 scale-95"
                enter-to-class="transform scale-100"
                leave-active-class="transition ease-in duration-75"
                leave-from-class="transform scale-100"
                leave-to-class="transform opacity-0 scale-95"
              >
                <MenuItems
                  class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-gray-800 py-1 outline-1 -outline-offset-1 outline-white/10"
                >
                  <MenuItem v-for="item in userNavigation" :key="item.name" v-slot="{ active }">
                    <router-link
                      v-if="item.name !== 'Sign out'"
                      :to="item.href"
                      :class="[
                        active ? 'bg-white/5 outline-hidden' : '',
                        'block px-4 py-2 text-sm text-gray-300'
                      ]"
                    >
                      {{ item.name }}
                    </router-link>
                    <button
                      v-else
                      @click="logout"
                      class="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-white/5"
                    >
                      Sign out
                    </button>
                </MenuItem>

              </MenuItems>
              </transition>
            </Menu>
          </div>
        </div>

        <!-- Mobile Menu -->
        <div class="-mr-2 flex md:hidden">
          <DisclosureButton
            class="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-white/5 hover:text-white focus:outline-2 focus:outline-offset-2 focus:outline-indigo-500"
          >
            <span class="sr-only">Open main menu</span>
            <Bars3Icon v-if="!open" class="block size-6" aria-hidden="true" />
            <XMarkIcon v-else class="block size-6" aria-hidden="true" />
          </DisclosureButton>
        </div>
      </div>
    </div>

    <DisclosurePanel class="md:hidden">
      <div class="space-y-1 px-2 pt-2 pb-3 sm:px-3">
        <DisclosureButton
          v-for="item in navigation"
          :key="item.name"
          as="a"
          :href="item.href"
          :class="[
            isActive(item.href)
              ? 'bg-gray-900 text-white font-semibold shadow-sm'
              : 'text-gray-300 hover:bg-white/10 hover:text-white',
            'rounded-md px-3 py-2 text-sm transition-all duration-150'
          ]"
            :aria-current="isActive(item.href) ? 'page' : undefined"
          >
          {{ item.name }}
        </DisclosureButton>
      </div>
    </DisclosurePanel>
  </Disclosure>
</template>

<script setup>
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/vue/24/outline'
import { useAuthStore } from '../stores/auth'
import { useRouter, useRoute } from 'vue-router'

const auth = useAuthStore()
const router = useRouter()
const route = useRoute()

// Navigation items (no need for 'current' here)
const navigation = [
  { name: 'Transaction', href: '/transactions' },
  { name: 'Goals', href: '/goals' },
  { name: 'Expenses', href: '/expenses' },
  { name: 'Income', href: '/income' },
  { name: 'Wallet', href: '/wallet' },
  { name: 'Analytics', href: '/insights' },
]

const userNavigation = [
  { name: 'Your profile', href: '/profile' },
  { name: 'Settings', href: '/settings' },
  { name: 'Sign out', href: '#' },
]

const logout = async () => {
  try {
    await auth.logout()
    router.push('/login')
  } catch (error) {
    console.error('Logout failed:', error)
  }
}

// Helper function to check if a route is active
const isActive = (path) => route.path === path
</script>

