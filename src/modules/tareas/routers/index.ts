import type { RouteRecordRaw } from 'vue-router'
const tareasRoutes: Array<RouteRecordRaw> = [
  {
    path: '/tareas/crear',
    name: 'tareas-Crear',
    component: () => import('../views/CrearTareas.vue')
  },
  {
    path: '/tareas/actualizar/:id', // Dejar solo esta ruta
    name: 'tareas-Actualizar',
    component: () => import('../views/ActualizarTareas.vue')
  },
  {
    path: '/tareas/index',
    name: 'tareas-Index',
    component: () => import('../views/TareasIndex.vue')
  },
  {
    path: '/tareas/detalle',
    name: 'tareas-detalle',
    component: () => import('../views/TareasDetalle.vue')
  }
]

export default tareasRoutes
