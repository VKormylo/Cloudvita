import {
  DegreeUnitEnum,
  LanguageEnum,
  PressureUnitEnum,
  SpeedEnum,
  SpeedUnitEnum,
  ThemeEnum,
  TimeFormatEnum
} from './common.enums'

export interface LocalStorage {
  settings: Settings
  language: string
}

export interface ErrorResponse {
  code: number
  status: string
  message: string
}

export type HttpMethod = 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE'

export interface RequestParams {
  data?: unknown
  method: HttpMethod
  url: string
}

interface Language {
  language: LanguageEnum
}

export type SettingTypes =
  | ThemeEnum
  | TimeFormatEnum
  | DegreeUnitEnum
  | SpeedUnitEnum
  | PressureUnitEnum
  | LanguageEnum

export type UpdateSettingByKey = <K extends keyof SettingsWithLanguage>(
  key: K,
  value: SettingsWithLanguage[K]
) => void

export interface Settings {
  theme: ThemeEnum
  timeFormat: TimeFormatEnum
  degreeUnit: DegreeUnitEnum
  speedUnit: SpeedUnitEnum
  pressureUnit: PressureUnitEnum
}

export interface SettingsWithLanguage extends Settings, Language {}

export interface SettingsContextProps {
  settings: SettingsWithLanguage
  onSettingChange: UpdateSettingByKey
  speed: SpeedEnum
}

export type AlertVariant = 'success' | 'warning' | 'error'
export type AlertType = 'filled' | 'outlined'

export interface OptionNameInterface {
  value: string
  displayName: string
}
