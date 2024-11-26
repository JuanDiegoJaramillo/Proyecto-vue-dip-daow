import axios from 'axios'

const instanceAxios = axios.create({
  baseURL: 'https://www.datos.gov.co/resource',
  timeout: 1000
})

export const axiosRequest = async (
  endpoint: string,
  method: string,
  data?: object,
  herperts?: object
) => {
  const headerValue =
    herperts == null
      ? { 'Content-Type': 'application/json' }
      : { 'Content-Type': 'application/x-www-form-urlencoded' }
  try {
    const response = await instanceAxios({
      url: endpoint,
      method: method,
      data: data,
      headers: headerValue
    })
    return {
      data: response.data,
      error: null
    }
  } catch (error) {
    return {
      data: null,
      error: error.response.data
    }
  }
}
