export const services = {
  'backend-config': {
    path: '/_config',
    params: [],
  },
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
  'auth.verify': {
    path: '/verify',
    params: [],
  },
  'auth.reset': {
    path: '/forgot-password',
    params: [],
  },
  'auth.forgot-password': {
    path: '/forgot-password',
    params: [],
  },
  'auth.update-profile-information': {
    path: '/auth/user',
    params: [],
  },
  'auth.update-password': {
    path: '/auth/user',
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
  'role.paginate': {
    path: '/superuser/role',
    params: [],
  },
  'role.store': {
    path: '/superuser/role',
    params: [],
  },
  'role.show': {
    path: '/superuser/role/{id}',
    params: ['id'],
  },
  'role.update': {
    path: '/superuser/role/{id}',
    params: ['id'],
  },
  'role.destroy': {
    path: '/superuser/role/{id}',
    params: ['id'],
  },
  'role.toggle-permission': {
    path: '/superuser/role/{role}/toggle-permission/{permission}',
    params: ['role', 'permission'],
  },
  'user.paginate': {
    path: '/superuser/user',
    params: [],
  },
  'user.store': {
    path: '/superuser/user',
    params: [],
  },
  'user.show': {
    path: '/superuser/user/{id}',
    params: ['id'],
  },
  'user.update': {
    path: '/superuser/user/{id}',
    params: ['id'],
  },
  'user.destroy': {
    path: '/superuser/user/{id}',
    params: ['id'],
  },
  'user.toggle-permission': {
    path: '/superuser/user/{user}/permission/{permission}',
    params: ['user', 'permission'],
  },
  'user.toggle-role': {
    path: '/superuser/user/{user}/role/{role}',
    params: ['user', 'role'],
  },
  'translation.index': {
    path: '/translation',
    params: [],
  },
  'translation.list': {
    path: '/translation/{id}',
    params: ['id'],
  },
  'translation.show': {
    path: '/translation/{id}/{name}',
    params: ['id', 'name'],
  },
  'translation.update': {
    path: '/translation/{id}/{name}',
    params: ['id', 'name'],
  },
  'incoming-request.average': {
    path: '/incoming-request/average',
    params: [],
  },
}

export type Services = typeof services
export default services