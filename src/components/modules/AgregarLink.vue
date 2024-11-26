<template>
  <button
    :title="accion"
    class="flex items-center justify-between p-4 mb-8 text-sm font-semibold bg-white text-black dark:bg-slate-800 dark:text-white rounded-lg shadow-md focus:outline-none focus:shadow-outline-purple"
    href="https://github.com/estevanmaito/windmill-dashboard"
  >
    <div class="flex items-center">
      <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
        <path
          d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
        ></path>
      </svg>

      <span> {{ titulo }}</span>
    </div>
    <div class="flex items-center" v-if="visible">
      <router-link :to="ruta">
        <svg
          class="h-9 w-9 text-dark-500"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="16" />
          <line x1="8" y1="12" x2="16" y2="12" />
        </svg>
      </router-link>
    </div>
  </button>
</template>
<script setup lang="ts">
defineProps<{
  ruta: string
  titulo: string
  accion?: string
  visible?: boolean
}>()
</script>
