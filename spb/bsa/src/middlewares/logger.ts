import HTTP_STATUS from 'http-status'
import morgan from 'morgan'
import Logger from 'bunyan'
import { Request, Response } from 'express'

import { isDev, config } from '@/config'

const log: Logger = config.createLogger('API')

morgan.token(
  'message',
  (_req: Request, res: Response) => res.locals.errorMessage || ''
)

const getIpFormat = () => (isDev() ? '' : ':remote-addr - ')
const successResponseFormat = `${getIpFormat()}:method :url :status - :response-time ms`
const errorResponseFormat = `${getIpFormat()}:method :url :status - :response-time ms - message: :message`

const successHandler = morgan(successResponseFormat, {
  skip: (_req: Request, res: Response) =>
    res.statusCode >= HTTP_STATUS.NOT_FOUND,
  stream: { write: (message) => log.info(message.trim()) }
})

const errorHandler = morgan(errorResponseFormat, {
  skip: (_req: Request, res: Response) =>
    res.statusCode < HTTP_STATUS.NOT_FOUND,
  stream: { write: (message) => log.error(message.trim()) }
})

export default { successHandler, errorHandler }
