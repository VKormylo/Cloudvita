import jwt, { JwtPayload, SignOptions } from 'jsonwebtoken'
import { NextFunction, Request, Response } from 'express'
import { catchAsync } from '../utils/catchAsync'
import { UserDocument, UserInterface } from '../types/user.types'
import { ErrorResponse } from '../types/error.types'
import { DEFAULT_EXPIRES_IN } from '../constants/constants'
import User from '../models/user'
import config from '../configs/config'
import { CustomRequest } from '../types/common.types'

const signToken = (id: string) => {
  return jwt.sign({ id }, config.JWT_SECRET, {
    expiresIn: config.JWT_EXPIRES_IN
  } as SignOptions)
}

const createSendToken = (
  user: Omit<UserDocument, 'password'> & { password: string | undefined },
  statusCode: number,
  res: Response
) => {
  const token = signToken(user._id as string)
  const expiresIn = config.JWT_COOKIE_EXPIRES_IN || DEFAULT_EXPIRES_IN
  const cookieOptions = {
    expires: new Date(Date.now() + +expiresIn * 24 * 60 * 60 * 1000),
    secure: false,
    httpOnly: true
  }

  if (config.NODE_ENV === 'production') cookieOptions.secure = true

  res.cookie('jwt', token, cookieOptions)

  user.password = undefined

  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user: user
    }
  })
}

export const signup = catchAsync(async (req: Request, res: Response) => {
  const { name, email, password, passwordConfirm } = req.body as UserInterface
  const newUser: UserDocument = await User.create({
    name,
    email,
    password,
    passwordConfirm
  })

  createSendToken(newUser, 201, res)
})

export const login = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body

    if (!email || !password) {
      return next(new ErrorResponse('Please provide email and password!', 400))
    }

    const user: UserDocument = await User.findOne({ email }).select('+password')

    if (!user || !(await user.correctPassword(password, user.password))) {
      return next(new ErrorResponse('Invalid email or password!', 401))
    }

    createSendToken(user, 200, res)
  }
)

export const protect = catchAsync(
  async (req: CustomRequest<UserDocument>, _: Response, next: NextFunction) => {
    let token
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1]
    }

    if (!token) {
      return next(
        new ErrorResponse(
          'You are not logged in! Please log in to get access.',
          401
        )
      )
    }

    const decoded = jwt.verify(token, config.JWT_SECRET) as JwtPayload

    const currentUser = await User.findById(decoded.id)
    if (!currentUser) {
      return next(
        new ErrorResponse(
          'The user belonging to this token does no longer exist.',
          401
        )
      )
    }

    if (currentUser.changedPasswordAfter(decoded.iat as number)) {
      return next(
        new ErrorResponse(
          'User has recently changed password! Please log in again.',
          401
        )
      )
    }

    req.user = currentUser
    next()
  }
)
