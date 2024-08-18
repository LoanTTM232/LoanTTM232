import winston from 'winston'
import env, { isDev } from '@/config/env'
import _default from '@/constants/default'

const enumerateErrorFormat = winston.format((info) => {
  if (info instanceof Error) {
    Object.assign(info, { message: info.stack })
  }
  return info
})

const logger = winston.createLogger({
  level: env.logs.level,
  format: winston.format.combine(
    enumerateErrorFormat(),
    isDev() ? winston.format.colorize() : winston.format.uncolorize(),
    winston.format.splat(),
    winston.format.printf(({ level, message }) => `${level}: ${message}`)
  ),
  transports: [
    new winston.transports.Console({
      stderrLevels: ['error']
    })
  ]
})

export default logger
