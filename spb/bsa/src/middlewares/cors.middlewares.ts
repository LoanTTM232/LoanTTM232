import cors from 'cors'
import { StatusCode } from '@/constants/enum'

const corsOptions: cors.CorsOptions = {
  origin: '*',
  optionsSuccessStatus: StatusCode.OK
}

const corsMiddleware = cors(corsOptions)

export default corsMiddleware
