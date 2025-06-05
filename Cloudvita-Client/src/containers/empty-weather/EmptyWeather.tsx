import { useTranslation } from 'react-i18next'
import CloudIcon from '~/assets/img/no-data/cloud.svg?react'
import SearchIcon from '~/assets/img/no-data/search.svg?react'
import './empty-weather.scss'

const EmptyWeather: React.FC = () => {
  const { t } = useTranslation()

  return (
    <div className="empty-weather">
      <div className="empty-weather__icon weather-icon">
        <CloudIcon className="weather-icon__cloud" />
        <SearchIcon className="weather-icon__search" />
      </div>
      <div className="empty-weather__content weather-content">
        <div className="weather-content__title">{t('weather.emptyWeather.title')}</div>
        <div className="weather-content__subtitle">
          {t('weather.emptyWeather.subtitle')}
        </div>
      </div>
    </div>
  )
}

export default EmptyWeather
