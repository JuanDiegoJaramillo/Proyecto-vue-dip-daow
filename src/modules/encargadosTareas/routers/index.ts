import type { RouteRecordRaw } from 'vue-router'
const encargadosTareasRoutes: Array<RouteRecordRaw> = [
  {
    path: '/encargados/crear',
    name: 'encargados-Crear',
    component: () => import('../views/CrearEncargados.vue')
  },
  {
    path: '/encargados/actualizar/:id',
    name: 'encargados-Actualizar',
    component: () => import('../views/ActualizarEncargados.vue')
  },
  {
    path: '/encargados/index',
    name: 'encargados-Index',
    component: () => import('../views/EncargadosIndex.vue')
  },
  {
    path: '/encargados/detalle',
    name: 'encargados-detalle',
    component: () => import('../views/EncargadosDetalle.vue')
  }
]

export default encargadosTareasRoutes
