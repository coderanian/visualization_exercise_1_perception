<script setup>
const props = defineProps({
  imgSrc: String,
  manufacturer: String,
  year: Number,
  country: String
})

const countryToFlagID = {
  USA: "us",
  France: "fr",
  Japan: "jp",
  Germany: "de",
  Sweden: "se",
  Italy: "it",
  UK: "gb",
};

const capitalize = (str) => {
  return str ? str.charAt(0).toUpperCase() + str.slice(1) : '';
}

</script>

<template>
  <div v-if="manufacturer" class="w-20 h-20 flex justify-center items-center font-htw-bold">
    <img :src="imgSrc" :alt="manufacturer" class="w-full h-full object-contain">
    <p class="pl-5">Manufactured by {{ capitalize(manufacturer) }}<span v-if="year"> in 19{{ year }}</span></p>
  </div>
  <div v-else-if="country" class="flex gap-4 font-htw-bold">
    <p>Manufactured in {{ country}}</p>
    <p :class="`fi fi-${countryToFlagID[country]} fis`"></p>
  </div>
</template>
