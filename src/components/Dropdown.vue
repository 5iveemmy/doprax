<script setup lang="ts">
defineProps<{
  modelValue: string
  label: string
  id: string
  options: { id: string; name: string }[]
  required?: boolean
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', val: string): void
}>()

const handleChange = (event: Event) => {
  const target = event.target as HTMLSelectElement
  emit('update:modelValue', target.value)
}
</script>

<template>
  <div>
    <label :for="id" class="mb-1 block text-xs font-medium text-gray-700 md:text-sm">
      {{ label }} <span v-if="required" class="text-red-500">*</span>
    </label>
    <select
      :id="id"
      :value="modelValue"
      @change="handleChange"
      class="w-full border-b border-b-gray-100 p-2 text-sm focus:border-b-gray-400 focus:ring-0 focus:outline-none"
      :required="required"
    >
      <option value="" disabled>Select an option</option>
      <option v-for="opt in options" :key="opt.id" :value="opt.id">
        {{ opt.name }}
      </option>
    </select>
  </div>
</template>
