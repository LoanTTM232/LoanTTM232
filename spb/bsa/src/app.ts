import express, { Express } from 'express'
import cors from 'cors'
import helmet from 'helmet'
import passport from 'passport'

import log from '@/config/logger'
import jwtStrategy from '@/config/passport'
import healthRoute from '@/routes/health.route'
import logger from '@/middlewares/logger.middlewares'
import xss from '@/middlewares/xss.middlewares'
import { errorConverter, errorHandler } from '@/middlewares/error.middlewares'
import { authLimiter } from '@/middlewares/rateLimiter.middlewares'
import env from '@/config/env'

export const app: Express = express()

log.info('---------------------------------------------------------')
log.info('Initializing server...')
log.info('---------------------------------------------------------')

app.use(logger.successHandler)
app.use(logger.errorHandler)

// set security HTTP headers
app.use(helmet())

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }))

// parse json request body
app.use(express.json())

log.info('---------------------------------------------------------')
log.info('Logging and configuring server...')
log.info('---------------------------------------------------------')

// sanitize request data
app.use(xss())

// enable cors
app.use(
  cors({
    origin: env.clientUrl,
    credentials: true,
    optionsSuccessStatus: 200,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
  })
)

// jwt authentication
app.use(passport.initialize())
passport.use('jwt', jwtStrategy)

// limit repeated failed requests to auth endpoints
app.use('/v1/auth', authLimiter)

log.info('---------------------------------------------------------')
log.info('Define routes...')
log.info('---------------------------------------------------------')
app.use(healthRoute)

// convert error to ApiError, if needed
app.use(errorConverter)

// handle error
app.use(errorHandler)

export default app
