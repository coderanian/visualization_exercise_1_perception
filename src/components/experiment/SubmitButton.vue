<script setup>
import {ref, defineProps} from "vue";
import {calculateRatio, calculatePerceptionFactor} from "@/utils.js";

const props = defineProps({
  answers: {
    type: Array,
    required: true
  },
  goToResult: {
    type: Function,
    required: true
  },
});

const showAnswers = ref(false);
const toggleAnswers = () => {
  showAnswers.value = !showAnswers.value
}

const submit = () => {
  const subject = encodeURIComponent('Experiment Answers');
  const body = encodeURIComponent(JSON.stringify(props.answers, null, 2)); // make it readable
  window.location.href = `mailto:italics8706@proton.me?subject=${subject}&body=${body}`;
  console.log(props.answers)
  props.goToResult();
}
</script>

<template>
  <div class="mt-4 flex flex-col justify-center items-center gap-4">
    <button @click="submit">Submit answers</button>
    <p>
      Based on your answers your perception of the area of the shapes is:
      <strong>{{calculatePerceptionFactor(props.answers)}}</strong>
    </p>
    <button @click="toggleAnswers">
      {{ showAnswers ? 'Hide your answers' : 'Show your answers' }}
    </button>
    <div v-if="showAnswers" class="mt-4 text-left">
      <ul>
        <li v-for="(answer, index) in props.answers" :key="index" class="mb-2">
          <strong>{{ index + 1 }}. {{ answer.shape.toUpperCase() }}</strong>:
          real ratio - {{ calculateRatio(answer.sizeLeft, answer.sizeRight) }}x bigger,
          your ratio - {{ answer.answer }}x bigger,
          your factor - {{calculatePerceptionFactor([answer])}}
        </li>
      </ul>
    </div>
  </div>
</template>
