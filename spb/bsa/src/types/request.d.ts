import { Role } from '@prisma/client'

export interface CreateUserRequest {
  email: string
  password: string
  name: string
  role: Role
}
