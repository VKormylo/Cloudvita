import {
  UserLoginParams,
  UserResponse,
  UserResponseWithToken,
  UserSignupParams
} from '~/types/user.types'
import { baseService } from './base-service'

export const authService = {
  signup: (user: UserSignupParams) => {
    return baseService.request<UserResponseWithToken>({
      method: 'POST',
      url: '/users/signup',
      data: user
    })
  },
  login: (user: UserLoginParams) => {
    return baseService.request<UserResponseWithToken>({
      method: 'POST',
      url: '/users/login',
      data: user
    })
  },
  isLoggedIn: async () => {
    try {
      return await baseService.request<UserResponse>({
        method: 'GET',
        url: '/users/isLoggedIn'
      })
    } catch (error) {
      console.error('Error checking login status:', error)
      return { user: null }
    }
  },
  logout: () => {
    return baseService.request<UserResponse>({
      method: 'GET',
      url: '/users/logout'
    })
  }
}
