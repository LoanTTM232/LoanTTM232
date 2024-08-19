import Joi from 'joi'
import { Role } from '@prisma/client'
import { password } from '@/validation/common.validation'

const createUser = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().custom(password),
    name: Joi.string().required(),
    role: Joi.string().required().valid(Role.USER, Role.OWNER, Role.ADMIN)
  })
}

const getUsers = {
  query: Joi.object().keys({
    name: Joi.string(),
    role: Joi.string().valid(Role.USER, Role.OWNER, Role.ADMIN),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer()
  })
}

const getUser = {
  params: Joi.object().keys({
    userId: Joi.number().integer()
  })
}

export default {
  createUser,
  getUsers,
  getUser
}
