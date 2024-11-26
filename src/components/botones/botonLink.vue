<script setup lang="ts">
defineProps<{
  ruta: string
  titulo: string
}>()
</script>
<template>
  <div class="w-4">
    <router-link :to="ruta">
      <div class="bg-gray-200 mb-2 w-48 ml-3 rounded-lg hover:bg-gray-400 p-1 pl-3 text-gray-500">
        {{ titulo }}
      </div>
    </router-link>
  </div>
</template>
