import { axiosRequest } from '@/helpers/api'

const TemasSesion = async (id: number) => {
  const endpoint = `/TemasSesion/${id}` // Inserta el ID en la URL
  const respuesta = await axiosRequest(endpoint, 'GET')
  return respuesta
}
const datosTema = async (id: number) => {
  const endpoint = `/datosOrdenSesion/${id}` // Inserta el ID en la URL
  const respuesta = await axiosRequest(endpoint, 'GET')
  return respuesta
}

const InsertarTema = async (tema: string, descripcion: string, idSesion: number) => {
  const endpoint = `/InsertarTema` // Inserta el ID en la URL
  const respuesta = await axiosRequest(endpoint, 'POST', { tema, descripcion, idSesion })
  return respuesta
}

const ActualizarTema = async (
  tema: string,
  descripcion: string,
  idTema: number,
  idSesion: Number
) => {
  const endpoint = `/ActualizarTema` // Inserta el ID en la URL
  const respuesta = await axiosRequest(endpoint, 'PUT', { tema, descripcion, idTema, idSesion })
  return respuesta
}

const EliminarTema = async (id: number) => {
  const endpoint = `/EliminarTema/${id}` // Inserta el ID en la URL
  const respuesta = await axiosRequest(endpoint, 'DELETE')
  return respuesta
}
export default {
  TemasSesion,
  datosTema,
  InsertarTema,
  ActualizarTema,
  EliminarTema
}
