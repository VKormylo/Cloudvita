import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import { useAuthContext } from '~/context/authContext'
import { useSnackbarContext } from '~/context/snackbarContext'
import { locationService } from '~/services/location-service'
import { Location } from '~/types/weather.types'

interface UseLocationsResult {
  loadingLocations: boolean
  locations: Location[] | undefined
  saveLocation: (location: Omit<Location, '_id' | 'lastViewed'>) => void
  updateLocation: (id: string) => void
  deleteLocation: (id: string) => void
}

const useLocations = (): UseLocationsResult => {
  const queryClient = useQueryClient()
  const { t } = useTranslation()
  const { isLoggedIn } = useAuthContext()
  const { openAlert } = useSnackbarContext()

  const { isLoading: loadingLocations, data: locations } = useQuery({
    queryFn: locationService.getAllLocations,
    queryKey: ['locations'],
    staleTime: Infinity,
    enabled: Boolean(isLoggedIn)
  })

  const onSuccessResponse = (message: string) => {
    openAlert({
      variant: 'success',
      message
    })
  }

  const { mutate: saveLocation } = useMutation({
    mutationFn: locationService.createLocation,
    onSuccess: () => {
      onSuccessResponse(t('common.alerts.savedSuccessfully'))
      queryClient.invalidateQueries({ queryKey: ['locations'] })
    }
  })

  const { mutate: updateLocation } = useMutation({
    mutationFn: locationService.updateLocation,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['locations'] })
    }
  })

  const { mutate: deleteLocation } = useMutation({
    mutationFn: locationService.deleteLocation,
    onSuccess: () => {
      onSuccessResponse(t('common.alerts.deletedSuccessfully'))
      queryClient.invalidateQueries({ queryKey: ['locations'] })
    }
  })

  return {
    loadingLocations,
    locations: locations?.locations,
    saveLocation,
    updateLocation,
    deleteLocation
  }
}

export default useLocations
