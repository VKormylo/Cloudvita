import express from 'express'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import rateLimit from 'express-rate-limit'
import helmet from 'helmet'
import mongoSanitize from 'express-mongo-sanitize'
import hpp from 'hpp'
import cors from 'cors'

import locationRouter from './routes/locationRoutes'
import userRouter from './routes/userRoutes'
import { incorrectUrl } from './middlewares/commonMiddleware'
import { handleErrorResponse } from './controllers/errorController'
import { ROOT } from './constants/constants'
import config from './configs/config'

const app = express()

// Set security HTTP headers
app.use(helmet())

app.use(
  cors({
    origin: config.CLIENT_URL,
    credentials: true
  })
)

// Parse cookie header and populate req.cookies with an object
app.use(cookieParser())

// Log requests in development mode
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

app.set('trust proxy', 1)

// Limit requests from the same IP
const limiter = rateLimit({
  max: 1000,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in an hour.'
})
app.use('/api', limiter)

// Parse JSON request body
app.use(express.json({ limit: '10kb' }))

// Data sanitization against NoSQL query injection
app.use(mongoSanitize())

// Data sanitization against XSS
// to be implemented -----

// Prevent parameter pollution
app.use(hpp())

// Mount routes
app.use(`${ROOT}/locations`, locationRouter)
app.use(`${ROOT}/users`, userRouter)

// Handle incorrect routes and errors
app.all('*', incorrectUrl)

app.use(handleErrorResponse)

export default app
