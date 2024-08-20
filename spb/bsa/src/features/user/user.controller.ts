import { Request, Response } from 'express'

import { ERROR_MSG } from '@/shared/constants/message'
import { NotFoundError } from '@/shared/helpers/error-handler'
import { userService } from '@/shared/database/services/user.service'
import { pick } from '@/shared/helpers'

class UserController {
  /**
   * Get user by user id
   * @route GET /api/user/:userId
   * @param req
   * @param res
   */
  public async getUser(req: Request, res: Response) {
    const user = await userService.getUserById(Number(req.params.userId))
    if (!user) {
      throw new NotFoundError(ERROR_MSG.ERR105)
    }
    res.send(user)
  }

  /**
   * Get users with pagination and filter
   * @route GET /api/users
   * @param req
   * @param res
   */
  public async getUsers(req: Request, res: Response) {
    const filter = pick(req.query, ['name', 'role'])
    const options = pick(req.query, ['sortBy', 'limit', 'page'])
    const result = await userService.queryUsers(filter, options)
    res.send(result)
  }
}

export const userController = new UserController()
