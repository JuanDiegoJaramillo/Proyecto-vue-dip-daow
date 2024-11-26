<template>
    <div class="flex flex-col h-screen bg-gray-100 dark:bg-gray-800">
      <!-- Encabezado -->
      <header class="bg-green-600 text-white text-center p-4 dark:bg-green-800">
        <h1 class="text-2xl font-bold">Reunión en Curso</h1>
        <p><strong>Lugar:</strong> {{ reunion.lugar }}</p>
        <p><strong>Fecha:</strong> {{ reunion.fecha }}</p>
        <p><strong>Duración:</strong> {{ reunion.horario }}</p>
      </header>
  
      <div class="flex flex-1 overflow-hidden">
        <!-- Lista de Tareas -->
        <aside class="w-1/4 bg-white border-r overflow-y-auto p-4 dark:bg-gray-700 dark:border-gray-600">
          <h2 class="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">Mis Tareas</h2>
          <ul class="space-y-3">
            <li
              v-for="tarea in tareas"
              :key="tarea.id"
              class="flex justify-between items-center p-3 bg-gray-100 rounded-lg shadow dark:bg-gray-600 dark:text-gray-200"
            >
              <span class="text-gray-700 dark:text-gray-300">{{ tarea.descripcion }}</span>
              <span
                class="text-sm font-medium px-2 py-1 rounded-full"
                :class="{
                  'bg-yellow-200 text-yellow-800': tarea.estado === 'Pendiente',
                  'bg-green-200 text-green-800': tarea.estado === 'En curso',
                  'bg-blue-200 text-blue-800': tarea.estado === 'Finalizado'
                }"
              >
                {{ tarea.estado }}
              </span>
            </li>
          </ul>
        </aside>
  
        <!-- Proposiciones -->
        <section class="flex-1 flex flex-col bg-gray-50 dark:bg-gray-900">
          <h2 class="text-lg font-semibold p-4 bg-white shadow dark:bg-gray-800 dark:text-gray-200">Proposiciones</h2>
  
          <!-- Chat -->
          <div class="flex-1 overflow-y-auto p-4 space-y-4">
            <div
              v-for="mensaje in mensajes"
              :key="mensaje.MIEMBRO_IDMIEMBRO"
              class="flex flex-col"
              :class="mensaje.MIEMBRO_IDMIEMBRO === idMiembro ? 'items-end' : 'items-start'"
            >
              <div
                class="p-3 rounded-lg shadow-md max-w-sm"
                :class="{
                  'bg-green-200 text-green-800': mensaje.MIEMBRO_IDMIEMBRO === idMiembro,
                  'bg-gray-200 text-gray-800': mensaje.MIEMBRO_IDMIEMBRO !== idMiembro,
                  'dark:bg-green-800 dark:text-green-200': mensaje.MIEMBRO_IDMIEMBRO === idMiembro,
                  'dark:bg-gray-600 dark:text-gray-200': mensaje.MIEMBRO_IDMIEMBRO !== idMiembro
                }"
              >
                <p class="text-sm font-semibold">{{ mensaje.autor }}</p>
                <p class="mt-1">{{ mensaje.DESCRIPCION }}</p>
                <small class="text-xs text-gray-500 block mt-2">{{ mensaje.FECHA }}</small>
              </div>
            </div>
          </div>
  
          <!-- Formulario para agregar proposición -->
          <div class="flex items-center space-x-4 p-4 bg-white border-t shadow dark:bg-gray-800">
            <textarea
              v-model="nuevaProposicion"
              class="flex-1 p-2 border rounded-lg focus:outline-none focus:ring focus:ring-green-300 dark:bg-gray-700 dark:text-gray-200"
              rows="2"
              placeholder="Escribe tu proposición..."
            ></textarea>
            <button
              @click="RegistrarProposiciones"
              class="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-500 dark:bg-green-700 dark:hover:bg-green-600"
            >
              Enviar
            </button>
          </div>
        </section>
      </div>
    </div>
  </template>

<script setup>
import { ref, onMounted } from 'vue'
import MiembroService from '@/modules/miembros/services'
import ProposicionService from '@/modules/proposiciones/services'

const idMiembro = ref(null)
const Nombre = ref(localStorage['nombre'] || '')
const token = localStorage.getItem('authToken') || '' // Recuperar el token del localStorage

const getIDMiembro = async () => {
  const respuesta = await MiembroService.getIMiembro()
  idMiembro.value = respuesta.data[0].IDMIEMBRO
}

const listarProposicionesSesion = async () => {
  const respuesta = await ProposicionService.listarProposicionesSesion(72)
  if (respuesta.status === 200) {
    mensajes.value = respuesta.data
  } else if (respuesta.status === 404) {
    console.log(respuesta.error.message)
  } else {
    console.log(respuesta.error.error)
  }
}
listarProposicionesSesion()
const RegistrarProposiciones = async () => {
  let IDSesion =72
  if (IDSesion !== null) {
    const respuesta = await ProposicionService.RegistrarProposiciones(nuevaProposicion.value, idMiembro.value, IDSesion)
    if (respuesta.status == 201) {
      console.log(respuesta)
      listarProposicionesSesion()
      nuevaProposicion.value = ''
    } else if (respuesta.status == 400) {
      alert(respuesta.error.message)
    } else if (respuesta.status == 409) {
      alert(respuesta.error.message)
    } else if (respuesta.status == 500) {
      alert(respuesta.error.message)
    }
  } else {
    alert('El ID de sesión es nulo')
  }
}
onMounted(() => {
  getIDMiembro()
  conectarSocket()
})

const reunion = ref({
  lugar: 'Sala Principal',
  fecha: '25 de Noviembre de 2024',
  horario: '10:00 AM - 12:00 PM'
})

const tareas = ref([
  { id: 1, descripcion: 'Preparar informe', estado: 'Pendiente' },
  { id: 2, descripcion: 'Revisar documento', estado: 'En curso' },
  { id: 3, descripcion: 'Enviar resumen', estado: 'Finalizado' }
])

const mensajes = ref([])
const nuevaProposicion = ref('')

// Conectar al servidor WebSocket
let socket = null
const conectarSocket = () => {
  socket = new WebSocket('ws://localhost:49152')

  socket.onopen = () => {
    console.log('Conectado al servidor WebSocket')

    // Enviar el token al conectar
    if (token) {
      socket.send(JSON.stringify({ type: 'auth', token }))
    }
  }

  socket.onmessage = (event) => {
    try {
      const data = JSON.parse(event.data)
      console.log('Mensaje recibido:', data)

      if (data.status === '201' && data.data) {
        const proposicion = data.data

        if (
          proposicion.ID_PROPOSICIONES &&
          proposicion.DESCRIPCION &&
          proposicion.FECHA &&
          proposicion.MIEMBRO_IDMIEMBRO
        ) {
          mensajes.value.push({
            ID_PROPOSICIONES: proposicion.ID_PROPOSICIONES,
            DESCRIPCION: proposicion.DESCRIPCION,
            FECHA: proposicion.FECHA,
            autor: proposicion.autor || 'Desconocido',
            MIEMBRO_IDMIEMBRO: proposicion.MIEMBRO_IDMIEMBRO,
          })
          console.log('Proposición añadida:', proposicion)
        } else {
          console.warn('Proposición incompleta recibida:', proposicion)
        }
      } else {
        console.warn('Mensaje recibido con formato inesperado:', data)
      }
    } catch (error) {
      console.error('Error al procesar el mensaje del WebSocket:', error)
    }
  }

  socket.onerror = (error) => {
    console.error('Error en el WebSocket:', error)
  }

  socket.onclose = () => {
    console.warn('Conexión WebSocket cerrada')
  }
}



const enviarProposicion = () => {
  if (!socket || socket.readyState !== WebSocket.OPEN) {
    console.error('WebSocket no está conectado.')
    return
  }

  if (nuevaProposicion.value.trim()) {
    const mensaje = {
      descripcion: nuevaProposicion.value, // Usamos la referencia de 'nuevaProposicion'
      idSesion: 72, // ID de la sesión
      autor: Nombre.value, // Usamos 'Nombre' para el autor
      idMiembro: idMiembro.value, // Usamos la referencia de 'idMiembro'
    }

    // Verifica los datos antes de enviarlos
    console.log("Datos a enviar:", mensaje)

    // Primero envías el token para autenticación
    socket.send(JSON.stringify({ type: 'auth', token }))

    // Luego envías el mensaje con la proposición
    socket.send(JSON.stringify(mensaje))

    // Limpiar el campo de entrada después de enviar
    nuevaProposicion.value = ''
  }
}

</script>

<style>
/* No se necesita CSS adicional, todo se maneja con TailwindCSS */
</style>


<style>
/* No se necesita CSS adicional, todo se maneja con TailwindCSS */
</style>
