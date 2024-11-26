import router from '@/router'
import axios from 'axios'

const instanceAxios = axios.create({
  baseURL: 'http://localhost/crear-actas-backend',
  timeout: 5000
})

export const axiosRequest = async (
  endpoint: string,
  method: string,
  data?: object,
  customHeaders?: object // Cambié "herperts" a "customHeaders" para claridad
) => {
  const token = localStorage.getItem('authToken') // Recupera el token del localStorage

  // Configura los encabezados
  const headerValue = {
    'Content-Type': customHeaders ? 'application/x-www-form-urlencoded' : 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }), // Agrega el token si está disponible
    ...customHeaders // Permite sobrescribir o agregar encabezados personalizados
  }

  try {
    const response = await instanceAxios({
      url: endpoint,
      method: method.toUpperCase(), // Asegúrate de que el método sea siempre en mayúsculas
      data: data,
      headers: headerValue
    })

    return {
      data: response.data,
      error: null,
      status: response.status
    }
  } catch (error: any) {
    if (error.response) {
      const status = error.response.status

      if (status === 401) {
        // Si el backend devuelve un estado 401, redirige al login
        await logout()
      }

      return {
        data: null,
        error: error.response.data,
        status: status
      }
    } else {
      console.error('Error desconocido:', error)

      return {
        data: null,
        error: 'Error desconocido',
        status: null
      }
    }
  }
}

const logout = async () => {
  try {
    // Si tienes un endpoint para hacer logout, descomenta la siguiente línea
    // const respuesta = await axiosRequest('/logout', 'POST');

    localStorage.removeItem('authToken') // Elimina el token almacenado
    localStorage.removeItem('user')
    localStorage.removeItem('nombre')
    localStorage.removeItem('userRole')
    router.replace({ name: 'login' }) // Redirigir al login, pero usando replace
    window.location.reload() // Recargar la página para asegurar que el estado no se quede en caché
  } catch (error) {
    console.error('Error al hacer logout:', error)
  }
}
