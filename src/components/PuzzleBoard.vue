<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  image: { type: String, required: true },
  phrase: { type: String, default: 'Respirar también es avanzar' },
  difficulty: { type: String, default: 'facil' }
})

const words = computed(() => props.phrase.split(' '))

const tiles = ref([])
const draggedIndex = ref(null)
const touchDragIndex = ref(null)
const tileRefs = ref([])

const emptyIndex = computed(() => tiles.value.indexOf(0))

const correctCount = computed(() =>
  tiles.value.filter((val, idx) => val === idx).length
)

const isSolved = computed(() =>
  tiles.value.every((val, idx) => val === idx)
)

const wordsToReveal = computed(() => {
  if (words.value.length === 0) return 0
  const maxCorrect = 8
  const revealed = Math.floor(correctCount.value * words.value.length / maxCorrect)
  return Math.min(revealed, words.value.length)
})

const movesCount = computed(() => {
  switch (props.difficulty) {
    case 'medio': return 30
    case 'dificil': return 50
    default: return 15
  }
})

function shuffleTiles() {
  let arr = [0, 1, 2, 3, 4, 5, 6, 7, 8]
  const moves = movesCount.value
  for (let move = 0; move < moves; move++) {
    const emptyIdx = arr.indexOf(0)
    const neighbors = []
    const r = Math.floor(emptyIdx / 3), c = emptyIdx % 3
    if (r > 0) neighbors.push(emptyIdx - 3)
    if (r < 2) neighbors.push(emptyIdx + 3)
    if (c > 0) neighbors.push(emptyIdx - 1)
    if (c < 2) neighbors.push(emptyIdx + 1)
    const randomNeighbor = neighbors[Math.floor(Math.random() * neighbors.length)]
    ;[arr[randomNeighbor], arr[emptyIdx]] = [arr[emptyIdx], arr[randomNeighbor]]
  }
  tiles.value = arr
}

function isAdjacent(i1, i2) {
  const r1 = Math.floor(i1 / 3), c1 = i1 % 3
  const r2 = Math.floor(i2 / 3), c2 = i2 % 3
  return (r1 === r2 && Math.abs(c1 - c2) === 1) ||
         (c1 === c2 && Math.abs(r1 - r2) === 1)
}

function moveTile(fromIndex) {
  if (!isAdjacent(fromIndex, emptyIndex.value)) return
  const newTiles = [...tiles.value]
  const ei = emptyIndex.value
  ;[newTiles[fromIndex], newTiles[ei]] = [newTiles[ei], newTiles[fromIndex]]
  tiles.value = newTiles
}

function onDragStart(e, index) {
  if (tiles.value[index] === 0) return
  draggedIndex.value = index
  e.dataTransfer.effectAllowed = 'move'
}

function onDragOver(e) {
  e.preventDefault()
}

function onDrop(e) {
  e.preventDefault()
  if (draggedIndex.value !== null) {
    moveTile(draggedIndex.value)
    draggedIndex.value = null
  }
}

function onTouchStart(e, index) {
  if (tiles.value[index] === 0) return
  touchDragIndex.value = index
}

function onTouchEnd(e) {
  if (touchDragIndex.value === null) return
  const touch = e.changedTouches[0]
  const { clientX, clientY } = touch
  const targetIdx = tileRefs.value.findIndex((el, idx) => {
    if (!el || tiles.value[idx] !== 0) return false
    const rect = el.getBoundingClientRect()
    return clientX >= rect.left && clientX <= rect.right &&
           clientY >= rect.top && clientY <= rect.bottom
  })
  if (targetIdx !== -1) {
    moveTile(touchDragIndex.value)
  }
  touchDragIndex.value = null
}

function bgPos(val) {
  const col = val % 3
  const row = Math.floor(val / 3)
  return `${col * 50}% ${row * 50}%`
}

shuffleTiles()

defineExpose({ shuffleTiles })
</script>

<template>
  <div class="flex flex-col items-center w-full max-w-lg space-y-2 px-2 h-full">
    <div class="text-center w-full shrink-0">
      <p class="text-sm w-full sm:text-base md:text-lg text-black tracking-wide inline-flex gap-2 flex-wrap justify-center bg-rose-100 py-3 sm:py-4 rounded">
        <span
          v-for="(word, wIdx) in words"
          :key="wIdx"
        >
          <template v-if="wIdx < wordsToReveal">
            <span class="animate-fade-in">{{ word }}</span>
          </template>
          <template v-else>
            <span class="text-gray-400 font-light">{{ word.replace(/./g, '_') }}</span>
          </template>
        </span>
      </p>
    </div>
    <p class="text-xs sm:text-sm text-gray-400 text-center shrink-0">Desliza para completar la frase</p>
    <div class="grid grid-cols-3 gap-1.5 w-full flex-1 max-h-[60vh]">
      <div
        v-for="(tile, idx) in tiles"
        :key="idx"
        :ref="(el) => tileRefs[idx] = el"
        :draggable="tile !== 0"
        @dragstart="onDragStart($event, idx)"
        @dragover="tile === 0 ? onDragOver($event) : null"
        @drop="tile === 0 ? onDrop($event) : null"
        @touchstart="onTouchStart($event, idx)"
        @touchend="onTouchEnd($event)"
        class="rounded-lg transition-all duration-500 active:scale-95 shadow-md relative"
        :class="tile === 0 && !isSolved ? 'bg-white cursor-default' : 'bg-cover cursor-grab',
                tile !== 0 && tile === idx ? 'ring-2 ring-green-400 ring-opacity-60 brightness-105' : ''"
        :style="tile === 0 && !isSolved ? {} : {
          backgroundImage: `url(${image})`,
          backgroundSize: '300% 300%',
          backgroundPosition: bgPos(tile)
        }"
      >
        <span
          v-if="tile !== 0"
          class="absolute top-1 left-1.5 w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-white text-black text-xs sm:text-sm font-medium flex items-center justify-center shadow-sm pointer-events-none"
        >{{ tile + 1 }}</span>
      </div>
    </div>
  </div>
</template>
