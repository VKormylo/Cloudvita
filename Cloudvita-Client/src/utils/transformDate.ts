import { capitalize } from './transformText'
import i18next, { t } from 'i18next'
import { TimeFormatEnum } from '~/types/common.enums'

const formatDate = (
  date: Date,
  locale: string = 'en-US',
  options: Intl.DateTimeFormatOptions
) => date.toLocaleString(locale, options)

export const getDateAlpha = (date?: Date | string) => {
  const currentDate = new Date()
  let nextDate: Date

  if (!date) nextDate = currentDate
  else nextDate = typeof date === 'string' ? new Date(date) : date

  const locale = i18next.language

  const currentDay = currentDate.getDate()
  const dayNumeric = nextDate.getDate()
  const dayName = capitalize(formatDate(nextDate, locale, { weekday: 'long' }))
  const monthFull = formatDate(nextDate, locale, { month: 'long' })
  const monthShort = formatDate(nextDate, locale, { month: 'short' })
  const year = nextDate.getFullYear()

  const dateAlpha =
    currentDay === dayNumeric
      ? t('common.date.today')
      : currentDay === dayNumeric - 1
      ? t('common.date.tomorrow')
      : `${dayName}, ${monthFull} ${dayNumeric}`

  const monthYear = `${monthFull} ${year}`
  const dateWeekDay = `${dayName}, ${monthShort} ${dayNumeric}, ${year}`

  return { currentDate, nextDate, dateAlpha, monthYear, dateWeekDay }
}

export const getDateISO = (date?: Date): string => {
  let dateISO: string | Date
  if (date) dateISO = new Date(date)
  else dateISO = new Date()
  return dateISO.toISOString().split('T')[0]
}

export const getFormattedTime = (
  date: Date,
  timeFormat: TimeFormatEnum,
  options: {
    [TimeFormatEnum.hour24]?: {
      minute?: 'numeric'
    }
    [TimeFormatEnum.hour12]?: {
      minute?: '2-digit'
    }
  }
) => {
  const hourType = {
    [TimeFormatEnum.hour24]: {
      hour: 'numeric' as const,
      hour12: false,
      ...options[TimeFormatEnum.hour24]
    },
    [TimeFormatEnum.hour12]: {
      hour: 'numeric' as const,
      hour12: true,
      ...options[TimeFormatEnum.hour12]
    }
  }

  return date.toLocaleString(i18next.language, { ...hourType[timeFormat] })
}
