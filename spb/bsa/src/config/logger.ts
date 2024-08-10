/// external package imports
import winston from 'winston'

/// internal package imports
import _default from '@/constants/default'
import env, { isDev } from '@/config/env'

const transports: Array<winston.transports.ConsoleTransportInstance | winston.transports.FileTransportInstance> = []

if (isDev()) {
  transports.push(new winston.transports.Console())
} else {
  transports.push(
    new winston.transports.Console({
      format: winston.format.combine(winston.format.cli(), winston.format.splat())
    }),
    new winston.transports.File({
      filename: 'logs/error.log',
      level: 'error'
    }),
    new winston.transports.File({ filename: 'logs/all.log' })
  )
}

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
  transports
})

export default LoggerInstance
