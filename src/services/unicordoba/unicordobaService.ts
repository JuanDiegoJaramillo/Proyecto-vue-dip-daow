import { axiosRequest } from '@/helpers/api_copia'
interface RespuestaItem {
  facultad: string
  periodo: string
}
const LoadData = async () => {
  return await axiosRequest('/tnus-a4s5.json', 'GET')
}
const FacultadesDisponibles = async () => {
  const respuesta = await axiosRequest('/tnus-a4s5.json', 'GET')
  if (respuesta.error == null) {
    return Array.from(new Set(respuesta.data.map((item: RespuestaItem) => item.facultad)))
  } else {
    return null
  }
}
const BuscarFacultadad = async (facultad: string) => {
  const respuesta = await axiosRequest(`/tnus-a4s5.json?facultad=${facultad}`, 'GET')
  if (respuesta.error == null) {
    return respuesta.data
  } else {
    return null
  }
}
const BuscarPeridoFacultad = async (facultad: string) => {
  const respuesta = await axiosRequest(`/tnus-a4s5.json?facultad=${facultad}`, 'GET')
  if (respuesta.error == null) {
    return Array.from(new Set(respuesta.data.map((item: RespuestaItem) => item.periodo)))
  } else {
    return null
  }
}
const BuscarFacultadadPeriodo = async (facultad: string, periodo: string) => {
  const respuesta = await axiosRequest(
    `/tnus-a4s5.json?facultad=${facultad}&periodo=${periodo}`,
    'GET'
  )
  if (respuesta.error == null) {
    return respuesta.data
  } else {
    return null
  }
}

export default {
  LoadData,
  FacultadesDisponibles,
  BuscarFacultadad,
  BuscarPeridoFacultad,
  BuscarFacultadadPeriodo
}
