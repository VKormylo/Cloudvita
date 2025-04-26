import { model, Query, Schema } from 'mongoose'
import { UserDocument } from '../types/user.types'
import ModelsEnum from '../constants/models'
import bcrypt from 'bcryptjs'

const userSchema = new Schema<UserDocument>({
  name: {
    type: String,
    required: [true, 'Please provide your name'],
    unique: true
  },
  photo: String,
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: 8,
    select: false
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please confirm your password'],
    validate: function (el: string) {
      return el === (this as UserDocument).password
    },
    message: 'Passwords are not the same'
  },
  passwordChangedAt: Date,
  active: {
    type: Boolean,
    default: true,
    select: false
  },
  savedLocations: [
    {
      _id: false,
      locationId: {
        type: Schema.Types.ObjectId,
        required: [true, 'A location must have an id'],
        ref: ModelsEnum.LOCATION
      },
      lastViewed: {
        type: Date,
        required: [true, 'A location must have a last viewed date'],
        default: Date.now
      }
    }
  ]
})

userSchema.pre<UserDocument>('save', async function (next: Function) {
  if (!this.isModified('password')) return next()

  this.password = await bcrypt.hash(this.password, 12)
  this.passwordConfirm = undefined
  next()
})

userSchema.pre<Query<any, UserDocument>>(/^find/, function (next: Function) {
  this.find({ active: { $ne: false } })
  next()
})

userSchema.methods.correctPassword = async function (
  candidatePassword: string,
  userPassword: string
) {
  return await bcrypt.compare(candidatePassword, userPassword)
}

userSchema.methods.changedPasswordAfter = function (JWTTimestamp: number) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      (this.passwordChangedAt.getTime() / 1000).toString(),
      10
    )
    console.log(changedTimestamp, JWTTimestamp)
    return JWTTimestamp < changedTimestamp
  }
  return false
}

export default model<UserDocument>(ModelsEnum.USER, userSchema)
