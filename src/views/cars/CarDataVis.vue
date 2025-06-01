<script setup>
import { ref } from 'vue'
import { getCarImage } from "@/views/cars/utils.js";

const carThumbnail = ref(null);
const getImage = async () => {
  const car = "chevrolet chevelle malibu 1970";
  carThumbnail.value = await getCarImage(car);
}
</script>

<template>
  <button @click="getImage">Begin</button>
  <img v-if="carThumbnail" :src="carThumbnail" alt="car image">
</template>

