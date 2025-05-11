<script setup>
import { ref, computed } from 'vue';
import {InteractiveGrid, QuestionTitle} from "@/components/experiments/preattentive/";
import {getRandomColor, getSizes} from "@/utils.js";

const state = ref("answer");
const correctSegment = ref(3);
const selectedSegment = ref(null);
const isCorrect = ref(false);
const timeout = ref(500);

const {incrementProgress} = defineProps({
  incrementProgress: {
    type: Function,
    required: true
  }
});

const answers = ref([]);
const currentQuestion = ref(0);
const totalQuestions = 10;
const inputAnswer = ref(1);

const questionSetup = ref({
  id: null,
  shape: null,
  sizeLeft: null,
  sizeRight: null,
  color: null,
  answer: null
});

const generateNewQuestion = () => {
  questionSetup.value = {
    id: currentQuestion.value + 1,
    grid: currentQuestion.value < 5 ? "circle" : "square",
    sizeLeft: sizes[0],
    sizeRight: sizes[1],
    color: getRandomColor(),
    answer: null
  };
};


const setCorrectSegment = () => {
  correctSegment.value = Math.floor(Math.random() * 9);
}

const isSegmentCorrect = computed(() => {
  return selectedSegment.value === correctSegment.value;
});

const setState = (newState) => {
  state.value = newState;
};

const setSelectedSegment = (segment) => {
  selectedSegment.value = segment;
  //if corret next question
  //if false repeat with different title and higher timeout
  isCorrect.value = segment === correctSegment.value;
};

const handleClick = (selectedSegment) => {

}
</script>

<template>
  <QuestionTitle :state="state" :current-question="currentQuestion"/>
  <InteractiveGrid v-if="state === 'answer'"
                   :grid-size="9"
                   :handle-click="handleClick"
                   :correct-segment="3"
  />
</template>