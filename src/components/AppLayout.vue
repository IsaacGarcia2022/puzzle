<script setup>
import AppHeader from './AppHeader.vue'
import AppFooter from './AppFooter.vue'
</script>

<template>
  <div class="h-[100dvh] bg-white flex flex-col overflow-hidden">
    <AppHeader />
    <main class="flex-1 overflow-hidden pt-8 pb-24 px-3 sm:px-4 md:px-6">
      <router-view />
    </main>
    <AppFooter />
  </div>
</template>
