import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSettingsContext } from '~/context/settingsContext'
import { getFormattedTime } from '~/utils/transformDate'
import { TimeFormatEnum } from '~/types/common.enums'
import { ForecastHour } from '~/types/weather.types'
import ProgressBar from '~/components/progress-bar/ProgressBar'
import Tabs from '../tabs/Tabs'

interface WeatherPrecipProps {
  forecast: ForecastHour[]
}

const WeatherPrecip: React.FC<WeatherPrecipProps> = ({ forecast }) => {
  const { t } = useTranslation()
  const { settings } = useSettingsContext()
  const [activeTab, setActiveTab] = useState(0)

  const tabs = [
    { displayName: t('weather.precip.rain'), value: 'rainChance' },
    { displayName: t('weather.precip.snow'), value: 'snowChance' },
    { displayName: t('weather.precip.cloudiness'), value: 'cloud' }
  ]

  const hours = forecast
    .filter((hour) => {
      const time = new Date(hour.time)
      const hours = time.getHours()
      if (hours < 6 || hours % 4 !== 0) return
      return hour
    })
    .map((hour) => ({
      ...hour,
      time: getFormattedTime(new Date(hour.time), settings.timeFormat, {
        [TimeFormatEnum.hour24]: { minute: 'numeric' }
      })
    }))

  return (
    <div className="weather__precip weather-precip">
      <Tabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="weather-precip__items">
        {hours.map((hour: ForecastHour, index: number) => (
          <ProgressBar
            key={index}
            value={
              hour[
                tabs[activeTab].value as keyof Pick<
                  ForecastHour,
                  'rainChance' | 'snowChance' | 'cloud'
                >
              ]
            }
            label={hour.time}
            showPercentage
          />
        ))}
      </div>
    </div>
  )
}

export default WeatherPrecip
