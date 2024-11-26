<template>
  <main class="h-full overflow-y-auto">
    <div class="container px-6 mx-auto grid">
      <!--  -->
      <!-- titulo -->
      <h1 class="mb-1 text-4xl font-bold dark:text-gray">Gestion Invitados</h1>
      <BreadCrumb home="Invitados" modulo="Gestion" />
      <div class="grid grid-cols-2 my-6 font-bold dark:text-gray">
        <div class="flex items-center">
          <h2 class="mb-1 text-4xl font-bold dark:text-gray">Listado de Invitados</h2>
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
      <AgregarLink
        titulo="Invitados"
        ruta="/invitados/crear"
        :visible="true"
        accion="Agregar Invitado"
      ></AgregarLink>
      <div class="w-full overflow-hidden rounded-lg shadow-xs">
        <div class="w-full overflow-x-auto">
          <table class="w-full whitespace-no-wrap border-black dark:border-slate-300">
            <thead>
              <tr
                class="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800"
              >
                <th class="px-6 py-3">ID Invitados</th>
                <th class="px-6 py-3">Nombre</th>
                <th class="px-6 py-3">Dependencia</th>
                <th class="px-6 py-3">Cargo</th>
                <th class="px-6 py-3">Acciones</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
              <tr
                class="text-gray-700 dark:text-gray-400"
                v-for="invitado in invitados"
                :key="invitado.IDINVITADOS"
              >
                <td class="px-4 py-3 border-b border-gray-300 dark:border-gray-700">
                  <div class="flex items-center text-sm">
                    <!-- Avatar with inset shadow -->
                    <div class="relative hidden w-8 h-8 mr-3 rounded-full md:block">
                      <div
                        class="absolute inset-0 rounded-full shadow-inner flex items-center justify-center"
                        aria-hidden="true"
                      >
                        <p class="font-semibold">{{ invitado.IDINVITADOS }}</p>
                      </div>
                    </div>
                  </div>
                </td>
                <td class="px-4 py-3 text-sm">
                  {{ invitado.NOMBRE }}
                </td>
                <td class="px-4 py-3 text-xs">
                  {{ invitado.DEPENDENCIA }}
                </td>
                <td class="px-4 py-3 text-xs">
                  {{ invitado.CARGO }}
                </td>
                <td class="px-4 py-3 text-sm">
                  <div class="flex">
                    <BotonEditar
                      :ruta="`/invitados/actualizar/${invitado.IDINVITADOS}`"
                    ></BotonEditar>
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
import servicesInvitados from '@/modules/invitados/services'
interface Invitados {
  IDINVITADOS: number
  NOMBRE: string
  DEPENDENCIA: string
  CARGO: string
}
const invitados = ref<Invitados[]>([])
{
  const cargarDatos = async () => {
    const respuesta = await servicesInvitados.MostrarInvitados()
    if (respuesta.status == 200) {
      invitados.value = Array.isArray(respuesta.data) ? respuesta.data : [respuesta.data]
    } else if (respuesta.status == 404) {
      console.log(respuesta.error.message)
    } else {
      console.log(respuesta.error.error)
    }
  }

  onMounted(() => {
    cargarDatos()
  })
}
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
