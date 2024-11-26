<template>
  <router-link :to="ruta" class="text-blue-600 hover:underline">
    <button
      type="button"
      class="text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-xs px-3 py-1.5 me-2 text-center inline-flex items-center dark:bg-blue-300 dark:text-gray-800 dark:hover:bg-blue-400 dark:focus:ring-yellow-800"
      :title="titulo"
    >
      <svg
        class="h-6 w-6 text-gray-800 dark:text-white"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        stroke-width="2"
        stroke="currentColor"
        fill="none"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path stroke="none" d="M0 0h24v24H0z" />
        <circle cx="12" cy="12" r="2" />
        <path d="M2 12l1.5 2a11 11 0 0 0 17 0l1.5 -2" />
        <path d="M2 12l1.5 -2a11 11 0 0 1 17 0l1.5 2" />
      </svg>
    </button>
  </router-link>
</template>
<script setup lang="ts">
defineProps<{
  ruta: string
  titulo?: string
}>()
</script>
