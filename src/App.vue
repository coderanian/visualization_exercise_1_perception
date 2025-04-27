<script setup>
import {ref} from "vue";
import {Header, Footer, ProgressBar} from "@/components/general";

const progress = ref({current: 0, total: 10})
const incrementProgress = () => {
  if(progress.value.current < progress.value.total)
    progress.value.current++
}
const restartProgress = () => {
  progress.value.current = 0
}

</script>

<template>
  <Header :restartProgress="restartProgress"/>
  <main class="mt-10">
    <RouterView :incrementProgress="incrementProgress"/>
    <ProgressBar :current="progress.current" :total="progress.total"/>
  </main>
  <Footer/>
</template>