import { Prisma, Role, User } from '@prisma/client'
import prisma from '@/shared/database/connect'
import { ICreateUser } from '@/shared/database/types/user'

export interface IUserRepository {
  create(data: ICreateUser): Promise<User>
  update(id: number, data: User): Promise<User>
  delete(id: number): Promise<void>
  findAll(queryArgs: Prisma.UserFindManyArgs): Promise<User[]>
  findUnique(queryArgs: Prisma.UserFindUniqueArgs): Promise<User | null>
}

export class UserRepository implements IUserRepository {
  create({
    email,
    name,
    password,
    role
  }: ICreateUser & { role: Role }): Promise<User> {
    return prisma.user.create({
      data: {
        email,
        name,
        password,
        role
      }
    })
  }

  update(id: number, data: User): Promise<User> {
    throw new Error('Method not implemented.')
  }

  delete(id: number): Promise<void> {
    throw new Error('Method not implemented.')
  }

  findAll(queryArgs: Prisma.UserFindManyArgs): Promise<User[]> {
    return prisma.user.findMany(queryArgs)
  }

  findUnique(queryArgs: Prisma.UserFindUniqueArgs): Promise<User | null> {
    return prisma.user.findUnique(queryArgs)
  }
}
