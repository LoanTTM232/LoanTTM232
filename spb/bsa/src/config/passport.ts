import {
  Strategy as JwtStrategy,
  ExtractJwt,
  VerifyCallback
} from 'passport-jwt'
import { TokenType } from '@prisma/client'

import env from '@/config/env'
import prisma from '@/config/prisma'
import { ERROR_MSG } from '@/constants/message'

const jwtOptions = {
  secretOrKey: env.jwtSecret,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
}

const jwtVerify: VerifyCallback = async (payload, done) => {
  try {
    if (payload.type !== TokenType.ACCESS) {
      throw new Error(ERROR_MSG.ERR102)
    }

    const user = await prisma.user.findUnique({
      select: {
        id: true,
        email: true,
        name: true
      },
      where: { id: payload.sub }
    })

    if (!user) {
      return done(null, false)
    }
    done(null, user)
  } catch (error) {
    done(error, false)
  }
}

export default new JwtStrategy(jwtOptions, jwtVerify)
