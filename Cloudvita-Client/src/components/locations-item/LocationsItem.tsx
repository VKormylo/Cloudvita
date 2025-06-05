import { useTranslation } from 'react-i18next'
import { Location } from '~/types/weather.types'
import { forecastIcons, headerIcons } from '~/utils/icons'
import { getDateISO } from '~/utils/transformDate'
import { VariantEnum } from '~/types/common.enums'
import Button from '../button/Button'

interface LocationsItemProps {
  location: Location
  onSearch: (city: string, id: string) => void
  onDelete: (id: string) => void
}

const LocationsItem: React.FC<LocationsItemProps> = ({
  location,
  onSearch,
  onDelete
}) => {
  const { t } = useTranslation()

  return (
    <div className="location__item item-location" data-id={location._id}>
      <div className="item-location__info location-info">
        <div className="location-info__title">
          <span className="location-info__name">{location.city},</span>
          <span className="location-info__country">{location.country}</span>
        </div>
        <div className="location-info__viewed">
          <span>{t('locations.lastViewed')}:</span>
          <div className="location-info__date">
            {getDateISO(location.lastViewed)}
          </div>
        </div>
      </div>
      <div className="item-location__buttons">
        <Button
          to="/dashboard"
          onClick={() => onSearch(location.city, location._id)}
          type={VariantEnum.primary}
          iconOnly
        >
          {forecastIcons.search}
        </Button>
        <Button
          onClick={() => onDelete(location._id)}
          type={VariantEnum.danger}
          iconOnly
        >
          {headerIcons.save}
        </Button>
      </div>
    </div>
  )
}

export default LocationsItem
