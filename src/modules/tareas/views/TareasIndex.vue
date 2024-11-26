<template>
  <main class="h-full overflow-y-auto">
    <div class="container px-6 mx-auto grid">
      <!--  -->
      <!-- titulo -->
      <h1 class="mb-1 text-4xl font-bold dark:text-gray">Gestion Tareas</h1>
      <BreadCrumb home="Tareas" modulo="Gestion" />
      <div class="grid grid-cols-2 my-6 font-bold dark:text-gray">
        <div class="flex items-center">
          <h2 class="mb-1 text-4xl font-bold dark:text-gray">Listado Tareas</h2>
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
      <AgregarLink titulo="Tareas" ruta="/tareas/crear"></AgregarLink>
      <div class="w-full overflow-hidden rounded-lg shadow-xs">
        <div class="relative overflow-x-auto">
          <table class="w-full border-black dark:border-slate-300">
            <thead>
              <tr
                class="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800"
              >
                <th class="px-4 py-3">ID Tareas</th>
                <th class="px-4 py-3">Descripción</th>
                <th class="px-4 py-3">Sesión (ID Sesión)</th>
                <th class="px-4 py-3">Fecha de Entrega</th>
                <th class="px-4 py-3">Acciones</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
              <tr class="text-gray-700 dark:text-gray-400" v-for="tarea in tareas" :key="tarea.id">
                <td class="px-4 py-3 border-b border-gray-300 dark:border-gray-700">
                  <div class="flex items-center text-sm">
                    <!-- Avatar with inset shadow -->
                    <div class="relative hidden w-8 h-8 mr-3 rounded-full md:block">
                      <div
                        class="absolute inset-0 rounded-full shadow-inner flex items-center justify-center"
                        aria-hidden="true"
                      >
                        <p class="font-semibold">{{ tarea.id }}</p>
                      </div>
                    </div>
                  </div>
                </td>
                <td class="px-4 py-3 text-sm">
                  {{ tarea.descripcion }}
                </td>
                <td class="px-4 py-3 text-sm">
                  {{ tarea.sesionId }}
                </td>
                <td class="px-4 py-3 text-sm">
                  {{ tarea.fechaEntrega }}
                </td>
                <td class="px-4 py-3 text-sm">
                  <div class="flex">
                    <BotonVer :ruta="`/tareas/actualizar/${tarea.id}`"></BotonVer>
                    <BotonEditar :ruta="`/tareas/actualizar/${tarea.id}`"></BotonEditar>
                    <BotonEliminar :ruta="`/tareas/actualizar/${tarea.id}`"></BotonEliminar>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
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
import BotonVer from '@/components/botones/BotonVer.vue'
import BotonEliminar from '@/components/botones/BotonEliminar.vue'
interface Tareas {
  id: number
  descripcion: string
  sesionId: number
  fechaEntrega: String
}

const tareas = ref<Tareas[]>([])
function cargarDatos() {}
tareas.value = [
  {
    id: 1,
    descripcion: 'Desarrollo del módulo de usuarios',
    sesionId: 101,
    fechaEntrega: '2024-10-10'
  },
  {
    id: 2,
    descripcion: 'Revisión de la documentación',
    sesionId: 102,
    fechaEntrega: '2024-10-15'
  }
  // Agregar más tareas aquí
]
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
