<script setup lang="ts">
import Header from '../components/Header.vue'
</script>

<template>
  <Header />
  <div class="bg-gray-50 px-4 py-8 md:px-8 md:py-8">
    <router-view />
  </div>
</template>
