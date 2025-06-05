import { LocalStorage } from './../types/common.types'
import { cloudvita } from '~/constants'

const getLocalObject = () => {
  try {
    return JSON.parse(
      localStorage.getItem(cloudvita) ?? 'null'
    ) as LocalStorage | null
  } catch (error) {
    localStorage.removeItem(cloudvita)
    console.error('Error parsing localStorage item:', error)
    return null
  }
}

export const getFromLocalStorage = <K extends keyof LocalStorage>(
  key: K
): LocalStorage[K] | null => {
  const localObject = getLocalObject()

  if (!localObject) {
    return null
  }

  return localObject[key]
}

export const setToLocalStorage = <K extends keyof LocalStorage>(
  key: K,
  item: LocalStorage[K]
) => {
  const localObject: Partial<LocalStorage> = getLocalObject() || {}

  localObject[key] = item
  localStorage.setItem(cloudvita, JSON.stringify(localObject))
}

export const removeFromLocalStorage = <K extends keyof LocalStorage>(
  key: K
) => {
  const localObject = getLocalObject()

  if (localObject) {
    delete localObject[key]
    localStorage.setItem(cloudvita, JSON.stringify(localObject))
  }
}
