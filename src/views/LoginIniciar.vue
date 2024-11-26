<template>
  <div class="h-screen flex items-center justify-center bg-slate-100 dark:bg-slate-700">
    <div class="bg-white dark:bg-slate-800 shadow-md rounded-lg p-8 w-full max-w-md">
      <h1 class="text-2xl font-bold mb-4 text-center">Login</h1>
      <form @submit.prevent="handleLogin">
        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Username</label>
          <input
            v-model="username"
            type="text"
            class="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div class="mb-6">
          <label for="default" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >Rol</label
          >
          <select
            v-model="selectedRole"
            id="default"
            class="bg-gray-50 border border-gray-300 text-gray-900 mb-6 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option value="" disabled selected>Selecciona el Rol</option>
            <option value="coordinador">Coordinador</option>
            <option value="miembro">Miembro</option>
            <option value="invitado">Invitado</option>
            <option value="solicitante">Solicitante</option>
          </select>
        </div>
        <div class="mb-6">
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
          <input
            v-model="password"
            type="password"
            class="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <button
          type="submit"
          class="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
        >
          Login
        </button>
      </form>
      <!-- Indicador de carga -->
      <div
        v-if="isLoading"
        class="relative items-center block max-w-sm p-6 bg-white border border-gray-100 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-800"
      >
        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white opacity-20">
          Validando datos
        </h5>
        <p class="font-normal text-gray-700 dark:text-gray-400 opacity-20">
          Por favor, espera mientras verificamos tu información.
        </p>
        <div role="status" class="absolute -translate-x-1/2 -translate-y-1/2 top-2/4 left-1/2">
          <svg
            aria-hidden="true"
            class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
          <span class="sr-only">Loading...</span>
        </div>
      </div>
  
        <RouterLink to="/registroSolicitante">
      <button
        class="mt-4 tracking-wide font-semibold bg-green-400 text-white-500 w-full py-4 rounded-lg hover:bg-green-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
        >
        <svg
          class="w-6 h-5 -ml-2"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
          <circle cx="8.5" cy="7" r="4" />
          <path d="M20 8v6M23 11h-6" />
        </svg>
        <span class="ml-"> Sign In </span>
      </button>
    </RouterLink>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'
import loginService from '@/services/usuarios/loginService'
export default defineComponent({
  setup() {
    const username = ref('')
    const password = ref('')
    const selectedRole = ref('')
    const isLoading = ref(false)
    const router = useRouter()

    const handleLogin = async () => {
      if (!selectedRole.value) {
        alert('Por favor selecciona un rol.')
        return
      }
      isLoading.value = true // Mostrar el indicador de carga
      try {
        const respuesta = await loginService.login(
          username.value,
          password.value,
          selectedRole.value
        )

        if (respuesta.status === 200 && respuesta.data) {
          const token = respuesta.data.token // Obtener el token
          localStorage.setItem('authToken', token) // Almacenar el token

          // Decodificar el token para obtener datos
          const decodedToken = parseJwt(token)
          localStorage.setItem('userRole', decodedToken.rol)
          localStorage.setItem('nombre', respuesta.data.nombre)
          localStorage.setItem('user', respuesta.data.email)
          // Redirigir
          router.push('/')
        } else if (respuesta.error) {
          alert(respuesta.error.message)
        }
      } catch (error) {
        alert('Error en la solicitud.')
      } finally {
        isLoading.value = false // Ocultar el indicador de carga
      }
    }
    function parseJwt(token: string) {
      const base64Url = token.split('.')[1]
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map((c) => {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
          })
          .join('')
      )

      return JSON.parse(jsonPayload)
    }

    return {
      username,
      password,
      selectedRole,
      isLoading,
      handleLogin
    }
  }
})
</script>
