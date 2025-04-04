<script setup lang="ts">
import { useDeploymentStore } from '../stores/deployment'
import SummaryRow from './SummaryRow.vue'

const store = useDeploymentStore()

defineProps<{
  singleColumn?: boolean
  showSummary?: boolean
}>()
</script>

<template>
  <div class="w-full rounded-lg bg-gray-50 drop-shadow-sm">
    <p class="px-4 py-5 font-medium md:px-6" v-if="showSummary">Service Summary</p>

    <SummaryRow label="Cover Image" :singleColumn="singleColumn">
      <img
        class="h-[100px] w-[100px] rounded-lg object-cover object-center"
        src="/cover-image.jpeg"
        alt="Cover image"
      />
    </SummaryRow>

    <SummaryRow label="Service Name" :singleColumn="singleColumn">
      <p class="text-xs md:text-sm">{{ store?.serviceTypeData?.serviceName }}</p>
    </SummaryRow>

    <SummaryRow label="Description" :singleColumn="singleColumn">
      <p class="text-xs md:text-sm">{{ store?.serviceTypeData?.description }}</p>
    </SummaryRow>

    <SummaryRow label="Region" :singleColumn="singleColumn">
      <p class="text-xs md:text-sm">{{ store?.serviceTypeData?.region }}</p>
    </SummaryRow>

    <SummaryRow label="Resources" :singleColumn="singleColumn">
      <p class="text-xs md:text-sm">
        {{
          `${store.resources.vCPU}, ${store.resources.memory} Memory, ${store.resources.storage} Storage`
        }}
      </p>
    </SummaryRow>

    <SummaryRow label="Network" :singleColumn="singleColumn">
      <div class="flex flex-col gap-1 text-xs md:text-sm">
        <p>VPC: {{ store.network.vpc }}</p>
        <p>Subnet: {{ store.network.subnet }}</p>
        <p>Public IP: {{ store.network.publicIp ? 'Yes' : 'No' }}</p>
      </div>
    </SummaryRow>

    <SummaryRow label="Security Groups" :singleColumn="singleColumn">
      <p class="text-xs md:text-sm">
        {{ store.securityGroups.join(', ') || 'None' }}
      </p>
    </SummaryRow>
  </div>
</template>
