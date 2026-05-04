<script setup>
import { Settings } from 'lucide-vue-next'
</script>

<template>
  <header class="fixed top-0 left-0 right-0 z-50 bg-white shadow-[0_2px_10px_rgba(0,0,0,0.1)] h-14 px-4 flex items-center justify-between">
    <h1 class="text-lg font-semibold text-gray-800">Puzzle Game</h1>
    <button class="p-2 rounded-lg hover:bg-black/5 transition-colors">
      <Settings class="w-6 h-6 text-gray-700" />
    </button>
  </header>
</template>
