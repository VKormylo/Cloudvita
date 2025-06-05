import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'

import {
  getFromLocalStorage,
  setToLocalStorage
} from '~/services/local-storage-service'
import resources from '~/constants/translations'
import { LanguageEnum } from '~/types/common.enums'

let initialLanguage = getFromLocalStorage('language')

if (!initialLanguage) {
  const browserLanguage = navigator.language.split('-')[0]
  initialLanguage =
    browserLanguage === LanguageEnum.uk ? LanguageEnum.uk : LanguageEnum.en
  setToLocalStorage('language', initialLanguage)
}

void i18next.use(initReactI18next).init({
  lng: initialLanguage,
  fallbackLng: 'en',
  resources,
  ns: ['translations']
})

export default i18next
