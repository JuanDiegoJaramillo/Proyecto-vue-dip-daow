import type { RouteRecordRaw } from 'vue-router'

const proposicionesRoutes: Array<RouteRecordRaw> = [
  {
    path: '/proposiciones/crear',
    name: 'proposiciones-Crear',
    component: () => import('../views/CrearProposiciones.vue')
  },
  {
    path: '/proposiciones/actualizar/:id',
    name: 'proposiciones-Actualizar',
    component: () => import('../views/ActualizarProposiciones.vue')
  },
  {
    path: '/proposiciones/index',
    name: 'proposiciones-Index',
    component: () => import('../views/ProporsionesIndex.vue')
  },
  {
    path: '/proposiciones/detalle',
    name: 'proposiciones-detalle',
    component: () => import('../views/ProposicionesDetalle.vue')
  }
]

export default proposicionesRoutes
