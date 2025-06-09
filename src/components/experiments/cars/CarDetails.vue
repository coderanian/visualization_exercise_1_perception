<script setup>
import {CarDetailsTable, CarImgWithText} from "@/components/experiments/cars/";

const props = defineProps({
  car: Object,
  valuesUS: Boolean,
  handleClose: Function,
  isDetailsVisible: Boolean,
  view: String
});

</script>

<template>
  <div v-if="isDetailsVisible" class="p-5 flex flex-col gap-4 border rounded-lg border-secondary border-5">
    <div class="flex justify-end">
      <button @click="handleClose(null)" class="w-10 h-10 flex justify-center items-center">
        X
      </button>
    </div>

    <div v-if="view === 'cars'" class="flex flex-col justify-center items-center gap-4">
      <h2 class="text-center text-3xl font-htw-bold text-primary">
        {{ car.car.toString().toUpperCase() }}
      </h2>
      <CarImgWithText :manufacturer="car.manufacturer"
                      :year="car.year"
                      :img-src="car.carManufacturerLogo"
      />
      <CarImgWithText :country="car.country"/>
      <img class="w-auto max-h-40"
           :src="car.carThumbnail"
           :alt="car.car"
      />
    </div>

    <div v-else-if="view === 'manufacturers'" class="flex flex-col justify-center items-center gap-4">
      <CarImgWithText :manufacturer="car.manufacturer"
                      :img-src="car.carManufacturerLogo"
      />
      <CarImgWithText :country="car.country"/>
      <h1>Cars manufactured: {{ car.carsCount }}</h1>
    </div>

    <div v-else-if="view === 'countries'" class="flex flex-col justify-center items-center gap-4">
      <CarImgWithText :country="car.country"/>
      <h1>Cars manufactured: {{ car.carsCount }}</h1>
    </div>

    <CarDetailsTable :car="car" :values-u-s="valuesUS" :view="view"/>
  </div>
</template>
