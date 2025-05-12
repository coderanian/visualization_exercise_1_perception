<script setup>
import {defineProps} from "vue";
import {useRouter, useRoute} from "vue-router";

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
const route = useRoute();

const goToExplanation = () => {
  router.push('/');
  restartProgress();
}

const goToStatistics = () => {
  router.push('/result')
  setProgress(11);
}

const goToHome = () => {
  router.push('/');
  restartProgress();
}

</script>

<template>
  <header class="bg-primary text-white w-screen h-screen/5 flex items-center">
    <img src="../../assets/img/htw_logo.svg"
         alt="HTW Logo"
         class="cursor-pointer h-30 w-30 object-contain ml-10"
         @click="goToHome"
    >
    <div class="flex flex-col justify-center ml-10 gap-2">
      <h1 class="font-htw-bold text-2xl">Experiments for Masters Course "Visualization"</h1>
      <nav class="flex flex-row gap-4">
        <router-link class="header-navbar-link"
                     active-class="header-navbar-link-active"
                     to="/sizes/explanation"
        >
          Size Perception Factor
        </router-link>
        <router-link class="header-navbar-link"
                     active-class="header-navbar-link-active"
                     to="/preattentive/explanation"
        >
          Pre-attentive Processing
        </router-link>
      </nav>
    </div>
    <div class="flex flex-row gap-4 ml-auto mr-10">
      <img @click="goToStatistics"
           src="../../assets/img/data_icon.svg"
           alt="Data Icon"
           class="header-btn"
      >
      <img @click="goToExplanation"
           v-if="route.path !== '/' && route.path !== '/result'"
           src="../../assets/img/restart_icon.svg"
           alt="Restart Icon"
           class="header-btn"
      >
    </div>
  </header>
</template>