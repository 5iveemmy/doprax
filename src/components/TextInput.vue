<script setup lang="ts">
defineProps<{
  label: string
  modelValue: string
  type?: string
  required?: boolean
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const onInput = (event: Event) => {
  const target = event.target as HTMLTextAreaElement | null
  if (target) {
    emit('update:modelValue', target.value)
  }
}
</script>

<template>
  <div>
    <label class="mb-1 block text-sm font-medium">
      {{ label }}
      <span v-if="required" class="text-red-500">*</span>
    </label>
    <input
      :type="type"
      :value="modelValue"
      @input="onInput"
      min="1"
      :required="required"
      class="w-full border-b border-b-gray-100 text-sm focus:border-b-gray-400 focus:ring-0 focus:outline-none"
    />
  </div>
</template>
