import winston from 'winston'
import env from '@/config/env'
import _default from '@/constants/default'

const LoggerInstance = winston.createLogger({
  level: env.logs.level,
  levels: winston.config.npm.levels,
  format: winston.format.combine(
    winston.format.timestamp({
      format: _default.TIMESTAMP_FORMAT
    }),
    winston.format.errors({ stack: true }),
    winston.format.splat(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(winston.format.cli(), winston.format.splat())
    }),
    new winston.transports.File({
      filename: 'logs/error.log',
      level: 'error'
    }),
    new winston.transports.File({ filename: 'logs/all.log' })
  ]
})

export default LoggerInstance
