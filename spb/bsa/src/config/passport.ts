import {
  Strategy as JwtStrategy,
  ExtractJwt,
  VerifyCallback
} from 'passport-jwt'
import { User } from '@prisma/client'

import env from '@/config/env'
import { ERROR_MSG } from '@/constants/message'
import { UserRepository } from '@/repositories/user.repository'
import { UserService } from '@/services/user.service'

const userRepository = new UserRepository()
const userService = new UserService(userRepository)

const jwtOptions = {
  secretOrKey: env.jwtSecret,
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

export default new JwtStrategy(jwtOptions, jwtVerify)
