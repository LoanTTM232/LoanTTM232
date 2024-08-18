import dotenv from 'dotenv'
import defaultVal from '@/constants/default'
import { ERROR_MSG } from '@/constants/message'

// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || 'development'

const envFound = dotenv.config()
if (envFound.error) {
  // This error should crash whole process
  throw new Error(ERROR_MSG.ERR002)
}

export function isDev(): boolean {
  return process.env.NODE_ENV === 'development'
}

export function isProd(): boolean {
  return process.env.NODE_ENV === 'production'
}

export default {
  /**
   * API server port
   */
  server_port: parseInt(process.env.PORT as string, 10) || defaultVal.PORT,
  /**
   * Database URL
   */
  databaseURL: process.env.POSTGRES_URL as string,
  /**
   * Your secret source
   */
  jwtSecret: process.env.JWT_SECRET as string,
  /**
   * Used by winston logger
   */
  logs: {
    level: process.env.LOG_LEVEL || 'debug'
  },
  /**
   * API configs
   */
  api: {
    prefix: '/api'
  }
}
