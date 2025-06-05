import WeatherForecastItem from '~/components/weather-forecast-item/WeatherForecastItem'
import { ForecastHour } from '~/types/weather.types'

interface WeatherForecastProps {
  forecast: ForecastHour[]
}

const WeatherForecast: React.FC<WeatherForecastProps> = ({ forecast }) => {
  const forecastItems = forecast.filter((item: ForecastHour) => {
    const time = new Date(item.time).getHours()
    if (time < 9 || time % 3 !== 0) return false
    return true
  })

  return (
    <div className="weather__forecast weather-forecast">
      {forecastItems.map((item: ForecastHour, index: number) => (
        <WeatherForecastItem key={index} forecast={item} />
      ))}
    </div>
  )
}

export default WeatherForecast
