import { axiosRequest } from '@/helpers/api'
const login = async (email: string, password: string,rol:string) => {
  // Cambia el método a 'POST' y pasa los datos
  const respuesta = await axiosRequest('/login', 'POST', { email, password,rol })
  return respuesta
}
const logout = async () => {
  // Cambia el método a 'POST' y pasa los datos
  const respuesta = await axiosRequest('/logout', 'POST')
  return respuesta
}

const CambiarPasswordUsuario = async (PasswordActual:string, NuevaPassword:string) =>{
  const respuesta = await axiosRequest('/CambiarPasswordUsuario','PUT',{PasswordActual,NuevaPassword})
  return respuesta
}


const RegistrarSolicitante = async (NOMBRE:string, IDENTIFICACION:string,TIPODESOLICITANTE:string, EMAIL:string,CELULAR:string,PASSWORD:string) =>{
  const respuesta = await axiosRequest('/RegistrarSolicitante','POST',{NOMBRE,IDENTIFICACION,TIPODESOLICITANTE,EMAIL,CELULAR,PASSWORD})
  return respuesta
}
export default {
  login,
  logout,
  CambiarPasswordUsuario,
  RegistrarSolicitante
}
