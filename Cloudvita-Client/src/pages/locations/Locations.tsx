import { Location } from '~/types/weather.types'
import { useWeatherContext } from '~/context/weatherContext'
import LocationsItem from '~/components/locations-item/LocationsItem'
import EmptyWeather from '~/containers/empty-weather/EmptyWeather'
import useLocations from '~/hooks/use-locations'
import './locations.scss'

const Locations: React.FC = () => {
  const { setSearch } = useWeatherContext()
  const { locations, updateLocation, deleteLocation } = useLocations()

  const handleSearchLocation = (city: string, id: string) => {
    updateLocation(id)
    setSearch(city)
  }

  return (
    <div className="locations">
      {!locations ? (
        <EmptyWeather />
      ) : (
        <div className="locations__items">
          {locations.map((location: Location) => (
            <LocationsItem
              key={location._id}
              location={location}
              onSearch={handleSearchLocation}
              onDelete={deleteLocation}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default Locations
