<script setup>
import {onMounted, ref} from 'vue';
import {GridAnswer, QuestionTitle, GridQuestion, SubmitForm} from "@/components/experiments/preattentive/";
import {TARGETORDER} from "@/utils.js";

const {incrementProgress} = defineProps({
  incrementProgress: {
    type: Function,
    required: true
  }
});

const state = ref("question");
const answers = ref([]);
const currentQuestion = ref(0);
const totalQuestions = TARGETORDER.length;
const getRandomSegment = () => Math.floor(Math.random() * 9) + 1;

const questionSetup = ref({
  id: 0,
  timeout: 500,
  target: TARGETORDER[currentQuestion.value].target,
  nonTarget: "square",
  correctSegment: getRandomSegment(),
  difficulty: TARGETORDER[currentQuestion.value].target,
});

const generateNewQuestion = () => {
  questionSetup.value = {
    id: currentQuestion.value + 1,
    timeout: 150,
    target: TARGETORDER[currentQuestion.value].target,
    correctSegment: getRandomSegment(),
    difficulty: TARGETORDER[currentQuestion.value].difficulty,
  };
  state.value = "question";
  startTimer(questionSetup.value.timeout);
};

onMounted(() => {
  generateNewQuestion();
});

const startTimer = (time) => {
  setTimeout(() => {
    state.value = "answer";
  }, questionSetup.value.timeout);
}
const repeatQuestion = () => {
  questionSetup.value.timeout += 100;
  state.value = "question";
  startTimer(questionSetup.value.timeout);
}

const handleAnswer = (isCorrect) => {
  if (isCorrect) {
    answers.value.push(questionSetup.value);
    currentQuestion.value++;
    incrementProgress();
    generateNewQuestion();
  } else {
    repeatQuestion();
  }
}

</script>

<template>
  <QuestionTitle :state="state"
                 :current-question="currentQuestion"
  />
  <section v-if="currentQuestion < totalQuestions">
    <GridAnswer v-if="state === 'answer'"
                :grid-size="9"
                :handle-click="handleAnswer"
                :correct-segment="questionSetup.correctSegment"
    />
    <GridQuestion v-else-if="state === 'question'"
                  :grid-size="9"
                  :question-setup="questionSetup"
    />
  </section>
  <section v-else>
    <SubmitForm :answers="answers"/>
  </section>
</template>