<script setup>
import {useRouter} from "vue-router";

const router = useRouter();

const goToExperiment = (number) => {
  switch(number) {
    case 0: {
      router.push('/sizes/explanation');
      break;
    }
    case 1: {
      router.push('/preattentive/explanation');
      break;
    }
    case 2: {
      router.push('/visualization/car-efficiency');
      break;
    }
  }
}
</script>

<template>
  <div class="text-center text-lg flex flex-col gap-4 w-2/3 m-auto">
    <p>
      Following web application aims to study various factors of human size perception and pre-attentive processing.
      Feel free to participate at the experiments above!
    </p>
    <button @click="goToExperiment(0)">Experiment 1: Size Perception</button>
    <button @click="goToExperiment(1)">Experiment 2: Pre-attentive Processing</button>
    <button @click="goToExperiment(2)">Experiment 3: Car Data Visualization</button>
  </div>
</template>
