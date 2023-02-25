import { route } from "./_backend/routes"
import axios from "axios"

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

  if (config.url) {
    const search = location.search
    config.url = config.url.includes('?') ? config.url + search.replace(/\?/, '&') : config.url + search
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