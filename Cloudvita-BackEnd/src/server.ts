import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config({ path: './config.env' })

process.on('uncaughtException', (err: Error) => {
  console.log('UNHANDLED EXCEPTION! Shutting down...')
  console.log(err)
  process.exit(1)
})

import app from './app'
import config from './configs/config'

const DB = config.MONGODB_URL!.replace('<PASSWORD>', config.DATABASE_PASSWORD!)
mongoose
  .connect(DB)
  .then(() => {
    console.log('DB connection successful!')
  })
  .catch((err) => {
    console.log(`DB connection error: ${err}`)
  })

const port = config.SERVER_PORT

const server = app.listen(port, () => {
  console.log(`App running on port ${port}...`)
})

process.on('unhandledRejection', (err: Error) => {
  console.log(err.name, err.message)
  console.log('UNHANDLED REJECTION! Shutting down...')
  server.close(() => {
    process.exit(1)
  })
})
