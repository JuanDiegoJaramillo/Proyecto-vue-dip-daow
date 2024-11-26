import type { RouteRecordRaw } from 'vue-router'
const ViewsPath = '../views/'
const ordenRoutes: Array<RouteRecordRaw> = [
  {
    path: '/orden/crear',
    name: 'orden-Crear',
    component: () => import('../views/CrearOrdenSesion.vue')
  },
  {
    path: '/orden/actualizar/:id',
    name: 'orden-Actualizar',
    component: () => import('../views/ActualizarOrdenSesion.vue')
  },
  {
    path: '/orden/listar',
    name: 'orden-Listar',
    component: () => import(ViewsPath + 'ListarOrdenSesion.vue')
  },
  {
    path: '/orden/detalle',
    name: 'orden-detalle',
    component: () => import('../views/OrdenSesionDetalle.vue')
  }
]

export default ordenRoutes
