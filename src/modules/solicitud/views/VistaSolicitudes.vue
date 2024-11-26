<template>
    <main class="h-full overflow-y-auto">
      <div class="container px-6 mx-auto grid">
        <!--  -->
        <!-- titulo -->
        <h1 class="mb-1 text-4xl font-bold dark:text-gray">Gestion Solicitudes</h1>
        <BreadCrumb
    :breadcrumbs="[
      { name: 'Solicitantes', url: '' },
      { name: 'Sesión', url: '' },
      { name: 'Solicitudes', url: '' }
    ]"
  />
        <div class="grid grid-cols-2 my-6 font-bold dark:text-gray">
          <div class="flex items-center">
            <h2 class="mb-1 text-4xl font-bold dark:text-gray">Listado de Solicitudes</h2>
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
        <div class="solicitante-view">
    <!-- Sección del Solicitante -->
    <div class="solicitante-info">
      <h2>{{ NOMBRE }} ({{ TIPODESOLICITANTE }})</h2>
      <p><strong>Identificación:</strong> {{ IDENTIFICACION }}</p>
    </div>

    <!-- Sección de Sesión -->
    <div class="sesion-info">
      <h3>Sesión</h3>
      <p><strong>Lugar:</strong> {{ LUGAR }}</p>
      <p><strong>Fecha:</strong> {{ FECHA }}</p>
      <p><strong>Estado:</strong> {{ ESTADO }}</p>
      <p><strong>Acta No:</strong> {{ NUM_ACTAS }}</p>
    </div>
       
        
      </div>
      <AgregarLink
          titulo="Solicitudes"
          ruta=""
          accion=""
          :visible="false"
        ></AgregarLink>
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
                  v-for="solicitudes in solictud"
                  :key="solicitudes.DESCRIPCION_IDDESCRIPCION"
                >
                  <td class="px-4 py-3 border-b border-gray-300 dark:border-gray-700">
                    <div class="flex items-center text-sm">
                      <!-- Avatar with inset shadow -->
                      <div class="relative hidden w-8 h-8 mr-3 rounded-full md:block">
                        <div
                          class="absolute inset-0 rounded-full shadow-inner flex items-center justify-center"
                          aria-hidden="true"
                        >
                          <p class="font-semibold">{{ solicitudes.DESCRIPCION_IDDESCRIPCION }}</p>
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
                    {{ solicitudes.DECISION }}
                  </td>
                  <td class="px-4 py-3 text-sm">
                    {{ solicitudes.FECHADESOLICITUD }}
                  </td>
  
                  <td class="px-4 py-3 text-sm">
                    <div class="flex">
                      <BotonVer
                        :ruta="``"
                        :titulo="'Ver Solicitante'"
                        @click="IDdetalles(solicitudes.DESCRIPCION_IDDESCRIPCION,solicitudes)"
                      ></BotonVer>                      
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
       
        </div>
      </div>
     
    </div>

    </main>

    <div v-if="descripcionSeleccionada" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
  <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 max-w-xl w-full">
    <h3 class="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Detalles de la Solicitud</h3>
    <div class="border-b border-gray-200 dark:border-gray-700 mb-4"></div>
    <!-- Información General -->
    <div class="mb-4">
      <h4 class="text-lg font-bold text-gray-800 dark:text-gray-200">Sesión</h4>
      <p class="text-sm text-gray-700 dark:text-gray-400"><strong>Lugar:</strong> {{ LUGAR }}</p>
      <p class="text-sm text-gray-700 dark:text-gray-400"><strong>Fecha:</strong> {{ FECHA }}</p>
      <p class="text-sm text-gray-700 dark:text-gray-400"><strong>Estado:</strong> {{ ESTADO }}</p>
      <p class="text-sm text-gray-700 dark:text-gray-400"><strong>Acta No:</strong> {{ NUM_ACTAS }}</p>
    </div>

    <!-- Información del Solicitante -->
    <div class="mb-4">
      <h4 class="text-lg font-bold text-gray-800 dark:text-gray-200">Solicitante</h4>
      <p class="text-sm text-gray-700 dark:text-gray-400"><strong>Nombre:</strong> {{ NOMBRE }}</p>
      <p class="text-sm text-gray-700 dark:text-gray-400"><strong>Identificación:</strong> {{ IDENTIFICACION }}</p>
      <p class="text-sm text-gray-700 dark:text-gray-400"><strong>Tipo:</strong> {{ TIPODESOLICITANTE }}</p>
    </div>

    <!-- Información de la Solicitud -->
    <div class="mb-4">
      <h4 class="text-lg font-bold text-gray-800 dark:text-gray-200">Solicitud</h4>
      <p class="text-sm text-gray-700 dark:text-gray-400"><strong>Asunto:</strong> {{ Solicitud.ASUNTO }}</p>
      <p class="text-sm text-gray-700 dark:text-gray-400"><strong>Dependencia:</strong> {{ Solicitud.DEPENDENCIA }}</p>
      <p class="text-sm text-gray-700 dark:text-gray-400"><strong>Fecha:</strong> {{ Solicitud.FECHADESOLICITUD }}</p>
      <p class="text-sm text-gray-700 dark:text-gray-400"><strong>Decisión:</strong> {{ Solicitud.DECISION }}</p>
    </div>

    <!-- Descripción del Evento -->
    <div>
      <h4 class="text-lg font-bold text-gray-800 dark:text-gray-200">Descripción del Evento</h4>
      <p class="text-sm text-gray-700 dark:text-gray-400"><strong>Evento:</strong> {{ detallesSolicitud.EVENTO }}</p>
      <p class="text-sm text-gray-700 dark:text-gray-400"><strong>Estudiantes Implicados:</strong> {{ detallesSolicitud.ESTU_IMPLICADOS }}</p>
      <p class="text-sm text-gray-700 dark:text-gray-400"><strong>Número de Estudiantes:</strong> {{ detallesSolicitud.NUM_ESTU_IMPLICADOS }}</p>
      <p class="text-sm text-gray-700 dark:text-gray-400"><strong>Docentes Implicados:</strong> {{ detallesSolicitud.DOCEN_IMPLICADOS }}</p>
      <p class="text-sm text-gray-700 dark:text-gray-400"><strong>Número de Docentes:</strong> {{ detallesSolicitud.NUM_DOCEN_IMPLICADOS }}</p>
      <p class="text-sm text-gray-700 dark:text-gray-400"><strong>País:</strong> {{ detallesSolicitud.PAIS_IMPLICADO }}</p>
      <p class="text-sm text-gray-700 dark:text-gray-400"><strong>Ciudad:</strong> {{ detallesSolicitud.CIUDAD_IMPLICADA }}</p>
    </div>

    <div class="mt-6 flex justify-end">
      <button
        class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        @click="cerrarModal()"
      >
        Cerrar
      </button>
    </div>
  </div>
</div>

  
  </template>
  <script setup lang="ts">
  import { ref, type Ref, onMounted } from 'vue'
  import AgregarLink from '@/components/modules/AgregarLink.vue'
  import BreadCrumb from '@/components/modules/BreadCrumb.vue'
  import BotonVer from '@/components/botones/BotonVer.vue'
  import SolicitudService from '@/modules/solicitud/services'
  import { useRoute } from 'vue-router'
const route = useRoute()
const idSesion = ref<number | null>(null)
  const idSolicitante = ref<number | null>(null)
onMounted(() => {
  let idsesion = route.params.idSesion
  let valor = Number(idsesion)
  idSesion.value = valor
  let id = route.params.idSolicitante
  let valor2 = Number(id)
  idSolicitante.value = valor2
  CargarSolicitudes()
})
  



  
  // Llamar a 'cargarDatos' cuando el componente se monta
  

  const CargarSolicitudes = async () => {
    let IDSesion  = Number(idSesion.value)
    let IDSolicitante = Number(idSolicitante.value)
    if (IDSesion !== null || IDSolicitante !== null) {
      const respuesta = await SolicitudService.solicitudesSesionSolicitante(IDSesion,IDSolicitante)
      if (respuesta.status == 200) {
        IDSOLICITANTE.value = respuesta.data.IDSOLICITANTE
        NOMBRE.value = respuesta.data.NOMBRE
        IDENTIFICACION.value = respuesta.data.IDENTIFICACION
        TIPODESOLICITANTE.value = respuesta.data.TIPODESOLICITANTE

        IDSESION.value = respuesta.data.IDSESION
        LUGAR.value = respuesta.data.LUGAR
        FECHA.value = respuesta.data.FECHA
        NUM_ACTAS.value = respuesta.data.NUM_ACTAS
        ESTADO.value = respuesta.data.ESTADO
        solictud.value = respuesta.data.SOLICITUD
        descripcion.value = respuesta.data.DESCRIPCION
      } else if (respuesta.status == 404) {
        console.log(respuesta.error.message)
        
      } else {
        console.log(respuesta.error.error)
      }
    }
  }

  const cerrarModal = () => {
    descripcionSeleccionada.value = !descripcionSeleccionada.value
  }
  const IDdetalles = (id: number,soliitud:Solictud) => {
    cerrarModal()
    DetallesSolicitud(id)
    SolicitudSelecionado(soliitud)
  }
 const descripcionSeleccionada = ref (false)
  //solicitante
 const IDSOLICITANTE = ref<string | null>('')
 const NOMBRE = ref<string | null>('')
 const IDENTIFICACION = ref<string | null>('')
 const TIPODESOLICITANTE = ref<string | null>('')
// sesion
  const IDSESION = ref<string | null>('')
  const LUGAR = ref<string | null>('')
  const FECHA = ref<string | null>('')
  //const HORAINICIO = ref<string | null>('')
  //const HORAFINAL = ref<string | null>('')
  const NUM_ACTAS = ref<string | null>('')
  const ESTADO = ref<string | null>('')
   
     
    interface Solictud {
    DESCRIPCION_IDDESCRIPCION: number
    ASUNTO: string
    DEPENDENCIA:string
    FECHADESOLICITUD: string
    DECISION: string
  }
  
  let solictud: Ref<Solictud[]> = ref([])

  interface Descripcion {
   ID_DESCRIPCION: number,
      EVENTO: string,
      ESTU_IMPLICADOS: string,
      NUM_ESTU_IMPLICADOS: string,
      DOCEN_IMPLICADOS:  string,
      NUM_DOCEN_IMPLICADOS:  string,
      PAIS_IMPLICADO:  string,
      CIUDAD_IMPLICADA: string
  }
  let descripcion: Ref<Descripcion[]> = ref([])


// Función para obtener una solicitud por ID
function obtenerSolicitudPorId(id: number): Descripcion | null {
  return descripcion.value.find((desc) => desc.ID_DESCRIPCION === id) || null;
}

const detallesSolicitud = ref({
  EVENTO: '',
  ESTU_IMPLICADOS: '',
  NUM_ESTU_IMPLICADOS: '',
  PAIS_IMPLICADO: '',
  DOCEN_IMPLICADOS:'',
  NUM_DOCEN_IMPLICADOS:'',
  CIUDAD_IMPLICADA: ''
});

const DetallesSolicitud = (id: number) => {
  let datosDetalle = obtenerSolicitudPorId(id);
  console.log('Detalles:', datosDetalle);

  if (datosDetalle) {
    detallesSolicitud.value.EVENTO = datosDetalle.EVENTO || '';
    detallesSolicitud.value.ESTU_IMPLICADOS = datosDetalle.ESTU_IMPLICADOS || '';
    detallesSolicitud.value.NUM_ESTU_IMPLICADOS = datosDetalle.NUM_ESTU_IMPLICADOS || '';
    detallesSolicitud.value.DOCEN_IMPLICADOS = datosDetalle.DOCEN_IMPLICADOS || '';
    detallesSolicitud.value.NUM_DOCEN_IMPLICADOS = datosDetalle.NUM_DOCEN_IMPLICADOS || '';
    detallesSolicitud.value.CIUDAD_IMPLICADA = datosDetalle.CIUDAD_IMPLICADA || '';
    detallesSolicitud.value.PAIS_IMPLICADO = datosDetalle.PAIS_IMPLICADO || '';
  } else {
    console.error(`No se encontró ninguna solicitud con el ID: ${id}`);
  }
};


const Solicitud = ref({
    DESCRIPCION_IDDESCRIPCION: '',
    ASUNTO: '',
    DEPENDENCIA:'',
    FECHADESOLICITUD:'',
    DECISION: '',
});



const SolicitudSelecionado = (soliitud:Solictud) => {
  if (soliitud) {
    Solicitud.value.ASUNTO = soliitud.ASUNTO || '';
    Solicitud.value.DEPENDENCIA = soliitud.DEPENDENCIA || '';
    Solicitud.value.FECHADESOLICITUD = soliitud.FECHADESOLICITUD || '';
    Solicitud.value.DECISION = soliitud.DECISION || '';
  } else {
    console.error(`No se encontró ninguna solicitud`);
  }
};
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