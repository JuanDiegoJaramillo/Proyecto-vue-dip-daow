<template>
  <main class="h-full overflow-y-auto">
    <div class="container px-6 mx-auto grid">
      <!--  -->
      <!-- titulo -->
      <h1 class="mb-1 text-4xl font-bold dark:text-gray">Gestion Solicitantes</h1>
      <BreadCrumb home="Solicitantes" modulo="Gestion" />
      <div class="grid grid-cols-2 my-6 font-bold dark:text-gray">
        <div class="flex items-center">
          <h2 class="mb-1 text-4xl font-bold dark:text-gray">Listado de Solicitantes</h2>
        </div>
        <div>
          <form class="max-w-md mx-auto">
            <label
              for="default-search"
              class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
              >Search</label
            >
            <div class="relative">
              <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg
                  class="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <input
                type="search"
                id="default-search"
                v-model="buscarSolicitante"
                class="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search Mockups, Logos..."
                required
              />
              <button
                type="submit"
                class="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Search
              </button>
            </div>
          </form>
        </div>
      </div>
      <AgregarLink
        titulo="Solicitantes"
        ruta="/solicitantes/crear"
        titulo-link="Agregar"
      ></AgregarLink>
      <div class="w-full overflow-hidden rounded-lg shadow-xs">
        <div class="w-full overflow-x-auto">
          <table class="w-full whitespace-no-wrap border-black dark:border-slate-300">
            <thead>
              <tr
                class="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800"
              >
                <th class="px-4 py-3">Identificacion</th>
                <th class="px-4 py-3">Nombre</th>
                <th class="px-4 py-3">Tipo de Solicitante</th>
                <th class="px-4 py-3">Email</th>
                <th class="px-4 py-3">Celular</th>
                <th class="px-4 py-3">Acciones</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
              <tr
                class="text-gray-700 dark:text-gray-400"
                v-for="solicitante in solicitantes"
                :key="solicitante.IDSOLICITANTE"
              >
                <td class="px-4 py-3 border-b border-gray-300 dark:border-gray-700">
                  <div class="flex items-center text-sm">
                  
                        <p class="font-semibold">{{ solicitante.IDENTIFICACION }}</p>
                     
                  </div>
                </td>
                <td class="px-4 py-3 text-sm">
                  {{ solicitante.NOMBRE }}
                </td>
                <td class="px-4 py-3 text-sm">
                  {{ solicitante.TIPODESOLICITANTE }}
                </td>
                <td class="px-4 py-3 text-sm">
                  {{ solicitante.EMAIL }}
                </td>
                <td class="px-4 py-3 text-sm">
                  {{ solicitante.CELULAR }}
                </td>
                <td class="px-4 py-3 text-sm">
                  <div class="flex" >
                    <BotonEditar
                      :ruta="`/solicitantes/actualizar/${solicitante.IDSOLICITANTE}`"
                    ></BotonEditar>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          <div
            class="p-4 mb-4 text-sm text-yellow-800 rounded-lg bg-yellow-50 dark:bg-gray-800 dark:text-yellow-300"
            role="alert"
            v-if="existenSolicitantes == false"
          >
            <span class="font-medium">Warning alert!</span> Solicitantes No registrados
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue'

import AgregarLink from '@/components/modules/AgregarLink.vue'
import BreadCrumb from '@/components/BreadCrumb.vue'
import BotonEditar from '@/components/botones/BotonEditar.vue'
import SolicitantesServises from '@/modules/solicitantes/services'

interface Solicitantes {
  IDSOLICITANTE: number
  NOMBRE: string
  IDENTIFICACION: string
  TIPODESOLICITANTE: string
  EMAIL: string
  CELULAR: string
}

const solicitantes = ref<Solicitantes[]>([])
const existenSolicitantes = ref(false)
const cargarDatos = async () => {
  const respuesta = await SolicitantesServises.MostrarSolicitantes()
  if (respuesta.status == 200) {
    solicitantes.value = Array.isArray(respuesta.data) ? respuesta.data : [respuesta.data]
    existenSolicitantes.value = true
  } else if (respuesta.status == 404) {
    console.log(respuesta.error.message)
    existenSolicitantes.value = false
  } else {
    console.log(respuesta.error.error)
  }
}

const buscarSolicitante = ref('')






// Llamar a 'cargarDatos' cuando el componente se monta
onMounted(() => {
  cargarDatos()
})


</script>

<style scoped>
.text-blue-600 {
  color: #2563eb;
}

.text-red-600 {
  color: #dc2626;
}

.text-blue-600:hover,
.text-red-600:hover {
  cursor: pointer;
  text-decoration: underline;
}
</style>
