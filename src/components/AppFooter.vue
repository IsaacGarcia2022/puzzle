<script setup>
import { useRoute } from 'vue-router'
import { Play, Flame, Trophy, User } from 'lucide-vue-next'

const route = useRoute()

const menuItems = [
  { path: '/jugar', label: 'Jugar', icon: Play },
  { path: '/racha', label: 'Mi Racha', icon: Flame },
  { path: '/logros', label: 'Logros', icon: Trophy },
  { path: '/perfil', label: 'Perfil', icon: User }
]
</script>

<template>
  <footer class="fixed bottom-0 left-0 right-0 z-50 bg-white shadow-[0_-2px_10px_rgba(0,0,0,0.1)] h-16 flex items-center justify-around pb-[env(safe-area-inset-bottom)]">
    <router-link
      v-for="item in menuItems"
      :key="item.path"
      :to="item.path"
      class="flex flex-col items-center justify-center flex-1 py-1 transition-colors"
      :class="route.path === item.path ? 'text-blue-600' : 'text-gray-500'"
    >
      <component :is="item.icon" class="w-6 h-6" />
      <span class="text-xs mt-1">{{ item.label }}</span>
    </router-link>
  </footer>
</template>
