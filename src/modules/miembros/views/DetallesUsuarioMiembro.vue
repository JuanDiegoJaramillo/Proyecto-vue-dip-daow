<!-- src/views/InvitadosDetalle.vue -->
<template>
  <div class="min-h-screen bg-gray-100 dark:bg-gray-900 py-10 px-6">
    <!-- Contenedor principal -->
    <div class="max-w-3xl mx-auto bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6">
      <!-- Título -->
      <div class="text-center mb-6">
        <h1 class="text-2xl font-bold text-gray-800 dark:text-gray-100">Perfil del Miembro</h1>
        <p class="text-gray-600 dark:text-gray-400">Consulta y actualiza tu información.</p>
      </div>

      <!-- Información del Invitado -->
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
        <!-- Nombre -->
        <div>
          <label class="block text-gray-700 dark:text-gray-300 font-semibold mb-2">Nombre:</label>
          <p class="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 rounded-md p-2">
            {{ formData.NOMBRE }}
          </p>
        </div>
        <!-- Cargo -->
        <div>
          <label class="block text-gray-700 dark:text-gray-300 font-semibold mb-2">Cargo:</label>
          <p class="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 rounded-md p-2">
            {{ formData.CARGO }}
          </p>
        </div>
        <!-- Email -->
        <div>
          <label class="block text-gray-700 dark:text-gray-300 font-semibold mb-2"
            >Correo Electrónico:</label
          >
          <p class="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 rounded-md p-2">
            {{ formData.EMAIL }}
          </p>
        </div>
      </div>

      <!-- Formulario para cambiar contraseña -->
      <div class="border-t pt-6">
        <h2 class="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">
          Cambiar Contraseña
        </h2>
        <form class="max-w-md mx-auto">
          <!-- Contraseña actual -->
          <div class="mb-4">
            <label
              class="block text-gray-700 dark:text-gray-300 font-medium mb-2"
              for="current-password"
            >
              Contraseña Actual:
            </label>
            <div class="relative">
              <input
                :type="mostrarActual ? 'text' : 'password'"
                autocomplete="off"
                v-model="formDataPassword.contrasenaActual"
                class="w-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 rounded-md p-2 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <!-- Nueva contraseña -->
          <div class="mb-4">
            <label
              class="block text-gray-700 dark:text-gray-300 font-medium mb-2"
              for="new-password"
            >
              Nueva Contraseña:
            </label>
            <div class="relative">
              <input
                :type="mostrarNueva ? 'text' : 'password'"
                autocomplete="off"
                v-model="formDataPassword.nuevaContrasena"
                class="focus:ring-2 focus:ring-blue-500 w-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 rounded-md p-2 pr-10 focus:outline-none"
              />
            </div>
          </div>

          <!-- Botón para actualizar -->
          <div class="text-right">
            <button
              type="button"
              class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              @click="ActualizarPassword()"
              :disabled="isLoading"
            >
              {{ isLoading ? 'Cargando...' : 'Guardar cambios' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import servicesMiembros from '../services'
import services from '@/services/usuarios/loginService'
import { reactive } from 'vue'
const isLoading = ref(false)
const formData = reactive({
  NOMBRE: '',
  CARGO: '',
  EMAIL: ''
})

const cargarDatos = async () => {
  const respuesta = await servicesMiembros.DetallesUsuarioMiembro()
console.log(respuesta)
  if (respuesta.status == 200) {
    let datos = respuesta.data[0]
    ;(formData.NOMBRE = datos.NOMBRE),
      (formData.CARGO = datos.CARGO),
      (formData.EMAIL = datos.Email)
  } else if (respuesta.status == 400) {
    alert(respuesta.error?.message)
  } else if (respuesta.status == 409) {
    alert(respuesta.error?.message)
  } else if (respuesta.status == 500) {
    console.log(respuesta.error?.message)
  }
}

onMounted(() => {
  cargarDatos()
})
const mostrarActual = ref(false)
const mostrarNueva = ref(false)
const formDataPassword = reactive({
  contrasenaActual: '',
  nuevaContrasena: ''
})

const ActualizarPassword = async () => {
  isLoading.value = true
  try {
    const respuesta = await services.CambiarPasswordUsuario(
      formDataPassword.contrasenaActual,
      formDataPassword.nuevaContrasena
    )

    if (respuesta.status == 201) {
      console.log(respuesta.data.message)
      alert(respuesta.data.message)
      console.log('password actualizado')
      formDataPassword.contrasenaActual = "",
      formDataPassword.nuevaContrasena = ""
    } else if (respuesta.status == 400) {
      alert(respuesta.error?.message)
     } else if (respuesta.status == 500) {
      alert(respuesta.error?.message)
    }
  } catch (error) {
    console.error('Error en la solicitud:', error)
  } finally {
    isLoading.value = false // Ocultar spinner
  }
}
</script>
