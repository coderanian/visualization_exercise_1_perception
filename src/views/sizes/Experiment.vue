<script setup>
import {ref} from "vue";
import {useRouter} from "vue-router";
import {Circle, Square, InputForm, SubmitButton} from "@/components/experiments/sizes/index.js";
import {getSizes, getRandomColor} from "@/utils.js";

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
  const sizes = getSizes();
  questionSetup.value = {
    id: currentQuestion.value + 1,
    shape: currentQuestion.value < 5 ? "circle" : "square",
    sizeLeft: sizes[0],
    sizeRight: sizes[1],
    color: getRandomColor(),
    answer: null
  };
};

const handleNext = () => {
  questionSetup.value.answer = inputAnswer.value;
  answers.value.push({...questionSetup.value});
  incrementProgress();
  currentQuestion.value++;
  generateNewQuestion();
  inputAnswer.value = 1;
};

const router = useRouter();
const goToResult = () => {
  router.push('/result');
}

generateNewQuestion();
</script>

<template>
  <SubmitButton v-if="currentQuestion === totalQuestions" :goToResult="goToResult" :answers="answers"/>
  <div v-else>
    <InputForm
        :inputAnswer="inputAnswer"
        :currentQuestion="currentQuestion"
        @update:inputAnswer="val => inputAnswer = val"
        :handleNext="handleNext"
    />
    <div v-if="currentQuestion < totalQuestions">
      <div class="w-2/3 h-[500px] mx-auto flex justify-center items-center gap-20 mt-0">
        <component
            :is="questionSetup.shape === 'circle' ? Circle : Square"
            :size="questionSetup.sizeLeft"
            :fill="questionSetup.color"
        />
        <component
            :is="questionSetup.shape === 'circle' ? Circle : Square"
            :size="questionSetup.sizeRight"
            :fill="questionSetup.color"
        />
      </div>
    </div>
  </div>
</template>



