<script setup>
import AppHeader from './AppHeader.vue'
import AppFooter from './AppFooter.vue'
</script>

<template>
  <div class="h-[100dvh] bg-cream flex flex-col overflow-hidden relative grain-overlay">
    <div class="absolute inset-0 bg-gradient-to-br from-cream via-sand/30 to-terracotta/5 pointer-events-none"></div>
    <AppHeader />
    <main class="flex-1 overflow-hidden pt-6 pb-24 px-3 sm:px-4 md:px-6 relative z-10">
      <router-view />
    </main>
    <AppFooter />
  </div>
</template>
