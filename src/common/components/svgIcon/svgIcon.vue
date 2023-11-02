<template>
  <svg
    aria-hidden="true"
    class="svg-icon"
    :width="size != '1rem' ? size : width"
    :height="size != '1rem' ? size : height"
  >
    <use :xlink:href="symbolId" rel="external nofollow" :fill="props.color" />
  </svg>
</template>
 
<script setup>
import { computed } from "vue";
const props = defineProps({
  prefix: {
    type: String,
    default: "icon",
  },
  name: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    default: "",
  },
  size: {
    type: String,
    default: "1rem",
  },
  width: {
    type: String,
    default: "1rem",
  },
  height: {
    type: String,
    default: "1rem",
  },
});
const symbolId = computed(() => `#${props.prefix}-${props.name}`);
</script>