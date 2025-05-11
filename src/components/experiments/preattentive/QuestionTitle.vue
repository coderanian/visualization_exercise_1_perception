<script setup>
const props = defineProps({
  currentQuestion: {
    type: Number,
    required: true
  },
  state: {
    type: String,
    required: true
  },
});
</script>

<template>
  <h2 class="text-center text-2xl font-htw-bold text-gray mb-10">
    {{ currentQuestion + 1 }}. Question:
    <span v-if="props.state === 'answer'">Where was the different attribute in the image?</span>
    <span v-else-if="props.state === 'wrong'">Wrong answer, please look at the image again.</span>
    <span v-else>Find the different attribute.</span>
  </h2>
</template>

<style scoped>

</style>