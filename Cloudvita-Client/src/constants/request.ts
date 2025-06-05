export const URLs = {
  auth: {
    signup: 'users/signup',
    login: 'users/login',
    delete: 'users/deleteMe'
  },
  locations: {
    get: '/locations',
    update: '/locations/:id'
  }
} as const
