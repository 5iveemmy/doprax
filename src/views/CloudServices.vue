<script setup lang="ts">
import TextSection from '../components/TextSection.vue'
import ServiceSummary from '../components/ServiceSummary.vue'
import DeleteModal from '../components/DeleteModal.vue'
import { computed, ref } from 'vue'
import { Dialog, DialogPanel, TransitionRoot, TransitionChild } from '@headlessui/vue'

import { useDeploymentStore } from '../stores/deployment'

const store = useDeploymentStore()

const isOpen = ref(false)

const deleteModalRef = ref<InstanceType<typeof DeleteModal> | null>(null)
const currentServiceId = ref('cloud-service-123')
const serviceName = ref('Cloud Service Name')

const handleDeleteClick = () => {
  if (deleteModalRef.value) {
    deleteModalRef.value.openDeleteModal(currentServiceId.value, serviceName.value)
  }
}

const serviceInfo = computed(
  () => store.deploymentResult?.service || { description: '', serviceName: '' }
)
</script>

<template>
  <div>
    <h1 class="mb-5 text-lg font-medium">Your Cloud Services</h1>

    <div class="w-full rounded-lg border border-[#e1e3e6] md:w-[466px]">
      <div class="px-5 py-6">
        <div class="mb-6">
          <img
            class="h-[100px] w-[100px] rounded-lg object-cover object-center"
            src="/cover-image.jpeg"
            alt="Cover image"
          />
        </div>

        <TextSection
          :title="serviceInfo.serviceName || 'Cloud Service Name'"
          :description="serviceInfo.description || 'Description text goes here.'"
          gap="12px"
          titleSize="20px"
          descriptionSize="14px"
        />
      </div>

      <div class="flex items-center justify-between border-t border-t-[#e1e3e6] px-5 py-4">
        <div class="flex items-center gap-8">
          <div class="cursor-pointer" @click="$router.push({ name: 'EditService' })">
            <img src="/pen.svg" />
          </div>

          <div class="cursor-pointer" @click="handleDeleteClick">
            <img src="/trash.svg" />
          </div>
        </div>

        <button
          @click="isOpen = true"
          class="bg-primary-800 cursor-pointer rounded-md px-4 py-3 text-xs text-white md:text-sm"
        >
          View details
        </button>
      </div>
    </div>
  </div>

  <TransitionRoot appear :show="isOpen" as="template">
    <Dialog as="div" @close="isOpen = false">
      <div class="fixed inset-0 z-50 overflow-hidden">
        <TransitionChild
          as="template"
          enter="transition-opacity ease-linear duration-300"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <div class="fixed inset-0 bg-black opacity-40" />
        </TransitionChild>

        <div class="fixed inset-y-0 right-0 flex max-w-full pl-10">
          <TransitionChild
            as="template"
            enter="transform transition ease-in-out duration-500 sm:duration-700"
            enter-from="translate-x-full"
            enter-to="translate-x-0"
            leave="transform transition ease-in-out duration-500 sm:duration-700"
            leave-from="translate-x-0"
            leave-to="translate-x-full"
          >
            <DialogPanel class="w-screen max-w-md">
              <div class="flex h-full flex-col bg-white shadow-xl">
                <div class="flex-1 overflow-y-auto">
                  <div class="flex items-center justify-between border-b border-gray-200 p-6">
                    <h2 class="font-semibold">Cloud Service Details</h2>

                    <div class="flex items-center gap-4">
                      <div class="cursor-pointer" @click="$router.push({ name: 'EditService' })">
                        <img src="/pen.svg" />
                      </div>

                      <div class="cursor-pointer">
                        <img src="/trash.svg" />
                      </div>

                      <div class="cursor-pointer" @click="isOpen = false">
                        <img src="/close.svg" />
                      </div>
                    </div>
                  </div>
                  <div class="p-5">
                    <ServiceSummary :singleColumn="true" />
                  </div>
                </div>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>

  <DeleteModal ref="deleteModalRef" />
</template>
