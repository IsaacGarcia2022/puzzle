<script setup>
import { Settings } from 'lucide-vue-next'
</script>

<template>
  <header class="fixed top-0 left-0 right-0 z-50 bg-cream/80 backdrop-blur-md border-b border-sand h-14 px-4 flex items-center justify-between">
    <h1 class="text-xl font-display text-charcoal tracking-wide">Puzzle Game</h1>
    <button class="p-2 rounded-full hover:bg-terracotta/10 transition-colors group">
      <Settings class="w-5 h-5 text-charcoal/70 group-hover:text-terracotta transition-colors" />
    </button>
  </header>
</template>
