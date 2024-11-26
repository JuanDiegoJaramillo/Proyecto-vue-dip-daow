import type { RouteRecordRaw } from 'vue-router'
const actasRoutes: Array<RouteRecordRaw> = [
  {
    path: '/actas/crear',
    name: 'actas-Crear',
    component: () => import('../views/CrearActas.vue')
  },
  {
    path: '/actas/actualizar/:id',
    name: 'actas-Actualizar',
    component: () => import('../views/ActualizarActas.vue')
  }
]

export default actasRoutes
