import { z } from 'zod'
import { UserSchema } from './user'

export const SignupSchema = UserSchema.extend({
  passwordConfirm: z
    .string()
    .nonempty("Field can't be empty")
    .min(8, 'Password must be at least 8 characters long')
}).refine((data) => data.password === data.passwordConfirm, {
  message: 'Passwords do not match',
  path: ['passwordConfirm']
})

export const LoginSchema = UserSchema

export type UserSignup = z.infer<typeof SignupSchema>
export type UserLogin = z.infer<typeof LoginSchema>
