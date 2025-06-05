import { useSnackbarContext } from '~/context/snackbarContext'
import { cn } from '~/utils/cn'
import { commonIcons } from '~/utils/icons'
import './snackbar.scss'

const SnackbarAlert: React.FC = () => {
  const { isOpened, variant, type, message, handleClose } = useSnackbarContext()

  return (
    <div
      className={cn(
        'snackbar-alert',
        isOpened && 'snackbar-alert-opened',
        `snackbar-alert-${variant}`,
        `snackbar-alert-${type}`
      )}
    >
      <div className="snackbar-alert__content">
        <div className="snackbar-alert__icon">{commonIcons[variant]}</div>
        <p className="snackbar-alert__message">{message}</p>
        <button onClick={handleClose} className="snackbar-alert__close">
          {commonIcons.close}
        </button>
      </div>
    </div>
  )
}

export default SnackbarAlert
