<script setup>
import Papa from 'papaparse'
import { ref } from 'vue'
const errText = ref(null)

const props = defineProps({
  handleDataImport: Function,
});

function handleFileUpload(event) {
  const file = event.target.files[0]
  Papa.parse(file, {
    header: true,
    skipEmptyLines: true,
    transform: (value, field) => {
      const cleaned = value?.trim().replace(/\r$/, '');
      const num = parseFloat(cleaned);
      return isNaN(num) ? cleaned : num;
    },
    complete: (results) => {
      if (!results.data || results.data.length === 0) {
        errText.value = 'Invalid file format or no data found.'
        return
      }
      errText.value = null
      props.handleDataImport(results.data)
    },
    error: (err) => {
      console.log(err)
      errText.value = err || "Unknown error"
    }
  });
}
</script>

<template>
  <v-file-input label="Upload tab-separated csv or txt file"
                variant="outlined"
                accept=".csv,.txt"
                @change="handleFileUpload"
  >
  </v-file-input>
</template>
