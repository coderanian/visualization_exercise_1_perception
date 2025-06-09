<script setup>
import {
  countryToColor,
  getBubbleSize,
  getChartRanges,
  getColor,
  getValidData,
  normalizeValue
} from "@/views/cars/utils.js";
import {nextTick, onMounted, ref, useTemplateRef, watch} from "vue";

const props = defineProps({
  valuesUS: Boolean,
  handleCarSelect: Function,
  handleValueTypeSelect: Function,
  handleViewSelect: Function,
  view: String
});

const chartDiv = useTemplateRef("chartDiv");
const chartRanges = ref(null);
const chartSize = ref({width: 0, height: 0});
const carData = ref(null);

onMounted(async () => {
  carData.value = getValidData(props.view);
  chartRanges.value = getChartRanges(props.valuesUS, carData.value);
  await nextTick(); // wait for the DOM to update
  setChartSize();
});

watch([() => props.valuesUS, () => props.view], () => {
  applyFilter();
});

const applyFilter = () => {
  carData.value = getValidData(props.view);
  chartRanges.value = getChartRanges(props.valuesUS, carData.value);
  setChartSize();
}

const setChartSize = () => {
  const rect = chartDiv.value.getBoundingClientRect();
  chartSize.value = {width: rect.width, height: rect.height};
}
const setCar = (car) => {
  props.handleCarSelect(car);
}

const changeValuesUS = () => {
  props.handleValueTypeSelect(!props.valuesUS);
}

const changeView = (view) => {
  props.handleViewSelect(view);
}

</script>

<template>
  <div class="w-[900px] p-4 border border-secondary border-5 rounded-lg h-[700px]">
    <!-- Filters -->
    <div class="flex justify-between">
      <button @click="changeValuesUS">
        <span>
          {{ valuesUS ? 'US values' : 'EU values' }}
          <i :class="['fi', valuesUS ? 'fi-us' : 'fi-eu', 'fis']"></i>
        </span>
      </button>
      <button @click="changeView('cars')">Show car data</button>
      <button @click="changeView('manufacturers')">Show manufacturer data</button>
      <button @click="changeView('countries')">Show country data</button>
    </div>
    <!-- Chart -->
    <div v-if="chartRanges" class="flex flex-col h-[600px] w-[800px] mt-5">
      <div class="flex flex-1">
        <!-- Y-Axis Title And Ticks-->
        <div class="flex items-center relative mr-8">
          <p class="[writing-mode:vertical-rl]">
            Efficiency {{ valuesUS ? '(MPG)' : '(L/100km)' }}
          </p>
          <div class="absolute left-5 h-full flex flex-col justify-between items-end">
            <span v-for="yTick in chartRanges.yAxisTicks" :key="yTick">{{ yTick }}</span>
          </div>
        </div>

        <!-- Chart Area -->
        <div ref="chartDiv" class="flex-1 border-b-5 border-l-5 relative">
          <span v-for="car in carData" :key="car.name"
                @click="setCar(car)"
                :class="['absolute rounded-full border cursor-pointer hover:bg-primary', getColor(car.country)]"
                :style="{
                  width: props.view !== 'countries' ? '15px' : getBubbleSize(props.valuesUS ? car.weight : car.weightEu, chartRanges.zRange) + 'px',
                  height: props.view !== 'countries' ? '15px' : getBubbleSize(props.valuesUS ? car.weight : car.weightEu, chartRanges.zRange) + 'px',
                  left: `${normalizeValue(car.horsepower, chartRanges.xAxisTicks[4], chartRanges.xAxisTicks[0], chartSize.width) - 20}px`,
                  bottom: `${normalizeValue(valuesUS ? car.mpg :car.litersPer100Km, chartRanges.yAxisTicks[0], chartRanges.yAxisTicks[4], chartSize.height) - 12}px`
                }"
          />
          <!-- X-Axis Ticks -->
          <div class="absolute left-0 w-full flex justify-between" style="bottom: -2rem">
            <span v-for="xTick in chartRanges.xAxisTicks.sort((a,b) => a - b)" :key="xTick">
              {{ xTick }}
            </span>
          </div>
        </div>
      </div>

      <!-- X-Axis Title And Ticks -->

      <p class="flex justify-center text-md mt-5">
        Horsepower (PS)
      </p>
      <!-- Legend -->
      <div class="flex justify-center gap-4 flex-wrap">
        <div v-for="(color, country) in countryToColor"
             :key="country"
             class="flex items-center gap-2 pt-2"
        >
        <span
            class="rounded-full w-4 h-4"
            :class="color"
        ></span>
          <p>{{ country }}</p>
        </div>
      </div>
    </div>
    <div v-else class="flex items-center justify-center">
      Loading the data ...
    </div>
  </div>


</template>
