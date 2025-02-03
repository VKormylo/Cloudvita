import express from 'express'
import morgan from 'morgan'
import rateLimit from 'express-rate-limit'
import helmet from 'helmet'
import mongoSanitize from 'express-mongo-sanitize'
import hpp from 'hpp'

import locationRouter from './routes/locationRoutes'
import userRouter from './routes/userRoutes'
import { incorrectUrl } from './middlewares/commonMiddleware'
import { handleErrorResponse } from './controllers/errorController'
import { ROOT } from './constants/constants'

const app = express()

// Set security HTTP headers
app.use(helmet())

// Log requests in development mode
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

// Limit requests from the same IP
const limiter = rateLimit({
  max: 100,
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
