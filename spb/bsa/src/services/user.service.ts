import { User } from '@prisma/client'
import { IUserRepository } from '@/repositories/user.repository'

export class UserService {
  private userRepository: IUserRepository

  constructor(userRepository: IUserRepository) {
    this.userRepository = userRepository
  }

  async getUserById(id: number): Promise<User | null> {
    return await this.userRepository.findById(id)
  }
}
