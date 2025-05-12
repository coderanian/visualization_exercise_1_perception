<script setup>
import {ref, onMounted, defineProps} from "vue";
import {Chart, registerables} from 'chart.js';
import {useRouter} from "vue-router";

const props = defineProps({
  answers: {
    type: Array,
    required: true
  }
});

const router = useRouter();

const goToResult = () => {
  router.push('/result');
}

const chartRef = ref(null);

const labels = props.answers.map(d => `${d.target} - difficulty ${d.difficulty}`);
const timeouts = props.answers.map(d => d.timeout);
Chart.register(...registerables);

onMounted(() => {
  if (!chartRef.value) return;
  new Chart(chartRef.value, {
    type: 'bar',
    data: {
      labels,
      datasets: [{
        label: 'Time required (ms)',
        data: timeouts,
        backgroundColor: '#76B900'
      }]
    },
    options: {
      responsive: true,
      plugins: {
        title: {
          display: true,
          text: 'Time by Target and Difficulty'
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: 'Time required (ms)'
          }
        },
        x: {
          ticks: {
            autoSkip: false
          }
        }
      }
    }
  });
});

const submit = () => {
  const subject = encodeURIComponent('Experiment Answers');
  const body = encodeURIComponent(JSON.stringify(props.answers, null, 2)); // make it readable
  window.location.href = `mailto:italics8706@proton.me?subject=${subject}&body=${body}`;
  console.log(props.answers)
  goToResult();
}

</script>

<template>
  <div class="mt-4 flex flex-col justify-center items-center gap-4">
    <button @click="submit">Submit answers per Email</button>
    <p>
      Based on your answers this is how your pre-attentive perception depends on search target:
    </p>
    <canvas ref="chartRef" height="100"></canvas>
  </div>
</template>
