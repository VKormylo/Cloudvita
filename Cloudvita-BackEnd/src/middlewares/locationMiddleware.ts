import { NextFunction, Request, RequestHandler, Response } from 'express'

export const updateDate: RequestHandler = (
  req: Request,
  _: Response,
  next: NextFunction
) => {
  req.body.lastViewed = new Date()
  next()
}
