<script setup>
import { ref, onMounted, nextTick, watch } from 'vue'
import { Download, RotateCcw } from 'lucide-vue-next'
import html2canvas from 'html2canvas'

const props = defineProps({
  image: { type: String, required: true },
  phrase: { type: String, default: '' },
  onPlayAgain: { type: Function, required: true }
})

const captureRef = ref(null)
const capturedImage = ref(null)

async function captureImage() {
  await nextTick()
  if (!captureRef.value) return

  await new Promise((resolve) => {
    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.onload = resolve
    img.onerror = resolve
    img.src = props.image
  })

  await nextTick()

  const canvas = await html2canvas(captureRef.value, {
    backgroundColor: '#ffffff',
    scale: 2,
    useCORS: true
  })
  capturedImage.value = canvas.toDataURL('image/png')
}

onMounted(captureImage)
watch(() => props.image, captureImage)

function downloadImage() {
  if (!capturedImage.value) return
  const link = document.createElement('a')
  link.download = 'puzzle-victoria.png'
  link.href = capturedImage.value
  link.click()
}
</script>

<template>
  <div class="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
    <div class="bg-white rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-2xl">
      <h2 class="text-2xl font-bold text-center text-gray-800">¡Felicidades! 🎉</h2>
      <p class="text-center text-gray-600">Has completado el puzzle</p>

      <div ref="captureRef" class="bg-white p-4 rounded-lg">
        <div class="relative w-full aspect-square rounded-lg overflow-hidden">
          <div class="absolute inset-0 bg-cover bg-center" :style="{ backgroundImage: `url(${image})` }"></div>
          <p v-if="phrase"
   class="absolute bottom-0 left-0 right-0 bg-black/70 text-center py-2 px-2 text-2xl backdrop-blur-sm"
   style="font-family: 'BJCree', serif;">
  <span class="bg-gradient-to-b from-[#BF953F] via-[#FCF6BA] to-[#AA771C] bg-clip-text text-transparent">
    {{ phrase }}
  </span>
</p> 
        </div>
      </div>

      <div class="flex gap-3">
        <button
          @click="downloadImage"
          class="flex-1 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center justify-center gap-2"
        >
          <Download class="w-5 h-5" />
          Guardar imagen
        </button>
        <button
          @click="onPlayAgain"
          class="flex-1 px-4 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors font-medium flex items-center justify-center gap-2"
        >
          <RotateCcw class="w-5 h-5" />
          Jugar de nuevo
        </button>
      </div>
    </div>
  </div>
</template>
