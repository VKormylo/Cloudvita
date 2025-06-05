import { useCallback, useEffect, useMemo, useState } from 'react'
import { ZodSchema } from 'zod'

type FormValidationHandler<Data, Value> = (
  value: Value | string,
  data: Data
) => string | undefined

type FormValidations<T> = {
  [Key in keyof T]: FormValidationHandler<T, T[Key]>
}

type FormErrors<T> = Record<keyof T, string>

type UseFormEventHandler<Fields, Event> = (
  key: keyof Fields
) => (event: Event) => void

interface UseFormProps<T> {
  initialValues: T
  initialErrors?: FormErrors<T>
  validations?: Partial<FormValidations<T>>
  schema?: ZodSchema<T>
  onSubmit?: (data?: T) => Promise<void> | void
}

interface UseFormResult<T> {
  data: T
  isValid: boolean
  errors: FormErrors<T>
  handleInputChange: UseFormEventHandler<T, React.ChangeEvent<HTMLInputElement>>
  handleErrors: (key: keyof T, error: string) => void
  handleSubmit: (event?: React.FormEvent<HTMLFormElement>) => void
  resetData: (keys?: (keyof T)[]) => void
  resetErrors: () => void
}

const getEmptyValues = <T extends object, V>(
  initialValues: T,
  defaultValue: V
) => {
  return Object.keys(initialValues).reduce(
    (acc, key) => ({
      ...acc,
      [key]: defaultValue
    }),
    {} as Record<keyof T, V>
  )
}

export const useForm = <T extends object>({
  initialValues,
  initialErrors = getEmptyValues(initialValues, ''),
  schema,
  onSubmit
}: UseFormProps<T>): UseFormResult<T> => {
  const [data, setData] = useState<T>(initialValues)
  const [errors, setErrors] = useState<FormErrors<T>>(initialErrors)
  const [isFormValid, setIsFormValid] = useState<boolean>(true)

  useEffect(() => {
    setIsFormValid(!Object.values(errors).some((error) => error))
  }, [errors])

  const handleInputChange = useCallback(
    (key: keyof T) => (event: React.ChangeEvent<HTMLInputElement>) => {
      console.log(event.target.type)
      const value =
        event.target.type === 'checkbox'
          ? event.target.checked
          : event.target.value

      setData((prev) => ({
        ...prev,
        [key]: value
      }))
    },
    []
  )

  const handleErrors = useCallback((key: keyof T, error: string) => {
    setErrors((prev) => ({
      ...prev,
      [key]: error
    }))
  }, [])

  const resetData = useCallback(
    (keys?: (keyof T)[]) => {
      setData((prev) => {
        if (!keys || keys.length === 0) return initialValues

        const newData = { ...prev }

        keys.forEach((key) => {
          newData[key] = initialValues[key]
        })

        return newData
      })
    },
    [initialValues]
  )

  const resetErrors = useCallback(() => {
    setErrors(initialErrors)
  }, [initialErrors])

  const handleSubmit = useCallback(
    (event?: React.FormEvent<HTMLFormElement>) => {
      event?.preventDefault()

      if (!schema) {
        if (onSubmit) void onSubmit(data)
        return
      }

      const result = schema.safeParse(data)

      if (result.success) {
        resetErrors()
        if (onSubmit) void onSubmit(data)
      } else {
        const newErrors = getEmptyValues(initialValues, '')
        result.error.issues.forEach((issue) => {
          const field = issue.path[0] as keyof T
          newErrors[field] = issue.message
        })
        setErrors(newErrors)
      }
    },
    [data, schema, onSubmit, initialValues, resetErrors]
  )

  const useFormResult = useMemo(() => {
    return {
      data,
      isValid: isFormValid,
      errors,
      handleInputChange,
      handleErrors,
      handleSubmit,
      resetData,
      resetErrors
    }
  }, [
    data,
    isFormValid,
    errors,
    handleInputChange,
    handleErrors,
    handleSubmit,
    resetData,
    resetErrors
  ])

  return useFormResult
}
