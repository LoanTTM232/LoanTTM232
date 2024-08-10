/// external package imports
import express, { Express } from 'express'

/// internal package imports
import env from '@/config/env'

class ExpressApp {
  app: Express

  constructor() {
    this.app = express()
  }

  start() {
    this.app.listen(env.port, () => {
      console.log(`Server listening on port ${env.port}`)
    })
  }
}

export default ExpressApp
