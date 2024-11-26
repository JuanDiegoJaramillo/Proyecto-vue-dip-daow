import { axiosRequest } from '@/helpers/api'

const listarProposicionesSesion = async (idSesion:number) => {
  const respuesta = await axiosRequest(`/listarProposicionesSesion/${idSesion}`, 'GET')
  return respuesta
}

const RegistrarProposiciones= async (descripcion:string, idMiembro:number, idSesion:number) =>{

  const respuesta = await axiosRequest('/crearProposicion','POST',{descripcion,idMiembro,idSesion})
  return respuesta
}

export default {
    listarProposicionesSesion,
    RegistrarProposiciones
}