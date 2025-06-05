import { useTranslation } from 'react-i18next'
import { useSettingsContext } from '~/context/settingsContext'
import { SpeedEnum, SpeedUnitEnum } from '~/types/common.enums'
import { Settings } from '~/types/common.types'
import { ForecastHour } from '~/types/weather.types'
import { overviewIcons } from '~/utils/icons'

type ForecastHourItem = Pick<
  ForecastHour,
  'wind' | 'rainChance' | 'uv' | 'pressure'
>

interface WeatherOverviewItemProps {
  type: keyof ForecastHourItem
  currentWeather: ForecastHourItem | undefined
  prevWeather: ForecastHourItem | undefined
  title: string
}

const valueExtractor: Record<
  keyof ForecastHourItem,
  {
    value: (
      weather: ForecastHourItem,
      settings: Pick<Settings, 'speedUnit' | 'pressureUnit'>,
      transform: (value: string) => string
    ) => number | undefined
    unit: (
      settings: Pick<Settings, 'speedUnit' | 'pressureUnit'>,
      transform: (value: string) => string
    ) => string
  }
> = {
  wind: {
    value: (weather, settings, transform) =>
      weather.wind[transform(settings.speedUnit) as SpeedEnum],
    unit: (settings, transform) => transform(settings.speedUnit)
  },
  rainChance: {
    value: (weather) => weather.rainChance,
    unit: () => '%'
  },
  uv: {
    value: (weather) => weather.uv,
    unit: () => ''
  },
  pressure: {
    value: (weather, settings) => weather.pressure[settings.pressureUnit],
    unit: (settings) => settings.pressureUnit
  }
}

const WeatherOverviewItem: React.FC<WeatherOverviewItemProps> = ({
  type,
  currentWeather,
  prevWeather,
  title
}) => {
  const { t } = useTranslation()
  const { settings } = useSettingsContext()

  const transform = (value: string) => {
    if (value === SpeedUnitEnum.kph) return SpeedEnum.kph
    if (value === SpeedUnitEnum.mph) return SpeedEnum.mph
    return value
  }

  if (!currentWeather || !prevWeather) return null

  const { value: getValue, unit: getUnit } = valueExtractor[type]
  const currentValue = getValue(currentWeather, settings, transform)
  const prevValue = getValue(prevWeather, settings, transform)
  const unit = getUnit(settings, transform)

  const unitLabel = unit.length > 1 ? t(`settings.options.${unit}`) : unit

  if (currentValue === undefined || prevValue === undefined) return null

  const difference = currentValue - prevValue

  return (
    <div className="weather-overview__item">
      <div className="weather-overview__content overview-item">
        <div className="overview-item__icon">{overviewIcons[type]}</div>
        <div className="overview-item__info overview-info">
          <div className="overview-item__name">{title}</div>
          <div className="overview-item__value">
            {currentValue} {unitLabel}
          </div>
        </div>
        <div
          className={`overview-item__change ${
            difference > 0 ? 'change_positive' : 'change_negative'
          }`}
        >
          {Math.abs(+difference.toFixed(2))} {unitLabel}
        </div>
      </div>
    </div>
  )
}

export default WeatherOverviewItem
