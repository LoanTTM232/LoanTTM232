import HTTP_STATUS from 'http-status'
import { Request, Response } from 'express'

import ApiError from '@/exceptions/api.error'
import { UserRepository } from '@/repositories/user.repository'
import { UserService } from '@/services/user.service'
import { ERROR_MSG } from '@/constants/message'
import { catchAsync, pick } from '@/utils/common.util'

const userRepository = new UserRepository()
const userService = new UserService(userRepository)

/**
 * Create user
 * @route POST /api/user
 * @param req
 * @param res
 */
export const createUser = catchAsync(async (req: Request, res: Response) => {
  const { name, email, password, role } = req.body
  const user = await userService.createUser(name, email, password, role)
  res.status(HTTP_STATUS.CREATED).send(user)
})

/**
 * Get user by user id
 * @route GET /api/user/:userId
 * @param req
 * @param res
 */
export const getUser = catchAsync(async (req: Request, res: Response) => {
  const user = await userService.getUserById(Number(req.params.userId))
  if (!user) {
    throw new ApiError(HTTP_STATUS.NOT_FOUND, ERROR_MSG.ERR105)
  }
  res.send(user)
})

/**
 * Get users with pagination and filter
 * @route GET /api/users
 * @param req
 * @param res
 */
export const getUsers = catchAsync(async (req: Request, res: Response) => {
  const filter = pick(req.query, ['name', 'role'])
  const options = pick(req.query, ['sortBy', 'limit', 'page'])
  const result = await userService.queryUsers(filter, options)
  res.send(result)
})
