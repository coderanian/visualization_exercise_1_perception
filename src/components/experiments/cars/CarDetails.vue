<script setup>
import {CarDetailsTable, CarImgWithText} from "@/components/experiments/cars/";

const props = defineProps({
  car: {
    type: Object,
    required: true
  },
  valuesUS: {
    type: Boolean,
    required: true
  },
  handleClose: {
    type: Function,
    required: true
  },
})

</script>

<template>
  <div class="p-5 flex flex-col gap-4 border rounded-lg border-primary border-5">
    <div class="flex justify-end">
      <button @click="handleClose(null)" class="w-10 h-10 flex justify-center items-center">
        X
      </button>
    </div>

    <div class="flex flex-col justify-center items-center gap-4">
      <h2 class="text-center text-3xl font-htw-bold text-primary">
        {{ car.car.toUpperCase() }}
      </h2>
      <CarImgWithText :manufacturer="car.manufacturer"
                      :year="car.year"
                      img-src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-pR2VOgjATeW_uCr3Az__G-sS8jdYVzpgeQ&s"
      />
      <CarImgWithText :country="car.country"/>
      <img class="w-auto max-h-40"
           src="https://cdn.dealeraccelerate.com/cam/34/6929/481016/1920x1440/1970-chevrolet-chevelle-malibu"
           alt="{{ car.car }}"
      />
    </div>

    <CarDetailsTable :car="car" :values-u-s="valuesUS"/>
  </div>
</template>
