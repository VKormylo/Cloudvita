import { useOutletContext } from 'react-router-dom'
import { useWeatherContext } from '~/context/weatherContext'
import WeatherForecast from '~/containers/weather-forecast/WeatherForecast'
import WeatherOverview from '~/containers/weather-overview/WeatherOverview'
import WeatherPrecip from '~/containers/weather-precip/WeatherPrecip'
import EmptyWeather from '~/containers/empty-weather/EmptyWeather'
import WeatherSkeleton from './WeatherSkeleton'
import './weather.scss'

const Weather: React.FC = () => {
  const { weather, date } = useWeatherContext()
  const { isLoadingWeather } = useOutletContext<{ isLoadingWeather: boolean }>()
  const currentDay = weather?.forecast.find((day) => day.date === date)

  const loader = isLoadingWeather ? <WeatherSkeleton /> : <EmptyWeather />

  if (!currentDay) {
    return loader
  }

  return (
    <div className="weather">
      {/* {!currentDay ? (
        loader
      ) : (
        <> */}
      <WeatherForecast forecast={currentDay.hour} />
      <WeatherOverview forecast={currentDay.hour} />
      <WeatherPrecip forecast={currentDay.hour} />
      {/* </>
      )} */}
    </div>
  )
}

export default Weather
