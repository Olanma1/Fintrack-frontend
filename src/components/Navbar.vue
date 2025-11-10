<template>
  <Disclosure
    as="nav"
    :class="[
      'transition-colors duration-300 shadow-sm',
      theme.darkMode ? 'bg-gray-900 text-gray-100' : 'bg-white text-gray-800'
    ]"
    v-slot="{ open }"
  >
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="flex h-16 items-center justify-between">
        <!-- Left side -->
        <div class="flex items-center">
          <div class="shrink-0">
            <img
              class="size-8"
              src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
              alt="FinTrack"
            />
          </div>
          <div class="ml-4 text-indigo-500 font-bold">💰 FinTrack</div>

          <!-- Desktop navigation -->
          <div class="hidden md:block">
            <div class="ml-10 flex items-baseline space-x-4">
              <router-link
                v-for="item in navigation"
                :key="item.name"
                :to="item.href"
                :class="[
                  isActive(item.href)
                    ? theme.darkMode
                      ? 'bg-gray-800 text-white font-semibold shadow-sm'
                      : 'bg-indigo-100 text-indigo-700 font-semibold shadow-sm'
                    : theme.darkMode
                      ? 'text-gray-300 hover:bg-gray-800 hover:text-white'
                      : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900',
                  'rounded-md px-3 py-2 text-sm transition-all duration-150'
                ]"
                :aria-current="isActive(item.href) ? 'page' : undefined"
              >
                {{ item.name }}
              </router-link>
            </div>
          </div>
        </div>

        <!-- Right side -->
        <div class="hidden md:block">
          <div class="ml-4 flex items-center md:ml-6 space-x-3">
            <!-- 🌗 Dark Mode Toggle -->
            <button
              @click="theme.toggleDarkMode"
              :class="[
                'flex items-center gap-1 border rounded-md px-2 py-1 text-sm transition-all duration-150',
                theme.darkMode
                  ? 'text-gray-300 border-gray-600 hover:border-indigo-400 hover:text-white'
                  : 'text-gray-700 border-gray-300 hover:border-indigo-400 hover:text-gray-900'
              ]"
            >
              <span v-if="!theme.darkMode">☀️</span>
              <span v-else>🌙</span>
              <span>{{ theme.darkMode ? 'Dark' : 'Light' }}</span>
            </button>

            <!-- 🔔 Notifications -->
            <button
              type="button"
              :class="[
                'relative rounded-full p-1 focus:outline-2 focus:outline-offset-2 focus:outline-indigo-500 transition-all duration-150',
                theme.darkMode
                  ? 'text-gray-300 hover:text-white'
                  : 'text-gray-600 hover:text-gray-900'
              ]"
            >
              <span class="sr-only">View notifications</span>
              <BellIcon class="size-6" aria-hidden="true" />
            </button>

            <!-- 👤 Profile dropdown -->
            <Menu as="div" class="relative ml-3">
              <MenuButton
                class="relative flex max-w-xs items-center cursor-pointer rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
              >
                <span class="sr-only">Open user menu</span>
                <img
                  class="size-8 rounded-full border border-gray-500/30"
                  :src="auth.user?.avatar || 'https://via.placeholder.com/100?text=User'"
                  alt="User avatar"
                />
              </MenuButton>

              <transition
                enter-active-class="transition ease-out duration-100"
                enter-from-class="transform opacity-0 scale-95"
                enter-to-class="transform opacity-100 scale-100"
                leave-active-class="transition ease-in duration-75"
                leave-from-class="transform opacity-100 scale-100"
                leave-to-class="transform opacity-0 scale-95"
              >
                <MenuItems
                  :class="[
                    'absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md py-1 shadow-lg ring-1 ring-black/5 focus:outline-none',
                    theme.darkMode
                      ? 'bg-gray-800 text-gray-200 border border-gray-700'
                      : 'bg-white text-gray-800 border border-gray-200'
                  ]"
                >
                  <MenuItem
                    v-for="item in userNavigation"
                    :key="item.name"
                    v-slot="{ active }"
                  >
                    <router-link
                      v-if="item.name !== 'Sign out'"
                      :to="item.href"
                      :class="[
                        active
                          ? theme.darkMode
                            ? 'bg-gray-700'
                            : 'bg-gray-100'
                          : '',
                        'block px-4 py-2 text-sm'
                      ]"
                    >
                      {{ item.name }}
                    </router-link>

                    <button
                      v-else
                      @click="logout"
                      :class="[
                        'block w-full text-left px-4 py-2 text-sm',
                        theme.darkMode
                          ? 'text-gray-300 hover:bg-gray-700'
                          : 'text-gray-700 hover:bg-gray-100'
                      ]"
                    >
                      Sign out
                    </button>
                  </MenuItem>
                </MenuItems>
              </transition>
            </Menu>
          </div>
        </div>

        <!-- 📱 Mobile Menu Button -->
        <div class="-mr-2 flex md:hidden">
          <DisclosureButton
            :class="[
              'relative inline-flex items-center justify-center rounded-md p-2 focus:outline-2 focus:outline-offset-2 focus:outline-indigo-500 transition-all duration-150',
              theme.darkMode
                ? 'text-gray-300 hover:bg-gray-800 hover:text-white'
                : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
            ]"
          >
            <span class="sr-only">Open main menu</span>
            <Bars3Icon v-if="!open" class="block size-6" aria-hidden="true" />
            <XMarkIcon v-else class="block size-6" aria-hidden="true" />
          </DisclosureButton>
        </div>
      </div>
    </div>

    <!-- 📱 Mobile Menu Panel -->
    <DisclosurePanel
      :class="[
        'md:hidden transition-colors duration-300',
        theme.darkMode ? 'bg-gray-900 text-gray-200' : 'bg-white text-gray-800'
      ]"
    >
      <div class="space-y-1 px-2 pt-2 pb-3 sm:px-3">
        <DisclosureButton
          v-for="item in navigation"
          :key="item.name"
          as="a"
          :href="item.href"
          :class="[
            isActive(item.href)
              ? theme.darkMode
                ? 'bg-gray-800 text-white font-semibold'
                : 'bg-indigo-100 text-indigo-700 font-semibold'
              : theme.darkMode
                ? 'text-gray-300 hover:bg-gray-800 hover:text-white'
                : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900',
            'block rounded-md px-3 py-2 text-sm transition-all duration-150'
          ]"
        >
          {{ item.name }}
        </DisclosureButton>
      </div>

      <!-- 🌗 Dark Mode toggle in mobile -->
      <div
        :class="[
          'border-t pt-3 pb-4 px-3 transition-colors duration-300',
          theme.darkMode ? 'border-gray-700' : 'border-gray-200'
        ]"
      >
        <button
          @click="theme.toggleDarkMode"
          :class="[
            'flex items-center gap-2 border rounded-md px-3 py-2 text-sm w-full justify-center transition-all duration-150',
            theme.darkMode
              ? 'text-gray-300 border-gray-600 hover:border-indigo-400 hover:text-white'
              : 'text-gray-700 border-gray-300 hover:border-indigo-400 hover:text-gray-900'
          ]"
        >
          <span v-if="!theme.darkMode">☀️</span>
          <span v-else>🌙</span>
          <span>{{ theme.darkMode ? 'Dark' : 'Light' }}</span>
        </button>
      </div>
    </DisclosurePanel>
  </Disclosure>
</template>

<script setup>
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from '@headlessui/vue'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/vue/24/outline'
import { useAuthStore } from '../stores/auth'
import { useRouter, useRoute } from 'vue-router'
import { useThemeStore } from '../stores/themeStore'

const theme = useThemeStore()
const auth = useAuthStore()
const router = useRouter()
const route = useRoute()

const navigation = [
  { name: 'Transaction', href: '/transactions' },
  { name: 'Sheet', href: '/balance' },
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

const isActive = (path) => route.path === path
</script>
