import { createContext, useContext, useEffect, useState } from 'react'
import i18next from 'i18next'
import {
  SettingsContextProps,
  SettingsWithLanguage,
  UpdateSettingByKey
} from '~/types/common.types'
import {
  DegreeUnitEnum,
  LanguageEnum,
  PressureUnitEnum,
  SpeedEnum,
  SpeedUnitEnum,
  ThemeEnum,
  TimeFormatEnum
} from '~/types/common.enums'
import {
  getFromLocalStorage,
  setToLocalStorage
} from '~/services/local-storage-service'

const SettingsContext = createContext<SettingsContextProps | null>(null)

const useSettingsContext = (): SettingsContextProps => {
  const settingsContext = useContext(SettingsContext)

  if (!settingsContext) {
    throw new Error(
      'useSettingsContext must be used within an SettingsProvider'
    )
  }

  return settingsContext
}

const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const initialLanguage = getFromLocalStorage('language') as LanguageEnum
  const initialSettings = getFromLocalStorage('settings')

  const defaultSettings: SettingsWithLanguage = {
    theme: ThemeEnum.light,
    timeFormat: TimeFormatEnum.hour24,
    degreeUnit: DegreeUnitEnum.celsius,
    speedUnit: SpeedUnitEnum.kph,
    pressureUnit: PressureUnitEnum.in,
    language: initialLanguage || LanguageEnum.en
  }

  const [settings, setSettings] = useState<SettingsWithLanguage>({
    ...defaultSettings,
    ...(initialSettings || {})
  })
  const speed = SpeedEnum.kph

  const onSettingChange: UpdateSettingByKey = (key, value) => {
    setSettings((prev) => ({
      ...prev,
      [key]: value
    }))

    if (key === 'language') {
      setToLocalStorage('language', value)
      i18next.changeLanguage(value)
    }
  }

  if (!initialSettings) {
    setToLocalStorage('settings', defaultSettings)
  }

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { language: _, ...restSettings } = settings

    setToLocalStorage('settings', restSettings)
  }, [settings])

  return (
    <SettingsContext.Provider
      value={{
        settings,
        onSettingChange,
        speed
      }}
    >
      {children}
    </SettingsContext.Provider>
  )
}

export { SettingsProvider, useSettingsContext }
