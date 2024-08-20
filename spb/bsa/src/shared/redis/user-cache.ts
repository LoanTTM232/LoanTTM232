import Base from '@/shared/redis/base'

export class UserCache extends Base {
  constructor() {
    super('UserCache')
  }

  public async saveUserToCache() {}
}
