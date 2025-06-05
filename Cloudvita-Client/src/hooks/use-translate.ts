import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { textToCamel } from '~/utils/transformText'

const useTranslate = <T extends { value: string }>(key: string) => {
  const { t } = useTranslation()

  const translateData = useCallback(
    <T extends { value: string }>(data: T[]) => {
      return data.map((item) => ({
        ...item,
        displayName: t(`${key}.${textToCamel(item.value)}`)
      }))
    },
    [key, t]
  )

  return useCallback(
    (data: T[]) => {
      return translateData(data)
    },
    [translateData]
  )
}

export default useTranslate
