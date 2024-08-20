import { Application } from 'express'
import healthRoutes from '@/features/health/health.routes'
// import authRoutes from '@/features/auth/auth.routes'
import { config } from '@/config'

const BASE_PATH = config.BASE_PATH as string

export default (app: Application) => {
  app.use(healthRoutes)
  // app.use(BASE_PATH, authRoutes)
}
