<script setup>

const gridSize = 16;
const props = defineProps({
  targetSegment: {
    type: Number,
    required: true
  },
  target: {
    type: String,
    required: true
  },
  correctSegment: {
    type: Number,
    required: true
  },
  difficulty: {
    type: Number,
    required: true
  }
});

const getRandomOffset = () => Math.floor(Math.random() * 60) + 20;

const elements = Array.from({length: gridSize}, () => ({
  top: getRandomOffset(),
  left: getRandomOffset()
}))

const targetIndex = Math.floor(Math.random() * gridSize);

const getHueClass = (index) => {
  if (props.difficulty === 1) {
    return props.targetSegment === props.correctSegment && targetIndex === index ? 'bg-red-500' : 'bg-black';
  } else if (props.difficulty === 2) {
    return props.targetSegment === props.correctSegment && targetIndex === index ? 'bg-primary' : 'bg-secondary';
  }
}

const getShapeClass = (index) => {
  if (props.difficulty === 1) {
    return props.targetSegment === props.correctSegment && targetIndex === index ? 'w-5 h-3' : 'w-3 h-3';
  } else if (props.difficulty === 2) {
    return props.targetSegment === props.correctSegment && targetIndex === index ? 'w-3 h-3 rotate-45' : 'w-3 h-3';
  }
}

const getSizeClass = (index) => {
  if (props.difficulty === 1) {
    return props.targetSegment === props.correctSegment && targetIndex === index ? 'w-5 h-5' : 'w-3 h-3';
  } else if (props.difficulty === 2) {
    return props.targetSegment === props.correctSegment && targetIndex === index ? 'w-4 h-4' : 'w-3 h-3';
  }
}

const getConjuctionClass = (index) => {
  const distractorOptionsSize = ['w-3 h-3', 'w-5 h-3', 'w-3 h-5', 'w-4 h-4'];
  const distractorOptionsHue = ['bg-black', 'bg-primary', 'bg-secondary', 'bg-red-500'];
  const distractorOptionsShape = ['rounded-full', ''];
  if (props.targetSegment === props.correctSegment && targetIndex === index) {
    return 'w-5 h-5 rounded-full bg-red-500';
  }
  else if (props.difficulty === 1) {
    return (
        distractorOptionsSize[Math.floor(Math.random() * distractorOptionsSize.length)]
        + ' '
        + distractorOptionsHue[Math.floor(Math.random() * distractorOptionsHue.length)]
    );
  } else if (props.difficulty === 2) {
    return (
        distractorOptionsSize[Math.floor(Math.random() * distractorOptionsSize.length)]
        + ' '
        + distractorOptionsHue[Math.floor(Math.random() * distractorOptionsHue.length)]
        + ' '
        + distractorOptionsShape[Math.floor(Math.random() * distractorOptionsShape.length)]
    );
  }
}

</script>

<template>
  <div class="grid grid-cols-4 gap-2 w-full max-w-lg m-auto">
    <div v-for="(element, index) in elements" :key="index" class="relative aspect-square rounded">
      <div v-if="target === 'hue'"
           :class="['absolute w-3 h-3 rounded-full',getHueClass(index)]"
           :style="{ top: element.top + '%', left: element.left + '%', transform: 'translate(-50%, -50%)' }"
      />
      <div v-if="target === 'shape'"
           :class="['absolute bg-black', getShapeClass(index)]"
           :style="{ top: element.top + '%', left: element.left + '%', transform: 'translate(-50%, -50%)' }"
      />
      <div v-if="target === 'size'"
           :class="['absolute rounded-full bg-black', getSizeClass(index)]"
           :style="{ top: element.top + '%', left: element.left + '%', transform: 'translate(-50%, -50%)' }"
      />
      <div v-if="target === 'conjuction'"
           :class="['absolute', getConjuctionClass(index)]"
           :style="{ top: element.top + '%', left: element.left + '%', transform: 'translate(-50%, -50%)' }"
      />
    </div>
  </div>
</template>
