<!-- FormularioBase.vue -->
<template>
  <form @submit.prevent="submitFormulario">
    <!-- Aquí se insertarán dinámicamente los campos -->
    <slot></slot>

    <div class="mt-4">
      <button type="submit" class="btn btn-primary bttonBlue">Enviar</button>
      <button type="button" @click="limpiarFormulario" class="buttonYellow">Limpiar</button>
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
