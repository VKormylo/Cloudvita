import { useTranslation } from 'react-i18next'
import { forecastIcons } from '~/utils/icons'
import { useWeatherContext } from '~/context/weatherContext'
import { useSettingsContext } from '~/context/settingsContext'
import {
  DegreeUnitEnum,
  JoinByEnum,
  SizeEnum,
  SplitByEnum,
  TextStyleEnum,
  TimeFormatEnum,
  VariantEnum
} from '~/types/common.enums'
import { getFormattedTime } from '~/utils/transformDate'
import { transformText } from '~/utils/transformText'
import ForecastItem from '~/components/forecast-item/ForecastItem'
import Input from '~/components/input/Input'
import ForecastSkeleton from './ForecastSkeleton'
import SearchIcon from '~/assets/img/search.svg?react'
import './forecast.scss'

interface ForecastProps {
  isLoadingWeather: boolean
}

const Forecast: React.FC<ForecastProps> = ({ isLoadingWeather }) => {
  const { t } = useTranslation()
  const { weather, search, setSearch } = useWeatherContext()
  const { settings } = useSettingsContext()

  const time = new Date(weather?.location.localtime || '')
  const formattedTime = getFormattedTime(time, settings.timeFormat, {
    [TimeFormatEnum.hour24]: { minute: 'numeric' },
    [TimeFormatEnum.hour12]: { minute: '2-digit' }
  })

  const condition =
    weather?.current.condition &&
    transformText(
      weather.current.condition,
      TextStyleEnum.camelcase,
      SplitByEnum.space,
      JoinByEnum.empty
    )

  return (
    <div className="forecast">
      <Input
        search={search}
        setSearch={setSearch}
        size={SizeEnum.large}
        variant={VariantEnum.secondary}
        icon={<SearchIcon />}
        placeholder={t('forecast.search')}
        isStretch
      />
      {!isLoadingWeather && weather ? (
        <>
          <div className="forecast__header forecast-header">
            <div className="forecast-header__info">
              <div className="forecast-header__location">
                <div className="forecast-header__city">
                  {weather.location.city}
                </div>
                <div className="forecast-header__country">
                  {weather.location.country}
                </div>
              </div>
              <div className="forecast-header__time">{formattedTime}</div>
            </div>
            <div className="forecast-header__icon">
              {forecastIcons.cloudyFilled}
            </div>
            <div className="forecast-header__weather">
              <div className="forecast-header__temperature">
                {weather.current.temp[settings.degreeUnit]}
                {settings.degreeUnit === DegreeUnitEnum.celsius ? '°C' : '°F'}
              </div>
              <div className="forecast-header__description">
                {t(`conditions.${condition}`)}
              </div>
            </div>
            <div className="forecast-header__additional">
              <div className="forecast-header__feels additional-item">
                <div className="additional-item__icon">
                  {forecastIcons.temperature}
                </div>
                <div className="additional-item__text">
                  {weather.current.feelslike[settings.degreeUnit]}
                  {settings.degreeUnit === DegreeUnitEnum.celsius ? '°C' : '°F'}
                </div>
              </div>
              <div className="forecast-header__humidity additional-item">
                <div className="additional-item__icon">
                  {forecastIcons.waterDrop}
                </div>
                <div className="additional-item__text">
                  {weather.current.humidity}%
                </div>
              </div>
            </div>
          </div>
          <div className="forecast__main forecast-main">
            <div className="forecast-main__title">
              {t('forecast.daysForecast')}
            </div>
            <div className="forecast-main__items">
              {weather.forecast.map((item, index) => (
                <ForecastItem key={index} forecast={item} />
              ))}
            </div>
          </div>
        </>
      ) : (
        <ForecastSkeleton loading={isLoadingWeather} />
      )}
    </div>
  )
}

export default Forecast
