<script setup>
import {GridSection} from "@/components/experiments/preattentive/";

const props = defineProps({
  gridSize: {
    type: Number,
    required: true
  },
  questionSetup: {
    type: Object,
    required: true
  }
})

</script>

<template>
  <div class="grid grid-cols-3 gap-2 w-full max-w-lg m-auto border-5 border p-2">
    <GridSection v-for="i in gridSize"
                 :key="i"
                 :targetSegment="i"
                 :target="questionSetup.target"
                 :correctSegment="questionSetup.correctSegment"
                 :difficulty="questionSetup.difficulty"
    />
  </div>
</template>
