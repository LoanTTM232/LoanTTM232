import Logger from 'bunyan'
import hpp from 'hpp'
import cors from 'cors'
import http from 'http'
import helmet from 'helmet'
import compression from 'compression'
import cookieParser from 'cookie-parser'
import passport from 'passport'
import HTTP_STATUS from 'http-status'
import 'express-async-errors'
import {
  Application,
  json,
  NextFunction,
  Request,
  Response,
  urlencoded
} from 'express'

import xss from '@/middlewares/xss'
import applicationRoutes from '@/loaders/routes'
import { config } from '@/config'
import { CustomError, IErrorResponse } from '@/shared/helpers/error-handler'

const log: Logger = config.createLogger('server')
export class SpbServer {
  private app: Application

  constructor(app: Application) {
    this.app = app
  }

  public start(): void {
    this.securityMiddleware()
    this.standardMiddleware()
    this.routeMiddleware()
    this.globalErrorHandler()
    this.startServer()
  }

  private securityMiddleware(): void {
    this.app.use(xss())
    this.app.use(hpp())
    this.app.use(helmet())
    this.app.use(
      cors({
        origin: config.CLIENT_URL,
        credentials: true,
        optionsSuccessStatus: HTTP_STATUS.OK,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
      })
    )
  }

  private standardMiddleware(): void {
    this.app.use(compression())
    this.app.use(cookieParser())
    this.app.use(json({ limit: '50mb' }))
    this.app.use(urlencoded({ extended: true, limit: '50mb' }))
    // this.app.use(passport.initialize())
    // passport.use('jwt', jwtStrategy)
  }

  private routeMiddleware(): void {
    applicationRoutes(this.app)
  }

  private globalErrorHandler(): void {
    this.app.all('*', (req: Request, res: Response) => {
      res
        .status(HTTP_STATUS.NOT_FOUND)
        .json({ message: `${req.originalUrl} not found` })
    })

    this.app.use(
      (
        error: IErrorResponse,
        _req: Request,
        res: Response,
        next: NextFunction
      ) => {
        log.error(error)
        if (error instanceof CustomError) {
          return res.status(error.statusCode).json(error.serializeErrors())
        }
        next()
      }
    )
  }

  private async startServer(): Promise<void> {
    try {
      const httpServer: http.Server = new http.Server(this.app)
      this.startHttpServer(httpServer)
    } catch (error) {
      log.error(error)
    }
  }

  private startHttpServer(httpServer: http.Server): void {
    log.info(`Server has started with process ${process.pid}`)
    httpServer.listen(config.PORT, () => {
      log.info(`Server is running on port ${config.PORT}`)
    })
  }
}
