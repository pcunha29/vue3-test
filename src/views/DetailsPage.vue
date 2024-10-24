<script setup lang="ts">
import { storeToRefs } from "pinia";
import productGalleryComponent from "@/components/productGalleryComponent.vue";
import productDetailsComponent from "@/components/productDetailsComponent.vue";

//Stores
import { useCommentStore } from "../stores/commentStore";
import { useProductDataStore } from "../stores/productDataStore";

const productDataStore = useProductDataStore();
const commentStore = useCommentStore();

// Data destructuring and maitain the reactivity
const { sizes, selectSize, productImg, productDetails } = productDataStore;
const { selectedSize } = storeToRefs(productDataStore);

const { editingText, editingIndex, comments } = storeToRefs(commentStore);
const { newComment, submitComment, allowEditComment, submitEditComment } =
  commentStore;
</script>

<template>
  <main class="flex pt-10 gap-10">
    <productGalleryComponent :productImg="productImg" />
    <div class="px-10">
      <productDetailsComponent
        :productDetails="productDetails"
        :sizes="sizes"
        :selectedSize="selectedSize"
        :selectSize="selectSize"
      />
      <!-- Comment Section -->
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
