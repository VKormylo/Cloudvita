import { SizeEnum, VariantEnum } from '~/types/common.enums'
import { Link } from 'react-router-dom'
import { cn } from '~/utils/cn'
import './button.scss'

interface ButtonProps {
  size?: SizeEnum
  type?: VariantEnum
  to?: string
  urlState?: Record<string, unknown>
  icon?: React.ReactNode
  iconOnly?: boolean
  children?: React.ReactNode
  isDisabled?: boolean
  isFilled?: boolean
  isStretch?: boolean
  className?: string
  onClick?: (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void
}

const Button: React.FC<ButtonProps> = ({
  size = SizeEnum.medium,
  type = VariantEnum.secondary,
  to = null,
  urlState = null,
  icon = undefined,
  iconOnly = false,
  children,
  isDisabled = false,
  isFilled = false,
  isStretch = false,
  className = undefined,
  ...props
}) => {
  const btnClass = !iconOnly
    ? cn(
        'button',
        `button-${size}`,
        `button-${type}`,
        isDisabled && 'button-disabled',
        isFilled && 'button-filled',
        isStretch && 'button-stretch',
        icon && 'button-with-icon',
        className
      )
    : cn(
        'button',
        'button-icon',
        `button-${type}`,
        isDisabled && 'button-disabled',
        className
      )

  return !to ? (
    <button {...props} className={btnClass}>
      {icon && <div className="icon">{icon}</div>}
      {children}
    </button>
  ) : (
    <Link {...props} to={to} state={urlState} className={btnClass}>
      {icon && <div className="icon">{icon}</div>}
      {children}
    </Link>
  )
}

export default Button
