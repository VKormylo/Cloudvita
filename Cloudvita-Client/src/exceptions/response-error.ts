import { ErrorResponse } from '~/types/common.types'

class ResponseError extends Error {
  code?: number
  status?: string

  constructor({ code, message, status }: Partial<ErrorResponse>) {
    super(message)

    this.code = code
    this.status = status
  }
}

export { ResponseError }
