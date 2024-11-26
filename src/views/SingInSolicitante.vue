<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100 p-6">
    <div class="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
      <h2 class="text-2xl font-bold text-center mb-6">Registro</h2>
      <form>
        <!-- Nombre -->
        <div class="mb-4">
          <label for="nombre" class="block text-sm font-medium text-gray-700">Nombre</label>
          <input
            v-model="formData.nombre"
            id="nombre"
            type="text"
            placeholder="Ingrese su nombre"
            class="mt-1 block w-full p-2 border rounded-md focus:ring focus:ring-blue-500"
            required
          />
        </div>
        <!-- Identificación -->
        <div class="mb-4">
          <label for="identificacion" class="block text-sm font-medium text-gray-700"
            >Identificación</label
          >
          <input
            v-model="formData.identificacion"
            id="identificacion"
            type="text"
            placeholder="Ingrese su identificación"
            class="mt-1 block w-full p-2 border rounded-md focus:ring focus:ring-blue-500"
            required
          />
        </div>
        <!-- Tipo de Solicitante -->
        <div class="mb-4">
          <label for="tipoSolicitante" class="block text-sm font-medium text-gray-700"
            >Tipo de Solicitante</label
          >
          <select
            v-model="formData.tipoSolicitante"
            id="tipoSolicitante"
            class="mt-1 block w-full p-2 border rounded-md focus:ring focus:ring-blue-500"
            required
          >
            <option value="" disabled selected>Seleccione un tipo</option>
            <option value="ESTUDIANTE">ESTUDIANTE</option>
            <option value="DOCENTE">DOCENTE</option>
          </select>
        </div>
        <!-- Celular -->
        <div class="mb-4">
          <label for="celular" class="block text-sm font-medium text-gray-700">Celular</label>
          <input
            v-model="formData.celular"
            id="celular"
            type="tel"
            placeholder="Ingrese su número de celular"
            class="mt-1 block w-full p-2 border rounded-md focus:ring focus:ring-blue-500"
            required
          />
        </div>
        <!-- Email -->
        <div class="mb-4">
          <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
          <input
            v-model="formData.email"
            id="email"
            type="email"
            placeholder="Ingrese su correo electrónico"
            class="mt-1 block w-full p-2 border rounded-md focus:ring focus:ring-blue-500"
            required
          />
        </div>
        <div class="mb-6">
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
          <input
            v-model="formData.password"
            type="password"
            class="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <!-- Botón de Enviar -->
        <div class="mt-6">
          <button
            type="button"
            :disabled="isLoading"
            @click="RegistrarSolicitante()"
            class="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:ring focus:ring-blue-300"
          >
            {{ isLoading ? 'Cargando...' : 'Registrarse' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import servives from '@/services/usuarios/loginService'
const formData = reactive({
  nombre: '',
  identificacion: '',
  tipoSolicitante: '',
  password: '',
  email: '',
  celular: ''
})
const isLoading = ref(false)
const RegistrarSolicitante = async () => {
  if (
    !formData.nombre ||
    !formData.identificacion ||
    !formData.tipoSolicitante ||
    !formData.email ||
    !formData.password ||
    !formData.celular
  ) {
    alert('Todos los campos son obligatorios')
    return
  }
  try {
    isLoading.value = true
    const respuesta = await servives.RegistrarSolicitante(
      formData.nombre,
      formData.identificacion,
      formData.tipoSolicitante,
      formData.email,
      formData.celular,
      formData.password
    )
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
  console.log('Datos del formulario:', formData)
}

const limpiarFormData = () => {
  formData.nombre = ''
  formData.identificacion = ''
  formData.tipoSolicitante = ''
  formData.email = ''
  formData.password = ''
  formData.celular = ''
}
</script>

<style>
/* Personaliza tu estilo si no usas Tailwind CSS */
</style>
