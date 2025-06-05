export interface User {
  _id: string
  name: string
}

export interface UserResponse {
  user: User
}

export interface UserResponseWithToken extends UserResponse {
  token: string
}

export interface UserParams {
  name: string
  password: string
}

export interface UserSignupParams extends UserParams {
  passwordConfirm: string
  rememberMe: boolean
}

export interface UserLoginParams extends UserParams {
  rememberMe: boolean
}
