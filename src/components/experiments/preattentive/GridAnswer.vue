<script setup>
const props = defineProps({
  gridSize: {
    type: Number,
    required: true
  },
  handleClick: {
    type: Function,
    required: true
  },
  correctSegment: {
    type: Number,
    required: true
  }
})
</script>

<template>
  <div class="grid grid-cols-3 gap-2 w-full max-w-lg m-auto">
    <div v-for ="i in props.gridSize"
         :key="i"
         class="grid-element"
         @click="props.handleClick(i)"
    />
  </div>
</template>