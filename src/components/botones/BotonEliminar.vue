<template>
  <router-link :to="ruta" class="text-blue-600 hover:underline">
    <button
      type="button"
      class="text-white bg-red-500 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-xs px-3 py-1.5 me-2 text-center inline-flex items-center dark:bg-red-300 dark:text-gray-800 dark:hover:bg-red-400 dark:focus:ring-red-800"
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
        <line x1="4" y1="7" x2="20" y2="7" />
        <line x1="10" y1="11" x2="10" y2="17" />
        <line x1="14" y1="11" x2="14" y2="17" />
        <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
        <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
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
