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
    path: '/superuser/permission',
    params: [],
  },
  'permission.store': {
    path: '/superuser/permission',
    params: [],
  },
  'permission.update': {
    path: '/superuser/permission/{id}',
    params: ['id'],
  },
  'permission.destroy': {
    path: '/superuser/permission/{id}',
    params: ['id'],
  },
}

export type Services = typeof services
export default services