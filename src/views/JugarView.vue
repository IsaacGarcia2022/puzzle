<script setup>
import { ref } from 'vue'
import PuzzleBoard from '../components/PuzzleBoard.vue'
import PuzzleButtons from '../components/PuzzleButtons.vue'

const boardRef = ref(null)

function handleShuffle() {
  boardRef.value?.shuffleTiles()
}

function handleBack() {
  console.log('Regresar')
}
</script>

<template>
  <div class="h-full flex flex-col items-center justify-center gap-2 py-2">
    <PuzzleBoard
      ref="boardRef"
      image="/assets/img/paisaje1.jpg"
      phrase="Vilmita, mi amor yo la quiero mucho <3"
      difficulty="facil"
    />
    <PuzzleButtons :onShuffle="handleShuffle" :onBack="handleBack" />
  </div>
</template>
