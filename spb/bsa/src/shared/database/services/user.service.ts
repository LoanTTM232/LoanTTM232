import { Prisma, Role, User } from '@prisma/client'
import defaultVal from '@/shared/constants/default'
import { encryptPassword } from '@/shared/helpers'
import { BadRequestError } from '@/shared/helpers/error-handler'
import {
  IUserRepository,
  UserRepository
} from '@/shared/database/repositories/user.repository'
import { ERROR_MSG } from '@/shared/constants/message'

export const UserKey = [
  'id',
  'name',
  'email',
  'phone',
  'password',
  'isEmailVerified',
  'deleted',
  'createdAt',
  'updatedAt',
  'role',
  'sendNotify',
  'recipientNotify',
  'clubs',
  'bookings'
]

class UserService {
  private userRepository: IUserRepository

  constructor(userRepository: IUserRepository) {
    this.userRepository = userRepository
  }

  /**
   * Create user
   * @param email
   * @param password
   * @param name
   * @param role
   * @returns
   */
  async createUser(
    email: string,
    password: string,
    name: string,
    role: Role = Role.USER
  ): Promise<User> {
    if (await this.getUserByEmail(email)) {
      throw new BadRequestError(ERROR_MSG.ERR108)
    }

    const user = await this.userRepository.create({
      email,
      name,
      password: await encryptPassword(password),
      role
    })
    return user
  }

  /**
   * Get user by id
   * @param {ObjectId} id
   * @param {Array<Key>} keys
   * @returns {Promise<Pick<User, Key> | null>}
   */
  async getUserById<Key extends keyof User>(
    id: number,
    keys: Key[] = UserKey as Key[]
  ): Promise<Pick<User, Key> | null> {
    const queryArgs: Prisma.UserFindUniqueArgs = {
      where: { id },
      select: keys.reduce((obj, k) => ({ ...obj, [k]: true }), {})
    }
    const user = await this.userRepository.findUnique(queryArgs)

    return user as Pick<User, Key>
  }

  /**
   * Query for users
   * @param {Object} filter - Prisma filter
   * @param {Object} options - Query options
   * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
   * @param {number} [options.limit] - Maximum number of results per page (default = 10)
   * @param {number} [options.page] - Current page (default = 1)
   * @returns {Promise<QueryResult>}
   */
  async queryUsers<Key extends keyof User>(
    filter: object,
    options: {
      limit?: number
      page?: number
      sortBy?: string
      sortOrder?: 'asc' | 'desc'
    },
    keys: Key[] = UserKey as Key[]
  ): Promise<Pick<User, Key>[]> {
    const page = options.page ?? defaultVal.SORT_PAGE
    const limit = options.limit ?? defaultVal.SORT_LIMIT
    const sortBy = options.sortBy
    const sortOrder = options.sortOrder ?? 'desc'

    const searchArgs: Prisma.UserFindManyArgs = {
      where: filter,
      select: keys.reduce((obj, k) => ({ ...obj, [k]: true }), {}),
      skip: page * limit,
      take: limit,
      orderBy: sortBy ? { [sortBy]: sortOrder } : undefined
    }
    const users = await this.userRepository.findAll(searchArgs)

    return users as Pick<User, Key>[]
  }

  /**
   * Get user by email
   * @param {string} email
   * @param {Array<Key>} keys
   * @returns {Promise<Pick<User, Key> | null>}
   */
  async getUserByEmail<Key extends keyof User>(
    email: string,
    keys: Key[] = UserKey as Key[]
  ): Promise<Pick<User, Key> | null> {
    const queryArgs: Prisma.UserFindUniqueArgs = {
      where: { email },
      select: keys.reduce((obj, k) => ({ ...obj, [k]: true }), {})
    }
    const user = await this.userRepository.findUnique(queryArgs)

    return user as Pick<User, Key>
  }
}

const userRepository = new UserRepository()
export const userService = new UserService(userRepository)
