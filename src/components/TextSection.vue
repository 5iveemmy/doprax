<script setup lang="ts">
defineProps<{
  title: string
  description: string
  gap: string
  titleSize: string
  descriptionSize: string
}>()
</script>

<template>
  <div class="flex flex-col" :style="{ gap }">
    <p class="font-medium" :style="{ fontSize: titleSize }">{{ title }}</p>
    <p class="text-gray-500" :style="{ fontSize: descriptionSize }">{{ description }}</p>
  </div>
</template>
