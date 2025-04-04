<script setup lang="ts">
defineProps<{
  steps: Step[]
  currentStep: number
}>()
</script>

<template>
  <div class="flex w-full flex-col gap-4 md:flex-row md:gap-8">
    <div v-for="(step, index) in steps" :key="step.id" class="flex-1">
      <div
        class="flex flex-col gap-1 border-t-0 border-l-4 pt-2 pb-2 pl-5 md:border-t-4 md:border-l-0 md:pt-5 md:pb-0 md:pl-0"
        :class="[index < currentStep ? 'border-primary-800' : 'border-gray-200']"
      >
        <h1
          class="text-xs md:text-sm"
          :class="[index < currentStep ? 'text-primary-800' : 'text-gray-500']"
        >
          Step {{ step.id }}
        </h1>
        <h2 class="text-xs font-medium md:text-sm">{{ step.title }}</h2>
        <p class="text-xs text-gray-500 md:text-sm">{{ step.description }}</p>
      </div>
    </div>
  </div>
</template>
