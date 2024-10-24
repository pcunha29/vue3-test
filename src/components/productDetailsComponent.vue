<script setup lang="ts">
defineProps<{
  sizes: string[];
  selectedSize: string | null;
  productDetails: Record<string, any>;
  selectSize: (size: string) => void;
  addToCart: () => void;
}>();
</script>

<template>
  <div>
    <h1 class="text-xl font-bold font-serif">
      {{ productDetails.name }}
    </h1>

    <div class="text-xl font-bold font-sans">
      <span>€{{ productDetails.price }}</span>
    </div>

    <div class="mt-10">
      <p class="text-sm mb-2">Select Size</p>
      <div class="flex gap-2">
        <button
          v-for="size in sizes"
          :key="size"
          :class="[
            'py-2 px-4 border-2 rounded-md transition-all duration-300',
            selectedSize === size
              ? 'border-red-500 bg-red-500 text-white'
              : 'hover:border-red-500',
          ]"
          @click="selectSize(size)"
        >
          {{ size }}
        </button>
      </div>
    </div>

    <div class="mt-10">
      <button
        @click="addToCart"
        class="w-full py-2 rounded-2xl text-white font-sans text-sm font-semibold bg-red-500 hover:bg-red-700 transition-all duration-300"
      >
        Add to Cart
      </button>
    </div>

    <div class="mt-10">
      <p class="text-sm mb-2">Product Details</p>
      <p class="text-xs">{{ productDetails.description }}</p>
      <ul class="font-sans text-xs mt-2">
        <li><strong>Color:</strong> {{ productDetails.color }}</li>
        <li><strong>Material:</strong> {{ productDetails.material }}</li>
        <li><strong>Brand:</strong> {{ productDetails.brand }}</li>
      </ul>
    </div>
  </div>
</template>
