<template>
  <div class="flex flex-col items-center justify-center min-h-full py-12 animate-fade-in">
    <div class="text-center space-y-6 max-w-xs">
      <div class="relative inline-block">
        <div class="w-24 h-24 rounded-full bg-gradient-to-br from-terracotta/20 to-sage/20 flex items-center justify-center">
          <Flame class="w-12 h-12 text-terracotta/60" />
        </div>
        <div class="absolute bottom-0 right-0 w-8 h-8 bg-cream rounded-full border-2 border-sand flex items-center justify-center">
          <span class="text-lg">🔥</span>
        </div>
      </div>
      <h2 class="text-2xl font-display text-charcoal">Mi Racha</h2>
      <div class="bg-sand/40 rounded-2xl p-6 space-y-3 border border-sand/60">
        <div class="flex justify-between items-center">
          <span class="text-sm text-charcoal/60">Racha actual</span>
          <span class="text-2xl font-display text-terracotta">0 días</span>
        </div>
        <div class="flex justify-between items-center">
          <span class="text-sm text-charcoal/60">Mejor racha</span>
          <span class="text-lg font-display text-charcoal/70">0 días</span>
        </div>
      </div>
      <p class="text-charcoal/50 text-sm">Juega diariamente para mantener tu racha</p>
    </div>
  </div>
</template>

<script setup>
import { Flame } from 'lucide-vue-next'
</script>
