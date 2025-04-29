<script setup>
import {ref, onMounted} from "vue";
import {Chart, registerables} from 'chart.js';
import {
  calculateAccuracyGeneral,
  calculateAccuracyShape,
  calculateAccuracyColor,
  COLORS,
} from "@/utils.js";

Chart.register(...registerables);

const results = ref({
  accuracyGeneral: 0,
  accuracyShapeCircle: 0,
  accuracyShapeSquare: 0,
  accuracyColorGreen: 0,
  accuracyColorGray: 0,
  accuracyColorOrange: 0,
  accuracyColorBlue: 0,
  accuracyColorBlack: 0,
});

const colorNames = {
  "#76B900": "Green",
  "#AFAFAF": "Gray",
  "#FF5F00": "Orange",
  "#0082D1": "Blue",
  "#000000": "Black"
};

onMounted(() => {
  results.value.accuracyGeneral = calculateAccuracyGeneral();

  results.value.accuracyShapeCircle = calculateAccuracyShape("circle");
  results.value.accuracyShapeSquare = calculateAccuracyShape("square");

  results.value.accuracyColorGreen = calculateAccuracyColor("#76B900");
  results.value.accuracyColorGray = calculateAccuracyColor("#AFAFAF");
  results.value.accuracyColorOrange = calculateAccuracyColor("#FF5F00");
  results.value.accuracyColorBlue = calculateAccuracyColor("#0082D1");
  results.value.accuracyColorBlack = calculateAccuracyColor("#000000");

  const shapeCtx = document.getElementById('shapeChart');
  new Chart(shapeCtx, {
    type: 'bar',
    data: {
      labels: ['Circle', 'Square'],
      datasets: [{
        label: 'Avg. perceived ratio by Shape',
        data: [results.value.accuracyShapeCircle, results.value.accuracyShapeSquare],
        backgroundColor: ['#9333ea', '#3b82f6'],
        borderWidth: 0
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {display: false},
      },
      scales: {
        y: {
          beginAtZero: true,
          max: 2,
          title: {
            display: true,
            text: 'Avg. perceived ratio'
          }
        }
      }
    }
  });

  const colorCtx = document.getElementById('colorChart');
  const colorLabels = Object.keys(colorNames).map(key => colorNames[key]);
  const colorData = [
    results.value.accuracyColorGreen,
    results.value.accuracyColorGray,
    results.value.accuracyColorOrange,
    results.value.accuracyColorBlue,
    results.value.accuracyColorBlack
  ];

  new Chart(colorCtx, {
    type: 'bar',
    data: {
      labels: colorLabels,
      datasets: [{
        label: 'Avg. perceived ratio',
        data: colorData,
        backgroundColor: COLORS,
        borderWidth: 0
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {display: false},
      },
      scales: {
        y: {
          beginAtZero: true,
          max: 2,
          title: {
            display: true,
            text: 'Avg. perceived ratio'
          }
        }
      }
    }
  });
});
</script>

<template>
  <div class="dashboard">
    <h1 class="text-2xl font-htw-bold text-center mb-0">
      Experiment Results
    </h1>
    <h2 class="text-xl font-htw-bold color-primary text-center mb-6">
      General perceived ratio: <span class="text-primary">{{ results.accuracyGeneral }}</span>
    </h2>
    <div class="grid grid-cols-3 gap-6">
      <div class="bg-white p-6 rounded-lg border-secondary border-3">
        <h2 class="text-xl font-htw-bold mb-4 text-center">Perceived Ratio By Shape</h2>
        <canvas id="shapeChart" height="150"></canvas>
        <div class="grid grid-cols-2 gap-2 mt-4">
          <div class="text-center p-2 bg-gray-100 rounded">
            <span class="text-sm">Circle:</span> {{ results.accuracyShapeCircle }}
          </div>
          <div class="text-center p-2 bg-gray-100 rounded">
            <span class="text-sm">Square:</span> {{ results.accuracyShapeSquare }}
          </div>
        </div>
      </div>

      <div class="bg-white p-6 rounded-lg border-secondary border-3">
        <h2 class="text-xl font-htw-bold mb-4 text-center">Perceived Ratio By Color</h2>
        <canvas id="colorChart" height="150"></canvas>
        <div class="grid grid-cols-3 gap-2 mt-4">
          <div v-for="(colorKey, index) in Object.keys(colorNames)" :key="index"
               class="text-center p-2 bg-gray-100 rounded flex flex-col items-center">
            <div class="w-4 h-4 rounded-full mb-1" :style="{ backgroundColor: colorKey }"></div>
            <span class="text-sm">{{ colorNames[colorKey] }}: {{
                results['accuracyColor' + colorNames[colorKey]]
              }}</span>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>


