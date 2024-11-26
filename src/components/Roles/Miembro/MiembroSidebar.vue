<script setup lang="ts">
import { ref } from 'vue'
import { defineEmits } from 'vue'

const emit = defineEmits(['logoutAccion'])

const logoutPadre = () => {
  emit('logoutAccion') // Emitimos el evento para que el padre lo escuche
}
const rol = localStorage['userRole']
const isOpen = ref(false)
</script>
<template>
  <div class="flex">
    <div
      :class="isOpen ? 'w-40' : 'w-60'"
      class="flex flex-col h-screen p-3 duration-300 bg-sky-800 shadow"
    >
      <div class="space-y-3">
        <div class="flex items-center justify-between">
          <h2 class="text-xl font-bold text-white">{{ rol }}</h2>
          <button @click="isOpen = !isOpen">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6 text-white"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </button>
        </div>

        <div
          class="flex-1 lista overflow-y-auto p-4 scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-gray-200"
        >
          <ul class="pt-2 pb-4 space-y-1 text-sm">
            <li class="rounded-sm">
              <router-link to="/Rol/miembro">
                <div class="flex items-center p-2 space-x-3 rounded-md">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-6 h-6 text-gray-100"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M8.25 7.5V6.108c0-1.135.845-2.098 1.976-2.192.373-.03.748-.057 1.123-.08M15.75 18H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08M15.75 18.75v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5A3.375 3.375 0 0 0 6.375 7.5H5.25m11.9-3.664A2.251 2.251 0 0 0 15 2.25h-1.5a2.251 2.251 0 0 0-2.15 1.586m5.8 0c.065.21.1.433.1.664v.75h-6V4.5c0-.231.035-.454.1-.664M6.75 7.5H4.875c-.621 0-1.125.504-1.125 1.125v12c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V16.5a9 9 0 0 0-9-9Z"
                    />
                  </svg>

                  <span class="text-gray-100"> Acciones </span>
                </div>
              </router-link>
            </li>

            <li class="rounded-sm">
              <router-link to="/miembros/detalle">
                <div class="flex items-center p-2 space-x-3 rounded-md">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-6 h-6 text-gray-100"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M8.25 7.5V6.108c0-1.135.845-2.098 1.976-2.192.373-.03.748-.057 1.123-.08M15.75 18H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08M15.75 18.75v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5A3.375 3.375 0 0 0 6.375 7.5H5.25m11.9-3.664A2.251 2.251 0 0 0 15 2.25h-1.5a2.251 2.251 0 0 0-2.15 1.586m5.8 0c.065.21.1.433.1.664v.75h-6V4.5c0-.231.035-.454.1-.664M6.75 7.5H4.875c-.621 0-1.125.504-1.125 1.125v12c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V16.5a9 9 0 0 0-9-9Z"
                    />
                  </svg>

                  <span class="text-gray-100"> Perfil </span>
                </div>
              </router-link>
            </li>
          </ul>
        </div>
        <ul>
          <li class="rounded-sm">
            <a href="#" class="flex items-center p-2 space-x-3 rounded-md">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-6 h-6 text-gray-100"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>

              <span class="text-gray-100"> Settings </span>
            </a>
          </li>
          <li class="rounded-sm">
            <div @click="logoutPadre" class="flex items-center p-2 space-x-3 rounded-md">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-6 h-6 text-gray-100"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
                />
              </svg>

              <span class="text-gray-100"> Exit </span>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<style>
/* Scrollbar en WebKit (Chrome, Safari) */
.scrollbar-thin::-webkit-scrollbar {
  width: 8px; /* Grosor de la barra */
}

.scrollbar-thin::-webkit-scrollbar-track {
  background: #e5e7eb; /* Fondo del track (la parte fija) */
}

.scrollbar-thin::-webkit-scrollbar-thumb {
  background-color: #3b82f6; /* Color de la barra */
  border-radius: 10px; /* Bordes redondeados */
  border: 2px solid transparent; /* Espacio alrededor de la barra */
  background-clip: padding-box; /* Evita que el borde se superponga al color */
}

/* Scrollbar en Firefox */
.scrollbar-thin {
  scrollbar-width: thin; /* Grosor de la barra (thin = fino) */
  scrollbar-color: #044c79 #3a9ab4; /* Color de la barra y del fondo */
}
.lista {
  height: 450px;
  max-height: 450px;
}
</style>
