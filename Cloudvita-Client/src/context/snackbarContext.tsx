import { createContext, useCallback, useContext, useRef, useState } from 'react'
import { AlertType, AlertVariant, ErrorResponse } from '~/types/common.types'
import SnackbarAlert from '~/components/snackbar/SnackbarAlert'

interface SnackbarProps {
  variant: AlertVariant
  message: string
  duration?: number
  type?: AlertType
}

interface SnackbarContextProps {
  isOpened: boolean
  variant: AlertVariant
  message: string
  duration?: number
  type?: AlertType
  openAlert: (data: SnackbarProps) => void
  handleErrorAlert: (error: ErrorResponse | string) => void
  handleClose: () => void
}

const SnackbarContext = createContext<SnackbarContextProps | null>(null)

const useSnackbarContext = (): SnackbarContextProps => {
  const snackbarContext = useContext(SnackbarContext)

  if (!snackbarContext) {
    throw new Error(
      'useSnackbarContext must be used within an SnackbarProvider'
    )
  }

  return snackbarContext
}

const SnackbarProvider: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const [isOpened, setIsOpened] = useState(false)
  const [message, setMessage] = useState('')
  const [variant, setVariant] = useState<AlertVariant>('success')
  const [type, setType] = useState<AlertType>()
  const [duration, setDuration] = useState<number>()
  const timerRef = useRef<number | null>(null)

  const handleClose = useCallback(() => {
    setIsOpened(false)
    clearTimeout(timerRef.current as number)

    setTimeout(() => {
      setVariant('success')
      setDuration(5000)
      setType(undefined)
    }, 500)
  }, [])

  const openAlert = useCallback(
    ({ variant, message, duration = 5000, type = 'filled' }: SnackbarProps) => {
      if (isOpened) return

      setIsOpened(true)
      setVariant(variant)
      setMessage(message)
      setDuration(duration)
      setType(type)

      timerRef.current = setTimeout(() => {
        handleClose()
      }, duration)
    },
    [handleClose, isOpened]
  )

  const handleErrorAlert = useCallback(
    (error: ErrorResponse | string) => {
      openAlert({
        message: typeof error === 'string' ? error : error.message,
        variant: 'error'
      })
    },
    [openAlert]
  )

  return (
    <SnackbarContext.Provider
      value={{
        isOpened,
        message,
        variant,
        duration,
        type,
        openAlert,
        handleErrorAlert,
        handleClose
      }}
    >
      <SnackbarAlert />
      {children}
    </SnackbarContext.Provider>
  )
}

export { SnackbarProvider, useSnackbarContext }
