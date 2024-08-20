import { Prisma, User } from '@prisma/client'
import { exclude, isPasswordMatch } from '@/shared/helpers'
import { IUserRepository } from '@/shared/database/repositories/user.repository'
import { ERROR_MSG } from '@/shared/constants/message'
import { NotAuthorizedError } from '@/shared/helpers/error-handler'

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
      throw new NotAuthorizedError(ERROR_MSG.ERR109)
    }
    return exclude(user, ['password'])
  }

  async logout(refreshToken: string): Promise<void> {}
}
