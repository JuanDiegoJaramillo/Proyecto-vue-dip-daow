import type { RouteRecordRaw } from 'vue-router'
const mienbrosRoutes: Array<RouteRecordRaw> = [
  {
    path: '/miembros/crear',
    name: 'miembros-Crear',
    component: () => import('../views/CrearMiembros.vue')
  },
  {
    path: '/miembros/actualizar/:id',
    name: 'miembros-Actualizar',
    component: () => import('../views/ActualizarMiembros.vue')
  },
  {
    path: '/miembros/index',
    name: 'miembros-Index',
    component: () => import('../views/MiembrosIndex.vue')
  },
  {
    path: '/miembros/detalle',
    name: 'mimnbros-detalle',
    component: () => import('../views/DetallesUsuarioMiembro.vue')
  },
  {
    path: '/Rol/miembro',
    name: 'Rol-Miembro',
    component: () => import('../views/RolMiembro/RolMiembro.vue')
  }
]

export default mienbrosRoutes
