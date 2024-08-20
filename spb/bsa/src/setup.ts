import Logger from 'bunyan'
import prisma from '@/shared/database/connect'
import { redisConnection } from '@/shared/redis/connect'
import { config } from '@/config'

const log: Logger = config.createLogger('setupDB')
export default async () => {
  await prisma
    .$connect()
    .then(() => {
      log.info('Successfully connected to database')
      redisConnection.connect()
    })
    .catch((error) => {
      log.error('Error while connecting to database', error)
      prisma.$disconnect()
      return process.exit(1)
    })
}

export const disconnect = () => {
  prisma.$disconnect()
}
