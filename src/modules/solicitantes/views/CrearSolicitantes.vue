<template>
  <div class="grid grid-cols-2 my-6 text-gray-700">
    <div class="flex items-center">
      <h2 class="mb-1 text-4xl font-bold dark:text-gray">Crear Solicitantes</h2>
    </div>
  </div>
  <form>
    <div class="grid gap-6 mb-6 md:grid-cols-2">
      <div>
        <label for="IDSOLICITANTE" class="block mb-2 text-sm font-medium text-gray-900"
          >ID Solicitante</label
        >
        <input
          type="number"
          id="IDSOLICITANTE"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="ID solicitante"
          required
        />
      </div>
      <div>
        <label for="NOMBRE" class="block mb-2 text-sm font-medium text-gray-900">Nombre</label>
        <input
          type="Varchar"
          id="NOMBRE"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Nombre"
          required
        />
      </div>
      <div>
        <label for="TIPODESOLICITANTE" class="block mb-2 text-sm font-medium text-gray-900"
          >Tipo de Solicitante</label
        >
        <input
          type="varchar"
          id="TIPODESOLICITANTE"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Tipo de Solicitante"
          required
        />
      </div>

      <div>
        <label for="EMAIL" class="block mb-2 text-sm font-medium text-gray-900">Email</label>
        <input
          type="varchar"
          id="EMAIL"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Email"
          required
        />
      </div>
      <div>
        <label for="CELULAR" class="block mb-2 text-sm font-medium text-gray-900">Celular</label>
        <input
          type="varchar"
          id="CELULAR"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Celular"
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
