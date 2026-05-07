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
  <footer class="fixed bottom-0 left-0 right-0 z-50 bg-cream/90 backdrop-blur-md border-t border-sand h-16 flex items-center justify-around pb-[env(safe-area-inset-bottom)]">
    <router-link
      v-for="item in menuItems"
      :key="item.path"
      :to="item.path"
      class="flex flex-col items-center justify-center flex-1 py-1 transition-all duration-300 relative"
      :class="route.path === item.path ? 'text-terracotta scale-105' : 'text-charcoal/50 hover:text-charcoal/70'"
    >
      <div v-if="route.path === item.path" class="absolute -top-0.5 w-8 h-0.5 bg-terracotta rounded-full"></div>
      <component :is="item.icon" class="w-5 h-5 mb-0.5" />
      <span class="text-[10px] font-medium tracking-wide">{{ item.label }}</span>
    </router-link>
  </footer>
</template>
