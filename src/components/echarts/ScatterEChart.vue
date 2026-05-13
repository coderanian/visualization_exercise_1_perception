<script setup>
import { ref, computed } from 'vue'
import { use } from 'echarts/core'
import VChart from 'vue-echarts'
import { ScatterChart } from 'echarts/charts'
import {
  TooltipComponent,
  TitleComponent,
  GridComponent,
  LegendComponent
} from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'

use([
  ScatterChart,
  TooltipComponent,
  TitleComponent,
  GridComponent,
  LegendComponent,
  CanvasRenderer
])

import {getTooltipValue, normalizePointSize} from '@/views/apexcharts/utils.js'
/**
 Group data by color category (e.g., country) → each group = one series → unique color per series.
 Within each series, assign symbol shape based on another category (e.g., manufacturer) by setting symbol per data point.
 Show a legend for colors (color groups).
 Provide a separate legend or UI for shape meanings (optional, since ECharts does not support multiple legends out-of-the-box).
 */
const props = defineProps({
  data: {
    type: Array,
    default: () => []
  }
})
const SHAPES = ['circle', 'rect', 'triangle', 'diamond', 'pin', 'arrow'];
const keys = ref([]);
const colorKey = ref(1)
const shapeKey = ref(9);
const xAxisKey = ref(2);
const yAxisKey = ref(6);


const seriesData = computed(() => {
  if (!props.data || props.data.length === 0) return [];
  keys.value = Object.keys(props.data[0])
  console.log(keys.value[xAxisKey.value]);
  return props.data.map(d => ({
    value: [
      d[keys.value[xAxisKey.value]],
      d[keys.value[yAxisKey.value]],
    ],
    name: d.car,
    full: d
  }));
});

const shapeValueMap = computed(() => {
  if (!props.data || props.data.length === 0) return {};
  const shapeMap = {};
  const seen = new Set();
  props.data.forEach(d => {
    const key = d[keys.value[shapeKey.value]];
    if (!seen.has(key)) {
      shapeMap[key] = seen.size;
      seen.add(key);
    }
  });
  return shapeMap;
});

const groupedByColor = computed(() => {
  if (!props.data || props.data.length === 0) return {}
  keys.value = Object.keys(props.data[0])
  const groups = {};
  props.data.forEach(d => {
    const colorGroup = d[keys.value[colorKey.value]];
    const shapeKeyValue = d[keys.value[shapeKey.value]];
    const shapeIndex = shapeValueMap.value[shapeKeyValue] ?? 0;
    const symbol = SHAPES[shapeIndex % SHAPES.length];
    if (!groups[colorGroup]) groups[colorGroup] = [];
    groups[colorGroup].push({
      value: [d[keys.value[xAxisKey.value]], d[keys.value[yAxisKey.value]]],
      symbol,
      full: d
    });
  });
  return groups;
})

const chartOptions = computed(() => {
  const keyGroups = groupedByColor.value
  return {
    title: {
      text: `${keys.value[xAxisKey.value]} vs ${keys.value[yAxisKey.value]}
            Grouped by ${keys.value[colorKey.value]} (color) and ${keys.value[shapeKey.value]} (shape)`,
      left: 'center'
    },
    tooltip: {
      trigger: 'item',
      formatter: params => getTooltipValue(params.data?.full)
    },
    xAxis: {
      name: keys.value[xAxisKey.value],
      type: 'value'
    },
    yAxis: {
      name: keys.value[yAxisKey.value],
      type: 'value'
    },
    series: Object.entries(keyGroups).map(([key, points]) => ({
      name: key,
      type: 'scatter',
      symbolSize: normalizePointSize(props.data.length),
      data: points,
    })),
    legend: {
      type: 'scroll',
      orient: 'horizontal',
      bottom: 0,
      pageIconSize: 20,
      pageButtonGap: 50,
      pageButtonItemGap: 10,
      width: 700,
    },
    colorBy: 'series'
  }
});

const selectItems = computed(() =>
    keys.value.map((label, index) => ({
      text: label,
      value: index
    }))
);
</script>

<template>
  <div class="flex ga-2 ms-10">
    <v-select
        label="Select X-Axis"
        v-model="xAxisKey"
        :items="selectItems"
        item-title="text"
        item-value="value"
        variant="outlined"
    ></v-select>
    <v-select
        label="Select Y-Axis"
        v-model="yAxisKey"
        :items="selectItems"
        item-title="text"
        item-value="value"
        variant="outlined"
    ></v-select>
    <v-select
        label="Select Color"
        v-model="colorKey"
        :items="selectItems"
        item-title="text"
        item-value="value"
        variant="outlined"
    ></v-select>
    <v-select
        label="Select Color"
        v-model="shapeKey"
        :items="selectItems"
        item-title="text"
        item-value="value"
        variant="outlined"
    ></v-select>
  </div>
  <v-chart :option="chartOptions" autoresize style="height: 600px" />
</template>
