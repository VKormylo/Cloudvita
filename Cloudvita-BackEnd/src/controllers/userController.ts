import { NextFunction, Request, Response } from 'express'
import User from '../models/user'
import { catchAsync } from '../utils/catchAsync'
import { UserDocument } from '../types/user.types'

export const getAllUsers = catchAsync(
  async (_: Request, res: Response, _1: NextFunction) => {
    const users: UserDocument[] = await User.find()

    res.status(200).json({
      status: 'success',
      results: users.length,
      data: {
        users
      }
    })
  }
)

export const deleteMe = catchAsync(
  async (
    req: Request & { user: UserDocument },
    res: Response,
    _: NextFunction
  ) => {
    await User.findByIdAndUpdate(req.user.id, { active: false })
    res.status(204).json({
      status: 'success',
      data: null
    })
  }
)
