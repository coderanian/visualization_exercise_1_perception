<script setup>
import {computed, defineProps} from "vue";

const props = defineProps({
  current: {
    type: Number,
    required: true
  },
  total: {
    type: Number,
    required: true
  },
});

const progressWidth = computed(() => {
  return `${(props.current / props.total) * 100}%`;
})

const pagesLeft = computed(() => {
  return props.total - props.current
})
</script>

<template>
  <div class="flex justify-center w-screen text-center absolute bottom-40">
    <div class="w-7/8 bg-secondary h-4 rounded-full">
      <div class="bg-primary h-4 rounded" :style="{ width: progressWidth }"></div>
      <span class="text-gray-600 text-sm">{{ pagesLeft }} pages left</span>
    </div>
  </div>
</template>