<template>
  <main class="h-full overflow-y-auto">
    <div class="container px-6 mx-auto grid">
      <!--  -->
      <!-- titulo -->
      <h1 class="mb-1 text-4xl font-bold dark:text-gray">Gestion Sesiones</h1>
      <BreadCrumb home="Sesion" modulo="Gestion" />
      <div class="grid grid-cols-2 my-6 font-bold dark:text-gray">
        <div class="flex items-center">
          <h2 class="mb-1 text-4xl font-bold dark:text-gray">Listado Sesiones</h2>
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
        titulo="Sesion"
        ruta="/sesion/crear"
        :visible="true"
        accion="Crear Sesion"
      ></AgregarLink>
      <div class="w-full overflow-hidden rounded-lg shadow-xs">
        <div class="relative overflow-x-auto">
          <table class="w-full border-black dark:border-slate-300">
            <thead>
              <tr
                class="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800"
              >
                <th class="px-4 py-3">ID</th>
                <th class="px-4 py-3">LUGAR</th>
                <th class="px-4 py-3">FECHA</th>
                <th class="px-4 py-3">HORAINICIO</th>
                <th class="px-4 py-3">HORAFINAL</th>
                <th class="px-4 py-3">PRESIDENTE</th>
                <th class="px-4 py-3">SECRETARIO</th>
                <th class="px-4 py-3">Estado</th>
                <th class="px-4 py-3">ACCIONES</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
              <tr
                class="text-gray-700 dark:text-gray-400"
                v-for="Sesion in datos"
                :key="Sesion.IDSESION"
              >
                <td class="px-4 py-3 border-b border-gray-300 dark:border-gray-700">
                  <div class="flex items-center text-sm">
                    <!-- Avatar with inset shadow -->
                    <div class="relative hidden w-8 h-8 mr-3 rounded-full md:block">
                      <div
                        class="absolute inset-0 rounded-full shadow-inner flex items-center justify-center"
                        aria-hidden="true"
                      >
                        <p class="font-semibold">{{ Sesion.IDSESION }}</p>
                      </div>
                    </div>
                  </div>
                </td>
                <td class="px-4 py-3 text-sm">
                  {{ Sesion.LUGAR }}
                </td>
                <td class="px-4 py-3 text-sm">
                  {{ Sesion.FECHA }}
                </td>
                <td class="px-4 py-3 text-sm">
                  {{ Sesion.HORAINICIO }}
                </td>
                <td class="px-4 py-3 text-sm">
                  {{ Sesion.HORAFINAL }}
                </td>
                <td class="px-4 py-3 text-sm">
                  {{ Sesion.PRESIDENTE }}
                </td>
                <td class="px-4 py-3 text-sm">
                  {{ Sesion.SECRETARIO }}
                </td>
                <td class="px-4 py-3 text-sm">
                  <span
                    :class="[
                      'inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium',
                      sessionStatusClass(Sesion.FECHA, Sesion.HORAINICIO, Sesion.HORAFINAL)
                    ]"
                  >
                    {{ sessionStatus(Sesion.FECHA, Sesion.HORAINICIO, Sesion.HORAFINAL) }}
                  </span>
                </td>
                <td class="px-4 py-3 text-sm">
                  <div class="flex">
                    <BotonVer
                      :ruta="`/sesion/opciones/${Sesion.IDSESION}`"
                      :titulo="'Ver temas'"
                    ></BotonVer>
                    <BotonEditar
                      :ruta="`/sesion/actualizar/${Sesion.IDSESION}`"
                      :titulo="'Editar Sesion'"
                      v-if="actualizarSesion"
                    ></BotonEditar>
                    <BotonEliminar :ruta="`/sesion/actualizar/${Sesion.IDSESION}`"></BotonEliminar>
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
import { ref, type Ref, onMounted, onBeforeUnmount } from 'vue'
import AgregarLink from '@/components/modules/AgregarLink.vue'
import BreadCrumb from '@/components/BreadCrumb.vue'
import BotonEditar from '@/components/botones/BotonEditar.vue'
import BotonVer from '@/components/botones/BotonVer.vue'
//import BotonEliminar from '@/components/botones/BotonEliminar.vue'
import SesionService from '@/modules/sesion/services'
import dayjs from 'dayjs'
interface Sesion {
  IDSESION: number
  LUGAR: string
  FECHA: string
  HORAINICIO: string
  HORAFINAL: string
  PRESIDENTE: string
  SECRETARIO: string
}

let datos: Ref<Sesion[]> = ref([])
const CargarSesiones = async () => {
  const respuesta = await SesionService.MostrarSesiones()
  if (respuesta.status == 200) {
    datos.value = Array.isArray(respuesta.data) ? respuesta.data : [respuesta.data]
  } else if (respuesta.status == 404) {
    console.log(respuesta.error.message)
  } else {
    console.log(respuesta.error.error)
  }
}

onMounted(() => {
  CargarSesiones()
})

const actualizarSesion = ref(false)

/// Variables para los contadores
const diasRestantes = ref(0)
const horasRestantes = ref(0)
const minutosRestantes = ref(0)
let intervalId: number | null = null

// Función para determinar el estado de la sesión
function sessionStatus(fecha: string, horaInicio: string, horaFinal: string) {
  const fechaInicio = dayjs(`${fecha} ${horaInicio}`)
  const fechaFin = dayjs(`${fecha} ${horaFinal}`)
  const fechaActual = dayjs()

  if (fechaActual.isAfter(fechaFin)) {
    return 'Finalizada'
  } else if (fechaActual.isAfter(fechaInicio) && fechaActual.isBefore(fechaFin)) {
    return 'En Curso'
  } else {
    return 'Próxima'
  }
}

// Método para actualizar el contador basado en la fecha y horas de inicio y fin de la reunión
function actualizarContador(fecha: string, horaInicio: string, horaFinal: string) {
  const fechaInicio = dayjs(`${fecha} ${horaInicio}`)
  const fechaFin = dayjs(`${fecha} ${horaFinal}`)
  const fechaActual = dayjs()

  if (fechaActual.isAfter(fechaInicio) && fechaActual.isBefore(fechaFin)) {
    // La sesión está en curso, calculamos el tiempo restante hasta la hora final
    const diferencia = fechaFin.diff(fechaActual, 'minute')
    diasRestantes.value = Math.floor(diferencia / (60 * 24))
    horasRestantes.value = Math.floor((diferencia % (60 * 24)) / 60)
    minutosRestantes.value = diferencia % 60
  } else if (fechaInicio.isAfter(fechaActual)) {
    // La sesión aún no inicia, calculamos el tiempo restante hasta la hora de inicio
    const diferencia = fechaInicio.diff(fechaActual, 'minute')
    diasRestantes.value = Math.floor(diferencia / (60 * 24))
    horasRestantes.value = Math.floor((diferencia % (60 * 24)) / 60)
    minutosRestantes.value = diferencia % 60
  } else {
    // La sesión ya finalizó
    diasRestantes.value = 0
    horasRestantes.value = 0
    minutosRestantes.value = 0
  }
}

// Función para iniciar el contador solo si la página está visible
function iniciarContador(fecha: string, horaInicio: string, horaFinal: string) {
  actualizarContador(fecha, horaInicio, horaFinal)
  intervalId = setInterval(() => actualizarContador(fecha, horaInicio, horaFinal), 60000) // Actualiza cada minuto
}

// Evento que detecta si la página está visible o no
document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'visible') {
    iniciarContador(datos.value[0].FECHA, datos.value[0].HORAINICIO, datos.value[0].HORAFINAL)
  } else {
    if (intervalId) clearInterval(intervalId)
  }
})

// Limpieza al desmontar el componente
onBeforeUnmount(() => {
  if (intervalId) clearInterval(intervalId)
})

// Función para aplicar clases según el estado de la sesión
function sessionStatusClass(fecha: string, horaInicio: string, horaFinal: string) {
  const status = sessionStatus(fecha, horaInicio, horaFinal)
  if (status === 'Finalizada') return 'bg-red-100 text-red-800'
  if (status === 'En Curso') return 'bg-yellow-100 text-yellow-800'
  return 'bg-green-100 text-green-800'
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
.table {
  display: table;
  width: 100%;
}
.table-row-group {
  display: table-row-group;
}
.table-row {
  display: table-row;
}
.table-cell {
  display: table-cell;
}
</style>
