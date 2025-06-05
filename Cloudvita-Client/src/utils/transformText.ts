import { JoinByEnum, SplitByEnum, TextStyleEnum } from '~/types/common.enums'

interface CapitalizeWordsFunction {
  (
    text: string,
    style?: TextStyleEnum,
    splitBy?: string,
    joinBy?: string
  ): string
}

export const capitalize = (str: string) =>
  str.charAt(0).toUpperCase() + str.slice(1)

export const textToCamel = (str: string) => {
  return str
    .toLowerCase()
    .split(' ')
    .map((word: string, index: number) =>
      index === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1)
    )
    .join('')
}

export const transformText: CapitalizeWordsFunction = (
  text,
  style = TextStyleEnum.camelcase,
  splitBy = SplitByEnum.hyphen,
  joinBy = JoinByEnum.space
): string => {
  let transformedText: string = ''

  if (style === TextStyleEnum.camelcase) {
    transformedText = text
      .split(splitBy)
      .map((word: string, index: number) => {
        if (index === 0) return word.charAt(0).toLowerCase() + word.slice(1)
        else return word.charAt(0).toUpperCase() + word.slice(1)
      })
      .join(joinBy)
  }

  if (style === TextStyleEnum.capitalize) {
    transformedText = text
      .split(splitBy)
      .map((word: string) => (word = word[0].toUpperCase() + word.slice(1)))
      .join(joinBy)
  }

  return transformedText
}
