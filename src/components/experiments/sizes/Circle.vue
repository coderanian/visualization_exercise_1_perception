<script setup>
const { size, fill } = defineProps({
  size: Number,
  fill: String
});
</script>

<template>
  <svg :width="size" :height="size" xmlns="http://www.w3.org/2000/svg">
    <circle
        :cx="size / 2"
        :cy="size / 2"
        :r="size / 2"
        :fill="fill"
    />
  </svg>
</template>

