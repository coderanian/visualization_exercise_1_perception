<script setup>
import {defineProps} from "vue";
import {useRouter} from "vue-router";
import Circle from "@/components/experiment/Circle.vue";

const {incrementProgress} = defineProps({
  incrementProgress: {
    type: Function,
    required: true
  }
});

const router = useRouter();
const goToResults = () => {
  router.push('/result');
  incrementProgress();
}
const colors = [
    "#76B900",
    "#AFAFAF",
    "#FF5F00",
    "#0082D1",
    "#000000"
]
const getRandomColor = () => {
  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
}
const answers = [

]
</script>

<template>
  <p class="text-center text-2xl font-htw-bold text-gray">
    How much bigger is the <span class="text-primary">right</span> right figure compared to the <span class="text-secondary">left</span>?
  </p>
  <div class="flex justify-center items-center justify-center mt-10">
    <input type="number" min="1" max="20" class="flex justify-center h-10 p-2" value="1">
    <img src="../assets/img/next_icon.svg" alt="Next Icon" class="w-10 h-10 ml-2 bg-primary"/>
  </div>
  <div class="w-2/3 h-[500px] mx-auto flex justify-center gap-x-100 items-center">
    <Circle size="50" fill="getRandomColor"/>
    <Circle size="450" fill="getRandomColor"/>
  </div>
</template>

