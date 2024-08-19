import express from 'express'
import auth from '@/middlewares/auth.middlewares'
import validate from '@/middlewares/validate.middlewares'
import userValidation from '@/validation/user.validation'
import * as userController from '@/controllers/user.controller'

const router = express.Router()

router
  .route('/')
  .post(
    auth('manageUser'),
    validate(userValidation.createUser),
    userController.createUser
  )
  .get(
    auth('getUsers'),
    validate(userValidation.getUsers),
    userController.getUsers
  )

export default router
