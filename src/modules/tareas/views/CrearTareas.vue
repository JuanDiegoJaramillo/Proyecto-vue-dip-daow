<template>
  <div class="grid grid-cols-2 my-6 text-gray-700">
    <div class="flex items-center">
      <h2 class="mb-1 text-4xl font-bold dark:text-gray">Crear Tareas</h2>
    </div>
  </div>
  <form>
    <div class="grid gap-6 mb-6 md:grid-cols-2">
      <div>
        <label for="ID_Tareas" class="block mb-2 text-sm font-medium text-gray-900"
          >ID Tareas</label
        >
        <input
          type="number"
          id="ID_Tareas"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="ID Tareass"
          required
        />
      </div>
      <div>
        <label for="DESCRIPCION" class="block mb-2 text-sm font-medium text-gray-900"
          >Descripcion</label
        >
        <input
          type="varchar"
          id="DESCRIPCION"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Descripcion"
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
          pattern="[0-9]{3}"
          required
        />
      </div>
      <div>
        <label for="FECHA_ENTREGA" class="block mb-2 text-sm font-medium text-gray-900"
          >Fecha de Entrega</label
        >
        <input
          type="date"
          id="FECHA_ENTREGA"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Fecha de Entrega"
          pattern="[0-9]{3}"
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
