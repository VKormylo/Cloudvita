import { useTranslation } from 'react-i18next'
import { useSettingsContext } from '~/context/settingsContext'
import { DegreeUnitEnum, TimeFormatEnum } from '~/types/common.enums'
import { ForecastHour } from '~/types/weather.types'
import { forecastIcons } from '~/utils/icons'
import { getFormattedTime } from '~/utils/transformDate'

interface WeatherForecastItemProps {
  forecast: ForecastHour
}

const WeatherForecastItem: React.FC<WeatherForecastItemProps> = ({
  forecast
}) => {
  const { t } = useTranslation()
  const { settings } = useSettingsContext()

  const formattedTime = getFormattedTime(
    new Date(forecast.time),
    settings.timeFormat,
    {
      [TimeFormatEnum.hour24]: { minute: 'numeric' }
    }
  )

  // TODO - maybe change to Math.round
  const temperature = Math.floor(forecast.temp[settings.degreeUnit])
  const feelslike = Math.floor(forecast.feelslike[settings.degreeUnit])
  const humidity = forecast.humidity
  const cloud = forecast.cloud
  let condition: keyof typeof forecastIcons | 'sunny' = 'sunny'
  if (cloud > 40) condition = 'partlyCloudy'
  if (cloud > 70) condition = 'cloudy'
  if (cloud < 40) condition = 'sunny'

  return (
    <div
      className={`weather-forecast__item forecast-item item-${condition.toLowerCase()}`}
    >
      <div className="forecast-item__time">{formattedTime}</div>
      <div className="forecast-item__icon">{forecastIcons[condition]}</div>
      <div className="forecast-item__temperature">
        {temperature}
        {settings.degreeUnit === DegreeUnitEnum.celsius ? '°C' : '°F'}
      </div>
      <div className="forecast-item__info forecast-info">
        <div className="forecast-info__item info-item">
          <div className="info-item__icon">{forecastIcons.temperature}</div>
          <div className="info-item__text">
            {t('weather.forecast.feelsLike')}
          </div>
          <div className="info-item__value">
            {feelslike}
            {settings.degreeUnit === DegreeUnitEnum.celsius ? '°C' : '°F'}
          </div>
        </div>
        <div className="forecast-info__item info-item">
          <div className="info-item__icon">{forecastIcons.waterDrop}</div>
          <div className="info-item__text">
            {t('weather.forecast.humidity')}
          </div>
          <div className="info-item__value">{humidity}%</div>
        </div>
      </div>
    </div>
  )
}

export default WeatherForecastItem
