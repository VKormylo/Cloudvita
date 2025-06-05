import { useCallback, useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useQuery } from '@tanstack/react-query'
import { weatherService } from '~/services/weather-service'
import { WeatherContext } from '~/context/weatherContext'
import { transformWeatherResponse } from '~/utils/transformWeather'
import { useAuthContext } from '~/context/authContext'
import { useSnackbarContext } from '~/context/snackbarContext'
import { ResponseError } from '~/exceptions/response-error'
import { Location } from '~/types/weather.types'
import useLocations from '~/hooks/use-locations'
import Loader from '~/components/loader/Loader'
import Header from '~/containers/header/Header'
import NavBar from '~/containers/navbar/NavBar'
import Forecast from '~/pages/forecast/Forecast'

const Home: React.FC = () => {
  const { t } = useTranslation()

  const { isLoadingUser } = useAuthContext()
  const { openAlert } = useSnackbarContext()

  const [date, setDate] = useState<string>('')
  const [search, setSearch] = useState<string>('')
  const [isSaved, setIsSaved] = useState<boolean>(false)

  const { loadingLocations, locations, saveLocation, updateLocation } =
    useLocations()

  const searchForecastDay = (date: string) => setDate(date)

  const findLocation = useCallback(
    (location: Pick<Location, 'city' | 'country'>) => {
      const { city, country } = location
      const savedLocation = locations?.find(
        (location) => location.city === city && location.country === country
      )

      return savedLocation
    },
    [locations]
  )

  const getWeatherData = useCallback(
    () => weatherService.getWeatherData(search),
    [search]
  )

  const {
    isLoading: isLoadingWeather,
    data: weather,
    error
  } = useQuery({
    queryFn: getWeatherData,
    queryKey: ['forecast', search],
    staleTime: Infinity,
    enabled: Boolean(search),
    select: (data) => (data ? transformWeatherResponse(data) : data)
  })

  const onErrorResponse = useCallback(
    (error: ResponseError) => {
      console.log(error)
      openAlert({
        variant: 'error',
        message: t(`common.errors.${error.code}`) || error.message
      })
    },
    [openAlert, t]
  )

  useEffect(() => {
    if (!error) return
    onErrorResponse(error)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error])

  useEffect(() => {
    if (!weather) return
    setDate(weather.location.localtime.split(' ')[0])
    const location = findLocation(weather.location)
    if (location) updateLocation(location._id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [weather, updateLocation])

  useEffect(() => {
    if (!weather) return
    const location = findLocation(weather.location)
    setIsSaved(Boolean(location))
  }, [weather, findLocation])

  return (
    <div className="main-page">
      <WeatherContext.Provider
        value={{
          weather,
          date,
          search,
          setSearch,
          searchForecastDay
        }}
      >
        <NavBar />
        <Header
          isSaved={isSaved}
          saveLocation={() =>
            weather?.location && saveLocation(weather.location)
          }
        />
        <div className="main-page__content">
          {loadingLocations || isLoadingUser ? (
            <Loader />
          ) : (
            <Outlet context={{ isLoadingWeather }} />
          )}
        </div>
        <Forecast isLoadingWeather={isLoadingWeather} />
      </WeatherContext.Provider>
    </div>
  )
}

export default Home
