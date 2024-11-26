import type { RouteRecordRaw } from 'vue-router'
const descripcionRoutes: Array<RouteRecordRaw> = [
  {
    path: '/descripcion/crear',
    name: 'descripcion-Crear',
    component: () => import('../views/CrearDescripcion.vue')
  },
  {
    path: '/descripcion/actualizar/:id',
    name: 'descripcion-Actualizar',
    component: () => import('../views/ActualizarDescripcion.vue')
  },
  {
    path: '/descripcion/index',
    name: 'descripcion-Index',
    component: () => import('../views/DescripcionIndex.vue')
  },
  {
    path: '/descripcion/detalle',
    name: 'descripcion-detalle',
    component: () => import('../views/DescripcionDetalle.vue')
  }
]

export default descripcionRoutes
