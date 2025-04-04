<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useDeploymentStore } from '../../stores/deployment'
import TextSection from '../TextSection.vue'

const store = useDeploymentStore()

const formData = ref({
  vCPU: '',
  memory: '',
  storage: ''
})

const instanceTypes: InstanceTypes[] = [
  {
    id: 'standard',
    title: 'Standard (General Purpose)',
    subtitle: 'Balanced compute, memory'
  },
  {
    id: 'compute',
    title: 'Compute Optimized',
    subtitle: 'High performance processors'
  },
  {
    id: 'memory',
    title: 'Memory Optimized',
    subtitle: 'Fast performance for memory-intensive workloads'
  },
  {
    id: 'storage',
    title: 'Storage Optimized',
    subtitle: 'Fast performance for memory-intensive workloads'
  }
]

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
          @click="store.setInstanceType(type.id)"
        >
          <input
            type="radio"
            :id="type.id"
            :value="type.id"
            v-model="store.instanceType"
            class="mr-3"
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
      <div>
        <label class="mb-1 block text-sm font-medium">
          vCPU <span class="text-red-500">*</span>
        </label>

        <input
          v-model="formData.vCPU"
          type="number"
          min="1"
          class="w-full border-b border-b-gray-100"
          placeholder="2"
          required
        />
      </div>

      <div>
        <label class="mb-1 block text-sm font-medium">
          Memory (GB) <span class="text-red-500">*</span>
        </label>

        <input
          v-model="formData.memory"
          type="number"
          min="1"
          class="w-full border-b border-b-gray-100"
          placeholder="4"
          required
        />
      </div>

      <div>
        <label class="mb-1 block text-sm font-medium">
          Storage (GB) <span class="text-red-500">*</span>
        </label>
        <input
          v-model="formData.storage"
          type="number"
          min="1"
          class="w-full border-b border-b-gray-100"
          placeholder="100"
          required
        />
      </div>
    </div>
  </div>
</template>
