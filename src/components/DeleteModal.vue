<script setup lang="ts">
import { ref } from 'vue'
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
import { useDeploymentStore } from '../stores/deployment'

const store = useDeploymentStore()

const isOpen = ref(false)
const serviceToDelete = ref({
  id: '',
  name: 'this cloud service'
})

const openDeleteModal = (serviceId = '', serviceName = 'this cloud service') => {
  serviceToDelete.value = {
    id: serviceId,
    name: serviceName
  }
  isOpen.value = true
}

const closeModal = () => {
  isOpen.value = false
}

const confirmDelete = async () => {
  try {
    await store.deleteService(serviceToDelete.value.id)
    closeModal()
  } catch (error) {
    console.error('Failed to delete service:', error)
  }
}

defineExpose({
  openDeleteModal
})
</script>

<template>
  <TransitionRoot appear :show="isOpen" as="template">
    <Dialog as="div" @close="closeModal" class="relative z-50">
      <TransitionChild
        as="template"
        enter="ease-out duration-300"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="ease-in duration-200"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-gray-500 opacity-50 transition-opacity" />
      </TransitionChild>

      <div class="fixed inset-0 z-50 overflow-y-auto">
        <div
          class="w flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0"
        >
          <TransitionChild
            as="template"
            enter="ease-out duration-300"
            enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enter-to="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leave-from="opacity-100 translate-y-0 sm:scale-100"
            leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <DialogPanel
              class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg"
            >
              <div class="bg-white px-4 pt-13 pb-4">
                <div class="flex flex-col items-center">
                  <div class="mb-5">
                    <img src="/trash.svg" />
                  </div>

                  <div class="text-center">
                    <DialogTitle as="h3" class="text-base font-medium text-gray-900">
                      Delete {{ serviceToDelete.name }}
                    </DialogTitle>
                    <div class="mt-3">
                      <p class="text-xs text-gray-500 md:text-sm">
                        Are you sure you want to delete this cloud service?
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="mt-8 flex justify-center gap-8 px-6 pb-13">
                <button
                  type="button"
                  class="text-400 cursor-pointer rounded border border-gray-300 bg-gray-100 px-4 py-2 text-xs opacity-50 md:text-sm"
                  @click="closeModal"
                >
                  No, Cancel
                </button>

                <button
                  type="button"
                  class="cursor-pointer rounded bg-[#ef4444] px-4 py-2 text-xs text-white md:text-sm"
                  @click="confirmDelete"
                  :disabled="store.isSubmitting"
                >
                  <span v-if="store.isSubmitting">Deleting...</span>
                  <span v-else>Yes, Delete</span>
                </button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
