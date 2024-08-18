import prisma from '@/config/prisma'
import { User } from '@prisma/client'

export interface IUserRepository {
  findById(id: number): Promise<User | null>
  findByEmail(email: string): Promise<User | null>
  create(data: User): Promise<User>
  update(id: number, data: User): Promise<User>
  delete(id: number): Promise<void>
  findAll(): Promise<User[]>
  findByRole(role: string): Promise<User[]>
}

export class UserRespository implements IUserRepository {
  findByEmail(email: string): Promise<User | null> {
    throw new Error('Method not implemented.')
  }

  create(data: User): Promise<User> {
    throw new Error('Method not implemented.')
  }

  update(id: number, data: User): Promise<User> {
    throw new Error('Method not implemented.')
  }

  delete(id: number): Promise<void> {
    throw new Error('Method not implemented.')
  }

  findAll(): Promise<User[]> {
    throw new Error('Method not implemented.')
  }

  findByRole(role: string): Promise<User[]> {
    throw new Error('Method not implemented.')
  }

  async findById(id: number): Promise<User | null> {
    return null
  }
}
