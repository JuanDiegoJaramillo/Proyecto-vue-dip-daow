<script setup>
import { ref } from 'vue'
import BreadCrumb from '../../components/BreadCrumb.vue'
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Title } from 'chart.js'
import { Bar } from 'vue-chartjs'
import unicordobaService from '@/services/unicordoba/unicordobaService'
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Title)
const datos = ref({})
const mostrar = ref({})
const selectedData = ref(null)
const estratosChart = ref(null)
const isVisible = ref(false)
let facultadesUnicas = ref(false)
const fechas = ref(null)
let facultadSelecionada = ' '
let periodoSelecionado = ' '
const loadData = async () => {
  const res = await unicordobaService.LoadData()
  datos.value = res.data
  cargarTodo()
}
const FacultadesDisponibles = async () => {
  const res = await unicordobaService.FacultadesDisponibles()
  if (res != null) {
    facultadesUnicas.value = res
  } else {
    console.log(res)
  }
}
const Facultades = async (facultad) => {
  const res = await unicordobaService.BuscarFacultadad(facultad)
  if (res != null) {
    mostrar.value = res
    facultadSelecionada = facultad
    PeridosFacultades(facultad)
    limpiarGrafico()
    hideDiv()
    periodoSelecionado = ' '
  } else {
    console.log(res)
  }
}
const PeridosFacultades = async (facultad) => {
  const res = await unicordobaService.BuscarPeridoFacultad(facultad)
  if (res != null) {
    fechas.value = res
  } else {
    console.log(res)
  }
}
const FacultadPeriodoBusacado = async (periodo) => {
  const res = await unicordobaService.BuscarFacultadadPeriodo(facultadSelecionada, periodo)
  if (res != null) {
    mostrar.value = {}
    mostrar.value = res
    console.log(res)
    periodoSelecionado = periodo
  } else {
    console.log(res)
  }
}
loadData()
hideDiv()
function cargarTodo() {
  facultadSelecionada = ''
  periodoSelecionado = ''
  hideDiv()
  mostrar.value = {}
  mostrar.value = JSON.parse(JSON.stringify(datos.value))
  facultadesUnicas.value = []
  fechas.value = []
  FacultadesDisponibles()
}
function generarGrafica(fila) {
  showDiv()
  selectedData.value = fila
}
function limpiarGrafico() {
  selectedData.value = null
}
// Función para mostrar el div
function showDiv() {
  isVisible.value = true
}
// Función para ocultar el div
function hideDiv() {
  isVisible.value = false
}
</script>
<template>
  <BreadCrumb home="Facultades" modulo="Listado" accion="" />
  <div class="flex space-x-4">
    <div class="relative inline-block text-left">
      <!-- Botón para desplegar el menú -->
      <button
        @click="toggleDropdown()"
        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        type="button"
      >
        Facultades
        <svg
          class="w-2.5 h-2.5 ms-3"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="m1 1 4 4 4-4"
          />
        </svg>
      </button>
      <!-- Menú desplegable -->
      <div
        v-if="isOpen"
        class="absolute z-10 mt-2 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
      >
        <ul class="py-2 text-sm text-gray-700 dark:text-gray-200">
          <li v-for="facultad in facultadesUnicas" :key="facultad">
            <div
              class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white cursor-pointer"
              @click="Facultades(facultad)"
            >
              {{ facultad }}
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="relative inline-block text-left">
      <!-- Otro botón o lista -->
      <button
        @click="toggleDropdown2"
        class="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
        type="button"
      >
        Periodo
        <svg
          class="w-2.5 h-2.5 ms-3"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="m1 1 4 4 4-4"
          />
        </svg>
      </button>
      <!-- Menú desplegable para la segunda lista -->
      <div
        v-if="isOpen2"
        class="absolute z-10 mt-2 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
      >
        <ul class="py-2 text-sm dark:text-gray-200">
          <li v-for="item in fechas" :key="item">
            <div
              @click="FacultadPeriodoBusacado(item)"
              class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white cursor-pointer"
            >
              {{ item }}
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
  <div class="grid grid-cols-2 my-6 text-gray-700">
    <div class="flex items-center">
      <h2 class="mb-1 text-4xl font-bold dark:text-gray">Listado Facultades</h2>
    </div>

    <div class="flex justify-end">
      <button @click="loadData()" type="button" class="buttonGreen">Cargar todo</button>
    </div>
  </div>

  <BreadCrumb home="Facultad" :modulo="facultadSelecionada" :accion="periodoSelecionado" />
  <div class="flex flex-col-reverse md:flex-row md:space-x-4">
    <div class="relative overflow-x-auto">
      <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead
          class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
        >
          <tr>
            <th scope="col" class="px-6 py-3">Periodo</th>
            <th scope="col" class="px-6 py-3">Facultad</th>
            <th scope="col" class="px-6 py-3">Programa</th>
            <th scope="col" class="px-6 py-3">Total matricula</th>
            <th scope="col" class="px-6 py-3">Masculino</th>
            <th scope="col" class="px-6 py-3">Femenino</th>
            <th scope="col" class="px-6 py-3">Est1</th>
            <th scope="col" class="px-6 py-3">Est2</th>
            <th scope="col" class="px-6 py-3">Est3</th>
            <th scope="col" class="px-6 py-3">Est4</th>
            <th scope="col" class="px-6 py-3">Est5</th>
            <th scope="col" class="px-6 py-3">Est6</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="fila in mostrar"
            :key="fila"
            class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
            @click="generarGrafica(fila)"
          >
            <th
              scope="row"
              class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              {{ fila.periodo }}
            </th>
            <td class="px-6 py-4">{{ fila.facultad }}</td>
            <td class="px-6 py-4">{{ fila.programa }}</td>
            <td class="px-6 py-4">{{ fila.total_matricula }}</td>
            <td class="px-6 py-4">{{ fila.sexo_masc }}</td>
            <td class="px-6 py-4">{{ fila.sexo_feme }}</td>
            <td class="px-6 py-4">{{ fila.estrato_1 }}</td>
            <td class="px-6 py-4">{{ fila.estrato_2 }}</td>
            <td class="px-6 py-4">{{ fila.estrato_3 }}</td>
            <td class="px-6 py-4">{{ fila.estrato_4 }}</td>
            <td class="px-6 py-4">{{ fila.estrato_5 }}</td>
            <td class="px-6 py-4">{{ fila.estrato_6 }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="inline-block text-left md:w-auto md:static sticky top-0g-white">
      <!-- Componente de la gráfica -->
      <div
        v-if="isVisible"
        class="sticky top-0 bg-white z-10 p-4 md:max-w-2xl transform transition-transform duration-300 hover:scale-105 h-96 w-full min-h-48 max-h-96"
      >
        <button class="buttonYellow" @click="hideDiv()">ocultar</button>
        <Bar
          v-if="selectedData"
          :data="{
            labels: ['Estrato 1', 'Estrato 2', 'Estrato 3', 'Estrato 4', 'Estrato 5', 'Estrato 6'],
            datasets: [
              {
                label: `Datos de ${selectedData.facultad} - ${selectedData.periodo}`,
                data: [
                  selectedData.estrato_1,
                  selectedData.estrato_2,
                  selectedData.estrato_3,
                  selectedData.estrato_4,
                  selectedData.estrato_5,
                  selectedData.estrato_6
                ],
                backgroundColor: 'rgba(75, 192, 192, 0.6)'
              }
            ]
          }"
          :options="{
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                position: 'top'
              },
              title: {
                display: true,
                text: 'Distribución de Datos'
              }
            }
          }"
          ref="estratosChart"
        />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isOpen: false,
      isOpen2: false
    }
  },

  methods: {
    toggleDropdown() {
      this.isOpen = !this.isOpen
    },
    toggleDropdown2() {
      this.isOpen2 = !this.isOpen2
    }
  }
}
</script>
