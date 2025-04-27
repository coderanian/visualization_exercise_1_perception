<script setup>
import {defineProps} from "vue";
import {useRouter} from "vue-router";

const { incrementProgress } = defineProps({
  incrementProgress: {
    type: Function,
    required: true
  }
});

const router = useRouter();

const goToExperiment = () => {
  router.push('/experiment');
  incrementProgress();
}
</script>

<template>
  <div class="text-center text-lg flex flex-col gap-4 w-2/3 m-auto">
    <p>
      Our perception of the area of a shape often does not exactly match its actual physical area.
      Research has shown that the perceived size ratio is not directly proportional to the actual area ratio.
      Instead, it follows a so-called power function:
    </p>
    <p class="font-htw-bold text-primary text-xl">
      Perceived ratio = (actual ratio) raised to the power of x, where x varies slightly from person to person.
    </p>
    <p>
      In this experiment, you will compare the sizes of five pairs of circles and five pairs of squares.
      For each pair, you will compare the increase/decrease ratio of the right figure to the left.
    </p>
    <p>
      For example, if you think that the figure on the right is twice the size of the figure on the left, you should select 2.
    </p>
    <p>
      At the end, you will see your perceived ratio! You can restart or see current statistics via buttons at the top right corner.
    </p>
    <button @click="goToExperiment">Begin</button>
  </div>
</template>
