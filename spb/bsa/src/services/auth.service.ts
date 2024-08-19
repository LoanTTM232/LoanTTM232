import HTTP_STATUS from 'http-status'
import { Prisma, User } from '@prisma/client'

import ApiError from '@/exceptions/api.error'
import { IUserRepository } from '@/repositories/user.repository'
import { isPasswordMatch } from '@/utils/encryption.util'
import { ERROR_MSG } from '@/constants/message'
import { exclude } from '@/utils/common.util'

export class AuthService {
  private userRepository: IUserRepository

  constructor(userRepository: IUserRepository) {
    this.userRepository = userRepository
  }

  async loginWithEmailAndPassword(
    email: string,
    password: string
  ): Promise<Omit<User, 'password'>> {
    const queryArgs: Prisma.UserFindUniqueArgs = {
      where: { email },
      select: {
        id: true,
        email: true,
        name: true,
        password: true,
        role: true,
        isEmailVerified: true,
        createdAt: true,
        updatedAt: true
      }
    }
    const user = await this.userRepository.findUnique(queryArgs)

    if (!user || (await isPasswordMatch(password, user.password as string))) {
      throw new ApiError(HTTP_STATUS.UNAUTHORIZED, ERROR_MSG.ERR109)
    }
    return exclude(user, ['password'])
  }

  async logout(refreshToken: string): Promise<void> {}
}
