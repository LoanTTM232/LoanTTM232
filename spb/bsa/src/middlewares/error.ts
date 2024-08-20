import htmlStatus from 'http-status'
import Logger from 'bunyan'
import { ErrorRequestHandler, NextFunction, Request, Response } from 'express'

import { isDev, isProd, config } from '@/config'

const log: Logger = config.createLogger('ERROR_HANDLER')

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
