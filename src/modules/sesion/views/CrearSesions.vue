<template>
  <form @submit.prevent="proponerFecha">
    <div class="grid gap-6 mb-6 md:grid-cols-2">
      <div>
        <label for="LUGAR" class="block mb-2 text-sm font-medium text-gray-900">LUGAR</label>
        <input
          type="varchar"
          id="LUGAR"
          v-model="lugar"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="LUGAR"
          required
        />
      </div>
      <div>
        <label for="FECHA" class="block mb-2 text-sm font-medium text-gray-900">FECHA</label>
        <input
          type="date"
          id="date"
          v-model="fechaSeleccionada"
          :min="fechaMinima"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="FECHA"
          required
        />
      </div>
      <div>
        <label for="HORAINICIO" class="block mb-2 text-sm font-medium text-gray-900"
          >HORA INICIO</label
        >
        <input
          type="time"
          id="HORAINICIO"
          v-model="horaInicio"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="HORA INICIO"
          required
        />
      </div>
      <div>
        <label for="HORAFINAL" class="block mb-2 text-sm font-medium text-gray-900"
          >HORA FINAL</label
        >
        <input
          type="time"
          id="HORAFINAL"
          v-model="horaFinal"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="HORA FINAL"
          required
        />
      </div>
      <div>
        <label for="PRESIDENTE" class="block mb-2 text-sm font-medium text-gray-900"
          >PRESIDENTE</label
        >
        <input
          type="varchar"
          id="PRESIDENTE"
          v-model="presidente"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="PRESIDENTE"
          required
        />
      </div>
      <div>
        <label for="SECRETARIO" class="block mb-2 text-sm font-medium text-gray-900"
          >SECRETARIO</label
        >
        <input
          type="varchar"
          id="SECRETARIO"
          v-model="secretario"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="SECRETARIO"
          required
        />
      </div>
    </div>

    <button
      type="submit"
      class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
    >
      Submit
    </button>
    <button
      type="button"
      @click="cancelar"
      class="text-gray-500 bg-gray-300 hover:bg-gray-400 focus:ring-4 focus:outline-none focus:ring-gray-200 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center mt-2"
    >
      Cancelar
    </button>
  </form>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import SesionService from '@/modules/sesion/services'

let fechaSeleccionada = ref('')
let fechaMinima = ref('')
let idSesion = ref('')
let lugar = ref('')
let horaInicio = ref('')
let horaFinal = ref('')
let presidente = ref('')
let secretario = ref('')

// Función para obtener la última fecha y calcular la fecha mínima
const obtenerUltimaFecha = async () => {
  const respuesta = await SesionService.ProponerFecha()
  if (respuesta.status === 200) {
    console.log(respuesta.data.ultimaFecha)
    const ultimaFecha = new Date(respuesta.data.ultimaFecha)
    const diasMinimos = respuesta.data.diasMinimos
    console.log(ultimaFecha)
    // Calcula la fecha mínima permitida
    ultimaFecha.setDate(ultimaFecha.getDate() + diasMinimos + 1)
    // Formatea la fecha en formato YYYY-MM-DD
    fechaMinima.value = ultimaFecha.toISOString().split('T')[0]
    console.log(fechaMinima.value)
  } else {
    console.error(respuesta.error)
  }
}

// Llama a la función para obtener la última fecha cuando inicias el componente
onMounted(() => {
  obtenerUltimaFecha()
})
function formatTime(time: any): string {
  // Si time es null o undefined, puedes devolver un valor por defecto
  if (time == null) {
    return '00:00' // Valor por defecto
  }

  // Aquí va tu lógica para formatear el tiempo
  return time // Asegúrate de que esto sea un string
}

const proponerFecha = async () => {
  if (fechaSeleccionada.value && new Date(fechaSeleccionada.value) >= new Date(fechaMinima.value)) {
    // Crea un objeto con los datos capturados

    if (horaInicio.value && horaFinal.value) {
      if (secretario.value == '' || presidente.value == '') {
        alert('campos vacios')
      } else {
        let LUGAR = lugar.value
        let FECHA = fechaSeleccionada.value
        let PRESIDENTE = presidente.value
        let SECRETARIO = secretario.value
        let HORAINICIO: string = formatTime(horaInicio.value ?? '00:00')
        let HORAFINAL: string = formatTime(horaFinal.value ?? '00:00')
        const respuesta = await SesionService.InsertarSesion(
          LUGAR,
          FECHA,
          HORAINICIO,
          HORAFINAL,
          PRESIDENTE,
          SECRETARIO
        )
        if (respuesta.status == 201) {
          console.log(respuesta.data.message)
          let datos = respuesta.data.message

          alert(datos)
          cancelar()
          obtenerUltimaFecha()
        } else if (respuesta.status == 400) {
          alert(respuesta.error.message)
        } else if (respuesta.status == 500) {
          alert(respuesta.error.message)
        }
      }
    } else {
      alert('El ID de sesión es nulo')
    }
  } else {
    alert('Por favor, selecciona una fecha válida que cumpla con las restricciones.')
  }
}

const cancelar = () => {
  idSesion.value = ''
  lugar.value = ''
  fechaSeleccionada.value = ''
  horaInicio.value = ''
  horaFinal.value = ''
  presidente.value = ''
  secretario.value = ''
}
</script>
