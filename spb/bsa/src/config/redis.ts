import Redis from 'ioredis'
import env from '@/config/env'

const redisClient = new Redis({
  host: env.redisHost,
  port: env.redisPort,
  password: env.redisPassword
})

export default redisClient
