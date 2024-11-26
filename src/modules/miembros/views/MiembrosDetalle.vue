<template><div class="min-h-screen bg-gray-100 dark:bg-gray-900 py-10 px-6">
    <!-- Contenedor principal -->
    <div class="max-w-3xl mx-auto bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6">
      <!-- Título -->
      <div class="text-center mb-6">
        <h1 class="text-2xl font-bold text-gray-800 dark:text-gray-100">Perfil del Invitado</h1>
        <p class="text-gray-600 dark:text-gray-400">Consulta y actualiza tu información.</p>
      </div>
      
      <!-- Información del Invitado -->
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
        <!-- Nombre -->
        <div>
          <label class="block text-gray-700 dark:text-gray-300 font-semibold mb-2">Nombre:</label>
          <p class="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 rounded-md p-2">Renember Andres Niño</p>
        </div>
        <!-- Dependencia -->
        <div>
          <label class="block text-gray-700 dark:text-gray-300 font-semibold mb-2">Dependencia:</label>
          <p class="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 rounded-md p-2">Ingeniería de Sistemas</p>
        </div>
        <!-- Cargo -->
        <div>
          <label class="block text-gray-700 dark:text-gray-300 font-semibold mb-2">Cargo:</label>
          <p class="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 rounded-md p-2">Estudiante</p>
        </div>
        <!-- Email -->
        <div>
          <label class="block text-gray-700 dark:text-gray-300 font-semibold mb-2">Correo Electrónico:</label>
          <p class="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 rounded-md p-2">Renembertemp@gmail.com</p>
        </div>
      </div>
  
      <!-- Formulario para cambiar contraseña -->
      <div class="border-t pt-6">
        <h2 class="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">Cambiar Contraseña</h2>
        <form>
          <!-- Contraseña actual -->
          <div class="mb-4">
            <label class="block text-gray-700 dark:text-gray-300 font-medium mb-2" for="current-password">Contraseña Actual:</label>
            <input type="password" id="current-password" class="w-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <!-- Nueva contraseña -->
          <div class="mb-4">
            <label class="block text-gray-700 dark:text-gray-300 font-medium mb-2" for="new-password">Nueva Contraseña:</label>
            <input type="password" id="new-password" class="w-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <!-- Botón para actualizar -->
          <div class="text-right">
            <button type="submit" class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
              Guardar Cambios
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
  </template>  