import { axiosRequest } from '@/helpers/api'
const MostrarMiembros = async () => {
  const respuesta = await axiosRequest('/MostrarMiembros', 'GET')
  return respuesta
}

const MiembrosAsignadosTarea = async (IDTarea: number) => {
  const respuesta = await axiosRequest(`/MiembrosAsignadosTarea/${IDTarea}`, 'GET')
  return respuesta
}

const AsignarResponsable = async (IDTAREAS: number, IDMIEMBROS: number) => {
  const respuesta = await axiosRequest('/AsignarResponsable', 'POST', { IDTAREAS, IDMIEMBROS })
  return respuesta
}

const DesasignarResponsable = async (IDMIEMBROS: number, IDTAREAS: number) => {
  const respuesta = await axiosRequest(
    `/DesasignarResponsable/${IDMIEMBROS}/${IDTAREAS}`,
    'DELETE'
  )
  return respuesta
}


const RegistrarMiembro = async (NOMBRE:string, CARGO:string, EMAIL:string) =>{
  const urlLogin = "http://localhost:5173/"
  const respuesta = await axiosRequest('/RegistrarMiembro','POST',{NOMBRE,CARGO,EMAIL,urlLogin})
  return respuesta
}
const DetallesUsuarioMiembro= async () => {
  const respuesta = await axiosRequest('/DetallesUsuarioMiembro', 'GET')
  return respuesta
}
const getIMiembro = async () => {
  const respuesta = await axiosRequest('/getIMiembro', 'GET')
  return respuesta
}
export default {
  MostrarMiembros,
  MiembrosAsignadosTarea,
  AsignarResponsable,
  DesasignarResponsable,
  RegistrarMiembro,
  DetallesUsuarioMiembro,
  getIMiembro
}
