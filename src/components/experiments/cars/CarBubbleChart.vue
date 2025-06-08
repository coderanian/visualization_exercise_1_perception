<script setup>
import {CAR_DATA} from "@/views/cars/data.js";
import {getChartRanges} from "@/views/cars/utils.js";
import {ref} from "vue";

const props = defineProps({
  valuesUS: {
    type: Boolean,
    required: true
  },
  handleCarSelect: {
    type: Function,
    required: true
  },
  handleValueTypeSelect: {
    type: Function,
    required: true
  },
  isDetailsVisible: {
    type: Boolean,
    required: true
  }
})
const chartRanges = ref(null);

const applyFilter = () => {
  chartRanges.value = getChartRanges(props.valuesUS);
  console.log(chartRanges.value);
}
const setCar = (car) => {
  props.handleCarSelect(car);
}

const changeValuesUS = () => {
  props.handleValueTypeSelect(!props.valuesUS);
}

</script>

<template>
  <div class="w-[900px] p-4 border border-primary border-5 rounded-lg h-[700px]">

    <div class="flex gap-5">
      <button @click="applyFilter">Apply Filter</button>
      <button @click="setCar(CAR_DATA[0])">Begin</button>
      <button @click="changeValuesUS">
        <span>
          {{ valuesUS ? 'US values' : 'EU values' }}
          <i :class="['fi', valuesUS ? 'fi-us' : 'fi-eu', 'fis']"></i>
        </span>
      </button>
    </div>

    <div class="flex flex-col h-[600px] w-[800px] mt-5">
      <div class="flex flex-1">
        <!-- Y-Axis Title And Ticks-->
        <div class="flex items-center relative mr-8">
          <p class="[writing-mode:vertical-rl]">
            Efficiency {{ valuesUS ? '(MPG)' : '(L/100km)' }}
          </p>
          <div class="absolute left-5 h-full flex flex-col justify-between items-end">
            <span>100</span>
            <span>75</span>
            <span>50</span>
            <span>25</span>
            <span>0</span>
          </div>
        </div>

        <!-- Chart Area -->
        <div class="flex-1 border-b-5 border-l-5 relative">

          <!-- X-Axis Ticks -->
          <div class="absolute left-0 w-full flex justify-between"
               style="bottom: -2rem"
          >
            <span>0</span>
            <span>25</span>
            <span>50</span>
            <span>75</span>
            <span>100</span>
          </div>
        </div>
      </div>

      <!-- X-Axis Title And Ticks -->

      <p class="flex justify-center text-md mt-5">
        Horsepower (PS)
      </p>
      <!-- Legend -->
      <div>

      </div>

    </div>

  </div>



</template>
