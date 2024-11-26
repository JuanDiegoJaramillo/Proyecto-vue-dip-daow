<template>
  <form>
    <div class="grid gap-6 mb-6 md:grid-cols-2">
      <div>
        <label for="ID_Descripcion" class="block mb-2 text-sm font-medium text-gray-900"
          >ID Descripcion</label
        >
        <input
          type="number"
          id="ID_Descripcion"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="ID Descripcion"
          required
        />
      </div>
      <div>
        <label for="ESTU_IMPLICADOS" class="block mb-2 text-sm font-medium text-gray-900"
          >Estudiantes implicados</label
        >
        <input
          type="varchar"
          id="ESTU_IMPLICADOS"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Estudiantes implicados"
          required
        />
      </div>
      <div>
        <label for="NUM_ESTU_IMPLICADOS" class="block mb-2 text-sm font-medium text-gray-900"
          >numero estudiantes implicados</label
        >
        <input
          type="number"
          id="NUM_ESTU_IMPLICADOS"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="numero estudiantes implicados"
          pattern="[0-9]{3}"
          required
        />
      </div>
      <div>
        <label for="DOCEN_IMPLICADOS" class="block mb-2 text-sm font-medium text-gray-900"
          >Docentes implicados</label
        >
        <input
          type="varchar"
          id="DOCEN_IMPLICADOS"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Docentes implicados"
          required
        />
      </div>
      <div>
        <label for="NUM_DOCEN_IMPLICADOS" class="block mb-2 text-sm font-medium text-gray-900"
          >numero de Docentes implicados</label
        >
        <input
          type="texto"
          id="NUM_DOCEN_IMPLICADOS"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="numero de Docentes implicados"
          required
        />
      </div>
      <div>
        <label for="CUIDAD_IMPLICADA" class="block mb-2 text-sm font-medium text-gray-900"
          >CUIDAD IMPLICADA</label
        >
        <input
          type="number"
          id="CUIDAD_IMPLICADA"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="CUIDAD IMPLICADA"
          required
        />
      </div>
      <div>
        <label for="PAIS_IMPLICADO" class="block mb-2 text-sm font-medium text-gray-900"
          >PAIS IMPLICADO</label
        >
        <input
          type="varchar"
          id="PAIS_IMPLICADO"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="PAIS IMPLICADO"
          required
        />
      </div>
      <div>
        <label for="EVENTO" class="block mb-2 text-sm font-medium text-gray-900">EVENTO</label>
        <input
          type="texto"
          id="EVENTO"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="EVENTO"
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
