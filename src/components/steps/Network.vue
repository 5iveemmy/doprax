<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useDeploymentStore } from '../../stores/deployment'
import TextSection from '../TextSection.vue'
import Checkbox from '../Checkbox.vue'
import Dropdown from '../Dropdown.vue'

const store = useDeploymentStore()

const formData = ref({
  vpc: '',
  subnet: '',
  publicIp: false,
  securityGroups: [] as string[]
})

const securityGroupOptions: Option[] = [
  { id: 'web', name: 'Web Traffic (80, 443)' },
  { id: 'ssh', name: 'SSH Access (22)' },
  { id: 'database', name: 'Database (3306, 5432)' },
  { id: 'internal', name: 'Internal Only' }
]

const vpcOptions: Option[] = [
  { id: 'vpc-123456', name: 'Default VPC (vpc-123456)' },
  { id: 'vpc-789012', name: 'Production VPC (vpc-789012)' },
  { id: 'vpc-345678', name: 'Development VPC (vpc-345678)' }
]

const subnetOptions: Option[] = [
  { id: 'subnet-123456', name: 'Public Subnet (subnet-123456)' },
  { id: 'subnet-789012', name: 'Private Subnet (subnet-789012)' },
  { id: 'subnet-345678', name: 'Database Subnet (subnet-345678)' }
]

onMounted(() => {
  formData.value = {
    ...formData.value,
    vpc: store.network.vpc,
    subnet: store.network.subnet,
    publicIp: store.network.publicIp,
    securityGroups: [...store.securityGroups]
  }
})

const updateNetworkData = () => {
  store.setNetwork({
    vpc: formData.value.vpc,
    subnet: formData.value.subnet,
    publicIp: formData.value.publicIp
  })
  store.setSecurityGroups(formData.value.securityGroups)
}

const handleChange = () => {
  updateNetworkData()
}

const handleSecurityGroupToggle = (group: string, isChecked: boolean) => {
  if (isChecked) {
    if (!formData.value.securityGroups.includes(group)) {
      formData.value.securityGroups.push(group)
    }
  } else {
    formData.value.securityGroups = formData.value.securityGroups.filter(g => g !== group)
  }
}

// watch(
//   () => formData.value.publicIp,
//   () => {
//     handleChange()
//   }
// )

// watch(
//   () => formData.value.securityGroups,
//   () => {
//     updateNetworkData()
//   },
//   { deep: true }
// )

// watch(() => formData.value.vpc, handleChange)
// watch(() => formData.value.subnet, handleChange)
</script>

<template>
  <TextSection
    title="Network Settings"
    description="Configure the network settings for your cloud service"
    gap="8px"
    titleSize="16px"
    descriptionSize="12px"
  />

  <div class="mt-6 space-y-6">
    <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
      <Dropdown
        id="vpc"
        label="Virtual Private Cloud (VPC)"
        v-model="formData.vpc"
        :options="vpcOptions"
        required
        @update:modelValue="handleChange"
      />
      <!-- <div>
        <label class="mb-1 block text-xs font-medium text-gray-700 md:text-sm">
          Virtual Private Cloud (VPC) <span class="text-red-500">*</span>
        </label>
        <select
          v-model="formData.vpc"
          @change="handleChange"
          class="w-full border-b border-b-gray-100 p-2"
          required
        >
          <option value="" disabled>Select a VPC</option>
          <option v-for="vpc in vpcOptions" :key="vpc.id" :value="vpc.id">
            {{ vpc.name }}
          </option>
        </select>
      </div> -->

      <Dropdown
        id="subnet"
        label="Subnet"
        v-model="formData.subnet"
        :options="subnetOptions"
        required
        @update:modelValue="handleChange"
      />

      <!-- <div>
        <label class="mb-1 block text-xs font-medium text-gray-700 md:text-sm">
          Subnet <span class="text-red-500">*</span>
        </label>
        <select
          v-model="formData.subnet"
          @change="handleChange"
          class="w-full border-b border-b-gray-100 p-2"
          required
        >
          <option value="" disabled>Select a Subnet</option>
          <option v-for="subnet in subnetOptions" :key="subnet.id" :value="subnet.id">
            {{ subnet.name }}
          </option>
        </select>
      </div> -->
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
</template>
