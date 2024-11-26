<template>
  <BreadCrumb home="Actas" modulo="Gestion" accion="Actualizar" />
  <div class="grid grid-cols-2 my-6 text-gray-700">
    <div class="flex items-center">
      <h2 class="mb-1 text-4xl font-bold dark:text-gray">Actualizar Actas</h2>
    </div>
  </div>
  <form>
    <div class="grid gap-6 mb-6 md:grid-cols-2">
      <div>
        <label for="NUM_ACTAS" class="block mb-2 text-sm font-medium text-gray-900"
          >Numero de Actas</label
        >
        <input
          type="number"
          id="NUM_ACTAS"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Numero de Actas"
          required
        />
      </div>
      <div>
        <label for="ESTADO" class="block mb-2 text-sm font-medium text-gray-900">Estado</label>
        <input
          type="varchar"
          id="ESTADO"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Estado"
          required
        />
      </div>
      <div>
        <label for="SESION_IDSESION" class="block mb-2 text-sm font-medium text-gray-900"
          >Sesion ID Sesion</label
        >
        <input
          type="number"
          id="SESION_IDSESION"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Sesion ID Sesion"
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
