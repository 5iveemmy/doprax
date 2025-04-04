<script setup lang="ts">
import { computed, onMounted, reactive } from 'vue'
import { useDeploymentStore } from '../stores/deployment'
import Dropdown from '../components/Dropdown.vue'
import Checkbox from '../components/Checkbox.vue'
import TextInput from '../components/TextInput.vue'
import TextAreaInput from '../components/TextAreaInput.vue'
import TextSection from '../components/TextSection.vue'
import { useRouter } from 'vue-router'
import { instanceTypes, regions, securityGroupOptions, vpcOptions, subnetOptions } from '../data.ts'

const store = useDeploymentStore()

const router = useRouter()

const formData = reactive({
  serviceName: '',
  description: '',
  region: '',
  vCPU: '',
  memory: '',
  storage: '',
  vpc: '',
  subnet: '',
  publicIp: false,
  securityGroups: [] as string[],
  id: ''
})

const isFormValid = computed(() => {
  return (
    formData.serviceName.trim() !== '' &&
    formData.region !== '' &&
    formData.vCPU !== '' &&
    formData.memory !== '' &&
    formData.storage !== '' &&
    formData.vpc !== '' &&
    formData.subnet !== '' &&
    store.instanceType !== ''
  )
})

onMounted(async () => {
  const serviceId = store.deploymentResult?.id || ''

  formData.id = serviceId as string

  try {
    if (store.deploymentResult) {
      formData.serviceName = store.deploymentResult.service.serviceName
      formData.description = store.deploymentResult.service.description
      formData.region = store.deploymentResult.service.region
      formData.vCPU = store.deploymentResult.resources.vCPU
      formData.memory = store.deploymentResult.resources.memory
      formData.storage = store.deploymentResult.resources.storage
      formData.vpc = store.deploymentResult.network.vpc
      formData.subnet = store.deploymentResult.network.subnet
      formData.publicIp = store.deploymentResult.network.publicIp
      formData.securityGroups = [...store.deploymentResult.securityGroups]

      store.setInstanceType(store.deploymentResult.instanceType)
    }
  } catch (error) {
    console.error('Failed to initialize form:', error)
  }
})

const handleChange = () => {
  store.setServiceTypeData({
    serviceName: formData.serviceName,
    description: formData.description,
    region: formData.region
  })

  store.setResources({
    vCPU: formData.vCPU,
    memory: formData.memory,
    storage: formData.storage
  })

  store.setNetwork({
    vpc: formData.vpc,
    subnet: formData.subnet,
    publicIp: formData.publicIp
  })
}

const handleSecurityGroupToggle = (groupId: string, isChecked: boolean) => {
  if (isChecked) {
    if (!formData.securityGroups.includes(groupId)) {
      formData.securityGroups.push(groupId)
    }
  } else {
    formData.securityGroups = formData.securityGroups.filter(id => id !== groupId)
  }
  store.setSecurityGroups(formData.securityGroups)
}

const handleSave = async () => {
  if (!isFormValid.value) return

  try {
    handleChange()

    await store.updateService(formData.id)
    router.push({ name: 'CloudServices' })
  } catch (error) {
    console.error('Update failed:', error)
  }
}

const handleCancel = () => {
  router.push({ name: 'CloudServices' })
}
</script>

<template>
  <div class="px-2">
    <h1 class="text-[17px] font-medium text-gray-800">Edit Service Configuration</h1>

    <div class="mt-12">
      <TextSection
        title="Service Basics"
        description="Provide basic information about your cloud service."
        gap="8px"
        titleSize="16px"
        descriptionSize="12px"
      />

      <div class="space-y-4 pt-4">
        <TextInput
          label="Service Name"
          v-model="formData.serviceName"
          :required="true"
          @input="handleChange"
        />

        <TextAreaInput
          label="Description"
          v-model="formData.description"
          :rows="3"
          @update:modelValue="handleChange"
        />

        <div>
          <Dropdown
            id="region"
            label="Select a region"
            v-model="formData.region"
            :options="regions"
            required
            @update:modelValue="handleChange"
          />
        </div>
      </div>
    </div>

    <div class="mt-6">
      <TextSection
        title="Resource Configuration"
        description="Configure the compute resources for your service."
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

      <div class="space-y-6">
        <div class="pt-2">
          <div class="space-y-4">
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
    </div>

    <!-- Network Settings Section -->
    <div class="mt-6">
      <TextSection
        title="Network Settings"
        description="Configure the network settings for your cloud service."
        gap="8px"
        titleSize="16px"
        descriptionSize="12px"
      />

      <div class="space-y-6 pt-4">
        <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
          <Dropdown
            id="vpc"
            label="Virtual Private Cloud (VPC)"
            v-model="formData.vpc"
            :options="vpcOptions"
            required
            @update:modelValue="handleChange"
          />

          <Dropdown
            id="subnet"
            label="Subnet"
            v-model="formData.subnet"
            :options="subnetOptions"
            required
            @update:modelValue="handleChange"
          />
        </div>

        <div>
          <Checkbox
            id="publicIp"
            label="Assign public IP address"
            :checked="formData.publicIp"
            @update:checked="
              (val: boolean) => {
                formData.publicIp = val
                handleChange()
              }
            "
          />
          <p class="pt-2 text-xs text-gray-500 md:text-sm">
            Enable this to make your service accessible from the internet
          </p>
        </div>

        <div class="pt-4">
          <p class="text-sm font-medium text-gray-700">Security Groups</p>
          <p class="pt-1 pb-4 text-sm text-gray-500">
            Select the security groups to apply to your instance
          </p>

          <div class="space-y-3">
            <Checkbox
              v-for="group in securityGroupOptions"
              :key="group.id"
              :id="group.id"
              :label="group.name"
              :checked="formData.securityGroups.includes(group.id)"
              @update:checked="(val: boolean) => handleSecurityGroupToggle(group.id, val)"
            />
          </div>
        </div>
      </div>
    </div>

    <div class="mt-14 flex justify-end space-x-4 border-t border-t-gray-200 pt-5">
      <button
        @click="handleCancel"
        class="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:outline-none"
      >
        Cancel
      </button>
      <button
        @click="handleSave"
        :disabled="!isFormValid || store.isSubmitting"
        class="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
      >
        <span v-if="store.isSubmitting">Saving...</span>
        <span v-else>Save Changes</span>
      </button>
    </div>
  </div>
</template>
