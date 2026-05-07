<script setup>
import { Shuffle, ArrowLeft } from 'lucide-vue-next'

defineProps({
  onShuffle: { type: Function, required: true },
  onBack: { type: Function, required: true }
})
</script>

<template>
  <div class="flex gap-3 w-full max-w-lg mx-auto px-2">
    <button
      @click="onShuffle"
      class="flex-1 px-6 py-3 bg-terracotta text-cream rounded-xl hover:bg-terracotta/90 transition-all duration-300 text-sm font-medium tracking-wide shadow-md hover:shadow-lg active:scale-95 flex items-center justify-center gap-2 group"
      >
       <Shuffle class="w-4 h-4 inline transition-transform group-hover:rotate-180 duration-500" />
       Mezclar
     </button>
    <button
      @click="onBack"
      class="flex-1 px-6 py-3 bg-white/80 backdrop-blur-sm text-charcoal/70 border border-sand rounded-xl hover:bg-sand/50 hover:text-charcoal transition-all duration-300 text-sm font-medium tracking-wide shadow-sm hover:shadow-md active:scale-95 flex items-center justify-center gap-2"
    >
       <ArrowLeft class="w-4 h-4 inline transition-transform group-hover:-translate-x-1 duration-300" />
       Regresar
     </button>
  </div>
</template>
