import { PrismaClient } from '@prisma/client'
import { isDev } from '@/config'

// Add `prisma` to the global context
interface CustomNodeJsGlobal extends Global {
  prisma: PrismaClient
}

// Prevent multiple instances of Prisma Client in the same process
declare const global: CustomNodeJsGlobal

// Initialize Prisma Client in Node.js global scope
const prisma = global.prisma || new PrismaClient()

if (isDev()) global.prisma = prisma

export default prisma
