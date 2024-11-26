<template>
  <main class="h-full overflow-y-auto">
    <div class="container px-6 mx-auto grid">
      <!--  -->
      <!-- titulo -->
      <h1 class="mb-1 text-4xl font-bold dark:text-gray">Gestion Solicitud</h1>
      <BreadCrumb home="Solicitud" modulo="Gestion" />
      <div class="grid grid-cols-2 my-6 font-bold dark:text-gray">
        <div class="flex items-center">
          <h2 class="mb-1 text-4xl font-bold dark:text-gray">Listado de Solicitud</h2>
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
        titulo="Solicitud"
        ruta="/solicitud/crear"
        accion="Agregar"
        :visible="true"
      ></AgregarLink>

      <div>
        <label for="small" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >Selecione la Sesion</label
        >
        <select
          v-model="idSesionSeleccionada"
          v-if="existenSesiones == true"
          @change="CargarSolicitudes"
          id="default"
          class="bg-gray-50 border border-gray-300 text-gray-900 mb-6 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          <option selected disabled>Seleccione una Sesion</option>
          <option v-for="sesion in sesiones" :key="sesion.IDSESION" :value="sesion.IDSESION">
            {{ sesion.LUGAR + ' | ' + sesion.FECHA }}
          </option>
        </select>
        <p v-else>No hay reuniones Disponibles.</p>
      </div>
    </div>
    <div class="container px-6 mx-auto grid pt-4">
      <AgregarLink titulo="Solicitudes" ruta="" accion="" :visible="false"></AgregarLink>
    </div>
    <div class="container px-6 mx-auto grid">
      <div class="w-full overflow-hidden rounded-lg shadow-xs">
        <div class="w-full overflow-x-auto">
          <table class="w-full whitespace-no-wrap border-black dark:border-slate-300">
            <thead>
              <tr
                class="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800"
              >
                <th scope="col" class="px-6 py-3">ID</th>
                <th scope="col" class="px-6 py-3">DEPENDENCIA</th>
                <th scope="col" class="px-6 py-3">ASUNTO</th>
                <th scope="col" class="px-6 py-3">DESICION</th>
                <th scope="col" class="px-6 py-3">FECHA SOLICITUD</th>
                <th class="px-4 py-3">ACCIONES</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
              <tr
                class="text-gray-700 dark:text-gray-400"
                v-for="solicitudes in solicitudes"
                :key="solicitudes.IDSOLICITUD"
              >
                <td class="px-4 py-3 border-b border-gray-300 dark:border-gray-700">
                  <div class="flex items-center text-sm">
                    <!-- Avatar with inset shadow -->
                    <div class="relative hidden w-8 h-8 mr-3 rounded-full md:block">
                      <div
                        class="absolute inset-0 rounded-full shadow-inner flex items-center justify-center"
                        aria-hidden="true"
                      >
                        <p class="font-semibold">{{ solicitudes.IDSOLICITUD }}</p>
                      </div>
                    </div>
                  </div>
                </td>
                <td class="px-4 py-3 text-sm">
                  {{ solicitudes.DEPENDENCIA }}
                </td>
                <td class="px-4 py-3 text-sm">
                  {{ solicitudes.ASUNTO }}
                </td>
                <td class="px-4 py-3 text-sm">
                  {{ solicitudes.DESICION }}
                </td>
                <td class="px-4 py-3 text-sm">
                  {{ solicitudes.FECHADESOLICITUD }}
                </td>

                <td class="px-4 py-3 text-sm">
                  <div class="flex">
                    <BotonVer
                      :ruta="``"
                      :titulo="'Ver Solicitante'"
                      @click="IDSolicitante(solicitudes.SOLICITANTE_IDSOLICITANTE)"
                    ></BotonVer>
                    <BotonEditar
                      :ruta="`/solicitud/actualizar/${solicitudes.IDSOLICITUD}`"
                    ></BotonEditar>
                    <BotonEliminar
                      :ruta="''"
                      :titulo="'Eliminar Tema'"
                      @click="SeleccionarSolicitudEliminar(solicitudes.IDSOLICITUD)"
                    ></BotonEliminar>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div
          v-if="Seleccionado == false"
          class="p-4 mb-4 text-sm text-blue-800 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400"
          role="alert"
        >
          <span class="font-medium">Info alert!</span> Selecione una Sesion
        </div>
        <div
          class="p-4 mb-4 text-sm text-yellow-800 rounded-lg bg-yellow-50 dark:bg-gray-800 dark:text-yellow-300"
          role="alert"
          v-if="existenSolicitudes == false && Seleccionado == true"
        >
          <span class="font-medium">Warning alert!</span> La sesion seleccionada no contiene
          solicitudes
        </div>
      </div>
    </div>
    <div
      v-if="Solicitante"
      id="crud-modal"
      tabindex="-1"
      aria-hidden="true"
      class="fixed inset-0 z-50 flex justify-center items-center w-full h-full overflow-y-auto overflow-x-hidden"
    >
      <div class="relative p-4 w-full max-w-md max-h-full">
        <!-- Modal content -->
        <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <!-- Modal header -->
          <div
            class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600"
          >
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Infomacion Perfil</h3>
            <button
              @click="SolicitanteModal()"
              type="button"
              class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm h-8 w-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              data-modal-toggle="select-modal"
            >
              <svg
                class="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span class="sr-only">Close modal</span>
            </button>
          </div>
          <!-- Modal body -->
          <div class="p-4 md:p-5">
            <div class="bg-white overflow-hidden shadow rounded-lg border">
              <div class="px-4 py-5 sm:px-6">
                <h3 class="text-lg leading-6 font-medium text-gray-900">Perfil Solicitante</h3>
                <p class="mt-1 max-w-2xl text-sm text-gray-500">
                  información sobre el Solicitante.
                </p>
              </div>
              <div class="border-t border-gray-200 px-4 py-5 sm:p-0">
                <dl class="sm:divide-y sm:divide-gray-200">
                  <div class="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt class="text-sm font-medium text-gray-500">Nombre</dt>
                    <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {{ solicitante.nombre }}
                    </dd>
                  </div>
                  <div class="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt class="text-sm font-medium text-gray-500">Email</dt>
                    <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {{ solicitante.email }}
                    </dd>
                  </div>
                  <div class="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt class="text-sm font-medium text-gray-500">Celular</dt>
                    <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {{ solicitante.celular }}
                    </dd>
                  </div>
                  <div class="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt class="text-sm font-medium text-gray-500">Tipo de Solicitante</dt>
                    <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {{ solicitante.TipoSolicitante }}
                    </dd>
                  </div>
                </dl>
              </div>
              <hr class="border-t-2 border-dashed border-gray-400 my-4" />
              <div class="px-4 py-5 sm:px-6">
                <h3 class="text-lg leading-6 font-medium text-gray-900">Descripcion</h3>
                <p class="mt-1 max-w-2xl text-sm text-gray-500">Descripcion Solicitud.</p>
              </div>
              <div class="border-t border-gray-200 px-4 py-5 sm:p-0">
                <dl class="sm:divide-y sm:divide-gray-200">
                  <div class="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt class="text-sm font-medium text-gray-500">Estudiantes Implicados</dt>
                    <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {{ solicitante.estu_implicados }}
                    </dd>
                  </div>
                  <div class="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt class="text-sm font-medium text-gray-500">Numero de estudiantes</dt>
                    <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {{ solicitante.numEstu_implicados }}
                    </dd>
                  </div>
                  <div class="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt class="text-sm font-medium text-gray-500">Pais</dt>
                    <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {{ solicitante.pais }}
                    </dd>
                  </div>
                  <div class="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt class="text-sm font-medium text-gray-500">Ciudad</dt>
                    <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {{ solicitante.ciudad }}
                    </dd>
                  </div>
                  <div class="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt class="text-sm font-medium text-gray-500">Evento</dt>
                    <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {{ solicitante.evento }}
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div
      v-if="isModalOpenEliminar"
      id="crud-modal"
      tabindex="-1"
      aria-hidden="true"
      class="fixed inset-0 z-50 flex justify-center items-center w-full h-full overflow-y-auto overflow-x-hidden"
    >
      <div class="relative p-4 w-full max-w-md h-full md:h-auto">
        <!-- Modal content -->
        <div class="relative p-4 text-center bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
          <button
            @click="toggleModaEliminar"
            type="button"
            class="text-gray-400 absolute top-2.5 right-2.5 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
            data-modal-toggle="deleteModal"
          >
            <svg
              aria-hidden="true"
              class="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clip-rule="evenodd"
              ></path>
            </svg>
            <span class="sr-only">Close modal</span>
          </button>
          <svg
            class="text-gray-400 dark:text-gray-500 w-11 h-11 mb-3.5 mx-auto"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
              clip-rule="evenodd"
            ></path>
          </svg>
          <p class="mb-4 text-gray-500 dark:text-gray-300">
            Are you sure you want to delete this item?
          </p>
          <div class="flex justify-center items-center space-x-4">
            <button
              @click="toggleModaEliminar"
              data-modal-toggle="deleteModal"
              type="button"
              class="py-2 px-3 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
            >
              No, cancel
            </button>
            <button
              type="submit"
              class="py-2 px-3 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-900"
              @click="EliminarSolicitud()"
            >
              Si, Eliminar
            </button>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
<script setup lang="ts">
import { ref, type Ref, onMounted } from 'vue'
import AgregarLink from '@/components/modules/AgregarLink.vue'
import BreadCrumb from '@/components/BreadCrumb.vue'
import BotonEditar from '@/components/botones/BotonEditar.vue'
import BotonEliminar from '@/components/botones/BotonEliminar.vue'
import BotonVer from '@/components/botones/BotonVer.vue'
import SolicitudService from '@/modules/solicitud/services'
import SesionService from '@/modules/sesion/services'

onMounted(() => {
  cargarSesiones()
})

const idSesionSeleccionada = ref<number | null>(null)
const existenSesiones = ref(false)
const existenSolicitudes = ref(false)
const Seleccionado = ref(false)
let sesiones: Ref<Sesiones[]> = ref([])
interface Sesiones {
  IDSESION: number
  LUGAR: string
  FECHA: string
  HORAINICIO: string
  HORAFINAL: string
}

const cargarSesiones = async () => {
  const respuesta = await SolicitudService.Seciones()
  if (respuesta.status == 200) {
    existenSesiones.value = true
    sesiones.value = Array.isArray(respuesta.data) ? respuesta.data : [respuesta.data]
    const primeraSesion = sesiones.value[0].IDSESION
    idSesionSeleccionada.value = primeraSesion
    CargarSolicitudes()
  } else if (respuesta.status == 404) {
    existenSesiones.value = false
    console.log(respuesta.error.message)
  } else {
    console.log(respuesta.error.error)
  }
}

// Llamar a 'cargarDatos' cuando el componente se monta

interface Solicitudes {
  IDSOLICITUD: number
  DEPENDENCIA: string
  ASUNTO: string
  DESICION: string
  SOLICITANTE_IDSOLICITANTE: number
  FECHADESOLICITUD: string
  NOMBRE: string
  TIPODESOLICITANTE: string
  EMAIL: string
  CELULAR: string
  ESTU_IMPLICADOS: string
  NUM_ESTU_IMPLICADOS: string
  CIUDAD_IMPLICADA: string
  PAIS_IMPLICADO: string
  EVENTO: string
}

let solicitudes: Ref<Solicitudes[]> = ref([])
const CargarSolicitudes = async () => {
  if (idSesionSeleccionada.value) {
    const respuesta = await SesionService.solicitudes(idSesionSeleccionada.value)
    if (respuesta.status == 200) {
      solicitudes.value = Array.isArray(respuesta.data) ? respuesta.data : [respuesta.data]

      existenSolicitudes.value = true
      Seleccionado.value = true
    } else if (respuesta.status == 404) {
      console.log(respuesta.error.message)
      solicitudes.value = []
      Seleccionado.value = true
      existenSolicitudes.value = false
    } else {
      console.log(respuesta.error.error)
    }
  }
}

function obtenerSolicitudPorId(id: number): Solicitudes | null {
  return solicitudes.value.find((solicitud) => solicitud.SOLICITANTE_IDSOLICITANTE === id) || null
}

const solicitante: Ref<{
  nombre: string
  email: string
  celular: string
  TipoSolicitante: string
  estu_implicados: string
  numEstu_implicados: string
  ciudad: string
  pais: string
  evento: string
}> = ref({
  nombre: '',
  email: '',
  celular: '',
  TipoSolicitante: '',
  estu_implicados: '',
  numEstu_implicados: '',
  ciudad: '',
  pais: '',
  evento: ''
})
const DetallesSolicitud = (id: number) => {
  let datosDetalle = obtenerSolicitudPorId(id)
  console.log('detalles ' + datosDetalle)
  solicitante.value.nombre = datosDetalle?.NOMBRE || ''
  solicitante.value.email = datosDetalle?.EMAIL || ''
  solicitante.value.celular = datosDetalle?.CELULAR || ''
  solicitante.value.TipoSolicitante = datosDetalle?.TIPODESOLICITANTE || ''
  solicitante.value.estu_implicados = datosDetalle?.ESTU_IMPLICADOS || ''
  solicitante.value.numEstu_implicados = datosDetalle?.NUM_ESTU_IMPLICADOS || ''
  solicitante.value.ciudad = datosDetalle?.CIUDAD_IMPLICADA || ''
  solicitante.value.pais = datosDetalle?.PAIS_IMPLICADO || ''
  solicitante.value.evento = datosDetalle?.EVENTO || ''
}

const Solicitante = ref(false)
const SolicitanteModal = () => {
  Solicitante.value = !Solicitante.value
}
const IDSolicitante = (id: number) => {
  SolicitanteModal()
  DetallesSolicitud(id)
}

const IdSolicitud: Ref<{ id: string }> = ref({
  id: ''
})

const idSelecionado = (id: Number) => {
  IdSolicitud.value.id = String(id)
}

const SeleccionarSolicitudEliminar = (id: number) => {
  toggleModaEliminar()
  idSelecionado(id)
}

const isModalOpenEliminar = ref(false)
const toggleModaEliminar = () => {
  isModalOpenEliminar.value = !isModalOpenEliminar.value
}

const EliminarSolicitud = async () => {
  let idSolicitud = Number(IdSolicitud.value.id)
  const respuesta = await SolicitudService.EliminarSolicitud(idSolicitud)
  if (respuesta.status == 200) {
    toggleModaEliminar()
    alert(respuesta.data.message)
    cargarSesiones()
    IdSolicitud.value.id = ''
  } else if (respuesta.status == 400) {
    alert(respuesta.error.message)
  } else if (respuesta.status == 409) {
    alert(respuesta.error.message)
  } else if (respuesta.status == 500) {
    alert(respuesta.error.message)
  }
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
