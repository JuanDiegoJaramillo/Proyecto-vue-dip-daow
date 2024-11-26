import type { RouteRecordRaw } from 'vue-router'
const invitadosRoutes: Array<RouteRecordRaw> = [
  {
    path: '/invitados/crear',
    name: 'invitados-Crear',
    component: () => import('../views/CrearInvitados.vue')
  },
  {
    path: '/invitados/actualizar/:id',
    name: 'invitados-Actualizar',
    component: () => import('../views/ActualizarInvitados.vue')
  },
  {
    path: '/invitados/index',
    name: 'invitados-Index',
    component: () => import('../views/InvitadosIndex.vue')
  },
  {
    path: '/invitados/detalle',
    name: 'invitados-detalle',
    component: () => import('../views/DetallesUsuarioInvitado.vue')
  }
]

export default invitadosRoutes
