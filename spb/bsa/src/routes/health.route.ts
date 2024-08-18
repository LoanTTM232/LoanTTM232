import express from 'express'
import healthController from '@/controllers/health.controller'

const router = express.Router()

router.get('/health', healthController.checkhealth)

export default router
