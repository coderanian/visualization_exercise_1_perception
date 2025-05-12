<script setup>
import {defineProps, ref} from "vue";
import {useRouter} from "vue-router";

const { incrementProgress } = defineProps({
  incrementProgress: {
    type: Function,
    required: true
  }
});

const router = useRouter();

const goToExperiment = () => {
  router.push('/preattentive/experiment');
  incrementProgress();
}
const isInfoShown = ref(false);
const showInfo = () => {
  isInfoShown.value = !isInfoShown.value;
}

</script>

<template>
  <div class="text-center text-lg flex flex-col gap-4 w-2/3 m-auto">
    <p>
      In the following eight questions, you will see an image for short duration and then asked to click on an area with the target attribute.
    </p>
    <p>
      If your answer is wrong you will repeat the duration of the repeated question will increase until you get correct answer.
      This is the setup of the experiment:
    </p>
    <ol>
      <li>1. Find red circle</li>
      <li>2. Find green circle</li>
      <li>3. Find rectangle</li>
      <li>4. Find rhombus</li>
      <li>5 - 6. Find biggest circle</li>
      <li>7 - 8. Find biggest red circle</li>
    </ol>
    <button @click="goToExperiment">Begin</button>
    <button @click="showInfo">
      {{ isInfoShown ? 'Hide info on preattentive processing' : 'Show info on preattentive processing' }}
    </button>
    <div v-if="isInfoShown" class="mt-4 text-left">
      <p>
        Preattentive perception refers to the ability of the human brain to process certain visual information automatically and rapidly,
        without the need for conscious attention.
        This process allows us to quickly detect and recognize certain visual features, such as color, shape, size, or orientation,
        even before we intentionally focus on them.
        Preattentive cues are often used in design, data visualization, and cognitive psychology to highlight important information
        and facilitate quicker decision-making by utilizing these easily processed visual attributes.
      </p>
    </div>
  </div>
</template>
