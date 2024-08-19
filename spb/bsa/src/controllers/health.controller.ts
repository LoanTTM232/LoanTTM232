import HTTP_STATUS from 'http-status'
import { Request, Response } from 'express'

const checkhealth = (_req: Request, res: Response) => {
  res.setHeader('Cache-Control', 'no-store')
  res.status(HTTP_STATUS.OK).json({ status: 'UP', timestamp: new Date() })
}

export default {
  checkhealth
}
