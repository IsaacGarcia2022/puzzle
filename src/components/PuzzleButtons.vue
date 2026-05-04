<script setup>
import { Shuffle, ArrowLeft } from 'lucide-vue-next'

defineProps({
  onShuffle: { type: Function, required: true },
  onBack: { type: Function, required: true }
})
</script>

<template>
  <div class="mt-6 sm:mt-8 flex flex-col gap-3 sm:gap-4 justify-center w-full max-w-lg mx-auto">
    <button
      @click="onShuffle"
      class="w-full px-5 sm:px-6 py-3 sm:py-2.5 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors text-md font-medium tracking-wide"
      >
       <Shuffle class="w-4 h-4 mr-2 inline" />Mezclar
     </button>
    <button
      @click="onBack"
      class="w-full px-5 sm:px-6 py-3 sm:py-2.5 bg-white text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-md font-medium tracking-wide"
    >
       <ArrowLeft class="w-4 h-4 mr-2 inline" />Regresar
     </button>
  </div>
</template>
