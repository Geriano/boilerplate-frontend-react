export const services = {
  'csrf': {
    path: '/csrf',
    params: [],
  },
  'auth.user': {
    path: '/user',
    params: [],
  },
  'auth.login': {
    path: '/login',
    params: [],
  },
  'auth.logout': {
    path: '/logout',
    params: [],
  },
  'auth.register': {
    path: '/register',
    params: [],
  },
  'auth.forgot-password': {
    path: '/forgot-password',
    params: [],
  },
  'permission.all': {
    path: '/permission',
    params: [],
  },
  'permission.store': {
    path: '/permission',
    params: [],
  },
  'permission.update': {
    path: '/permission/{id}',
    params: ['id'],
  },
  'permission.destroy': {
    path: '/permission/{id}',
    params: [],
  },
}

export type Services = typeof services
export default services