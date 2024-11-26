import { axiosRequest } from '@/helpers/api'

const InsertarTarea = async (
    DESCRIPCION: string,
    IDSESION: number
  ) => {
    const respuesta = await axiosRequest('/InsertarTarea', 'POST', {
        DESCRIPCION,
        IDSESION
    })
    return respuesta
  }


  const MostrarTareasIDSesion = async (IDSESION: number) => {
    const respuesta = await axiosRequest(`/MotrarTareasIDSesion/${IDSESION}`, 'GET')
    return respuesta
  }

  const ActualizarTarea = async (IDTAREA: number, DESCRIPCION: string, IDSESION: number) => {
    const respuesta = await axiosRequest('/ActualizarTarea', 'PUT', {
        IDTAREA,
        DESCRIPCION,
        IDSESION
    })
    return respuesta
  }

  const EliminarTarea = async (IDTAREA: number) => {
    const respuesta = await axiosRequest(`/EliminarTarea/${IDTAREA}`, 'DELETE')
    return respuesta
  }

  const MostrarTareasSesionAnterior = async (IDSesion: number) => {
    const respuesta = await axiosRequest(`/MotrarTareasSesioAnterior/${IDSesion}`, 'GET')
    return respuesta
  }

  const ActualizarEstadoTarea = async (IDTAREA: number, ESTADO: string) => {
    const respuesta = await axiosRequest(`/cambiarEstadoTarea`, 'PUT', {
      IDTAREA,
        ESTADO
    })
    return respuesta
  }

  

  export default {
    InsertarTarea,
    MostrarTareasIDSesion,
    ActualizarTarea,
    EliminarTarea,
    MostrarTareasSesionAnterior,
    ActualizarEstadoTarea
  }