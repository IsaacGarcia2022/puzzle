<script setup>
import { ref, computed } from 'vue'

const phrase = "Respirar también es avanzar"
const words = phrase.split(' ')

const tiles = ref([])

const emptyIndex = computed(() => tiles.value.indexOf(0))

const correctCount = computed(() =>
  tiles.value.filter((val, idx) => val === idx).length
)

const isSolved = computed(() =>
  tiles.value.every((val, idx) => val === idx)
)

const wordsToReveal = computed(() =>
  Math.floor(correctCount.value * words.length / 9)
)

function countInversions(arr) {
  const withoutZero = arr.filter(v => v !== 0)
  let inv = 0
  for (let i = 0; i < withoutZero.length; i++)
    for (let j = i + 1; j < withoutZero.length; j++)
      if (withoutZero[i] > withoutZero[j]) inv++
  return inv
}

function shuffleTiles() {
  const arr = [0, 1, 2, 3, 4, 5, 6, 7, 8]
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
  if (countInversions(arr) % 2 !== 0) {
    const i1 = arr.indexOf(1)
    const i2 = arr.indexOf(2)
    ;[arr[i1], arr[i2]] = [arr[i2], arr[i1]]
  }
  tiles.value = arr
}

function isAdjacent(i1, i2) {
  const r1 = Math.floor(i1 / 3), c1 = i1 % 3
  const r2 = Math.floor(i2 / 3), c2 = i2 % 3
  return (r1 === r2 && Math.abs(c1 - c2) === 1) ||
         (c1 === c2 && Math.abs(r1 - r2) === 1)
}

function moveTile(index) {
  if (tiles.value[index] === 0) return
  if (!isAdjacent(index, emptyIndex.value)) return
  const newTiles = [...tiles.value]
  const ei = emptyIndex.value
  ;[newTiles[index], newTiles[ei]] = [newTiles[ei], newTiles[index]]
  tiles.value = newTiles
}

function bgPos(val) {
  const col = val % 3
  const row = Math.floor(val / 3)
  return `${col * 50}% ${row * 50}%`
}

shuffleTiles()
</script>

<template>
  <div class="min-h-screen bg-[#F5F5DC] flex flex-col items-center justify-center p-4">
    <h1 class="text-3xl font-light mb-8 text-gray-700 tracking-wide">Puzzle Deslizante</h1>

    <div class="grid grid-cols-3 gap-1.5 w-full max-w-sm aspect-square">
      <div
        v-for="(tile, idx) in tiles"
        :key="idx"
        @click="moveTile(idx)"
        class="rounded-lg cursor-pointer transition-all duration-500 active:scale-95 shadow-md"
        :class="tile === 0 && !isSolved ? 'bg-gray-300' : 'bg-cover'"
        :style="tile === 0 && !isSolved ? {} : {
          backgroundImage: 'url(https://picsum.photos/seed/puzzle/600/600)',
          backgroundSize: '300% 300%',
          backgroundPosition: bgPos(tile)
        }"
      />
    </div>

    <div class="mt-8 text-center">
      <p class="text-lg text-gray-600 tracking-wide inline-flex gap-2">
        <span
          v-for="(word, wIdx) in words"
          :key="wIdx"
          :class="wIdx < wordsToReveal ? (isSolved ? 'opacity-100 animate-fade-in' : 'opacity-100') : 'opacity-0'"
          class="transition-opacity duration-700"
        >{{ word }}</span>
      </p>
    </div>

    <button
      @click="shuffleTiles"
      class="mt-8 px-6 py-2.5 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors text-sm font-medium tracking-wide"
    >Mezclar</button>
  </div>
</template>
