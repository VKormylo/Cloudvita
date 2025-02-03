import { NextFunction, Request, RequestHandler, Response } from 'express'
import { ErrorResponse } from '../types/error.types'

export const incorrectUrl: RequestHandler = (
  req: Request,
  _: Response,
  next: NextFunction
) => {
  const err = new ErrorResponse(`Can't find ${req.originalUrl} on this server!`)
  next(err)
}
