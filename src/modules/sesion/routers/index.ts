import type { RouteRecordRaw } from 'vue-router'

const sesioRoutes: Array<RouteRecordRaw> = [
  {
    path: '/sesion/crear',
    name: 'sesion-Crear',
    component: () => import('../views/CrearSesions.vue')
  },
  {
    path: '/sesion/actualizar/:id',
    name: 'sesion-Actualizar',
    component: () => import('../views/ActualizarSesion.vue')
  },
  {
    path: '/sesion/index',
    name: 'sesion-Index',
    component: () => import('../views/SesionIndex.vue')
  },
  {
    path: '/sesion/detalle',
    name: 'sesion-detalle',
    component: () => import('../views/SesionDetalle.vue')
  },
  {
    path: '/sesion/opciones/:IDSESION',
    name: 'sesion-opciones',
    component: () => import('../views/OpcionesSesion.vue')
  }
]

export default sesioRoutes
