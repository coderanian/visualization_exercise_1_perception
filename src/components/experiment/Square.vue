<script setup>
const { size, fill } = defineProps({
  size: Number,
  fill: String
});
</script>

<template>
  <svg :width="size" :height="size" xmlns="http://www.w3.org/2000/svg">
    <rect
        :x="0"
        :y="0"
        :width="size"
        :height="size"
        :fill="fill"
    />
  </svg>
</template>
