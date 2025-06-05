import CloseIcon from '~/assets/img/close.svg?react'
import SuccessIcon from '~/assets/img/success.svg?react'
import WarningIcon from '~/assets/img/warning.svg?react'
import ErrorIcon from '~/assets/img/error.svg?react'

import DashboardIcon from '~/assets/img/sidebar/dashboard.svg?react'
import LocationsIcon from '~/assets/img/sidebar/locations.svg?react'
import SettingsIcon from '~/assets/img/sidebar/settings.svg?react'
import ProfileIcon from '~/assets/img/sidebar/profile.svg?react'
import LogoutIcon from '~/assets/img/sidebar/logout.svg?react'

import GuestUserIcon from '~/assets/img/guest-user.svg?react'
import SaveIcon from '~/assets/img/save.svg?react'

import SearchIcon from '~/assets/img/search.svg?react'
import CloudyIcon from '~/assets/img/forecast/cloudy.svg?react'
import PartlyCloudyIcon from '~/assets/img/forecast/partlycloudy.svg?react'
import SunnyIcon from '~/assets/img/forecast/sunny.svg?react'
import TemperatureIcon from '~/assets/img/forecast/temperature.svg?react'
import WaterDropIcon from '~/assets/img/forecast/water-drop.svg?react'
import CloudyFilledIcon from '~/assets/img/cloudy-filled.svg?react'

import PressureIcon from '~/assets/img/overview/pressure.svg?react'
import RainIcon from '~/assets/img/overview/rain.svg?react'
import UVIndexIcon from '~/assets/img/overview/uv-index.svg?react'
import WindIcon from '~/assets/img/overview/wind.svg?react'

export const commonIcons = {
  close: <CloseIcon />,
  success: <SuccessIcon />,
  warning: <WarningIcon />,
  error: <ErrorIcon />
}

export const sidebarIcons = {
  dashboard: <DashboardIcon />,
  locations: <LocationsIcon />,
  settings: <SettingsIcon />,
  profile: <ProfileIcon />,
  logout: <LogoutIcon />
}

export const headerIcons = {
  guestUser: <GuestUserIcon />,
  save: <SaveIcon />
}

export const forecastIcons = {
  search: <SearchIcon />,
  cloudy: <CloudyIcon />,
  partlyCloudy: <PartlyCloudyIcon />,
  sunny: <SunnyIcon />,
  temperature: <TemperatureIcon />,
  waterDrop: <WaterDropIcon />,
  cloudyFilled: <CloudyFilledIcon />
}

export const overviewIcons = {
  pressure: <PressureIcon />,
  rainChance: <RainIcon />,
  snowChance: <RainIcon />,
  uv: <UVIndexIcon />,
  wind: <WindIcon />
}
