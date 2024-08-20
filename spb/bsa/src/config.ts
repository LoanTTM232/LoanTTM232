import dotenv from 'dotenv'
import bunyan from 'bunyan'
import { ERROR_MSG } from '@/shared/constants/message'

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

class Config {
  // server
  public PORT: number | undefined
  public CLIENT_URL: string | undefined
  public NODE_ENV: string | undefined
  // api
  public BASE_PATH: string | undefined
  // jwt
  public JWT_SECRET: string | undefined
  public JWT_EXPIRATION: string | undefined
  public REFRESH_TOKEN_EXPIRATION: string | undefined
  // cookie
  public ACCESS_COOKIE_MAXAGE: number | undefined
  public REFRESH_COOKIE_MAXAGE: number | undefined
  // redis
  public REDIS_URL: string | undefined

  constructor() {
    this.PORT = parseInt(process.env.PORT as string, 10)
    this.CLIENT_URL = process.env.CLIENT_URL
    this.NODE_ENV = process.env.NODE_ENV
    this.BASE_PATH = process.env.BASE_PATH
    this.JWT_SECRET = process.env.JWT_SECRET
    this.JWT_EXPIRATION = process.env.JWT_EXPIRATION
    this.REFRESH_TOKEN_EXPIRATION = process.env.REFRESH_TOKEN_EXPIRATION
    this.ACCESS_COOKIE_MAXAGE = parseInt(
      process.env.ACCESS_COOKIE_MAXAGE as string,
      10
    )
    this.REFRESH_COOKIE_MAXAGE = parseInt(
      process.env.REFRESH_COOKIE_MAXAGE as string,
      10
    )
    this.REDIS_URL = process.env.REDIS_URL
  }

  public createLogger(name: string): bunyan {
    return bunyan.createLogger({ name, level: isDev() ? 'debug' : 'info' })
  }

  public validateConfig(): void {
    for (const [key, value] of Object.entries(this)) {
      if (value === undefined) {
        throw new Error(`Configuration ${key} is undefined.`)
      }
    }
  }
}

export const config: Config = new Config()
