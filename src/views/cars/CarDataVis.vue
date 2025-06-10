<script setup>
import { ref } from 'vue'
import { CarDetails } from "@/components/experiments/cars";
import CarBubbleChart from "@/components/experiments/cars/CarBubbleChart.vue";
import {fetchImage} from "@/views/cars/utils.js";

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
const currentView = ref('cars');

const setCar = async (car) => {
  if (!car) {
    selectedCar.value = initialCar;
    isDetailsVisible.value = false
    return;
  }

  const carThumbnailQuery = currentView.value === 'cars' ? `${car.car} ${car.manufacturer}` : null;
  const manufacturerLogoQuery = currentView.value !== 'countries' ? `${car.manufacturer} logo` : null;

  selectedCar.value = {
    ...car,
    carThumbnail: carThumbnailQuery && await fetchImage(carThumbnailQuery),
    carManufacturerLogo: manufacturerLogoQuery && await fetchImage(manufacturerLogoQuery),
  }
  isDetailsVisible.value = true
  console.log(selectedCar.value.carThumbnail)
}

const changeValuesUS = () => {
  valuesUS.value = !valuesUS.value
}

const changeView = (newView) => {
  currentView.value = newView;
}

</script>

<template>
  <div class="flex px-10 justify-between h-full">
    <CarBubbleChart :handle-value-type-select="changeValuesUS"
                    :handle-car-select="setCar"
                    :values-u-s="valuesUS"
                    :handle-view-select="changeView"
                    :view="currentView"
    />
    <CarDetails :car="selectedCar"
                :valuesUS="valuesUS"
                :handle-close="setCar"
                :is-details-visible="isDetailsVisible"
                :view="currentView"
    />
  </div>
</template>

