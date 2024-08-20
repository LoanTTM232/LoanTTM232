import passport from 'passport'
import { NextFunction, Request, Response } from 'express'
import { User } from '@prisma/client'

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

export default auth
