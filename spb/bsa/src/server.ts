import express, { Express } from 'express'
import http from 'http'
import env from '@/config/env'
import log from '@/config/logger'
import loggerMiddleware from '@/middlewares/logger.middlewares'
import corsMiddleware from '@/middlewares/cors.middlewares'
import checkHealthRoute from '@/routes/heath.routes'

export const application: Express = express()
export let httpServer: ReturnType<typeof http.createServer>

export const initialize = () => {
  log.info('---------------------------------------------------------')
  log.info('Initializing server...')
  log.info('---------------------------------------------------------')
  application.use(express.urlencoded({ extended: true }))
  application.use(express.json())

  log.info('---------------------------------------------------------')
  log.info('Logging and configuring server...')
  log.info('---------------------------------------------------------')
  application.use(loggerMiddleware)
  application.use(corsMiddleware)

  log.info('---------------------------------------------------------')
  log.info('Define routes...')
  log.info('---------------------------------------------------------')
  application.use(checkHealthRoute)
}

export const start = () => {
  httpServer = http.createServer(application)
  httpServer.listen(env.server_port, () => {
    log.info(`Server started on port ${env.server_port}`)
  })
}

export const shutdown = (callback: (err?: Error) => void) => {
  if (httpServer) {
    httpServer.close(callback)
  }
}
