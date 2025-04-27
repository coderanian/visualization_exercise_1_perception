<script setup>
import { defineProps } from "vue";

const props = defineProps({
  size: {
    type: Number,
    required: true
  },
  fill: {
    type: String,
    required: true
  }
});

const radius = props.size / 2; // Or adjust this calculation based on your desired radius ratio
</script>

<template>
  <svg :width="size" :height="size" xmlns="http://www.w3.org/2000/svg">
    <circle
        :cx="size / 2"
        :cy="size / 2"
        :r="radius"
        :fill="fill"
    />
  </svg>
</template>
