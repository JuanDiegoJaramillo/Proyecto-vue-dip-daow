<template>
  <p class="text-xl font-semibold text-blue-600/100 dark:text-blue-500/100">Actualizar Sesion</p>

  <form>
    <div class="grid gap-6 mb-6 md:grid-cols-2">
      <div>
        <label for="ID_SESION" class="block mb-2 text-sm font-medium text-gray-900"
          >ID Sesion</label
        >
        <input
          type="number"
          id="ID_SESION"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="ID Sesion"
          required
        />
      </div>
      <div>
        <label for="LUGAR" class="block mb-2 text-sm font-medium text-gray-900">LUGAR</label>
        <input
          type="varchar"
          id="LUGAR"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="LUGAR"
          required
        />
      </div>
      <div>
        <label for="FECHA" class="block mb-2 text-sm font-medium text-gray-900">FECHA</label>
        <input
          type="number"
          id="date"
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
  </form>
</template>
