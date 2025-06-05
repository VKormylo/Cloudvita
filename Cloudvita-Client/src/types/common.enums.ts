export enum AuthActionEnum {
  signup = 'signup',
  login = 'login'
}

export enum SizeEnum {
  small = 'small',
  medium = 'medium',
  large = 'large'
}

export enum VariantEnum {
  primary = 'primary',
  secondary = 'secondary',
  tertiary = 'tertiary',
  danger = 'danger'
}

export enum TextStyleEnum {
  capitalize = 'capitalize',
  camelcase = 'camelcase',
  lowercase = 'lowercase'
}

export enum SplitByEnum {
  space = ' ',
  hyphen = '-',
  underscore = '_'
}

export enum JoinByEnum {
  empty = '',
  space = ' ',
  hyphen = '-',
  underscore = '_'
}

export enum LanguageEnum {
  en = 'en',
  uk = 'uk'
}

export enum DegreeUnitEnum {
  celsius = 'celsius',
  fahrenheit = 'fahrenheit'
}

export enum SpeedEnum {
  kph = 'kph',
  mph = 'mph'
}

export enum SpeedUnitEnum {
  kph = 'km/h',
  mph = 'mi/h'
}

export enum PressureUnitEnum {
  in = 'in',
  mb = 'mb'
}

export enum TimeFormatEnum {
  hour12 = '12 hour',
  hour24 = '24 hour'
}

export enum ThemeEnum {
  light = 'light',
  dark = 'dark'
}

export type TimeFormat = '24 hour' | '12 hour'
export type SpeedUnit = 'km/h' | 'mi/h'
export type PressureUnit = 'in' | 'mb'
export type DegreeUnit = 'celsius' | 'fahrenheit'
