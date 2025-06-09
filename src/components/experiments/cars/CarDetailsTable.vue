<script setup>
const props = defineProps({
  car: Object,
  valuesUS: Boolean,
  view: String,
})
</script>

<template>
  <div class="flex flex-col gap-2">
    <div v-if="props.valuesUS" class="flex justify-between">
      <p class="font-htw-bold">Miles per gallon <span v-if="view !== 'cars'"> (average) </span>":</p>
      <p>{{ car.mpg }} miles</p>
    </div>
    <div v-else class="flex justify-between">
      <p class="font-htw-bold">Liters per 100km <span v-if="view !== 'cars'"> (average) </span>:</p>
      <p>{{ car.litersPer100Km }} l</p>
    </div>
    <div class="flex justify-between">
      <p class="font-htw-bold">Displacement <span v-if="view !== 'cars'"> (average) </span>:</p>
      <p v-if="props.valuesUS">{{ car.displacement }} inch<sup>3</sup></p>
      <p v-else>{{ car.displacementEu }} cm<sup>3</sup></p>
    </div>
    <div class="flex justify-between">
      <p class="font-htw-bold">Weight <span v-if="view !== 'cars'"> (average) </span>:</p>
      <p v-if="props.valuesUS">{{ car.displacement }} lbs</p>
      <p v-else>{{ car.weightEu }} kg</p>
    </div>
    <div class="flex justify-between">
      <p class="font-htw-bold">Cylinders <span v-if="view !== 'cars'"> (average) </span>:</p>
      <p>{{ car.cylinders }} cylinders</p>
    </div>
    <div class="flex justify-between">
      <p class="font-htw-bold">Horsepower <span v-if="view !== 'cars'"> (average) </span>:</p>
      <p>{{ car.horsepower }} hp</p>
    </div>
    <div class="flex justify-between">
      <p v-if="valuesUS" class="font-htw-bold">Acceleration (0-60 mph) <span v-if="view !== 'cars'"> (average) </span>:</p>
      <p v-else class="font-htw-bold">Acceleration (0-100 km/h):</p>
      <p>{{ car.acceleration }} seconds</p>
    </div>
  </div>
</template>