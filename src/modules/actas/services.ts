import { axiosRequest } from '@/helpers/api'
const MostrarActasFirmadas = async () => {
  const respuesta = await axiosRequest('/MostrarActasFirmadas', 'GET')
  return respuesta
}

const ActualizarEstadoActa = async (IDSESION: number, ESTADO: string) => {
  const respuesta = await axiosRequest('/AprobarActa', 'PUT', {
    IDSESION,
    ESTADO
  })
  return respuesta
}

const BuscarIdTema = async (valor:string) => {
  const respuesta = await axiosRequest(`/BuscarActas/${valor}`, 'GET')
  return respuesta
}

const BuscarActaPorFecha = async (Year:string,Month:string) => {
  const respuesta = await axiosRequest(`/BuscarActasFecha/${Year}/${Month}`, 'GET')
  return respuesta
}


const BuscarActaPorYear = async (Year:string) => {
  const respuesta = await axiosRequest(`/BuscarActaPorYear/${Year}`, 'GET')
  return respuesta
}

const BuscarActaPorTemaFecha = async (Year:string,Month:string,Tema:string) => {
  const respuesta = await axiosRequest(`/BuscarActasTemaFecha/${Year}/${Month}/${Tema}`, 'GET')
  return respuesta
}
export default {
  MostrarActasFirmadas,
  ActualizarEstadoActa,
  BuscarIdTema,
  BuscarActaPorFecha,
  BuscarActaPorYear,
  BuscarActaPorTemaFecha
}
