<template>
  <div v-if="existeSolicitud == false">
    <h1>La solicitud no existe</h1>
  </div>
  <div v-else>
    <p class="text-xl font-semibold text-blue-600/100 dark:text-blue-500/100">
      Actualizar Solicitud
    </p>

    <form>
      <div class="grid gap-6 mb-6 md:grid-cols-2">
        <div>
          <label for="DEPENDENCIA" class="block mb-2 text-sm font-medium text-gray-900"
            >DEPENDENCIA</label
          >
          <input
            v-model="DatosSolicitud.DEPENDENCIA"
            type="varchar"
            id="DEPENDENCIA"
            @input="DatosSolicitud.DEPENDENCIA = DatosSolicitud.DEPENDENCIA.toUpperCase()"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="DEPENDENCIA"
            required
          />
        </div>
        <div>
          <label for="ASUNTO" class="block mb-2 text-sm font-medium text-gray-900">ASUNTO</label>
          <input
            v-model="DatosSolicitud.ASUNTO"
            type="varchar"
            id="varchar"
            @input="DatosSolicitud.ASUNTO = DatosSolicitud.ASUNTO.toUpperCase()"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="ASUNTO"
            required
          />
        </div>

        <div>
          <label for="small" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >Selecione la Sesion</label
          >
          <p>Sesion Actual: {{ DatosSolicitud.LUGAR + ' | ' + DatosSolicitud.FECHA }}</p>
          <select
            v-model="idSesionSeleccionada"
            v-if="existenSesiones == true"
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

        <div>
          <label for="small" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >Selecione la Descripcion</label
          >
          <p>
            Descripcion Actual:
            {{
              DatosSolicitud.EVENTO +
              ' | ' +
              DatosSolicitud.PAIS_IMPLICADO +
              ' | ' +
              DatosSolicitud.CIUDAD_IMPLICADA
            }}
          </p>
          <select
            v-model="idDescripcionSeleccionada"
            v-if="existenDescepciones"
            id="default"
            class="bg-gray-50 border border-gray-300 text-gray-900 mb-6 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option selected disabled>Seleccione una Descripcion</option>
            <option
              v-for="descripcion in descripciones"
              :key="descripcion.ID_DESCRIPCION"
              :value="descripcion.ID_DESCRIPCION"
            >
              {{
                descripcion.EVENTO +
                ' | ' +
                descripcion.PAIS_IMPLICADO +
                ' | ' +
                descripcion.CIUDAD_IMPLICADA
              }}
            </option>
          </select>
          <p v-else>No existen Descripciones.</p>
        </div>
      </div>

      <button
        type="button"
        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        @click="ActualizarSolicitud()"
      >
        actualizar
      </button>
      <button
        @click="cargarDatos()"
        class="text-gray-700 bg-gray-300 hover:bg-gray-400 focus:outline-none focus:ring-4 focus:ring-gray-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-500"
      >
        Cancelar
      </button>
    </form>
  </div>
</template>
<script setup lang="ts">
import { ref, type Ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import SolicitudesServises from '@/modules/solicitud/services'
import SolicitudService from '@/modules/solicitud/services'
const route = useRoute()
const IDSolicitud = ref<number | null>(null)
const existeSolicitud = ref(false)
onMounted(() => {
  let id = route.params.idSolicitud
  let valor = Number(id)
  IDSolicitud.value = valor
  if (IDSolicitud.value != null) {
    cargarDatos()
  }
})

function cargarDatos() {
  cargarSolicitantes()
  cargarSesiones()
  cargarDescripciones()
  SolicituSelecionada()
}

const DatosSolicitud = ref({
  IDSOLICITUD: null,
  DEPENDENCIA: '',
  ASUNTO: '',
  ID_DESCRIPCION: null,
  EVENTO: '',
  PAIS_IMPLICADO: '',
  CIUDAD_IMPLICADA: '',
  IDSESION: null,
  LUGAR: '',
  FECHA: '',
  IDSOLICITANTE: null,
  NOMBRE: '',
  TIPODESOLICITANTE: ''
})

const idSolicitanteSeleccionado = ref<number | null>(null)
const idSesionSeleccionada = ref<number | null>(null)
const idDescripcionSeleccionada = ref<number | null>(null)

const idSolicitanteInicial = ref<number | null>(null)
const idSesionSelecInicial = ref<number | null>(null)
const idDescripcionInicial = ref<number | null>(null)
const DatosIniciales = ref({ ...DatosSolicitud.value })
const SolicituSelecionada = async () => {
  let idSolicitud = IDSolicitud.value || null
  if (idSolicitud) {
    const respuesta = await SolicitudesServises.SolicitudSelecionada(idSolicitud)

    if (respuesta.status == 200) {
      existeSolicitud.value = true
      DatosSolicitud.value = respuesta.data[0]
      idSolicitanteSeleccionado.value = DatosSolicitud.value.IDSOLICITANTE
      idSesionSeleccionada.value = DatosSolicitud.value.IDSESION
      idDescripcionSeleccionada.value = DatosSolicitud.value.ID_DESCRIPCION
      idSolicitanteInicial.value = DatosSolicitud.value.IDSOLICITANTE
      idSesionSelecInicial.value = DatosSolicitud.value.IDSESION
      idDescripcionInicial.value = DatosSolicitud.value.ID_DESCRIPCION
      DatosIniciales.value = JSON.parse(JSON.stringify(DatosSolicitud.value))
    } else if (respuesta.status == 404) {
      alert(respuesta.error.message)
      existeSolicitud.value = false
    } else if (respuesta.status == 500) {
      alert(respuesta.error.message)
    }
  }
}
///

const existenSolicitantes = ref(false)
let solicitantes: Ref<Solicitantes[]> = ref([])
interface Solicitantes {
  IDSOLICITANTE: number
  NOMBRE: string
  EMAIL: string
  TIPODESOLICITANTE: string
}
const existenSesiones = ref(false)
let sesiones: Ref<Sesiones[]> = ref([])
interface Sesiones {
  IDSESION: number
  LUGAR: string
  FECHA: string
  HORAINICIO: string
  HORAFINAL: string
}
const existenDescepciones = ref(false)
let descripciones: Ref<Descriciones[]> = ref([])
interface Descriciones {
  ID_DESCRIPCION: number
  EVENTO: string
  PAIS_IMPLICADO: string
  CIUDAD_IMPLICADA: string
}

const cargarSolicitantes = async () => {
  const respuesta = await SolicitudService.Solicitantes()
  if (respuesta.status == 200) {
    existenSolicitantes.value = true
    solicitantes.value = Array.isArray(respuesta.data) ? respuesta.data : [respuesta.data]
  } else if (respuesta.status == 404) {
    existenSolicitantes.value = false
    console.log(respuesta.error.message)
  } else {
    console.log(respuesta.error.error)
  }
}

const cargarSesiones = async () => {
  const respuesta = await SolicitudService.Seciones()
  if (respuesta.status == 200) {
    existenSesiones.value = true
    sesiones.value = Array.isArray(respuesta.data) ? respuesta.data : [respuesta.data]
  } else if (respuesta.status == 404) {
    existenSesiones.value = false
    console.log(respuesta.error.message)
  } else {
    console.log(respuesta.error.error)
  }
}

const cargarDescripciones = async () => {
  const respuesta = await SolicitudService.Descripciones()
  if (respuesta.status == 200) {
    descripciones.value = Array.isArray(respuesta.data) ? respuesta.data : [respuesta.data]

    existenDescepciones.value = true
  } else if (respuesta.status == 404) {
    console.log(respuesta.error.message)
    existenDescepciones.value = false
  } else {
    console.log(respuesta.error.error)
  }
}

const hayCambios = () => {
  if (
    DatosIniciales.value.DEPENDENCIA == DatosSolicitud.value.DEPENDENCIA &&
    DatosIniciales.value.ASUNTO == DatosSolicitud.value.ASUNTO &&
    idDescripcionInicial.value == idDescripcionSeleccionada.value &&
    idSesionSelecInicial.value == idSesionSeleccionada.value &&
    idSolicitanteInicial.value == idSolicitanteSeleccionado.value
  ) {
    return false
  } else {
    return true
  }
}

// Función para actualizar la solicitud
const ActualizarSolicitud = async () => {
  if (hayCambios() == false) {
    alert('No se realizaron cambios en los datos.')
    return
  }
  if (
    idSolicitanteSeleccionado.value === null ||
    idSesionSeleccionada.value === null ||
    idDescripcionSeleccionada.value === null ||
    DatosSolicitud.value.IDSOLICITUD == null
  ) {
    alert('Por favor, selecciona un solicitante, una sesión y una descripción válidos.')
    return
  }

  let DEPENDENCIA = DatosSolicitud.value.DEPENDENCIA
  let ASUNTO = DatosSolicitud.value.ASUNTO
  let ID_SOLICITANTE = idSolicitanteSeleccionado.value
  let ID_SESION = idSesionSeleccionada.value
  let ID_DESCRIPCION = idDescripcionSeleccionada.value
  let ID_SOLICITUD = DatosSolicitud.value.IDSOLICITUD

  try {
    let respuesta = await SolicitudService.ActualizarSolicitud(
      DEPENDENCIA,
      ASUNTO,
      ID_SOLICITANTE,
      ID_SESION,
      ID_DESCRIPCION,
      ID_SOLICITUD
    )
    if (respuesta.status == 201) {
      alert(respuesta.data.message)
      cargarDatos()
    } else if (respuesta.status == 400) {
      alert(respuesta.error.message)
    } else if (respuesta.status == 500) {
      alert(respuesta.error.message)
    }
  } catch (error) {
    console.error('Error al registrar la solicitud:', error)
    alert('Ocurrió un error al registrar la solicitud.')
  }
}
</script>
