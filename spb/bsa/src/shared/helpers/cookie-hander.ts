import { Request } from 'express'
import { config, isProd } from '@/config'

export const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: isProd(),
  sameSite: 'strict' as const
}

export const ACCESS_COOKIE_OPTIONS = {
  ...COOKIE_OPTIONS,
  maxAge: config.ACCESS_COOKIE_MAXAGE
}

export const REFRESH_COOKIE_OPTIONS = {
  ...COOKIE_OPTIONS,
  maxAge: config.REFRESH_COOKIE_MAXAGE
}

export const cookieExtractor = (req: Request, key: string): string => {
  let token = null
  if (req && req.cookies) {
    token = req.cookies[key]
  }
  return token
}
