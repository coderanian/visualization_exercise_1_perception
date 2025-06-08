<script setup>
import { ref } from 'vue'
import { fetchImage } from "@/views/cars/utils.js";
import { CAR_DATA } from "@/views/cars/data.js";
import { CarDetails } from "@/components/experiments/cars";
import CarBubbleChart from "@/components/experiments/cars/CarBubbleChart.vue";

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
    isDetailsVisible.value = false
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
}

const changeValuesUS = () => {
  console.log(valuesUS.value)
  valuesUS.value = !valuesUS.value
}

</script>

<template>
  <div class="flex px-10 justify-between h-full">
    <CarBubbleChart :handle-value-type-select="changeValuesUS"
                    :handle-car-select="setCar"
                    :values-u-s="valuesUS"
                    :is-details-visible="isDetailsVisible"
    />
    <CarDetails :car="selectedCar"
                :valuesUS="valuesUS"
                :handle-close="setCar"
                :is-details-visible="isDetailsVisible"
    />
  </div>
</template>

