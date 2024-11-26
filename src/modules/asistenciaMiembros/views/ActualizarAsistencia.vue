<template>
  <BreadCrumb home="Asisterncia Mienbro" modulo="Gestion" accion="Actualizar" />
  <div class="grid grid-cols-2 my-6 text-gray-900 dark:text-white">
    <div class="flex items-center">
      <h2 class="mb-1 text-4xl font-bold dark:text-gray">Actualizar Asistencia</h2>
    </div>
  </div>
  <form>
    <div class="grid gap-6 mb-6 md:grid-cols-2">
      <div>
        <label for="SESION_IDSECION" class="block mb-2 text-sm font-medium text-gray-900"
          >Sesion ID Sesion</label
        >
        <input
          type="number"
          id="SESION_IDSECION"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Sesion ID Sesion"
          required
        />
      </div>
      <div>
        <label for="MIEMBROS_IDMIEMBROS" class="block mb-2 text-sm font-medium text-gray-900"
          >Miembros ID Miembros</label
        >
        <input
          type="number"
          id="MIEMBROS_IDMIEMBROS"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Miembros ID Miembros"
          required
        />
      </div>
      <div>
        <label for="ESTASO_ASISTENCIA" class="block mb-2 text-sm font-medium text-gray-900"
          >Estado de Asistencia</label
        >
        <input
          type="varchar"
          id="ESTASO_ASISTENCIA"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Estado de Asistencia"
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
  </form>
</template>
<script setup lang="ts">
import BreadCrumb from '@/components/BreadCrumb.vue'
</script>
