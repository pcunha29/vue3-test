<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <header>
    <div class="flex items-center border-b-2 pb-6">
      <img src="./assets/logo.svg" alt="unitedlogo" class="w-60 mr-7" />
      <nav class="w-36 flex justify-between">
        <RouterLink to="/">Details Page</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>
