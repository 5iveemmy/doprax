<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useDeploymentStore } from '../stores/deployment'
import StepIndicator from './StepIndicator.vue'
import Service from './steps/ServiceTypeStep.vue'
import Resources from './steps/Resources.vue'
import Network from './steps/Network.vue'
import Review from './steps/Review.vue'
import { useRouter } from 'vue-router'

const store = useDeploymentStore()
const router = useRouter()

const currentStep = ref(1)
const serviceStepRef = ref()
const resourcesStepRef = ref()
const networkStepRef = ref()

const isNextDisabled = computed(() => {
  switch (currentStep.value) {
    case 1:
      return serviceStepRef.value?.isFormValid === false
    case 2:
      return resourcesStepRef.value?.isFormValid === false
    case 3:
      return networkStepRef.value?.isFormValid === false
    default:
      return false
  }
})

const steps: Step[] = [
  { id: 1, title: 'Service Basics', description: 'Define your service details' },
  { id: 2, title: 'Resources', description: 'Configure compute resources' },
  { id: 3, title: 'Network', description: 'Set up network configuration' },
  { id: 4, title: 'Review', description: 'Review and deploy' }
]

const isFirstStep = computed(() => currentStep.value === 1)
const isReviewStep = computed(() => currentStep.value === steps.length - 1)

const goToNextStep = () => {
  if (currentStep.value < steps.length) {
    currentStep.value++
  }
}

const goToPreviousStep = () => {
  if (currentStep.value > 1) {
    currentStep.value--
  }
}

const submitForm = async () => {
  if (!isNextDisabled.value) {
    await store.submitDeployment()
    if (store.isComplete) {
      router.push({ name: 'Success' })
    }
  }
}

watch(
  () => store.isComplete,
  completed => {
    if (completed && currentStep.value === steps.length - 1) {
      router.push({ name: 'Success' })
    }
  }
)
</script>

<template>
  <h2 class="text-lg font-medium">Configure New Cloud Service</h2>
  <div class="pt-6 pb-8">
    <StepIndicator :steps="steps" :current-step="currentStep" />
  </div>

  <div class="pt-8">
    <Service v-if="currentStep === 1" ref="serviceStepRef" />
    <Resources v-else-if="currentStep === 2" ref="resourcesStepRef" />
    <Network v-else-if="currentStep === 3" ref="networkStepRef" />
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
      @click="isReviewStep ? submitForm() : goToNextStep()"
      class="cursor-pointer rounded px-4 py-2 text-xs text-white md:text-sm"
      :class="[
        isReviewStep ? 'bg-custom-green' : 'bg-primary-800',
        isNextDisabled ? 'cursor-not-allowed opacity-50' : ''
      ]"
      :disabled="store.isSubmitting || isNextDisabled"
    >
      <span v-if="store.isSubmitting && isReviewStep">Deploying...</span>
      <span v-else>{{ isReviewStep ? 'Deploy' : 'Next' }}</span>
    </button>
  </div>
</template>
