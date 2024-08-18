import { PrismaClient } from '@prisma/client'
import app from '@/app'
import env from '@/config/env'
import log from '@/config/logger'

const prisma = new PrismaClient()

async function main() {
  app.listen(env.server_port, () => {
    log.info('---------------------------------------------------------')
    log.info(`Server is listening on port :${env.server_port}`)
    log.info('---------------------------------------------------------')
  })
}

async function exit(exitCode: number = 0) {
  log.info('---------------------------------------------------------')
  log.info('Server is shutting down...')
  log.info('---------------------------------------------------------')

  await prisma.$disconnect()
  log.info('Database disconnected')
  process.exit(exitCode)
}

main()
  .then(async () => {
    await prisma.$connect()
  })
  .catch(async (err) => {
    log.error(err)
    exit(1)
  })

// Exit on signals
process.on('SIGINT', async () => {
  exit()
})

process.on('SIGTERM', async () => {
  exit()
})
