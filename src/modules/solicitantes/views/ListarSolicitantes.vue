<template>
  <div class="grid grid-cols-2 my-6 text-gray-700">
    <div class="flex items-center">
      <h2 class="mb-1 text-4xl font-bold dark:text-gray">Listado de Solicitantes</h2>
    </div>
  </div>

  <div class="flex flex-col-reverse md:flex-row md:space-x-4">
    <div class="relative overflow-x-auto">
      <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead
          class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
        >
          <tr>
            <th scope="col" class="px-6 py-3">Id Solicitante</th>
            <th scope="col" class="px-6 py-3">Nombre</th>
            <th scope="col" class="px-6 py-3">Tipo de Solicitante</th>
            <th scope="col" class="px-6 py-3">Email</th>
            <th scope="col" class="px-6 py-3">Celular</th>
            <th scope="col" class="px-6 py-3">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="solicitante in solicitantes"
            :key="solicitante.idSolicitante"
            class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
          >
            <th
              scope="row"
              class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              {{ solicitante.idSolicitante }}
            </th>
            <td class="px-6 py-4">{{ solicitante.nombre }}</td>
            <td class="px-6 py-4">{{ solicitante.tipoSolicitante }}</td>
            <td class="px-6 py-4">{{ solicitante.email }}</td>
            <td class="px-6 py-4">{{ solicitante.celular }}</td>
            <td class="px-6 py-4">
              <button class="text-blue-600 hover:underline">
                <router-link :to="`/solicitantes/actualizar/${solicitante.idSolicitante}`"
                  >Actualizar</router-link
                >
              </button>
              <button
                @click="eliminarSolicitante(solicitante)"
                class="text-red-600 hover:underline"
              >
                Eliminar
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      solicitantes: [
        {
          idSolicitante: 1,
          nombre: 'Juan Pérez',
          tipoSolicitante: 'Estudiante',
          email: 'juanperez@example.com',
          celular: '1234567890'
        },
        {
          idSolicitante: 2,
          nombre: 'María García',
          tipoSolicitante: 'Profesor',
          email: 'mariagarcia@example.com',
          celular: '0987654321'
        }
        // Agregar más solicitantes aquí
      ]
    }
  },
  methods: {
    actualizarSolicitante(solicitante) {
      alert(`Actualizando solicitante: ${solicitante.nombre} (ID ${solicitante.idSolicitante})`)
    },
    eliminarSolicitante(solicitante) {
      this.solicitantes = this.solicitantes.filter(
        (s) => s.idSolicitante !== solicitante.idSolicitante
      )
    }
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
