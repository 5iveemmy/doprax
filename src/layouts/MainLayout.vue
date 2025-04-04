<script setup lang="ts">
import Header from '../components/Header.vue'
</script>

<template>
  <Header />
  <div class="bg-gray-50 px-4 py-8 md:px-8 md:py-8">
    <div class="min-h-h-screen rounded-lg bg-white px-4 py-5 drop-shadow-xs md:px-5 md:py-6">
      <router-view />
    </div>
  </div>
</template>
