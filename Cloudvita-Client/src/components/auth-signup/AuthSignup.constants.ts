import { UserSignup } from '~/schemas'

export const initialSignupValues: UserSignup = {
  name: '',
  password: '',
  passwordConfirm: '',
  rememberMe: false
}
