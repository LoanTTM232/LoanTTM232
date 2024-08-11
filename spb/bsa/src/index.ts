import { initialize, start, shutdown } from '@/server'

process.on('SIGINT', () => {
  shutdown(() => {
    process.exit(0)
  })
})

process.on('SIGTERM', () => {
  shutdown(() => {
    process.exit(0)
  })
})

/**
 * Initialize server
 */
initialize()

/**
 * Start server
 */
start()
