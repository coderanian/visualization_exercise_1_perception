<script setup>
import { ref } from 'vue'
import { fetchImage } from "@/views/cars/utils.js";
import { CAR_DATA } from "@/views/cars/data.js";
import { CarDetails } from "@/components/experiments/cars";

const initialCar = {
  car: null,
  manufacturer: null,
  mpg: null,
  cylinders: null,
  displacement: null,
  horsepower: null,
  weight: null,
  acceleration: null,
  year: null,
  origin: null,
  country: null,
  litersPer100Km: null,
  displacementEu: null,
  weightEu: null,
  carThumbnail: null,
  carManufacturerLogo: null
}

const selectedCar = ref(initialCar);
const isDetailsVisible = ref(false);
const valuesUS = ref(false);

const setCar = (car) => {
  if (!car) {
    selectedCar.value = initialCar;
    return;
  }
  const carThumbnailQuery = `${car.car} ${car.manufacturer}`
  const manufacturerLogoQuery = `${car.manufacturer} logo`
  selectedCar.value = {
    ...car,
    //carThumbnail: fetchImage(carThumbnailQuery),
      //carManufacturerLogo: fetchImage(manufacturerLogoQuery)
    carThumbnail: null,
    carManufacturerLogo: null
  }
  isDetailsVisible.value = true
  console.log(selectedCar.value)
}

const changeValuesUS = () => {
  valuesUS.value = !valuesUS.value
}

</script>

<template>
  <div class="flex px-10">
    <div class="w-2/3 p-4">
      <button @click="setCar(CAR_DATA[0])">Begin</button>
      <button @click="changeValuesUS">Show US values</button>
    </div>
    <div v-if="isDetailsVisible" class="w-1/3 p-4">
      <CarDetails :car="selectedCar" :valuesUS = "false" />
    </div>
  </div>
</template>

