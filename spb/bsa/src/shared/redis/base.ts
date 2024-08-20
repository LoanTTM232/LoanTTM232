import Logger from 'bunyan'
import { createClient } from 'redis'
import { config } from '@/config'

export type RedisClient = ReturnType<typeof createClient>

export default abstract class Base {
  client: RedisClient
  log: Logger

  constructor(cacheName: string) {
    this.client = createClient({ url: config.REDIS_URL })
    this.log = config.createLogger(cacheName)
    this.cacheError()
  }

  private cacheError(): void {
    this.client.on('error', (error: unknown) => {
      this.log.error(error)
    })
  }
}
