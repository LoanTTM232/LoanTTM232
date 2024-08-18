import httpStatus from 'http-status'
import morgan from 'morgan'
import { Request, Response } from 'express'

import log from '@/config/logger'
import { isDev } from '@/config/env'

morgan.token(
  'message',
  (_req: Request, res: Response) => res.locals.errorMessage || ''
)

const getIpFormat = () => (isDev() ? '' : ':remote-addr - ')
const successResponseFormat = `${getIpFormat()}:method :url :status - :response-time ms`
const errorResponseFormat = `${getIpFormat()}:method :url :status - :response-time ms - message: :message`

const successHandler = morgan(successResponseFormat, {
  skip: (_req: Request, res: Response) => res.statusCode >= httpStatus.OK,
  stream: { write: (message) => log.info(message.trim()) }
})

const errorHandler = morgan(errorResponseFormat, {
  skip: (_req: Request, res: Response) => res.statusCode < httpStatus.OK,
  stream: { write: (message) => log.error(message.trim()) }
})

export default { successHandler, errorHandler }
