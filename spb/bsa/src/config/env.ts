/// external package imports
import dotenv from 'dotenv'

/// internal package imports
import _default from '@/constants/default'

// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || 'development'

const envFound = dotenv.config()
if (envFound.error) {
  // This error should crash whole process
  throw new Error("⚠️  Couldn't find .env file  ⚠️")
}

export function isDev(): boolean {
  return process.env.NODE_ENV === 'development'
}

export default {
  /**
   * API server port
   */
  server_port: parseInt(process.env.PORT as string, 10) || _default.PORT,

  /**
   * Database URL
   */
  databaseURL: process.env.POSTGRES_URL,

  /**
   * Your secret sauce
   */
  jwtSecret: process.env.JWT_SECRET,
  jwtAlgorithm: process.env.JWT_ALGO,

  /**
   * Used by winston logger
   */
  logs: {
    level: process.env.LOG_LEVEL || 'silly'
  },

  /**
   * API configs
   */
  api: {
    prefix: '/api'
  }
}
