<script setup>
import {ref} from "vue";
import {Header, Footer, ProgressBar} from "@/components/general";
import {useRoute} from "vue-router";

const progress = ref({current: 0, total: 11})
const route = useRoute();

const incrementProgress = () => {
  if (progress.value.current < progress.value.total)
    progress.value.current++
}
const restartProgress = () => {
  progress.value.current = 0
}
const setProgress = (page) => {
  progress.value.current = page;
}

</script>

<template>
  <Header :restartProgress="restartProgress" :setProgress="setProgress"/>
  <main class="mt-10">
    <RouterView :incrementProgress="incrementProgress"/>
    <ProgressBar v-if="progress.current < progress.total && route.path !== '/'"
                 :current="progress.current"
                 :total="progress.total"
    />
  </main>
  <Footer/>
</template>