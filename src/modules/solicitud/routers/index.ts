import type { RouteRecordRaw } from 'vue-router'

const solicitudRoutes: Array<RouteRecordRaw> = [
  {
    path: '/solicitud/crear',
    name: 'solicitud-Crear',
    component: () => import('../views/CrearSolicitud.vue')
  },
  {
    path: '/solicitud/actualizar/:idSolicitud',
    name: 'solicitud-Actualizar',
    component: () => import('../views/ActualizarSolicitud.vue')
  },
  {
    path: '/solicitud/index',
    name: 'solicitud-Index',
    component: () => import('../views/SolicitudIndex.vue')
  },
  {
    path: '/solicitud/detalle',
    name: 'solicitud-detalle',
    component: () => import('../views/SolicitudDetalle.vue')
  },
  {
    path: '/solicitudes/vista/:idSesion/:idSolicitante',
    name: 'solicitud-vista',
    component: () => import('../views/VistaSolicitudes.vue')
  },
  {
    path: '/sesiones/solicitudes/:idsolicitante',
    name: 'sesiones-solicitudes',
    component: () => import('../views/SesionesSolicitud.vue')
  },
  {
    path: '/solicitantes/solicitudes',
    name: 'solicitantes-solicitudes',
    component: () => import('../views/SolisitantesSolicitud.vue')
  },
  {
    path: '/sesionesSolicitud/RolSolicitante',
    name: 'Solicitud-RolSolicitante',
    component: () => import('../views/Solicitante/SesionesSolicitud.vue')
  },
  {
    path: '/Solicitudes/RolSolicitante',
    name: 'Solicitudes-RolSolicitante',
    component: () => import('../views/CrearSolicitudRolSolicitante.vue')
  },
]

export default solicitudRoutes
