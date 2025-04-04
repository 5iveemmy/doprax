<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useDeploymentStore } from '../../stores/deployment'
import Dropdown from '../Dropdown.vue'

const store = useDeploymentStore()

const formData = ref({
  serviceName: '',
  description: '',
  region: '',
  coverImage: null
})

const regions: Option[] = [
  { id: 'us-east', name: 'US East' },
  { id: 'us-west', name: 'US West' },
  { id: 'eu-central', name: 'EU Central' },
  { id: 'asia-pacific', name: 'Asia Pacific' }
]

onMounted(() => {
  formData.value = {
    ...formData.value,
    ...store.serviceTypeData
  }
})

const updateServiceData = () => {
  store.setServiceTypeData(formData.value)
}

const handleChange = () => {
  updateServiceData()
}

const handleDeleteImage = () => {
  formData.value.coverImage = null
  updateServiceData()
}
</script>

<template>
  <p class="text-lg font-medium">Service Basics</p>
  <p class="pt-2 pb-6 text-gray-500">Provide basic information about your cloud service.</p>
  <div class="space-y-6">
    <div class="flex items-center space-x-4">
      <div
        class="flex h-[100px] w-[100px] cursor-pointer flex-col items-center justify-center rounded-lg bg-gray-100"
      >
        <div class="mb-2 text-gray-400">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        </div>
        <p class="text-xs text-gray-500">Cover Image</p>
      </div>

      <div class="flex space-x-2 pt-2">
        <button class="rounded-lg border border-gray-100 p-2 text-gray-600 hover:text-blue-600">
          <svg
            width="18"
            height="14"
            viewBox="0 0 18 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9.625 13.875V10.125H12.125L9 6.375L5.875 10.125H8.375V13.875H5.25V13.8438C5.145 13.85 5.045 13.875 4.9375 13.875C3.6943 13.875 2.50201 13.3811 1.62294 12.5021C0.74386 11.623 0.25 10.4307 0.25 9.1875C0.25 6.7825 2.06875 4.8225 4.4025 4.55375C4.60712 3.48412 5.17806 2.51922 6.01714 1.82501C6.85622 1.1308 7.91097 0.750668 9 0.75C10.0892 0.750602 11.1441 1.13068 11.9834 1.82488C12.8227 2.51908 13.3939 3.48401 13.5988 4.55375C15.9325 4.8225 17.7487 6.7825 17.7487 9.1875C17.7487 10.4307 17.2549 11.623 16.3758 12.5021C15.4967 13.3811 14.3045 13.875 13.0612 13.875C12.9562 13.875 12.855 13.85 12.7487 13.8438V13.875H9.625Z"
              fill="#6B7280"
            />
          </svg>
        </button>

        <button
          @click="handleDeleteImage"
          class="rounded-lg border border-gray-100 p-2 text-gray-600 hover:text-red-600"
        >
          <svg
            width="16"
            height="17"
            viewBox="0 0 16 17"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M13.3433 3.41666L12.6758 14.7642C12.6509 15.1886 12.4648 15.5876 12.1554 15.8793C11.846 16.171 11.4369 16.3334 11.0117 16.3333H4.98832C4.56311 16.3334 4.15395 16.171 3.84458 15.8793C3.53521 15.5876 3.34903 15.1886 3.32416 14.7642L2.65832 3.41666H0.916656V2.58333C0.916656 2.47282 0.960555 2.36684 1.0387 2.2887C1.11684 2.21056 1.22282 2.16666 1.33332 2.16666H14.6667C14.7772 2.16666 14.8831 2.21056 14.9613 2.2887C15.0394 2.36684 15.0833 2.47282 15.0833 2.58333V3.41666H13.3433ZM6.33332 0.0833282H9.66666C9.77716 0.0833282 9.88315 0.127227 9.96128 0.205367C10.0394 0.283507 10.0833 0.389488 10.0833 0.499995V1.33333H5.91666V0.499995C5.91666 0.389488 5.96056 0.283507 6.0387 0.205367C6.11684 0.127227 6.22282 0.0833282 6.33332 0.0833282ZM5.49999 5.49999L5.91666 13H7.16666L6.83332 5.49999H5.49999ZM9.24999 5.49999L8.83332 13H10.0833L10.5 5.49999H9.24999Z"
              fill="#6B7280"
            />
          </svg>
        </button>
      </div>
    </div>

    <div>
      <label class="mb-1 block text-sm font-medium">
        Service Name <span class="text-red-500">*</span>
      </label>
      <input
        v-model="formData.serviceName"
        @input="handleChange"
        type="text"
        class="w-full border-b border-b-gray-100 p-2"
        required
      />
    </div>

    <div>
      <label class="mb-1 block text-sm font-medium">Description</label>
      <textarea
        v-model="formData.description"
        @input="handleChange"
        class="w-full border-b border-b-gray-100"
        rows="3"
      ></textarea>
    </div>

    <div>
      <Dropdown
        id="region"
        label="Select a region"
        v-model="formData.region"
        :options="regions"
        required
        @update:modelValue="handleChange"
      />

      <!-- <label class="mb-1 block text-sm font-medium">
        Region <span class="text-red-500">*</span>
      </label>
      <select
        v-model="formData.region"
        @change="handleChange"
        class="w-full border-b border-b-gray-100"
        required
      >
        <option value="" disabled>Select a region</option>
        <option v-for="region in regions" :key="region.id" :value="region.id">
          {{ region.name }}
        </option>
      </select> -->
    </div>
  </div>
</template>
