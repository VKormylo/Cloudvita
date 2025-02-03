import { ErrorRequestHandler, NextFunction, Request, Response } from 'express'
import {
  ErrorResponse,
  ErrorStatusCodesEnum,
  ErrorStatusEnum
} from '../types/error.types'
import { CastError } from 'mongoose'
import config from '../configs/config'

const handleCastErrorDB = (err: CastError) => {
  const message = `Invalid ${err.path}: ${err.value}.`
  return new ErrorResponse(message, 400)
}

const handleDuplicateFieldsDB = (err: any) => {
  const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0]

  const message = `Duplicate field value: ${value}. Please use another value!`
  return new ErrorResponse(message, 400)
}

const handleValidationErrorDB = (err: any) => {
  const errors = Object.values(err.errors).map((el: any) => el.message)

  const message = `Invalid input data. ${errors.join('. ')}`
  return new ErrorResponse(message, 400)
}

const handleJWTError = () => {
  return new ErrorResponse('Invalid token. Please log in again!', 401)
}

const handleJWTExpiredError = () => {
  return new ErrorResponse('Your token has expired! Please log in again.', 401)
}

const sendErrorDev = (err: ErrorResponse, res: Response) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack
  })
}

const sendErrorProd = (err: ErrorResponse, res: Response) => {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message
    })
  } else {
    console.error('ERROR 💥', err)
    res.status(500).json({
      status: ErrorStatusEnum.ERROR,
      message: 'Something went very wrong!'
    })
  }
}

export const handleErrorResponse: ErrorRequestHandler = (
  err: any,
  _: Request,
  res: Response,
  _1: NextFunction
) => {
  err.statusCode = err.statusCode || ErrorStatusCodesEnum.INTERNAL_SERVER_ERROR
  err.status = err.status || ErrorStatusEnum.ERROR

  if (config.NODE_ENV === 'development') {
    sendErrorDev(err, res)
  } else if (config.NODE_ENV === 'production') {
    let error = { ...err, errmsg: err.errmsg }
    if (err.name === 'CastError') error = handleCastErrorDB(error)
    if (error.code === 11000) error = handleDuplicateFieldsDB(error)
    if (err.name === 'ValidationError') error = handleValidationErrorDB(err)
    if (err.name === 'JsonWebTokenError') error = handleJWTError()
    if (err.name === 'TokenExpiredError') error = handleJWTExpiredError()

    sendErrorProd(error, res)
  }
}
