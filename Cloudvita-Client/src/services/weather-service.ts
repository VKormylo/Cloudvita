import { AxiosError } from 'axios'
import { ResponseError } from '~/exceptions/response-error'
import { weatherApiClient } from '~/plugins/axiosClient'
import { WeatherResponse } from '~/types/apiWeather.types'

const FORECAST_DAYS = 3

export const weatherService = {
  getWeatherData: async (
    city: string
  ): Promise<WeatherResponse | undefined> => {
    try {
      const response = await weatherApiClient.get(
        `/forecast.json?key=4d00bea513ef4b439ea140828232408&q=${city}&days=${FORECAST_DAYS}`
      )

      return response.data
    } catch (err) {
      if (err instanceof AxiosError) {
        const message = err.response?.data.error.message
        const code = err.response?.data.error.code

        throw new ResponseError({
          message: message ?? 'UNKNOWN_ERROR',
          code: code ?? 'UNKNOWN_ERROR'
        })
      }

      return undefined
    }
  }
}
