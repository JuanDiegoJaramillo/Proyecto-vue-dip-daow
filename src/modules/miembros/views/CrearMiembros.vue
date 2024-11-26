<template>
  <div class="max-w-md mx-auto p-6 mt-20 bg-slate-50 shadow-md rounded-md">
    <h2 class="text-2xl font-bold mb-4 text-center text-gray-800">Registro de Miembros</h2>
    <form
      @submit.prevent="RegistrarMiembro"
      class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
    >
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="NOMBRE">Nombre</label>
        <input
          v-model="formData.NOMBRE"
          class="shadow appearance-none border rounded w-full py-2 px-3 bg-gray-50 border-gray-300 text-gray-900 text-sm leading-tight focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
          id="NOMBRE"
          type="text"
          placeholder="Nombre completo"
          required
        />
      </div>

      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="CARGO">Cargo</label>
        <input
          v-model="formData.CARGO"
          class="shadow appearance-none border rounded w-full py-2 px-3 bg-gray-50 border-gray-300 text-gray-900 text-sm leading-tight focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
          id="CARGO"
          type="text"
          placeholder="Cargo"
          required
        />
      </div>
      <div class="mb-5">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="EMAIL">Email usuario</label>
        <input
          v-model="formData.EMAIL"
          class="shadow appearance-none border rounded w-full py-2 px-3 bg-gray-50 border-gray-300 text-gray-900 text-sm leading-tight focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
          id="EMAIL"
          type="email"
          placeholder="Email"
          required
        />
      </div>
      <div class="flex items-center justify-between">
        <button
          :disabled="isLoading"
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          {{ isLoading ? 'Cargando...' : 'Registrar' }}
        </button>

        <button type="button" class="" @click="limpiarFormData()">Limpiar</button>
      </div>
    </form>
  </div>
</template>
<script setup lang="ts">
import { reactive } from 'vue'
import Registrarmiembros from '@/modules/miembros/services' // Asegúrate de importar correctamente el servicio
import { ref } from 'vue'

// Estado reactivo para almacenar los datos del formulario
const formData = reactive({
  NOMBRE: '',
  CARGO: '',
  EMAIL: ''
})

const isLoading = ref(false)
// Función para manejar el envío del formulario
const RegistrarMiembro = async () => {
  try {
    isLoading.value = true

    // Llama al servicio con los datos del formulario
    const respuesta = await Registrarmiembros.RegistrarMiembro(
      formData.NOMBRE,
      formData.CARGO,
      formData.EMAIL
    )
    console.log(respuesta)
    if (respuesta.status == 201) {
      let datos = respuesta.data.message
      alert(datos)
      limpiarFormData()
    } else if (respuesta.status == 400) {
      alert(respuesta.error?.message)
    } else if (respuesta.status == 409) {
      alert(respuesta.error?.message)
    } else if (respuesta.status == 500) {
      console.log(respuesta.error?.message)
    }
  } catch (error) {
    console.error('Error en la solicitud:', error)
  } finally {
    isLoading.value = false // Ocultar spinner
  }
}

const limpiarFormData = () => {
  formData.NOMBRE = ''
  formData.CARGO = ''
  formData.EMAIL = ''
}
</script>
