import { axiosRequest } from '@/helpers/api'
const SolicitudesSesion = async () => {
  const respuesta = await axiosRequest('/SolicitudesSesion', 'GET')
  return respuesta
}

const Seciones = async () => {
  const respuesta = await axiosRequest('/MostrarSesionSelect', 'GET')
  return respuesta
}

const Solicitantes = async () => {
  const respuesta = await axiosRequest('/MostrarSolicitantes', 'GET')
  return respuesta
}

const Descripciones = async () => {
  const respuesta = await axiosRequest('/MostrarDescripciones', 'GET')
  return respuesta
}

const InsertarSolicitud = async (
  DEPENDENCIA: string,
  ASUNTO: string,
  IDSOLICITANTE: number,
  IDSESION: number,
  IDDESCRIPCION: number
) => {
  const respuesta = await axiosRequest('/InsertarSolicitud', 'POST', {
    DEPENDENCIA,
    ASUNTO,
    IDSOLICITANTE,
    IDSESION,
    IDDESCRIPCION
  })
  return respuesta
}

const SolicitudSelecionada = async (idSolicitud: number) => {
  const respuesta = await axiosRequest(`/SolicitudSelecionada/${idSolicitud}`, 'GET')
  return respuesta
}

const ActualizarSolicitud = async (
  DEPENDENCIA: string,
  ASUNTO: string,
  IDSOLICITANTE: number,
  IDSESION: number,
  IDDESCRIPCION: number,
  IDSOLICITUD: number
) => {
  const respuesta = await axiosRequest('/ActualizarSolicitud', 'PUT', {
    DEPENDENCIA,
    ASUNTO,
    IDSOLICITANTE,
    IDSESION,
    IDDESCRIPCION,
    IDSOLICITUD
  })
  return respuesta
}

const ResponderSolicitud = async (
  DESICION: string,
  IDSOLICITUD: number
) => {
  const respuesta = await axiosRequest('/ResponderSolicitud', 'PUT', {
    DESICION,
    IDSOLICITUD
  })
  return respuesta
}

const EliminarSolicitud = async (idSolicitud: number) => {
  const respuesta = await axiosRequest(`/EliminarSolicitud/${idSolicitud}`, 'DELETE')
  return respuesta
}

const solicitudesSesionSolicitante = async (idSesion:number,idSolicitante:number) => {
  const respuesta = await axiosRequest(`/solicitudesSesionSolicitante/${idSesion}/${idSolicitante}`, 'GET')
  return respuesta
}

export default {
  SolicitudesSesion,
  Seciones,
  Solicitantes,
  Descripciones,
  InsertarSolicitud,
  SolicitudSelecionada,
  ActualizarSolicitud,
  ResponderSolicitud,
  EliminarSolicitud,
  solicitudesSesionSolicitante
}
