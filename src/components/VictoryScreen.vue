<script setup>
import { ref, onMounted, nextTick, watch } from 'vue'
import { Download, RotateCcw, Heart } from 'lucide-vue-next'
import html2canvas from 'html2canvas'

const props = defineProps({
  image: { type: String, required: true },
  phrase: { type: String, default: '' },
  onPlayAgain: { type: Function, required: true }
})

const captureRef = ref(null)
const capturedImage = ref(null)
const showContent = ref(false)

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

  await new Promise((resolve) => setTimeout(resolve, 300))

  const canvas = await html2canvas(captureRef.value, {
    backgroundColor: '#FAF3E8',
    scale: 2,
    useCORS: true,
    logging: false,
    allowTaint: true
  })
  capturedImage.value = canvas.toDataURL('image/png')
}

onMounted(() => {
  captureImage()
  setTimeout(() => { showContent.value = true }, 100)
})
watch(() => [props.image, props.phrase], captureImage)

function downloadImage() {
  if (!capturedImage.value) return
  const link = document.createElement('a')
  link.download = 'puzzle-victoria.png'
  link.href = capturedImage.value
  link.click()
}
</script>

<template>
  <div class="fixed inset-0 bg-charcoal/60 backdrop-blur-sm flex items-center justify-center z-50">
    <div class="bg-cream rounded-3xl max-w-lg w-full p-8 space-y-6 shadow-2xl border border-sand/80 animate-bounce-in" :class="{ 'opacity-100': showContent, 'opacity-0': !showContent }" style="transition: opacity 0.5s ease-out;">
      <div class="text-center space-y-2">
        <div class="flex justify-center mb-3">
          <Heart class="w-12 h-12 text-terracotta fill-terracotta animate-bounce-in" />
        </div>
        <h2 class="text-3xl font-display text-charcoal">¡Felicidades mi amor!</h2>
        <p class="text-charcoal/60 font-body">Completó el puzzle como toda una crack!</p>
      </div>

      <div ref="captureRef" class="bg-cream p-4 rounded-2xl border border-sand/60">
        <div class="relative w-full aspect-square rounded-xl overflow-hidden shadow-lg">
          <div class="absolute inset-0 bg-cover bg-center" :style="{ backgroundImage: `url(${image})` }"></div>
          <p v-if="phrase"
   class="absolute bottom-0 left-0 right-0 bg-black/70 text-center py-4 px-4 text-xl"
   style="font-family: 'BJCree', serif; color: #FBBF24; font-weight: 500;">
  {{ phrase }}
</p>
        </div>
      </div>

      <div class="flex gap-3">
        <button
          @click="downloadImage"
          class="flex-1 px-5 py-3.5 bg-sage text-cream rounded-xl hover:bg-sage/90 transition-all duration-300 font-medium flex items-center justify-center gap-2 shadow-md hover:shadow-lg active:scale-95"
        >
          <Download class="w-5 h-5" />
          Guardar imagen
        </button>
        <button
          @click="onPlayAgain"
          class="flex-1 px-5 py-3.5 bg-terracotta text-cream rounded-xl hover:bg-terracotta/90 transition-all duration-300 font-medium flex items-center justify-center gap-2 shadow-md hover:shadow-lg active:scale-95"
        >
          <RotateCcw class="w-5 h-5" />
          Jugar de nuevo
        </button>
      </div>
    </div>
  </div>
</template>
