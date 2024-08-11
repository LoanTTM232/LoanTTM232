import express, { Request, Response } from 'express'
import { StatusCode, StatusMessage } from '@/constants/enum'

const router = express.Router()

function checkHealth(req: Request, res: Response) {
  res.status(StatusCode.OK).send(StatusMessage.OK)
}

router.get('/health', checkHealth)

export default router
