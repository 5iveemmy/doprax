<script setup lang="ts">
defineProps<{
  steps: Step[]
  currentStep: number
}>()
</script>

<template>
  <div class="flex w-full gap-8">
    <div v-for="(step, index) in steps" :key="step.id" class="flex-1">
      <div
        class="flex flex-col gap-1 border-t-4 pt-2"
        :class="[index < currentStep ? 'border-primary-800' : 'border-gray-300']"
      >
        <h1 class="text-primary-800 pt-5 text-xs md:text-sm">Step {{ step.id }}</h1>
        <h2 class="text-xs font-medium md:text-sm">{{ step.title }}</h2>
        <p class="text-xs text-gray-500 md:text-sm">{{ step.description }}</p>
      </div>
    </div>
  </div>
</template>
