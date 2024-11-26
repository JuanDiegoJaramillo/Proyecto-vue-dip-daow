import { axiosRequest } from '@/helpers/api'
const MostrarInvitados = async () => {
  const respuesta = await axiosRequest('/MostrarInvitados', 'GET')
  return respuesta
}

const Registrarinvitados = async (NOMBRE:string, DEPENDENCIA:string, CARGO:string, EMAIL:string) =>{
  const urlLogin = "http://localhost:5173/"
  const respuesta = await axiosRequest('RegistrarInvitado','POST',{NOMBRE,DEPENDENCIA,CARGO,EMAIL,urlLogin})
  return respuesta
}
const DetallesUsuarioInvitado = async () => {
  const respuesta = await axiosRequest('/DetallesUsuarioInvitado', 'GET')
  return respuesta
}


export default {
  MostrarInvitados,
  Registrarinvitados,
  DetallesUsuarioInvitado,

}

