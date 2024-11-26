import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginIniciar from '@/views/LoginIniciar.vue'
import actasRoutes from '../modules/actas/routers'
import descripcionRoutes from '../modules/descripcion/routers'
import proposicionesRoutes from '../modules/proposiciones/routers'
import sesioRoutes from '../modules/sesion/routers'
import solicitantesRoutes from '../modules/solicitantes/routers'
import solicitudRoutes from '../modules/solicitud/routers'
import invitadosRoutes from '../modules/invitados/routers'
import mienbrosRoutes from '../modules/miembros/routers'
import tareasRoutes from '../modules/tareas/routers'
import ordenRoutes from '../modules/ordenSesion/routers'
import encargadosTareasRoutes from '../modules/encargadosTareas/routers'
import asistenciaRoutes from '../modules/asistenciaMiembros/routers'

const newLocal = '../views/Facultad/'

// Definición del array de rutas con su tipo correcto
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/login',
    name: 'login',
    component: LoginIniciar
  },
  {
    path: '/registroSolicitante',
    name: 'registroSolicitante',
    component: () => import('../views/SingInSolicitante.vue')
  },
  
  {
    path: '/prueba',
    name: 'prueba',
    component: () => import('../views/viataPrueba.vue')
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/AboutView.vue')
  },
  {
    path: '/facultad/crear',
    name: 'facultad-crear',
    component: () => import(newLocal + 'FacultadCrear.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/facultad/listar',
    name: 'facultad-listar',
    component: () => import(newLocal + 'FacultadListar.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/Actas',
    name: 'Vista-Actas',
    component: () => import('../modules/actas/views/ActasIndex.vue')
  },
  ...actasRoutes,
  {
    path: '/Asistencia',
    name: 'Vista-Asistencia',
    component: () => import('../modules/asistenciaMiembros/views/AsistenciaMiembroIndex.vue')
  },
  ...asistenciaRoutes,
  {
    path: '/Descripcion',
    name: 'Vista-Descripcion',
    component: () => import('../modules/descripcion/views/DescripcionIndex.vue')
  },
  ...descripcionRoutes,
  {
    path: '/EncargadosTareas',
    name: 'Vista-EncargadosTareas',
    component: () => import('../modules/encargadosTareas/views/EncargadosIndex.vue')
  },
  ...encargadosTareasRoutes,
  {
    path: '/Invitados',
    name: 'Vista-Invitados',
    component: () => import('../modules/invitados/views/InvitadosIndex.vue')
  },
  ...invitadosRoutes,
  {
    path: '/Miembros',
    name: 'Vista-Miembros',
    component: () => import('../modules/miembros/views/MiembrosIndex.vue')
  },
  ...mienbrosRoutes,
  {
    path: '/OrdenSesion/:IDSESION',
    name: 'Vista-OrdenSesion',
    component: () => import('../modules/ordenSesion/views/OrdenSesionIndex.vue')
  },
  ...ordenRoutes,
  {
    path: '/Proposiciones',
    name: 'Vista-Proposiciones',
    component: () => import('../modules/proposiciones/views/ProporsionesIndex.vue')
  },
  ...proposicionesRoutes,
  {
    path: '/Sesion',
    name: 'Vista-Sesion',
    component: () => import('../modules/sesion/views/SesionIndex.vue')
  },
  ...sesioRoutes,
  {
    path: '/Solicitantes',
    name: 'Vista-Solicitantes',
    component: () => import('../modules/solicitantes/views/SolicitantesIndex.vue')
  },
  ...solicitantesRoutes,
  {
    path: '/Solicitud',
    name: 'Vista-Solicitud',
    component: () => import('../modules/solicitud/views/SolicitudIndex.vue')
  },
  ...solicitudRoutes,
  {
    path: '/Tareas',
    name: 'Vista-Tareas',
    component: () => import('../modules/tareas/views/TareasIndex.vue')
  },
  ...tareasRoutes
]

// Creación del enrutador con historial
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem('authToken') // Verificamos el token

  // Si la ruta requiere autenticación y no está autenticado, lo redirige a login
  if (to.meta.requiresAuth && !isAuthenticated) {
    next({ name: 'login' }) // Redirigir a la página de login
  } else if (to.name === 'login' && isAuthenticated) {
    next({ name: 'home' }) // Si ya está autenticado, no debería ver el login, redirigir a home
  } else {
    next() // Dejar que acceda a la ruta
  }
})
export default router
