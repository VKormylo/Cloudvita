import { APIHourData, WeatherResponse } from '~/types/apiWeather.types'
import {
  CurrentWeather,
  Forecast,
  Location,
  WeatherData
} from '~/types/weather.types'

export function transformWeatherResponse(
  response: WeatherResponse
): WeatherData<{ _id: string; lastViewed: string }> {
  const { current, forecast, location } = response

  const currentWeather: CurrentWeather = {
    cloud: current.cloud,
    humidity: current.humidity,
    pressure: { in: current.pressure_in, mb: current.pressure_mb },
    uv: current.uv,
    condition: current.condition.text,
    feelslike: {
      celsius: current.feelslike_c,
      fahrenheit: current.feelslike_f
    },
    temp: {
      celsius: current.temp_c,
      fahrenheit: current.temp_f
    },
    wind: {
      kph: current.wind_kph,
      mph: current.wind_mph
    }
  }

  const forecastData: Forecast[] = forecast.forecastday.map((forecastDay) => ({
    date: forecastDay.date,
    day: {
      rainChance: forecastDay.day.daily_chance_of_rain,
      snowChance: forecastDay.day.daily_chance_of_snow,
      avgHumidity: forecastDay.day.avghumidity,
      condition: forecastDay.day.condition.text,
      avgTemp: {
        celsius: forecastDay.day.avgtemp_c,
        fahrenheit: forecastDay.day.avgtemp_f
      },
      maxTemp: {
        celsius: forecastDay.day.maxtemp_c,
        fahrenheit: forecastDay.day.maxtemp_f
      },
      minTemp: {
        celsius: forecastDay.day.mintemp_c,
        fahrenheit: forecastDay.day.mintemp_f
      },
      maxWind: {
        kph: forecastDay.day.maxwind_kph,
        mph: forecastDay.day.maxwind_mph
      }
    },
    hour: forecastDay.hour.map((hour: APIHourData) => ({
      time: hour.time,
      cloud: hour.cloud,
      humidity: hour.humidity,
      pressure: { in: hour.pressure_in, mb: hour.pressure_mb },
      uv: hour.uv,
      condition: hour.condition.text,
      feelslike: {
        celsius: hour.feelslike_c,
        fahrenheit: hour.feelslike_f
      },
      temp: {
        celsius: hour.temp_c,
        fahrenheit: hour.temp_f
      },
      wind: {
        kph: hour.wind_kph,
        mph: hour.wind_mph
      },
      rainChance: hour.chance_of_rain,
      snowChance: hour.chance_of_snow
    }))
  }))

  const locationData: Omit<Location, 'lastViewed' | '_id'> = {
    city: location.name,
    country: location.country,
    coordinates: {
      lat: location.lat,
      lon: location.lon
    },
    localtime: location.localtime
  }

  return {
    current: currentWeather,
    forecast: forecastData,
    location: locationData
  }
}
