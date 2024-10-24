<script setup lang="ts">
import { storeToRefs } from "pinia";

//Stores
import { useCommentStore } from "../stores/commentStore";
import { useProductDataStore } from "../stores/productDataStore";

const productDataStore = useProductDataStore();
const commentStore = useCommentStore();

// Data destructuring and maitain the reactivity
const { sizes, selectSize, productImg, productDetails } = productDataStore;
const { selectedSize } = storeToRefs(productDataStore);
const { price, color, material, brand, description } = productDetails;

const { editingText, editingIndex, comments } = storeToRefs(commentStore);
const { newComment, submitComment, allowEditComment, submitEditComment } =
  commentStore;

const addToCart = () => {
  if (selectedSize.value) {
    console.log(`Added to cart: ${selectedSize.value}`);
  } else {
    console.log("Please select a size before adding to cart.");
  }
};
</script>

<template>
  <main class="flex pt-10 gap-10">
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

    <div class="px-10">
      <h1 class="text-xl font-bold font-serif">
        Manchester United x Adidas Damen Future Icons 3 Streifen Leggings - Grün
      </h1>

      <div class="text-xl font-bold font-sans">
        <span>€{{ price }}</span>
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
        <p class="text-xs">{{ description }}</p>
        <ul class="font-sans text-xs mt-2">
          <li><strong>Color:</strong> {{ color }}</li>
          <li><strong>Material:</strong> {{ material }}</li>
          <li><strong>Brand:</strong> {{ brand }}</li>
        </ul>
      </div>

      <div class="mt-10">
        <p class="text-sm mb-2">Customer Comments</p>

        <div v-if="comments.length">
          <div
            v-for="(comment, index) in comments"
            :key="index"
            class="comment"
          >
            <div>
              <strong>{{ comment.name }}:</strong>
              <span class="ml-1">{{ comment.text }}</span>

              <div v-if="comment.isEditable">
                <button
                  @click="allowEditComment(index)"
                  class="text-xs text-gray-500"
                >
                  Edit Comment
                </button>
              </div>
            </div>

            <div v-if="editingIndex === index" class="mt-2">
              <textarea
                v-model="editingText"
                class="border-2 p-2 w-full rounded-md mb-2"
              ></textarea>
              <button
                @click="submitEditComment(index)"
                class="bg-green-500 p-2 text-xs rounded-md text-white w-20 hover:bg-green-700 transition-all duration-300"
              >
                Save
              </button>
              <button
                @click="editingIndex = null"
                class="bg-gray-500 p-2 text-xs rounded-md text-white w-20 hover:bg-gray-700 transition-all duration-300 ml-2"
              >
                Cancel
              </button>
            </div>
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
            class="bg-red-500 p-2 text-xs rounded-md text-white w-40 hover:bg-red-700 transition-all duration-300"
          >
            Submit Comment
          </button>
        </form>
      </div>
    </div>
  </main>
</template>
