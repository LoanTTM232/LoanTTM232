import jwt from 'jsonwebtoken'
import { User } from '@prisma/client'
import { config } from '@/config'

export const createRefreshToken = async (user: User) => {
  const refreshToken = jwt.sign(
    { userId: user.id, email: user.email, permissions: user.role },
    config.JWT_SECRET as string,
    {
      expiresIn: config.REFRESH_TOKEN_EXPIRATION as string
    }
  )
  return refreshToken
}

export const createAccessToken = async (user: User) => {
  const accessToken = jwt.sign(
    { userId: user.id, email: user.email, permissions: user.role },
    config.JWT_SECRET as string,
    {
      expiresIn: config.JWT_EXPIRATION as string
    }
  )
  return accessToken
}
