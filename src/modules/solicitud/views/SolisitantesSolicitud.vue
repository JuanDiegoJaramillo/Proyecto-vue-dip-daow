<template>
  <main class="h-full overflow-y-auto">
    <div class="container px-6 mx-auto grid">
      <!--  -->
      <!-- titulo -->
      <h1 class="mb-1 text-4xl font-bold dark:text-gray">Gestion Solicitudes</h1>
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
                class="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Nombre o ID..."
                required
                v-model="buscarSolicitante"
              />
              <button
                type="button"
                class="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                @click="Recargar()"
              >
                Recargar
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
      <div class="flex items-center space-x-2 p-1 ">
        <!-- Select con buscador -->
        <div class="flex items-center space-x-4 p-4 rounded-lg shadow-md">
          <!-- Contenedor del select -->
          <div class="flex items-center space-x-2">
            <label for="role-filter" class="block text-sm font-medium text-gray-700"
              >Filtrar por rol</label
            >
            <select
              id="role-filter"
              v-model="selectedRole"
              @change="BuscarTipo()"
              class="block w-48 pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
            >
              <option value="">Seleccione una opción</option>
              <option value="ESTUDIANTE">Estudiante</option>
              <option value="DOCENTE">Docente</option>
            </select>
          </div>

          <!-- Botón de refrescar -->
          <button
            type="button"
            class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            @click="Recargar()"
          >
            Refrescar
          </button>
        </div>
        <!-- Botón de refrescar -->
      </div>
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
                  <div class="flex items-center">
                    <!-- Mostrar el botón o el mensaje según las condiciones -->
                    <template
                      v-if="BusquedaSolicitante == true && solicitante.estado_solicitudes === 1"
                    >
                      <BotonVer :ruta="`/sesiones/solicitudes/${solicitante.IDSOLICITANTE}`" />
                    </template>
                    <template
                      v-else-if="
                        BusquedaSolicitante == true && solicitante.estado_solicitudes === 0
                      "
                    >
                      <span class="text-red-500">{{ solicitante.mensaje_estado }}</span>
                    </template>
                    <template v-else>
                      <!-- Si no es una búsqueda, mostrar siempre el botón -->
                      <BotonVer :ruta="`/sesiones/solicitudes/${solicitante.IDSOLICITANTE}`" />
                    </template>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div>
          <!-- Alerta: No hay solicitantes registrados -->
          <div
            v-if="!existenSolicitantes && !BusquedaSolicitante"
            class="p-4 mb-4 text-sm text-yellow-800 rounded-lg bg-yellow-50 dark:bg-gray-800 dark:text-yellow-300"
            role="alert"
          >
            <span class="font-medium">Atención:</span> No hay solicitantes registrados.
          </div>

          <!-- Alerta: Solicitante no encontrado en la búsqueda -->
          <div
            v-if="BusquedaSolicitante && solicitantes.length === 0"
            class="p-4 mb-4 text-sm text-yellow-800 rounded-lg bg-yellow-50 dark:bg-gray-800 dark:text-yellow-300"
            role="alert"
          >
            <span class="font-medium">Atención:</span> El solicitante buscado no está registrado.
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import AgregarLink from '@/components/modules/AgregarLink.vue'
import BreadCrumb from '@/components/BreadCrumb.vue'
// import BotonEditar from '@/components/botones/BotonEditar.vue'
import BotonVer from '@/components/botones/BotonVer.vue'
import SolicitantesServises from '@/modules/solicitantes/services'
interface Solicitantes {
  IDSOLICITANTE: number
  NOMBRE: string
  IDENTIFICACION: string
  TIPODESOLICITANTE: string
  EMAIL: string
  CELULAR: string
  estado_solicitudes: number
  mensaje_estado: string
}
const solicitantes = ref<Solicitantes[]>([])
const existenSolicitantes = ref(false)
const cargarDatos = async () => {
  const respuesta = await SolicitantesServises.mostrarSolicitantesConSolicitudes()
  if (respuesta.status == 200) {
    solicitantes.value = Array.isArray(respuesta.data) ? respuesta.data : [respuesta.data]
    existenSolicitantes.value = true
    BusquedaSolicitante.value = false
    console.log(solicitantes)
  } else if (respuesta.status == 404) {
    BusquedaSolicitante.value = false // No es una búsqueda
    console.log(respuesta.error.message)
    existenSolicitantes.value = false
  } else {
    console.log(respuesta.error.error)
  }
}
// Llamar a 'cargarDatos' cuando el componente se monta
const BusquedaSolicitante = ref(false)
const mensajeSolicitante = ref('')
const buscarSolicitante = ref('')
watch(buscarSolicitante, () => {
  if (buscarSolicitante.value != '') {
    BuscarSolicitante()
  } else {
    cargarDatos()
  }
})

const BuscarSolicitante = async () => {
  const params = new URLSearchParams()
  //  if (filtroAnio.value) params.append('anio', filtroAnio.value);
  //  if (filtroAnioMes.value) params.append('anioMes', filtroAnioMes.value);
  if (buscarSolicitante.value) params.append('idTema', buscarSolicitante.value)
  const valor = convertToVarchar(buscarSolicitante.value)
  let buscarDatos = ''
  console.log(valor)
  if (valor == null) {
    buscarDatos = buscarSolicitante.value
  } else {
    buscarDatos = String(valor)
  }
  const respuesta = await SolicitantesServises.buscarSolicitante(buscarDatos)
  if (respuesta.status == 200) {
    // actas.value = Array.isArray(respuesta.data) ? respuesta.data : [respuesta.data]
    console.log(respuesta.data)
    solicitantes.value = Array.isArray(respuesta.data.data)
      ? respuesta.data.data
      : [respuesta.data.data]
    BusquedaSolicitante.value = true
  } else if (respuesta.status == 404) {
    solicitantes.value = [] // Limpia los resultados
    BusquedaSolicitante.value = true // Es una búsqueda, aunque no haya resultados
    mensajeSolicitante.value = respuesta.error.message
  } else {
    console.log(respuesta.error.message)
  }
  // Simulación de búsqueda (puedes integrar con tu API aquí)
  console.log('Buscando con parámetros:', params.toString())
  // Aquí puedes usar fetch para enviar los datos al backend
}

// Llamar a 'cargarDatos' cuando el componente se monta
onMounted(() => {
  cargarDatos()
})

function convertToVarchar(value: string): string | null {
  // Verifica si el valor es vacío o contiene solo espacios
  if (!value.trim()) {
    console.warn('El valor está vacío o solo contiene espacios')
    return null
  }
  try {
    // Decodifica la URI si contiene caracteres codificados
    const decodedValue = decodeURIComponent(value)
    // Reemplaza los espacios por "t2" y retorna el resultado
    return decodedValue.replace(/\s+/g, 't2')
  } catch (e) {
    console.error('Error al decodificar el valor:', e)
    return null // Retorna null si ocurre un error
  }
}

const BuscarTipo = async () => {
  const respuesta = await SolicitantesServises.mostrarSolicitantesPorTipo(selectedRole.value)
  if (respuesta.status == 200) {
    solicitantes.value = Array.isArray(respuesta.data) ? respuesta.data : [respuesta.data]

    console.log(solicitantes)
  } else if (respuesta.status == 404) {
    BusquedaSolicitante.value = false // No es una búsqueda
    console.log(respuesta.error.message)
    existenSolicitantes.value = false
  } else {
    console.log(respuesta.error.error)
  }
}
const selectedRole = ref('')
const Recargar = () => {
  cargarDatos()
  buscarSolicitante.value = ''
  selectedRole.value = ''
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
