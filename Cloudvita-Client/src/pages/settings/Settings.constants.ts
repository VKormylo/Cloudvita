import { TFunction } from 'i18next'
import {
  DegreeUnitEnum,
  LanguageEnum,
  PressureUnitEnum,
  SpeedUnitEnum,
  ThemeEnum,
  TimeFormatEnum
} from '~/types/common.enums'

export const getSettingsTheme = (t: TFunction) => [
  {
    value: ThemeEnum.light,
    title: t('settings.options.light')
  },
  { value: ThemeEnum.dark, title: t('settings.options.dark') }
]

export const getSettingsLanguage = (t: TFunction) => [
  {
    value: LanguageEnum.en,
    title: t('settings.options.en')
  },
  {
    value: LanguageEnum.uk,
    title: t('settings.options.uk')
  }
]

export const getSettingsTimeFormat = (t: TFunction) => [
  {
    value: TimeFormatEnum.hour12,
    title: t('settings.options.hour12')
  },
  {
    value: TimeFormatEnum.hour24,
    title: t('settings.options.hour24')
  }
]

export const getSettingsTemperature = (t: TFunction) => [
  {
    value: DegreeUnitEnum.celsius,
    title: t('settings.options.celsius')
  },
  {
    value: DegreeUnitEnum.fahrenheit,
    title: t('settings.options.fahrenheit')
  }
]

export const getSettingsSpeed = (t: TFunction) => [
  {
    value: SpeedUnitEnum.kph,
    title: t('settings.options.kph')
  },
  {
    value: SpeedUnitEnum.mph,
    title: t('settings.options.mph')
  }
]

export const getSettingsPressure = (t: TFunction) => [
  {
    value: PressureUnitEnum.mb,
    title: t('settings.options.mb')
  },
  {
    value: PressureUnitEnum.in,
    title: t('settings.options.in')
  }
]
