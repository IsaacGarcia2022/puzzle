<script setup>
import { ref } from 'vue'
import PuzzleBoard from '../components/PuzzleBoard.vue'
import PuzzleButtons from '../components/PuzzleButtons.vue'
import VictoryScreen from '../components/VictoryScreen.vue'

const boardRef = ref(null)
const showVictory = ref(false)
const currentImage = ref('/assets/img/couple.jpg')
const currentPhrase = 'Vilmita, mi amor yo la quiero mucho'

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
      :image="currentImage"
      :phrase="currentPhrase"
      difficulty="facil"
      @solved="handleSolved"
    />
    <PuzzleButtons :onShuffle="handleShuffle" :onBack="handleBack" />
  </div>
  <VictoryScreen
    v-if="showVictory"
    :image="currentImage"
    :phrase="currentPhrase"
    :onPlayAgain="handlePlayAgain"
  />
</template>
