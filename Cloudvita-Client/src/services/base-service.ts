import { AxiosResponse, isAxiosError } from 'axios'
import { ResponseError } from '~/exceptions/response-error'
import { apiClient } from '~/plugins/axiosClient'
import { ErrorResponse, RequestParams } from '~/types/common.types'

type APIResponse<T> = {
  status: string
  results?: number
  data: T
}

export const baseService = {
  request: async <T = unknown>({ data, method, url }: RequestParams) => {
    try {
      const response = (await apiClient.request<T>({
        data,
        method,
        url
      })) as AxiosResponse<APIResponse<T>>

      return response.data.data
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        const serverError = error.response.data as ErrorResponse

        throw new ResponseError(serverError)
      }

      throw new ResponseError({ code: 500, message: 'UNKNOWN_ERROR' })
    }
  }
}
