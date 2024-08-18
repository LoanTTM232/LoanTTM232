import htmlStatus from 'http-status'
import { ErrorRequestHandler, NextFunction, Request, Response } from 'express'
import { Prisma } from '@prisma/client'

import { isDev, isProd } from '@/config/env'
import ApiError from '@/exceptions/api.error'
import log from '@/config/logger'

export const errorConverter: ErrorRequestHandler = (
  err: any,
  _req: Request,
  _res: Response,
  next: NextFunction
) => {
  let error = err
  if (!(error instanceof ApiError)) {
    const statusCode =
      error.statusCode || error instanceof Prisma.PrismaClientKnownRequestError
        ? htmlStatus.BAD_REQUEST
        : htmlStatus.INTERNAL_SERVER_ERROR
    const message = error.message || htmlStatus[statusCode]
    error = new ApiError(statusCode, message, false, err.stack)
  }
  next(error)
}

export const errorHandler: ErrorRequestHandler = (
  err: any,
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  let { statusCode, message } = err
  if (isProd() && !err.isOperational) {
    statusCode = htmlStatus.INTERNAL_SERVER_ERROR
    message = htmlStatus[htmlStatus.INTERNAL_SERVER_ERROR]
  }
  res.locals.errorMessage = err.message
  const response = {
    code: statusCode,
    message,
    ...(isDev() && { stack: err.stack })
  }
  if (isDev()) {
    log.error(err)
  }
  res.status(statusCode).send(response)
}
