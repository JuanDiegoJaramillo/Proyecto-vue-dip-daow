//modules/sesion/services
import { axiosRequest } from '@/helpers/api'
const MostrarSesiones = async () => {
  const respuesta = await axiosRequest('/mostrarSesiones', 'GET')
  return respuesta
}

const MostrarSesionIDSesion = async (IDSesion:number) => {
  const respuesta = await axiosRequest(`/mostrarSesioneIDSesion/${IDSesion}`, 'GET')
  return respuesta
}
const ProponerFecha = async () => {
  const respuesta = await axiosRequest('/proponerFecha', 'GET')
  return respuesta
}

const InsertarSesion = async (
  LUGAR: string,
  FECHA: string,
  HORAINICIO: string,
  HORAFINAL: string,
  PRESIDENTE: string,
  SECRETARIO: string
) => {
  const respuesta = await axiosRequest('/InsertarSesion', 'POST', {
    LUGAR,
    FECHA,
    HORAINICIO,
    HORAFINAL,
    PRESIDENTE,
    SECRETARIO
  })
  return respuesta
}

const solicitudes = async (idSesion: number) => {
  const respuesta = await axiosRequest(`/SolicitudesSesion/${idSesion}`, 'GET')
  return respuesta
}

const AsistenciaMiembros = async (idSesion: number) => {
  const respuesta = await axiosRequest(`/asistenciaMiembroSesion/${idSesion}`, 'GET')
  return respuesta
}

const ActualizarAsistenciaMiembro = async (estado: string, idSesion: number, idMiembro: number) => {
  const respuesta = await axiosRequest(`/actualizarAsistenciaMiembro`, 'PUT', {
    estado,
    idSesion,
    idMiembro
  })
  return respuesta
}
const AsistenciaInvitados = async (idSesion: number) => {
  const respuesta = await axiosRequest(`/AsistenciaInvitadosSesion/${idSesion}`, 'GET')
  return respuesta
}
const ActualizarAsistenciaInvitado = async (
  estado: string,
  idSesion: number,
  idInvitado: number
) => {
  const respuesta = await axiosRequest(`/actualizarAsistenciaInvitados`, 'PUT', {
    estado,
    idSesion,
    idInvitado
  })
  return respuesta
}

const MostrarInvitacionPendiente = async (idSesion: number) => {
  const respuesta = await axiosRequest(`/obtenerInvitadosNoAsistentes/${idSesion}`, 'GET')
  return respuesta
}

const AgregarInvitado = async (idSesion: number, idInvitado: number) => {
  const respuesta = await axiosRequest(`/AgregarInvitado`, 'POST', { idSesion, idInvitado })
  return respuesta
}

const EliminarAsistenciaInvitado = async (sesionId: number, invitadoId: number) => {
  const respuesta = await axiosRequest(
    `/EliminarAsistenciaInvitado/${sesionId}/${invitadoId}`,
    'DELETE'
  )
  return respuesta
}

const CardarMiembros = async (idSesion: number) => {
  const respuesta = await axiosRequest(`/cargarMiembros`, 'POST', { idSesion })
  return respuesta
}

const TodosCitados = async (idSesion: number) => {
  const respuesta = await axiosRequest(`/Todoscitados/${idSesion}`, 'GET')
  return respuesta
}

const ActaAnterior = async (idSesion: number) => {
  const respuesta = await axiosRequest(`/ActaAnterior/${idSesion}`, 'GET')
  return respuesta
}

const mostrarSesionesSolicitante = async (idSolicitante: number) => {
  const respuesta = await axiosRequest(`/mostrarSesionesSolicitante/${idSolicitante}`, 'GET')
  return respuesta
}

export default {
  MostrarSesiones,
  MostrarSesionIDSesion,
  ActaAnterior,
  ProponerFecha,
  InsertarSesion,
  solicitudes,
  AsistenciaMiembros,
  ActualizarAsistenciaMiembro,
  AsistenciaInvitados,
  ActualizarAsistenciaInvitado,
  MostrarInvitacionPendiente,
  AgregarInvitado,
  EliminarAsistenciaInvitado,
  CardarMiembros,
  TodosCitados,
  mostrarSesionesSolicitante
}
