import { Document } from 'mongoose'

export interface UserDocument extends Document {
  name: string
  photo?: string
  password: string
  passwordConfirm: string | undefined
  passwordChangedAt: Date
  active: boolean
  correctPassword: (candidatePassword: string, userPassword: string) => boolean
  changedPasswordAfter: (JWTTimestamp: number) => boolean
}

export interface UserInterface {
  name: string
  photo?: string
  password: string
  passwordConfirm: string | undefined
}
