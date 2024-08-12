import { NextFunction, Request, Response } from 'express'
import { StatusCode, StatusMessage } from '@/constants/enum'
import HttpException from '@/exceptions/http.exception'

function errorMiddleware(error: HttpException, _request: Request, response: Response, _next: NextFunction) {
  const status = error.status || StatusCode.INTERNAL_SERVER_ERROR
  const message = error.message || StatusMessage.INTERNAL_SERVER_ERROR
  response.status(status).send({
    message,
    status
  })
}

export default errorMiddleware
