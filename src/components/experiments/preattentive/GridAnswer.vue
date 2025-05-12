<script setup>
import {ref} from "vue";

const props = defineProps({
  gridSize: {
    type: Number,
    required: true
  },
  handleClick: {
    type: Function,
    required: true
  },
  correctSegment: {
    type: Number,
    required: true
  }
})

const isCorrect = ref(false);
const isAnswered = ref(false);

const handleSelection = (selectedSegment) => {
  if (isAnswered.value) return;
  isCorrect.value = selectedSegment === props.correctSegment;
  isAnswered.value = true;
}

</script>

<template>
  <div class="grid grid-cols-3 gap-2 w-full max-w-lg m-auto">
    <div v-for="i in gridSize"
         :key="i"
         class="grid-element"
         @click="handleSelection(i)"
    />
  </div>
  <div v-if="isAnswered" class="pt-5 w-full flex flex-col justify-center items-center gap-4">
    <p class="text-xl text-center">
      {{ isCorrect ? 'Correct!' : 'Wrong answer! Try again!' }}
    </p>
    <button @click="handleClick(isCorrect)" class="w-1/3">
      {{ isCorrect ? 'Next question!' : 'Repeat question' }}
    </button>
  </div>
</template>