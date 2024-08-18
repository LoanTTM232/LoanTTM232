import httpStatus from 'http-status'
import { Request, Response } from 'express'
import { UserRespository } from '@/repositories/user.repository'
import { UserService } from '@/services/user.service'
import { ERROR_MSG } from '@/constants/message'

const userRespository = new UserRespository()
const userService = new UserService(userRespository)

export const getUser = async (req: Request, res: Response) => {
  const id = Number(req.params.id)
  const user = await userService.getUserById(id)

  if (user) {
    res.json(user)
  } else {
    res.status(httpStatus.NOT_FOUND).json({ message: ERROR_MSG.ERR105 })
  }
}
