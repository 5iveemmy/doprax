<template>
  <div
    :class="[
      'grid grid-cols-1 gap-4 border-t border-gray-200 px-4 py-4 md:px-6',
      !singleColumn && 'md:grid-cols-12'
    ]"
  >
    <p class="col-span-3 text-xs font-medium text-gray-500">{{ label }}</p>
    <div class="col-span-9">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  label: string
  singleColumn?: boolean
}>()
</script>
