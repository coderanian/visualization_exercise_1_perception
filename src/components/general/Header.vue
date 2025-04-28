<script setup>
import {defineProps} from "vue";
import {useRouter} from "vue-router";

const { restartProgress, setProgress } = defineProps({
  restartProgress: {
    type: Function,
    required: true
  },
  setProgress: {
    type: Function,
    required: true
  }
});

const router = useRouter();

const goToExplanation = () => {
  router.push('/');
  restartProgress();
}

const goToStatistics = () => {
  router.push('/result')
  setProgress(11);
}
</script>

<template>
  <header class="bg-primary text-white w-screen h-screen/5 flex justify-start items-center">
    <img src="../../assets/img/htw_logo.svg" alt="HTW Logo" class="h-30 w-30 object-contain ml-10">
    <div class="flex flex-col justify-center ml-10">
      <h1 class="font-htw-bold text-2xl">Object Perception Factor</h1>
      <h2 class="font-htw-regular text-xl">Experiment for Masters Course "Visualization"</h2>
    </div>
    <div class="flex flex-row gap-4 ml-auto mr-10">
      <img @click="goToStatistics" src="../../assets/img/data_icon.svg" alt="Data Icon" class="header-btn">
      <img @click="goToExplanation" src="../../assets/img/restart_icon.svg" alt="Restart Icon" class="header-btn">
    </div>
  </header>
</template>