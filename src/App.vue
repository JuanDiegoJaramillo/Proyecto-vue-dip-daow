<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import SideBarNavegation from '@/components/barraLateral.vue'
import NavbarsNavigation from '@/components/BarraRutas.vue'
import estudiante from '@/components/Roles/RolEsrudiante/EstudianteSidebar.vue'
import coordinador from '@/components/Roles/RolCoordinador/CoordinadorSidebar.vue'
import EstudianteMenu from '@/components/Roles/RolEsrudiante/EstudiantesMenu.vue'
import CoordinadorMenu from '@/components/Roles/RolCoordinador/CoordinadorMenu.vue'
import InvitadoMenu from '@/components/Roles/Invitados/InvitadoMenu.vue'
import InvitadoSidebar from '@/components/Roles/Invitados/InvitadoSidebar.vue'
import MiembroMenu from '@/components/Roles/Miembro/MiembroMenu.vue'
import MiembroSidebar from '@/components/Roles/Miembro/MiembroSidebar.vue'
import SolicitanteMenu from '@/components/Roles/Solicitante/SolicitanteMenu.vue'
import SolicitanteSidebar from '@/components/Roles/Solicitante/SolicitanteSidebar.vue'
import services from '@/services/usuarios/loginService'
import { useRouter, useRoute } from 'vue-router'
import { computed, ref } from 'vue'

const route = useRoute()
const router = useRouter()
// Computed property to check if the user is on the login page
const isLoginPage = computed(() => route.name === 'login')

// Function to check if user is authenticated
const isAuthenticated = ref(!!localStorage.getItem('authToken'))

// If user is not authenticated and not on login page, redirect to login
if (!isAuthenticated.value && route.name !== 'login') {
  router.push({ name: 'login' })
}
const logout = async () => {
  const respuesta = await services.logout()
  if (respuesta.status == 200) {
    console.log(respuesta.data)
    localStorage.removeItem('authToken') // Eliminar token de autenticación
    localStorage.removeItem('userRole')
    router.replace({ name: 'login' }) // Redirigir al login, pero usando replace
    window.location.reload() // Recargar la página para asegurar que el estado no se quede en caché
  }
}
// Computed property to get the user's role
const Role = computed(() => localStorage.getItem('userRole'))

// Component to render based on user role
const SidebarComponent = computed(() => {
  if (Role.value === 'estudiante') {
    return estudiante
  } else if (Role.value === 'coordinador') {
    return coordinador
  } else if (Role.value === 'invitado') {
    return InvitadoSidebar
  }  else if (Role.value === 'solicitante') {
    return SolicitanteSidebar
  }else if (Role.value === 'miembro') {
    return MiembroSidebar
  }else {
    return null // Puedes manejar un caso por defecto aquí si es necesario
  }
})
const MenuComponent = computed(() => {
  if (Role.value === 'estudiante') {
    return EstudianteMenu
  } else if (Role.value === 'coordinador') {
    return CoordinadorMenu
  } else if (Role.value === 'invitado') {
    return InvitadoMenu
  }  else if (Role.value === 'solicitante') {
    return SolicitanteMenu
  } else if (Role.value === 'miembro') {
    return MiembroMenu
  }else {
    return null // Puedes manejar un caso por defecto aquí si es necesario
  }
})
</script>

<template>
  <div class="flex flex-col h-screen">
    <router-view v-if="isLoginPage"></router-view>
    <!-- Navbar -->
    <div v-else class="flex flex-col h-screen">
      <component :is="MenuComponent" class="flex-none" @logoutAccion="logout" />

      <div class="flex flex-grow overflow-hidden">
        <!-- Sidebar -->
        <component :is="SidebarComponent" class="flex-none" @logoutAccion="logout" />

        <!-- Contenido Principal -->
        <div
          class="flex-grow overflow-y-auto p-4 bg-slate-100 text-black dark:bg-slate-600 dark:text-white"
        >
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<style></style>
