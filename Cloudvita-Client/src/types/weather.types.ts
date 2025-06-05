import { PressureUnitEnum, SpeedEnum } from './common.enums'

type UnitType = 'wind' | 'pressure' | 'temperature'

type UnitsMap = {
  wind: 'kph' | 'mph'
  pressure: 'mb' | 'in'
  temperature: 'celsius' | 'fahrenheit'
}

export type Measurement<T extends UnitType> = {
  [unit in UnitsMap[T]]: number
}

export interface CurrentWeather {
  cloud: number
  humidity: number
  uv: number
  condition: string
  pressure: Record<PressureUnitEnum, number>
  feelslike: Measurement<'temperature'>
  temp: Measurement<'temperature'>
  wind: Record<SpeedEnum, number>
}

interface ForecastDay {
  rainChance: number
  snowChance: number
  avgHumidity: number
  condition: string
  avgTemp: Measurement<'temperature'>
  maxTemp: Measurement<'temperature'>
  minTemp: Measurement<'temperature'>
  maxWind: Measurement<'wind'>
}

export interface ForecastHour extends CurrentWeather {
  rainChance: number
  snowChance: number
  time: string
}

export interface Forecast {
  date: string
  day: ForecastDay
  hour: ForecastHour[]
}

interface LocationCoordinates {
  lat: number
  lon: number
}

export interface Location {
  _id: string
  city: string
  country: string
  coordinates: LocationCoordinates
  lastViewed: Date
  localtime: string
}

export interface WeatherData<T = unknown> {
  current: CurrentWeather
  forecast: Forecast[]
  location: Omit<Location, keyof T>
}
