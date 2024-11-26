import type { RouteRecordRaw } from 'vue-router'
const asistenciaRoutes: Array<RouteRecordRaw> = [
  {
    path: '/asistencias/crear',
    name: 'asistencias-Crear',
    component: () => import('../views/CrearAsistencia.vue')
  },
  {
    path: '/asistencia/actualizar/:id',
    name: 'asistencias-Actualizar',
    component: () => import('../views/ActualizarAsistencia.vue')
  },
  {
    path: '/asistencia/index',
    name: 'asistencias-Listar',
    component: () => import('../views/AsistenciaMiembroIndex.vue')
  },
  {
    path: '/asistencia/detalle',
    name: 'asistencia-detalle',
    component: () => import('../views/AsistenciaDetalle.vue')
  }
]

export default asistenciaRoutes
