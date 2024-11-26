<template>
  <div>
    <!-- Componente de la gráfica -->
    <Bar :data="chartData" :options="chartOptions" v-if="isChartVisible" />
  </div>
</template>

<script lang="ts">
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
} from 'chart.js'
import { Bar } from 'vue-chartjs'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

export default {
  name: 'EstratosChart',
  components: {
    Bar
  },
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      isChartVisible: true
    }
  },
  computed: {
    chartData() {
      return {
        labels: ['Estrato 1', 'Estrato 2', 'Estrato 3', 'Estrato 4', 'Estrato 5', 'Estrato 6'],
        datasets: [
          {
            label: `Datos de estratos - Facultad: ${this.data.facultad}`,
            data: [
              this.data.estrato_1,
              this.data.estrato_2,
              this.data.estrato_3,
              this.data.estrato_4,
              this.data.estrato_5,
              this.data.estrato_6
            ],
            backgroundColor: [
              'rgba(75, 192, 192, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
              'rgba(201, 203, 207, 0.2)'
            ],
            borderColor: [
              'rgba(75, 192, 192, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
              'rgba(201, 203, 207, 1)'
            ],
            borderWidth: 1
          }
        ]
      }
    },
    chartOptions() {
      return {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: `Distribución por estratos - Facultad: ${this.data.facultad}`
          }
        },
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    }
  }
}
</script>
