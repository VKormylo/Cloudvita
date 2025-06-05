import { Location } from '~/types/weather.types'
import { baseService } from './base-service'

export const locationService = {
  getAllLocations: () => {
    return baseService.request<{ locations: Location[]; count: number }>({
      method: 'GET',
      url: '/locations'
    })
  },

  createLocation: (location: Omit<Location, 'lastViewed' | '_id'>) => {
    return baseService.request<{ location: Location }>({
      method: 'POST',
      url: '/locations',
      data: location
    })
  },

  updateLocation: (id: string) => {
    return baseService.request<{ location: Location }>({
      method: 'PATCH',
      url: `/locations/${id}`
    })
  },

  deleteLocation: (id: string) => {
    return baseService.request<void>({
      method: 'DELETE',
      url: `/locations/${id}`
    })
  }
}
