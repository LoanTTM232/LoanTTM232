import { User } from '@prisma/client'
import {
  Strategy as JwtStrategy,
  ExtractJwt,
  VerifyCallback
} from 'passport-jwt'
import { config } from '@/config'
import { userService } from '@/shared/database/services/user.service'

const jwtOptions = {
  secretOrKey: config.JWT_SECRET as string,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
}

const jwtVerify: VerifyCallback = async (payload, done) => {
  try {
    const userId = parseInt(payload.sub, 10)
    const userKeys = ['id', 'email', 'name'] as (keyof User)[]
    const user = await userService.getUserById(userId, userKeys)

    if (!user) {
      return done(null, false)
    }
    done(null, user)
  } catch (error) {
    done(error, false)
  }
}

export const jwtStrategy = new JwtStrategy(jwtOptions, jwtVerify)
