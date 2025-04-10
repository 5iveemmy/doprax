<script setup lang="ts">
import { ref, onMounted, watch, computed } from 'vue'
import { useDeploymentStore } from '../../stores/deployment'
import TextSection from '../TextSection.vue'
import TextInput from '../TextInput.vue'
import { instanceTypes } from '../../data.ts'

const store = useDeploymentStore()

const formData = ref({
  vCPU: '',
  memory: '',
  storage: ''
})

const isFormValid = computed(() => {
  return (
    store.resources.vCPU !== '' && store.resources.memory !== '' && store.resources.storage !== ''
  )
})

onMounted(() => {
  if (store.resources) {
    formData.value = { ...formData.value, ...store.resources }
  }
})

watch(
  formData,
  val => {
    store.setResources(val)
  },
  { deep: true }
)

defineExpose({ isFormValid })
</script>

<template>
  <TextSection
    title="Resource Configuration"
    description="Configure the compute resources for your service"
    gap="8px"
    titleSize="16px"
    descriptionSize="12px"
  />

  <div class="pt-6">
    <TextSection
      title="Instance Type"
      description="Select the type of instance that best fits your workload"
      gap="8px"
      titleSize="14px"
      descriptionSize="12px"
    />
  </div>

  <div class="space-y-6 pb-6">
    <div class="pt-6">
      <div class="space-y-6">
        <div
          v-for="type in instanceTypes"
          :key="type.id"
          class="flex cursor-pointer items-center"
          @click="store.setInstanceType(type.title)"
        >
          <input
            type="radio"
            :id="type.id"
            :value="type.id"
            v-model="store.instanceType"
            class="mr-3 cursor-pointer"
          />

          <div>
            <label
              :for="type.id"
              class="cursor-pointer text-xs font-medium text-gray-700 md:text-sm"
              >{{ type.title }}</label
            >
            <p class="text-xs text-gray-500 md:text-sm">{{ type.subtitle }}</p>
          </div>
        </div>
      </div>
    </div>

    <div class="grid gap-4 pt-4 md:grid-cols-3">
      <TextInput label="vCPU" type="number" min="1" v-model="formData.vCPU" :required="true" />

      <TextInput
        label="Memory (GB)"
        v-model="formData.memory"
        :required="true"
        placeholder="4"
        type="number"
        min="1"
      />

      <TextInput
        label="Storage (GB)"
        v-model="formData.storage"
        :required="true"
        placeholder="4"
        type="number"
        min="100"
      />
    </div>
  </div>
</template>
