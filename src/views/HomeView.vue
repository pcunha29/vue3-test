<script setup lang="ts">
import { ref } from "vue";

const imgGallery = {
  img1: "https://mufc-live.cdn.scayle.cloud/images/e35cd1835b85cf3a0d1e13456751aa6c.jpg?brightness=1&width=1536&height=2048&quality=75&bg=ffffff",
  img2: "https://mufc-live.cdn.scayle.cloud/images/e9af2729edd15402afd7883f9d621f43.jpg?brightness=1&width=1536&height=2048&quality=75&bg=ffffff",
  img3: "https://mufc-live.cdn.scayle.cloud/images/e9af2729edd15402afd7883f9d621f43.jpg?brightness=1&width=1536&height=2048&quality=75&bg=ffffff",
  img4: "https://mufc-live.cdn.scayle.cloud/images/8644a21717141cef99919b3a7045ec2b.jpg?brightness=1&width=1536&height=2048&quality=75&bg=ffffff",
  img5: "https://mufc-live.cdn.scayle.cloud/images/d4a8d031a4f3352b77332df2f9476a19.jpg?brightness=1&width=1536&height=2048&quality=75&bg=ffffff",
  img6: "https://mufc-live.cdn.scayle.cloud/images/8c1e355f50f8e08677578d9e92100995.jpg?brightness=1&width=1536&height=2048&quality=75&bg=ffffff",
  img7: "https://mufc-live.cdn.scayle.cloud/images/b6b12c9c495ab18638a4d60629b20ba5.jpg?brightness=1&width=1536&height=2048&quality=75&bg=ffffff",
};

//data
const sizes = ["XS", "S", "M", "L", "XL"];
const selectedSize = ref("");
const comments: any[] = [];
const newComment = {
  name: "",
  text: "",
};

//methods
const selectSize = (size: string) => {
  selectedSize.value = size;
  console.log("Selected size:", size);
};

const addToCart = () => {
  if (selectedSize.value) {
    console.log(`Added to cart: ${selectedSize.value}`);
  } else {
    console.error("Please select a size before adding to cart.");
  }
};

const submitComment = () => {
  if (newComment.name && newComment.text) {
    comments.push({ ...newComment });

    newComment.name = "";
    newComment.text = "";
  } else {
    alert("Please fill out both fields.");
  }
};
</script>

<template>
  <main class="flex pt-4 gap-10">
    <div class="grid grid-cols-2 gap-2 max-w-[50%]">
      <div
        v-for="(imgUrl, index) in imgGallery"
        :key="index"
        :class="{
          'col-span-2': index === 'img3' || index === 'img6',
        }"
      >
        <img :src="imgUrl" :alt="`Product Image ${index}`" class="rounded-md" />
      </div>
    </div>

    <div class="p-10">
      <h1 class="text-xl font-bold font-serif">
        Manchester United x Adidas Damen Future Icons 3 Streifen Leggings - Grün
      </h1>

      <div class="text-xl font-bold font-sans">
        <span>€49,99</span>
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
        <ul class="font-sans text-xs mt-2">
          <li><strong>Color:</strong> Green</li>
          <li><strong>Material:</strong> 100% cotton</li>
          <li><strong>Brand:</strong> Adidas</li>
        </ul>
      </div>

      <div class="mt-10">
        <p class="text-sm mb-2">Customer Comments</p>

        <!-- Displaying Comments -->
        <div v-if="comments.length">
          <div
            v-for="(comment, index) in comments"
            :key="index"
            class="comment"
          >
            <p>
              <strong>{{ comment.name }}:</strong> {{ comment.text }}
            </p>
          </div>
        </div>
        <p class="text-gray-400 text-xs" v-else>
          No comments yet. Be the first to comment!
        </p>

        <p class="text-sm mt-10 mb-2">Add a Comment</p>
        <form @submit.prevent="submitComment" class="flex flex-col">
          <input
            v-model="newComment.name"
            type="text"
            placeholder="Your Name"
            required
            class="p-2 mb-2 border-2 rounded-md"
          />
          <textarea
            v-model="newComment.text"
            placeholder="Your Comment"
            required
            class="p-2 mb-2 border-2 rounded-md"
          />
          <button
            type="submit"
            class="bg-red-500 p-2 text-xs rounded-md text-white w-40"
          >
            Submit Comment
          </button>
        </form>
      </div>
    </div>
  </main>
</template>
