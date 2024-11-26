<!-- CampoTexto.vue -->
<template>
  <div class="mb-5">
    <label :for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-900">{{
      label
    }}</label>
    <input
      :type="type"
      :id="name"
      :name="name"
      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      :placeholder="placeholder"
      :value="modelValue"
      @input="onInput"
      required
    />
  </div>
</template>

<script setup lang="ts">
defineProps({
  modelValue: String, // Vinculado al v-model
  name: String,
  label: String,
  type: {
    type: String,
    default: 'text'
  },
  placeholder: String
})

const emit = defineEmits(['update:modelValue'])

const onInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target) {
    emit('update:modelValue', target.value)
  }
}
</script>
