import { axiosRequest } from '@/helpers/api'
const SolicitudeID = async (id: number) => {
  const respuesta = await axiosRequest(`/SolicitanteIDsolicitud/${id}`, 'GET')
  return respuesta
}

const DetallesUsuarioSolicitante = async () => {
  const respuesta = await axiosRequest('/DetallesUsuarioSolicitante', 'GET')
  return respuesta
}
const getIDolicitante = async () => {
  const respuesta = await axiosRequest('/getIDolicitante', 'GET')
  return respuesta
}

const MostrarSolicitantes = async () => {
  const respuesta = await axiosRequest('/MostrarSolicitantes', 'GET')
  return respuesta
}

const mostrarSolicitantesConSolicitudes = async () => {
  const respuesta = await axiosRequest('/mostrarSolicitantesConSolicitudes', 'GET')
  return respuesta
}
const buscarSolicitante = async (id: string) => {
  const respuesta = await axiosRequest(`/buscarSolicitante/${id}`, 'GET')
  return respuesta
}

const mostrarSolicitantesPorTipo = async (Tipo:string) => {
  const respuesta = await axiosRequest(`/mostrarSolicitantesPorTipo/${Tipo}`, 'GET')
  return respuesta
}
export default {
  buscarSolicitante,
  SolicitudeID,
  DetallesUsuarioSolicitante,
  getIDolicitante,
  MostrarSolicitantes,
  mostrarSolicitantesConSolicitudes,
  mostrarSolicitantesPorTipo
}
