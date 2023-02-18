import axios from "axios"
import { route } from "./_backend/routes"

axios.defaults.xsrfCookieName = 'X-CSRF-TOKEN'
axios.defaults.xsrfHeaderName = 'X-CSRF-TOKEN'

axios.interceptors.request.use(async config => {
  if (['POST', 'PUT', 'PATCH', 'DELETE'].includes(config.method!.toUpperCase())) {
    const response = await fetch(route('csrf'), {
      method: 'POST',
    })
    const { token } = await response.json()
    config.headers.set(axios.defaults.xsrfHeaderName, token)
  }
  
  return config
})

axios.interceptors.response.use(async config => {
  if (window.location.pathname.toLowerCase() !== '/login' && config.status === 401) {
    localStorage.removeItem('token')
    window.location.reload()
  }

  return config
})