import { createContext, useContext } from 'react'
import { WeatherData } from '~/types/weather.types'

interface WeatherContextParams {
  weather: WeatherData<{ _id: string; lastViewed: string }> | undefined
  date: string
  search: string
  setSearch: React.Dispatch<React.SetStateAction<string>>
  searchForecastDay: (date: string) => void
}

export const WeatherContext = createContext<WeatherContextParams | null>(null)

export function useWeatherContext() {
  const context = useContext(WeatherContext)
  if (!context) {
    throw new Error('useWeatherContext must be used within a WeatherProvider')
  }
  const { weather, date, search, setSearch, searchForecastDay } = context

  return {
    weather,
    date,
    search,
    setSearch,
    searchForecastDay
  }
}
