import express, { Express } from 'express'
import setupDB, { disconnect } from '@/setup'
import { config } from '@/config'
import { SpbServer } from './server'

class Application {
  public start(): void {
    // Load configuration
    this.loadConfig()
    setupDB()
    // Initialize server
    const app: Express = express()
    const server: SpbServer = new SpbServer(app)
    server.start()
  }

  private loadConfig(): void {
    config.validateConfig()
  }
}

const application: Application = new Application()
application.start()

process.on('SIGINT', () => {
  disconnect()
  process.exit(0)
})
