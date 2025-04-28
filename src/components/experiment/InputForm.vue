<script setup>
import { defineProps } from "vue";

const props = defineProps({
  inputAnswer: {
    type: Number,
    required: true
  },
  handleNext: {
    type: Function,
    required: true
  },
  currentQuestion: {
    type: Number,
    required: true
  }
});
</script>

<template>
  <h2 class="text-center text-2xl font-htw-bold text-gray">
    {{ currentQuestion + 1 }}. How much bigger is the right figure compared to the left?
  </h2>

  <div class="mt-4 flex justify-center items-center gap-4">
    <input
        type="number"
        min="1"
        max="20"
        :value="inputAnswer"
        @input="$emit('update:inputAnswer', Number($event.target.value))"
        placeholder="Enter ratio"
        class="border p-2"
    />
    <button @click="handleNext" class="bg-primary text-white p-2 rounded">
      Next
    </button>
  </div>
</template>
