import { useState } from 'react'
import { SizeEnum, VariantEnum } from '~/types/common.enums'
import { cn } from '~/utils/cn'
import './input.scss'

interface InputProps {
  name?: string
  className?: string
  search?: string
  setSearch?: React.Dispatch<React.SetStateAction<string>>
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  size?: SizeEnum
  variant?: VariantEnum
  label?: string
  placeholder: string
  type?: string
  icon?: React.ReactNode
  isStretch?: boolean
  error?: string | undefined
}

const Input: React.FC<InputProps> = ({
  name,
  className,
  search = '',
  setSearch,
  onChange,
  size = SizeEnum.medium,
  variant = VariantEnum.primary,
  label,
  placeholder,
  type = 'text',
  icon,
  isStretch = false,
  error
}) => {
  const [searchInput, setSearchInput] = useState(search)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value)
    if (onChange) onChange(e)
  }

  const handleSearch = () => {
    if (setSearch) setSearch(searchInput)
    setSearchInput('')
  }

  const labelElement = label && (
    <div className={`${className}__label label`}>{label}</div>
  )

  const inputClass = cn(
    className && `${className}__${type}`,
    className && `${className}__input`,
    'input',
    `input-${size}`,
    `input-${variant}`,
    `input-${type}`,
    error && 'input-invalid',
    icon && 'input-icon',
    isStretch && 'input-stretch'
  )

  return (
    <div className={className ? `${className}__item` : 'input__container'}>
      {label && labelElement}
      {icon && (
        <button onClick={handleSearch} className="input__icon">
          {icon}
        </button>
      )}
      <input
        name={name}
        value={searchInput}
        type={type}
        className={inputClass}
        placeholder={placeholder}
        onChange={handleChange}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            handleSearch()
          }
        }}
      />
      <p className="input__error">{error}</p>
    </div>
  )
}

export default Input
