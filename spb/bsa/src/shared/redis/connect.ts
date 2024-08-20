import Base from '@/shared/redis/base'

class RedisConnection extends Base {
  constructor() {
    super('RedisConnection')
  }

  async connect(): Promise<void> {
    try {
      await this.client.connect()
    } catch (error) {
      this.log.error(error)
    }
  }
}

export const redisConnection: RedisConnection = new RedisConnection()
