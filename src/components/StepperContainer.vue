<script setup lang="ts">
import { ref, computed } from 'vue'
import { useDeploymentStore } from '../stores/deployment'
import StepIndicator from './StepIndicator.vue'
import Service from './steps/ServiceTypeStep.vue'
import Resources from './steps/Resources.vue'
import Network from './steps/Network.vue'
import Review from './steps/Review.vue'

const store = useDeploymentStore()
const currentStep = ref(1)

const steps: Step[] = [
  { id: 1, title: 'Service Basics', description: 'Define your service details' },
  { id: 2, title: 'Resources', description: 'Configure compute resources' },
  { id: 3, title: 'Network', description: 'Set up network configuration' },
  { id: 4, title: 'Review', description: 'Review and deploy' }
]

const isFirstStep = computed(() => currentStep.value === 1)
const isLastStep = computed(() => currentStep.value === steps.length)

const goToNextStep = () => {
  if (currentStep.value < steps.length) {
    currentStep.value++
  }
  if (isLastStep.value) {
    submitForm()
  }
}

const goToPreviousStep = () => {
  if (currentStep.value > 1) {
    currentStep.value--
  }
}

const submitForm = () => {
  store.submitDeployment()
}
</script>

<template>
  <div class="rounded-lg bg-white px-4 py-5 drop-shadow-xs md:px-5 md:py-6">
    <h2 class="text-lg font-medium">Configure New Cloud Service</h2>
    <div class="pt-6 pb-8">
      <StepIndicator :steps="steps" :current-step="currentStep" />
    </div>

    <div class="pt-8">
      <Service v-if="currentStep === 1" />
      <Resources v-else-if="currentStep === 2" />
      <Network v-else-if="currentStep === 3" />
      <Review v-else-if="currentStep === 4" />
    </div>

    <div class="mt-8 flex justify-between border-t border-t-gray-200 pt-5">
      <button
        @click="goToPreviousStep"
        class="text-400 rounded border border-gray-300 px-4 py-2 text-xs md:text-sm"
        :disabled="isFirstStep"
        :class="{
          'cursor-not-allowed bg-gray-100 opacity-50': isFirstStep,
          'cursor-pointer': !isFirstStep
        }"
      >
        Back
      </button>
      <button
        @click="goToNextStep"
        class="bg-custom-green cursor-pointer rounded px-4 py-2 text-xs text-white md:text-sm"
      >
        {{ isLastStep ? 'Deploy' : 'Next' }}
      </button>
    </div>
  </div>
</template>
