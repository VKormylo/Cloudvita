import { NextFunction, Request, RequestHandler, Response } from 'express'
import { UserDocument } from '../types/user.types'

interface CustomRequest extends Request {
  user?: UserDocument
}

export const catchAsync = (
  fn: (req: any, res: Response, next: NextFunction) => Promise<void>
): RequestHandler => {
  return (req: Request, res: Response, next: NextFunction) => {
    fn(req, res, next).catch(next)
  }
}
