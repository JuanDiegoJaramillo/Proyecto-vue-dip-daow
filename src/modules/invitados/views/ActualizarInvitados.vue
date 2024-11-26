<template>
  <div>
    <h1>Actualizar Invitado</h1>
    <form @submit.prevent="submitForm">
      <div>
        <label for="ID_Invitados" class="block mb-2 text-sm font-medium text-gray-900"
          >ID Invitado</label
        >
        <input
          type="number"
          v-model="invitado.id"
          id="ID_Invitados"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
          disabled
        />
      </div>
      <div>
        <label for="NOMBRE" class="block mb-2 text-sm font-medium text-gray-900">Nombre</label>
        <input
          type="text"
          v-model="invitado.nombre"
          id="NOMBRE"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
          required
        />
      </div>
      <div>
        <label for="DEPENDENCIA" class="block mb-2 text-sm font-medium text-gray-900"
          >Dependencia</label
        >
        <input
          type="text"
          v-model="invitado.dependencia"
          id="DEPENDENCIA"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
          required
        />
      </div>
      <div>
        <label for="CARGO" class="block mb-2 text-sm font-medium text-gray-900">Cargo</label>
        <input
          type="text"
          v-model="invitado.cargo"
          id="CARGO"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
          required
        />
      </div>
      <button
        type="submit"
        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 mt-4"
      >
        Actualizar
      </button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      id: null, // Guardar el ID
      invitado: { id: null, nombre: '', dependencia: '', cargo: '' }, // Objeto para almacenar el invitado encontrado
      invitados: [
        { id: 1, nombre: 'Juan Pérez', dependencia: 'Marketing', cargo: 'Gerente' },
        { id: 2, nombre: 'Ana García', dependencia: 'TI', cargo: 'Desarrolladora' }
        // Agregar más invitados aquí
      ]
    }
  },
  beforeRouteEnter(to, from, next) {
    // Accedemos al parámetro id antes de cargar la vista
    next((vm) => {
      vm.id = to.params.id
      console.log('Parámetro id recibido:', vm.id)
      vm.obtenerDetallesInvitado(vm.id) // Llamar a un método para obtener los detalles del invitado
    })
  },
  methods: {
    obtenerDetallesInvitado(id) {
      // Buscar el invitado con el id proporcionado
      const encontrado = this.invitados.find((invitado) => invitado.id == id)
      if (encontrado) {
        this.invitado = { ...encontrado } // Clonar los datos del invitado encontrado
      } else {
        console.error(`Invitado con id ${id} no encontrado`)
      }
    },
    submitForm() {
      console.log('Datos actualizados del invitado:', this.invitado)
      // Aquí podrías enviar los datos a una API para actualizar el invitado
    }
  }
}
</script>

<style scoped>
/* Estilos opcionales */
</style>
