import { useTranslation } from 'react-i18next'
import { useSettingsContext } from '~/context/settingsContext'
import { useWeatherContext } from '~/context/weatherContext'
import {
  DegreeUnitEnum,
  JoinByEnum,
  SplitByEnum,
  TextStyleEnum
} from '~/types/common.enums'
import { Forecast } from '~/types/weather.types'
import { cn } from '~/utils/cn'
import { forecastIcons } from '~/utils/icons'
import { getDateAlpha, getDateISO } from '~/utils/transformDate'
import { transformText } from '~/utils/transformText'

interface ForecastItemProps {
  forecast: Forecast
}

const ForecastItem: React.FC<ForecastItemProps> = ({ forecast }) => {
  const { t } = useTranslation()
  const { settings } = useSettingsContext()
  const { date, searchForecastDay } = useWeatherContext()

  const { nextDate, dateAlpha: fullDate } = getDateAlpha(forecast.date)

  const cloud = forecast.hour.find(
    (item) => new Date(item.time).getHours() == new Date().getHours()
  )!.cloud

  let condition
  if (cloud > 70) condition = 'cloudy'
  if (cloud >= 30) condition = 'partlyCloudy'
  if (cloud < 30) condition = 'sunny'

  const forecastDate = getDateISO(nextDate)
  const isToday = forecastDate === date
  let isActive = false
  if (isToday) isActive = true
  const transformedCondition = transformText(
    condition || '',
    TextStyleEnum.camelcase,
    SplitByEnum.space,
    JoinByEnum.empty
  ) as keyof typeof forecastIcons

  return (
    <div
      className={cn(
        'forecast-main__item',
        'forecast-item',
        isActive && 'forecast-item__current'
      )}
      onClick={() => searchForecastDay(forecastDate)}
    >
      <div className="forecast-item__icon">
        {forecastIcons[transformedCondition]}
      </div>
      <div className="forecast-item__info">
        <div className="forecast-item__date">{fullDate}</div>
        <div className="forecast-item__description">
          {t(`conditions.${condition}`)}
        </div>
      </div>
      <div className="forecast-item__temperatures">
        <div className="forecast-item__temperature">
          {Math.floor(forecast.day.minTemp[settings.degreeUnit])}
          {settings.degreeUnit === DegreeUnitEnum.celsius ? '°C' : '°F'}
        </div>
        <div className="forecast-item__temperature">
          {Math.floor(forecast.day.maxTemp[settings.degreeUnit])}
          {settings.degreeUnit === DegreeUnitEnum.celsius ? '°C' : '°F'}
        </div>
      </div>
    </div>
  )
}

export default ForecastItem
