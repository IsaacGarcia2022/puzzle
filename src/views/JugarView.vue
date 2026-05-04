<script setup>
import { ref } from 'vue'
import PuzzleBoard from '../components/PuzzleBoard.vue'
import PuzzleButtons from '../components/PuzzleButtons.vue'
import VictoryScreen from '../components/VictoryScreen.vue'

const boardRef = ref(null)
const showVictory = ref(false)

function handleShuffle() {
  boardRef.value?.shuffleTiles()
}

function handleBack() {
  console.log('Regresar')
}

function handleSolved() {
  showVictory.value = true
}

function handlePlayAgain() {
  showVictory.value = false
  boardRef.value?.shuffleTiles()
}
</script>

<template>
  <div class="h-full flex flex-col items-center justify-center gap-2 py-2">
    <PuzzleBoard
      ref="boardRef"
      image="/assets/img/paisaje1.jpg"
      phrase="Vilmita yo la quiero mucho"
      difficulty="facil"
      @solved="handleSolved"
    />
    <PuzzleButtons :onShuffle="handleShuffle" :onBack="handleBack" />
  </div>
  <VictoryScreen
    v-if="showVictory"
    image="/assets/img/paisaje1.jpg"
    phrase="Vilmita yo la quiero mucho"
    :onPlayAgain="handlePlayAgain"
  />
</template>
