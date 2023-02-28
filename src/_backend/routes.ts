import services, { Services } from "./services"

export function route<T extends keyof Services>(route: T, params: Record<string, any> = {}) {
  const hostname = import.meta.env.VITE_API_HOST
  const service = services[route]
  const parameters = service.params as string[]
  const binds = new URLSearchParams({})
  const queries = new URLSearchParams({})

  for (const key of parameters) {
    if (!params.hasOwnProperty(key)) {
      throw new Error(`missing parameter [${key}] for route [${route}]`)
    }

    binds.set(key, params[key])
  }

  for (const key in params) {
    if (!parameters.includes(key)) {
      queries.set(key, params[key])
    }
  }

  let path = service.path

  for (const key of binds.keys()) {
    path = path.replaceAll(`{${key}}`, binds.get(key) || '')
  }

  path = `/${path}`.replace(/\/+/, '/').replace(/^\//, '')

  return `${hostname}/${path}` + (queries.toString() ? `?${queries.toString()}` : '')
}

export function assets(path: string) {
  return route('static', { path })
}
