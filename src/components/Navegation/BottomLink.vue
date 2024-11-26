<script setup lang="ts">
defineProps<{
  ruta: string
  titulo: string
}>()
</script>
<template>
  <div class="space-x-4">
    <RouterLink :to="ruta">
      <button
        class="bg-blue-500 text-white font-bold py-2 px-6 rounded-full shadow-lg hover:bg-blue-600 transition duration-300"
      >
        <span>
          {{ titulo }}
        </span>
      </button>
    </RouterLink>
  </div>
</template>
