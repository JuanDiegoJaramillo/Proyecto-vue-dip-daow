<template>
  <form>
    <div class="grid gap-6 mb-6 md:grid-cols-2">
      <div>
        <label for="DEPENDENCIA" class="block mb-2 text-sm font-medium text-gray-900"
          >DEPENDENCIA</label
        >
        <input
          v-model="dependencia"
          type="varchar"
          id="DEPENDENCIA"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="DEPENDENCIA"
          required
        />
      </div>
      <div>
        <label for="ASUNTO" class="block mb-2 text-sm font-medium text-gray-900">ASUNTO</label>
        <input
          v-model="asunto"
          type="varchar"
          id="varchar"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="ASUNTO"
          required
        />
      </div>

      <div>
        <label for="small" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >Selecione el solicitante</label
        >
        <select
          v-model="idSolicitanteSeleccionado"
          v-if="existenSolicitantes"
          id="default"
          class="bg-gray-50 border border-gray-300 text-gray-900 mb-6 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          <option selected disabled>Seleccione un solicitante</option>
          <option
            v-for="solicitante in solicitantes"
            :key="solicitante.IDSOLICITANTE"
            :value="solicitante.IDSOLICITANTE"
          >
            {{ solicitante.NOMBRE + ' | ' + solicitante.TIPODESOLICITANTE }}
          </option>
        </select>
        <p v-else>No existen Solicitantes.</p>
      </div>

      <div>
        <label for="small" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >Selecione la Sesion</label
        >
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
      @click="RegistrarSolicitud"
    >
      Submit
    </button>
  </form>
</template>

<script setup lang="ts">
import { ref, type Ref, onMounted } from 'vue'
import SolicitudService from '@/modules/solicitud/services'
onMounted(() => {
  cargarSolicitantes()
  cargarSesiones()
  cargarDescripciones()
})
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
    console.log(solicitantes.value)
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
    console.log(solicitantes.value)
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
    console.log(solicitantes.value)
    existenDescepciones.value = true
  } else if (respuesta.status == 404) {
    console.log(respuesta.error.message)
    existenDescepciones.value = false
  } else {
    console.log(respuesta.error.error)
  }
}

const dependencia = ref<string>('')
const asunto = ref<string>('')
const idSolicitanteSeleccionado = ref<number | null>(null)
const idSesionSeleccionada = ref<number | null>(null)
const idDescripcionSeleccionada = ref<number | null>(null)

const RegistrarSolicitud = async () => {
  if (
    idSolicitanteSeleccionado.value === null ||
    idSesionSeleccionada.value === null ||
    idDescripcionSeleccionada.value === null
  ) {
    alert('Por favor, selecciona un solicitante, una sesión y una descripción válidos.')
    return
  }

  let DEPENDENCIA = dependencia.value
  let ASUNTO = asunto.value
  let ID_SOLICITANTE = idSolicitanteSeleccionado.value
  let ID_SESION = idSesionSeleccionada.value
  let ID_DESCRIPCION = idDescripcionSeleccionada.value

  //alert("DP: "+DEPENDENCIA +"| Asunto:"+ ASUNTO+"| Fecha:"+"| IDdes:" + ID_DESCRIPCION+"| IDso:" + ID_SOLICITANTE+"| idSE:" + ID_SESION)
  try {
    let respuesta = await SolicitudService.InsertarSolicitud(
      DEPENDENCIA,
      ASUNTO,
      ID_SOLICITANTE,
      ID_SESION,
      ID_DESCRIPCION
    )
    if (respuesta.status == 201) {
      alert(respuesta.data.message)
      limpiar()
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

function limpiar() {
  dependencia.value = ''
  asunto.value = ''
  idSolicitanteSeleccionado.value = null
  idSesionSeleccionada.value = null
  idDescripcionSeleccionada.value = null
}
</script>
