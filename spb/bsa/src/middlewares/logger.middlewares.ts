/// external package imports
import morgan, { StreamOptions } from 'morgan'

/// internal package imports
import { isDev } from '@/config/env'
import Logger from '@/config/logger'

const stream: StreamOptions = {
  write: (message) => Logger.http(message)
}

const skip = () => {
  return isDev()
}

// Build the morgan middleware
const loggerMiddleware = morgan(':method :url :status :res[content-length] - :response-time ms', { stream, skip })

export default loggerMiddleware
