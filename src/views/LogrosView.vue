<template>
  <div class="flex flex-col items-center justify-center min-h-full py-12 animate-fade-in">
    <div class="text-center space-y-6 max-w-xs">
      <div class="relative">
        <Trophy class="w-16 h-16 text-sand mx-auto" />
        <div class="absolute -top-1 -right-1 w-6 h-6 bg-terracotta/20 rounded-full flex items-center justify-center">
          <span class="text-xs text-terracotta">✨</span>
        </div>
      </div>
      <h2 class="text-2xl font-display text-charcoal">Logros</h2>
      <p class="text-charcoal/50 text-sm leading-relaxed">Completa puzzles para desbloquear logros especiales y recompensas.</p>
      <div class="grid grid-cols-3 gap-3 pt-4">
        <div v-for="n in 6" :key="n" class="aspect-square bg-sand/30 rounded-xl border border-sand/50 flex items-center justify-center">
          <span class="text-2xl opacity-30">🏆</span>
        </div>
      </div>
      <p class="text-xs text-charcoal/40">Los logros aparecerán aquí</p>
    </div>
  </div>
</template>

<script setup>
import { Trophy } from 'lucide-vue-next'
</script>
