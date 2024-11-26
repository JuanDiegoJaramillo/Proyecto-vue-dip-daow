import type { RouteRecordRaw } from 'vue-router'
const solicitantesRoutes: Array<RouteRecordRaw> = [
  {
    path: '/solicitantes/crear',
    name: 'solicitantes-Crear',
    component: () => import('../views/CrearSolicitantes.vue')
  },
  {
    path: '/solicitantes/actualizar/:id',
    name: 'solicitantes-Actualizar',
    component: () => import('../views/ActualizarSolicitantes.vue')
  },
  {
    path: '/solicitantes/index',
    name: 'solicitantes-Index',
    component: () => import('../views/SolicitantesIndex.vue')
  },
  {
    path: '/solicitantes/detalle',
    name: 'solicitantes-detalle',
    component: () => import('../views/DetallesUsuarioSolicitante.vue')
  }
]

export default solicitantesRoutes
