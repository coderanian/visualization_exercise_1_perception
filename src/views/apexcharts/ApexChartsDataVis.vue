<script setup>
import { ref } from 'vue'
import {ScatterEChart} from "@/components/echarts";
import DataImport from "@/components/echarts/DataImport.vue";

const data = ref([])
const setData = (newData) => {
  data.value = newData;
}

</script>

<template>
  <div class="flex justify-between mx-10">
    <DataImport :handle-data-import="setData"/>
  </div>
  <ScatterEChart v-if="data.length > 0" :data="data"/>
  <div v-else class="text-center">
    No data loaded!
  </div>
</template>