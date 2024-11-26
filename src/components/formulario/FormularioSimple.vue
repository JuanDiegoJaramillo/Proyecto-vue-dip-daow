<template>
  <form class="max-w-sm mx-auto" @submit.prevent="submitFormulario">
    <div class="mx-auto w-64 h-10"><h3>login</h3></div>
    <div class="mb-5">
      <slot></slot>
      <div class="mt-4 mx-auto w-64">
        <button type="submit" class="btn btn-primary buttonBlue">Enviar</button>
        <button
          type="button"
          @click="limpiarFormulario"
          class="btn btn-secondary ml-2 buttonYellow"
        >
          Limpiar
        </button>
      </div>
    </div>
  </form>
</template>
<script setup lang="ts">
import { defineEmits } from 'vue'

const emit = defineEmits(['submit', 'reset'])

const submitFormulario = () => {
  emit('submit') // Emitir un evento para que el componente padre maneje el envío de datos
}

const limpiarFormulario = () => {
  emit('reset') // Emitir un evento para que el componente padre maneje la limpieza
}
</script>
