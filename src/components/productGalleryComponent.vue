<script setup lang="ts">
import { type PropType } from "vue";

defineProps({
  productImg: {
    type: Object as PropType<Record<string, string>>,
    required: true,
  },
});
</script>

<template>
  <div class="grid grid-cols-2 gap-2 max-w-[50%]">
    <div
      v-for="(imgUrl, index) in productImg"
      :key="index"
      :class="{
        'col-span-2': index === 'img3' || index === 'img6',
      }"
    >
      <img :src="imgUrl" :alt="`Product Image ${index}`" class="rounded-md" />
    </div>
  </div>
</template>
