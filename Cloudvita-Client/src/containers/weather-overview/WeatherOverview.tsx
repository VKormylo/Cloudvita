import { useTranslation } from 'react-i18next'
import { ForecastHour } from '~/types/weather.types'
import WeatherOverviewItem from '~/components/weather-overview-item/WeatherOverviewItem'

interface WeatherOverviewProps {
  forecast: ForecastHour[]
}

const WeatherOverview: React.FC<WeatherOverviewProps> = ({ forecast }) => {
  const { t } = useTranslation()

  // TODO: CHECK TIME ZONE (SEEMS TO BE FIXED)
  const time = new Date()
  const hours = time.getHours() === 0 ? 23 : time.getHours()

  const weatherIndex = forecast.findIndex(
    (item) => new Date(item.time).getHours() === hours
  )!

  const currentWeather = forecast[weatherIndex]
  const prevHourWeather = forecast[weatherIndex - 1]

  return (
    <div className="weather__overview weather-overview">
      <div className="weather-overview__title weather__title">
        {t('weather.overview.title')}
      </div>
      <div className="weather-overview__items">
        <WeatherOverviewItem
          type="wind"
          currentWeather={currentWeather}
          prevWeather={prevHourWeather}
          title={t('weather.overview.windSpeed')}
        />
        <WeatherOverviewItem
          type="pressure"
          currentWeather={currentWeather}
          prevWeather={prevHourWeather}
          title={t('weather.overview.pressure')}
        />
        <WeatherOverviewItem
          type="rainChance"
          currentWeather={currentWeather}
          prevWeather={prevHourWeather}
          title={t('weather.overview.rainChance')}
        />
        <WeatherOverviewItem
          type="uv"
          currentWeather={currentWeather}
          prevWeather={prevHourWeather}
          title={t('weather.overview.uvIndex')}
        />
      </div>
    </div>
  )
}

export default WeatherOverview
