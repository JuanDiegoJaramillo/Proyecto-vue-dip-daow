<template>
  <main class="h-full overflow-y-auto">
    <div class="container px-6 mx-auto grid">
      <!--  -->
      <!-- titulo -->
      <h1 class="mb-1 text-4xl font-bold dark:text-gray">Gestion Orden Sesion</h1>
      <BreadCrumb home="Orden" modulo="Gestion" />
      <div class="grid grid-cols-2 my-6 font-bold dark:text-gray">
        <div class="flex items-center">
          <h2 class="mb-1 text-4xl font-bold dark:text-gray">Listado de Ordenes</h2>
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
        titulo="Orden Sesion"
        ruta=""
        accion="Agregar"
        @click="toggleModaRegistar"
        :visible="true"
      ></AgregarLink>
      <div class="w-full overflow-hidden rounded-lg shadow-xs">
        <div class="w-full overflow-x-auto">
          <table class="w-full whitespace-no-wrap border-black dark:border-slate-300">
            <thead>
              <tr
                class="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800"
              >
                <th class="px-6 py-3">Sesión (ID Sesión)</th>
                <th class="px-6 py-3">Tema</th>
                <th class="px-6 py-3">Descripción</th>
                <th class="px-6 py-3">Acciones</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
              <tr
                class="text-gray-700 dark:text-gray-400"
                v-for="temasSesion in datos"
                :key="temasSesion.SESION_IDSESION"
              >
                <td class="px-4 py-3 border-b border-gray-300 dark:border-gray-700">
                  <div class="flex items-center text-sm">
                    <!-- Avatar with inset shadow -->
                    <div class="relative hidden w-8 h-8 mr-3 rounded-full md:block">
                      <div
                        class="absolute inset-0 rounded-full shadow-inner flex items-center justify-center"
                        aria-hidden="true"
                      >
                        <p class="font-semibold">{{ temasSesion.SESION_IDSESION }}</p>
                      </div>
                    </div>
                  </div>
                </td>
                <td class="px-4 py-3 text-sm">
                  {{ temasSesion.TEMA }}
                </td>
                <td class="px-4 py-3 text-sm">
                  {{ temasSesion.DESCRIPCION }}
                </td>
                <td class="px-4 py-3 text-sm">
                  <div class="flex">
                    <BotonEditar
                      :ruta="''"
                      :titulo="'Editar Tema'"
                      @click="abrirModalYSeleccionarTema(temasSesion.IDtema)"
                    ></BotonEditar>
                    <BotonEliminar
                      :ruta="''"
                      :titulo="'Eliminar Tema'"
                      @click="SeleccionarTemaEliminar(temasSesion.IDtema)"
                    ></BotonEliminar>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </main>
  <div class="max-w-7xl mx-auto space-y-8">
    <!-- Sección de Solicitudes -->
    <section>
      <h2 class="text-xl font-semibold mb-4">Solicitudes</h2>
      <div class="bg-white shadow rounded-lg p-4">
        <ul class="space-y-4">
          <!-- Elementos de solicitud -->
          <li class="cursor-pointer p-4 border-b" onclick="openModal('solicitudModal')">
            <h3 class="font-medium text-gray-800">Solicitud 1</h3>
            <p class="text-gray-600 text-sm">Detalles breves de la solicitud...</p>
          </li>
          <!-- Añade más solicitudes según sea necesario -->
        </ul>
      </div>
    </section>

    <!-- Sección de Asistencia -->
    <section>
      <h2 class="text-xl font-semibold mb-4">Asistencia</h2>
      <div class="grid grid-cols-2 gap-4">
        <!-- Asistencia de Invitados -->
        <div class="bg-white shadow rounded-lg p-4">
          <h3 class="font-medium text-gray-700 mb-2">Invitados</h3>
          <table class="w-full text-left">
            <thead>
              <tr>
                <th class="py-2">Nombre</th>
                <th class="py-2">Estatus</th>
              </tr>
            </thead>
            <tbody>
              <!-- Datos de ejemplo -->
              <tr>
                <td class="py-2">Invitado 1</td>
                <td class="py-2">Confirmado</td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Asistencia de Miembros -->
        <div class="bg-white shadow rounded-lg p-4">
          <h3 class="font-medium text-gray-700 mb-2">Miembros</h3>
          <table class="w-full text-left">
            <thead>
              <tr>
                <th class="py-2">Nombre</th>
                <th class="py-2">Estatus</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="py-2">Miembro 1</td>
                <td class="py-2">Confirmado</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>

    <!-- Sección para Agregar Temas de la Reunión -->
    <section>
      <h2 class="text-xl font-semibold mb-4">Temas de la Reunión</h2>
      <form class="flex space-x-4 bg-white shadow rounded-lg p-4">
        <input type="text" placeholder="Agregar nuevo tema" class="w-full border p-2 rounded" />
        <button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Agregar
        </button>
      </form>
    </section>

    <!-- Sección para Invitar a Invitados -->
    <section>
      <h2 class="text-xl font-semibold mb-4">Invitar a Invitados</h2>
      <div class="bg-white shadow rounded-lg p-4">
        <form id="inviteGuestsForm" class="space-y-4">
          <!-- Lista de invitados registrados -->
          <div class="flex items-center space-x-4 border-b py-2">
            <input type="checkbox" id="guest1" class="rounded text-blue-600" />
            <label for="guest1" class="text-gray-700">Invitado 1</label>
          </div>
          <div class="flex items-center space-x-4 border-b py-2">
            <input type="checkbox" id="guest2" class="rounded text-blue-600" />
            <label for="guest2" class="text-gray-700">Invitado 2</label>
          </div>
          <!-- Más invitados registrados según sea necesario -->

          <!-- Botón para enviar invitación a los seleccionados -->
          <button
            type="button"
            onclick="sendInvitations()"
            class="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 mt-4"
          >
            Enviar Invitación
          </button>
        </form>
      </div>
    </section>

    <!-- Botón para Citar Miembros -->
    <button
      onclick="openModal('citacionModal')"
      class="bg-green-600 text-white px-6 py-3 rounded mt-4 hover:bg-green-700"
    >
      Citar Miembros
    </button>
  </div>

  <!-- Modal de Solicitud -->
  <div id="solicitudModal" class="fixed inset-0 bg-gray-900 bg-opacity-50 hidden">
    <div class="bg-white max-w-md mx-auto p-6 rounded-lg shadow-lg mt-24">
      <h3 class="text-xl font-semibold mb-2">Detalles de la Solicitud</h3>
      <p class="text-gray-700 mb-4">
        Aquí se muestran todos los detalles de la solicitud seleccionada.
      </p>
      <button
        onclick="closeModal('solicitudModal')"
        class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Cerrar
      </button>
    </div>
  </div>

  <!-- Modal de Citación -->
  <div id="citacionModal" class="fixed inset-0 bg-gray-900 bg-opacity-50 hidden">
    <div class="bg-white max-w-md mx-auto p-6 rounded-lg shadow-lg mt-24">
      <h3 class="text-xl font-semibold mb-2">Citación de Miembros</h3>
      <p class="text-gray-700 mb-4">
        Los miembros han sido citados y se ha enviado una notificación por correo electrónico a cada
        uno.
      </p>
      <button
        onclick="closeModal('citacionModal')"
        class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Cerrar
      </button>
    </div>
  </div>
  <!-- Main modal -->
  <div
    v-if="isModalOpen"
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
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Registara Tema</h3>
          <button
            type="button"
            class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
            @click="toggleModaRegistar"
          >
            <svg class="w-3 h-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
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
        <form class="p-4 md:p-5">
          <div class="grid gap-4 mb-4 grid-cols-2">
            <div class="col-span-2">
              <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >Tema</label
              >
              <input
                type="text"
                name="name"
                id="name"
                v-model="RegistrarTema.name"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Tema de la sesion"
                required
              />
            </div>
            <div class="col-span-2">
              <label
                for="description"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >Description</label
              >
              <textarea
                id="description"
                rows="4"
                v-model="RegistrarTema.description"
                class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Description Del tema"
                required
              ></textarea>
            </div>
          </div>
          <button
            type="button"
            class="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            @click="Registrar()"
          >
            <svg
              class="me-1 -ms-1 w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                clip-rule="evenodd"
              ></path>
            </svg>
            Agregar Tema
          </button>
        </form>
      </div>
    </div>
  </div>

  <div
    v-if="isModalOpen1"
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
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Actualizar Tema</h3>
          <button
            type="button"
            class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
            @click="toggleModaActualizar"
          >
            <svg class="w-3 h-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
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
        <form class="p-4 md:p-5">
          <div class="grid gap-4 mb-4 grid-cols-2">
            <div class="col-span-2">
              <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >Tema</label
              >
              <input
                type="text"
                name="name"
                id="name"
                v-model="tema.name"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Tema de la sesion"
                required
              />
            </div>
            <div class="col-span-2">
              <label
                for="description"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >Description</label
              >
              <textarea
                id="description"
                v-model="tema.description"
                rows="4"
                class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Description Del tema"
                required
              ></textarea>
            </div>
          </div>
          <button
            type="button"
            class="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            @click="Actualizar()"
          >
            <svg
              class="me-1 -ms-1 w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                clip-rule="evenodd"
              ></path>
            </svg>
            Actualizar
          </button>
        </form>
      </div>
    </div>
  </div>

  <!-- Main modal -->
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
            @click="eliminarTema"
          >
            Yes, I'm sure
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, type Ref, onMounted } from 'vue'
import AgregarLink from '@/components/modules/AgregarLink.vue'
import BreadCrumb from '@/components/BreadCrumb.vue'
import BotonEditar from '@/components/botones/BotonEditar.vue'
import BotonEliminar from '@/components/botones/BotonEliminar.vue'
import { useRoute } from 'vue-router'
import OrdenService from '../services'

const route = useRoute()
const idSesion = ref<number | null>(null)
const TemaSelecionado = ref<Number | null>(null)

interface temasSesion {
  SESION_IDSESION: number
  TEMA: string
  DESCRIPCION: string
  IDtema: number
}
let datos: Ref<temasSesion[]> = ref([])
onMounted(() => {
  CargarTemas()
  //permisos()
})

function CargarTemas() {
  let id = route.params.IDSESION
  let valor = Number(id)
  idSesion.value = valor
  if (id == null) {
    console.log('id no registrado')
    SesionesTemas(valor)
    return
  }
}

const SesionesTemas = async (id: number) => {
  const respuesta = await OrdenService.TemasSesion(id)
  if (respuesta.status == 200) {
    datos.value = Array.isArray(respuesta.data) ? respuesta.data : [respuesta.data]
  } else if (respuesta.status == 404) {
    console.log(respuesta.error.message)
  } else {
    alert(respuesta.error.error)
  }
}

const tema: Ref<{ name: string; description: string; id: string }> = ref({
  name: '',
  description: '',
  id: ''
})
const temaSelecionado = async (id: number) => {
  const respuesta = await OrdenService.datosTema(id)
  let valor = Number(id)
  TemaSelecionado.value = valor
  console.log('acediendo desde fuera del if' + respuesta.data[0])
  if (respuesta.status === 200 && Array.isArray(respuesta.data) && respuesta.data.length > 0) {
    const temaData = respuesta.data[0]
    console.log('mostrando desde el if:---' + temaData)
    // Asignamos los valores a tema.value
    tema.value.name = temaData.TEMA
    tema.value.description = temaData.DESCRIPCION
    tema.value.id = temaData.IDtema
  } else if (respuesta.status == 404) {
    alert(respuesta.error.message)
  } else {
    console.error(respuesta.error.message)
  }
}

//REgistro de temas
const RegistrarTema: Ref<{ name: string; description: string }> = ref({ name: '', description: '' })
const Registrar = async () => {
  let IDSesion: number | null = idSesion.value
  if (IDSesion !== null) {
    const respuesta = await OrdenService.InsertarTema(
      RegistrarTema.value.name,
      RegistrarTema.value.description,
      IDSesion
    )
    if (respuesta.status == 201) {
      alert(respuesta.data.message)
      CargarTemas()
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
// Actualizar Temas

const Actualizar = async () => {
  let IDtema = Number(tema.value.id)
  let IDsesion = Number(idSesion.value)
  if (IDtema !== null) {
    const respuesta = await OrdenService.ActualizarTema(
      tema.value.name,
      tema.value.description,
      IDtema,
      IDsesion
    )
    if (respuesta.status == 201) {
      alert(respuesta.data.message)
      CargarTemas()
    } else if (respuesta.status == 400) {
      alert(respuesta.error.message)
    } else if (respuesta.status == 409) {
      alert(respuesta.error.message)
    } else if (respuesta.status == 500) {
      alert(respuesta.error.message)
    }
  }
}

const idTema: Ref<{ id: string }> = ref({
  id: ''
})
const idSelecionado = (id: Number) => {
  idTema.value.id = String(id)
}

const eliminarTema = async () => {
  let IDtema = Number(idTema.value.id)
  const respuesta = await OrdenService.EliminarTema(IDtema)
  if (respuesta.status == 200) {
    toggleModaEliminar()
    alert(respuesta.data.message)
    CargarTemas()
    idTema.value.id = ''
  } else if (respuesta.status == 400) {
    alert(respuesta.error.message)
  } else if (respuesta.status == 409) {
    alert(respuesta.error.message)
  } else if (respuesta.status == 500) {
    alert(respuesta.error.message)
  }
}

//aciones
const isModalOpen = ref(false)
const toggleModaRegistar = () => {
  isModalOpen.value = !isModalOpen.value
  if (isModalOpen.value == false) {
    RegistrarTema.value.name = ''
    RegistrarTema.value.description = ''
  }
}
const isModalOpen1 = ref(false)
const toggleModaActualizar = () => {
  isModalOpen1.value = !isModalOpen1.value
}
const abrirModalYSeleccionarTema = (id: number) => {
  toggleModaActualizar()
  temaSelecionado(id)
}
const isModalOpenEliminar = ref(false)
const toggleModaEliminar = () => {
  isModalOpenEliminar.value = !isModalOpenEliminar.value
}
const SeleccionarTemaEliminar = (id: number) => {
  toggleModaEliminar()
  idSelecionado(id)
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
