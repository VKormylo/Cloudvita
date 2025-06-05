import { z } from 'zod'

export const UserSchema = z.object({
  name: z
    .string()
    .nonempty("Field can't be empty")
    .regex(
      /^[a-zA-Z '.-]*$/,
      'Username can only contain letters and certain symbols'
    )
    .min(2, 'Username must be at least 3 characters long')
    .max(20, 'Username must be at most 20 characters long'),
  password: z
    .string()
    .nonempty("Field can't be empty")
    .min(8, 'Password must be at least 8 characters long'),
  rememberMe: z.boolean()
})
