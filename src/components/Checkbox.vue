<script setup lang="ts">
defineProps<{
  id: string
  label: string
  checked: boolean
}>()

const emit = defineEmits<{
  (e: 'update:checked', value: boolean): void
}>()

const handleChange = (event: Event) => {
  const input = event.target as HTMLInputElement
  emit('update:checked', input.checked)
}
</script>

<template>
  <div class="flex items-center space-x-2">
    <input
      type="checkbox"
      :id="id"
      :checked="checked"
      @change="handleChange"
      class="h-4 w-4 cursor-pointer rounded border-gray-300 text-blue-600 focus:ring-blue-500"
    />
    <label :for="id" class="text-xs text-gray-700 md:text-sm">{{ label }}</label>
  </div>
</template>
