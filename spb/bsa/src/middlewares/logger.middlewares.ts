import { NextFunction, Request, Response } from 'express'
import log from '@/config/logger'

function loggerMiddleware(req: Request, res: Response, next: NextFunction) {
  log.http(`Incomming - Method: [${req.method}] - Url: [${req.url}] - IP: [${req.socket.remoteAddress}]`)

  res.on('finish', () => {
    log.http(
      `Incomming - Method: [${req.method}] - Url: [${req.url}] - IP: [${req.socket.remoteAddress}] - Status: [${res.statusCode}]`
    )
  })
  next()
}

export default loggerMiddleware
