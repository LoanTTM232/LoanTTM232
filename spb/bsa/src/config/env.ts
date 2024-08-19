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
  serverPort: parseInt(process.env.PORT as string, 10) || defaultVal.PORT,
  /**
   * Client URL (default to all domains)
   */
  clientUrl: (process.env.CLIENT_URL as string) || '*',
  /**
   * JWT secret
   */
  jwtSecret: process.env.JWT_SECRET as string,
  /**
   * Redis secret
   */
  redisSecret: process.env.REDIS_SECRET as string,
  /**
   * Redis host
   */
  redisHost: process.env.REDIS_HOST as string,
  /**
   * Redis port
   */
  redisPort: parseInt(process.env.REDIS_PORT as string, 10) || 6379,
  /**
   * Redis password
   */
  redisPassword: process.env.REDIS_PASSWORD as string,
  /**
   * Cookie max age
   */
  cookieMaxAge:
    parseInt(process.env.COOKIE_MAX_AGE as string, 10) ||
    defaultVal.COOKIE_MAX_AGE,
  /**
   * Cookie secure (https only)
   */
  cookieSecure: process.env.COOKIE_SECURE === 'true',
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
