import { Role } from '@prisma/client'

export interface ICreateUser {
  email: string
  password: string
  name: string
  role: Role
}
