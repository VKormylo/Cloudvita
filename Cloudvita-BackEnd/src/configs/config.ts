import { Secret } from 'jsonwebtoken'

const config = {
  MONGODB_URL: process.env.MONGODB_URL,
  SERVER_PORT: process.env.SERVER_PORT,
  DATABASE_PASSWORD: process.env.DATABASE_PASSWORD,
  NODE_ENV: process.env.NODE_ENV,
  JWT_SECRET: process.env.JWT_SECRET as Secret,
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN,
  JWT_COOKIE_EXPIRES_IN: process.env.JWT_COOKIE_EXPIRES_IN
}

export default config
