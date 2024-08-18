import HttpStatus from 'http-status'
import passport from 'passport'
import { NextFunction, Request } from 'express'
import { User } from '@prisma/client'

import ApiError from '@/exceptions/api.error'
import { ERROR_MSG } from '@/constants/message'
import { roleRights } from '@/config/roles'

type ResolveFunc = (value?: unknown) => void
type RejectFunc = (reason?: any) => void

const verifyCallback =
  (
    req: Request,
    resolve: ResolveFunc,
    reject: RejectFunc,
    requiredRights: string[]
  ) =>
  async (err: unknown, user: User | false, info: unknown) => {
    if (err || info || !user) {
      return reject(new ApiError(HttpStatus.UNAUTHORIZED, ERROR_MSG.ERR106))
    }
    req.user = user

    if (requiredRights.length) {
      const userRights = roleRights.get(user.role) ?? []
      const hasRequiredRights = requiredRights.every((requiredRight) =>
        userRights.includes(requiredRight)
      )

      if (!hasRequiredRights && req.params.userId !== user.id.toString()) {
        return reject(new ApiError(HttpStatus.FORBIDDEN, ERROR_MSG.ERR107))
      }
    }

    resolve()
  }

const auth =
  (...requiredRights: string[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    return new Promise((resolve, reject) => {
      passport.authenticate(
        'jwt',
        { session: false },
        verifyCallback(req, resolve, reject, requiredRights)
      )(req, res, next)
    })
  }
