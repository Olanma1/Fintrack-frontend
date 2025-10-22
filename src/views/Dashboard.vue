<template>
  <div class="min-h-full">
    <Disclosure as="nav" class="bg-gray-800/50" v-slot="{ open }">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="flex h-16 items-center justify-between">
          <div class="flex items-center">
            <div class="shrink-0">
              <img class="size-8" src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500" alt="Your Company" />
            </div>
            <div class="ml-4 text-indigo-500 text-bold"> FinTrack </div>
            <div class="hidden md:block">
              <div class="ml-10 flex items-baseline space-x-4">
                <a v-for="item in navigation" :key="item.name" :href="item.href" :class="[item.current ? 'bg-gray-950/50 text-white' : 'text-gray-300 hover:bg-white/5 hover:text-white', 'rounded-md px-3 py-2 text-sm font-medium']" :aria-current="item.current ? 'page' : undefined">{{ item.name }}</a>
              </div>
            </div>
          </div>
          <div class="hidden md:block">
            <div class="ml-4 flex items-center md:ml-6">
              <button type="button" class="relative rounded-full p-1 text-gray-400 hover:text-white focus:outline-2 focus:outline-offset-2 focus:outline-indigo-500">
                <span class="absolute -inset-1.5" />
                <span class="sr-only">View notifications</span>
                <BellIcon class="size-6" aria-hidden="true" />
              </button>

              <!-- Profile dropdown -->
              <Menu as="div" class="relative ml-3">
                <MenuButton class="relative flex max-w-xs items-center rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">
                  <span class="absolute -inset-1.5" />
                  <span class="sr-only">Open user menu</span>
                    <img
                    class="size-8 rounded-full outline -outline-offset-1 outline-white/10"
                    :src="auth.user?.avatar || 'https://via.placeholder.com/100?text=User'"
                    alt=""
                    />                
                </MenuButton>

                <transition enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95" enter-to-class="transform scale-100" leave-active-class="transition ease-in duration-75" leave-from-class="transform scale-100" leave-to-class="transform opacity-0 scale-95">
                  <MenuItems class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-gray-800 py-1 outline-1 -outline-offset-1 outline-white/10">
                    <MenuItem v-for="item in userNavigation" :key="item.name" v-slot="{ active }">
                        <a
                        v-if="item.name !== 'Sign out'"
                        :href="item.href"
                        :class="[active ? 'bg-white/5 outline-hidden' : '', 'block px-4 py-2 text-sm text-gray-300']"
                        >
                        {{ item.name }}
                        </a>
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
          <div class="-mr-2 flex md:hidden">
            <!-- Mobile menu button -->
            <DisclosureButton class="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-white/5 hover:text-white focus:outline-2 focus:outline-offset-2 focus:outline-indigo-500">
              <span class="absolute -inset-0.5" />
              <span class="sr-only">Open main menu</span>
              <Bars3Icon v-if="!open" class="block size-6" aria-hidden="true" />
              <XMarkIcon v-else class="block size-6" aria-hidden="true" />
            </DisclosureButton>
          </div>
        </div>
      </div>

      <DisclosurePanel class="md:hidden">
        <div class="space-y-1 px-2 pt-2 pb-3 sm:px-3">
          <DisclosureButton v-for="item in navigation" :key="item.name" as="a" :href="item.href" :class="[item.current ? 'bg-gray-950/50 text-white' : 'text-gray-300 hover:bg-white/5 hover:text-white', 'block rounded-md px-3 py-2 text-base font-medium']" :aria-current="item.current ? 'page' : undefined">{{ item.name }}</DisclosureButton>
        </div>
        <div class="border-t border-white/10 pt-4 pb-3">
          <div class="flex items-center px-5">
            <div class="shrink-0">
                <img
                    class="size-8 rounded-full outline -outline-offset-1 outline-white/10"
                    :src="auth.user?.avatar || 'https://via.placeholder.com/100?text=User'"
                    alt=""
                    />               
                 </div>
            <div class="ml-3">
                <div class="text-base font-medium text-gray-600">{{ auth.user?.name }}</div>
                <div class="text-sm font-medium text-gray-600">{{ auth.user?.email }}</div>
            </div>
            <button type="button" class="relative ml-auto shrink-0 rounded-full p-1 text-gray-400 hover:text-white focus:outline-2 focus:outline-offset-2 focus:outline-indigo-500">
              <span class="absolute -inset-1.5" />
              <span class="sr-only">View notifications</span>
              <BellIcon class="size-6" aria-hidden="true" />
            </button>
          </div>
          <div class="mt-3 space-y-1 px-2">
            <DisclosureButton v-for="item in userNavigation" :key="item.name" as="a" :href="item.href" class="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-white/5 hover:text-white">{{ item.name }}</DisclosureButton>
          </div>
        </div>
      </DisclosurePanel>
    </Disclosure>

    <header class="relative bg-gray-800 after:pointer-events-none after:absolute after:inset-x-0 after:inset-y-0 after:border-y after:border-white/10">
      <div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <h1 class="text-3xl font-bold tracking-tight text-white">Dashboard</h1>
      </div>
    </header>
    <main>
      <div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
       <div class="text-lg text-bg-gray-600"> 
            Welcome {{ auth.user?.name }}
       </div> 
      </div>
    </main>
  </div>
</template>

<script setup>
    import { onMounted } from 'vue'
    import { useAuthStore } from '../stores/auth'
    import { useRouter } from 'vue-router'
    import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
    import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/vue/24/outline'

    const auth = useAuthStore()
    const router = useRouter()

    const navigation = [
    { name: 'Dashboard', href: '/dashboard', current: true },
    { name: 'Goals', href: '/goals', current: false },
    { name: 'Expenses', href: '/expenses', current: false },
    { name: 'Income', href: '/income', current: false },
    { name: 'Analytics', href: '/analytics', current: false },
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

// Fetch user data on mount
    onMounted(async () => {
    if (!auth.user) {
        await auth.fetchUser()
    }
    })
</script>

