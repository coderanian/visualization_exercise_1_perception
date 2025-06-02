<script setup>
const props = defineProps({
  car: {
    type: Object,
    required: true
  },
  valuesUS: {
    type: Boolean,
    required: true
  }
})
console.log(props.car)

const closeDetails = () => {
  props.car = null
}

const capitalize = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

</script>

<template>
  <div class="flex justify-end">
    <button @click="closeDetails" class="w-10 h-10 flex justify-center items-center">
      X
    </button>
  </div>
  <div class="flex flex-col justify-center items-center gap-4">
    <h2 class="text-center text-3xl font-htw-bold text-primary">
      {{ props.car.car.toUpperCase() }}
    </h2>
    <h3 class="text-center text-xl font-htw-bold">
      Production year: 19{{ car.year }}
    </h3>
    <div class="w-20 h-20 flex justify-center items-center">
      <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-pR2VOgjATeW_uCr3Az__G-sS8jdYVzpgeQ&s" :alt="car.manufacturer" class="w-full h-full object-contain">
      <p class="pl-5">Manufactured by <span class="font-htw-bold text-primary">{{ capitalize(car.manufacturer) }}</span></p>
    </div>
    <img class="w-full h-auto p-5"
         src="https://cdn.dealeraccelerate.com/cam/34/6929/481016/1920x1440/1970-chevrolet-chevelle-malibu"
         alt="{{ car.car }}"
    />
    <div class="p-4">
      <h2 class="text-2xl font-bold mb-4">Car Details</h2>
      <table class="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm">
        <thead class="bg-gray-100">
        <tr>
          <th class="py-2 px-4 text-left font-medium text-gray-700">Property</th>
          <th class="py-2 px-4 text-left font-medium text-gray-700">Value</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(value, key) in carData" :key="key" class="hover:bg-gray-50">
          <td class="py-2 px-4 font-medium text-gray-600">{{ key }}</td>
          <td class="py-2 px-4 text-gray-800">{{ value }}</td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
