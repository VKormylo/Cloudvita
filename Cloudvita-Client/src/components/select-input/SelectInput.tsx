import { useState, useEffect } from 'react'
import { cn } from '~/utils/cn'
import { SettingTypes } from '~/types/common.types'
import './select-input.scss'

interface SelectOptionType<T> {
  value: T
  title: string
}

interface SelectInputProps<T extends SettingTypes> {
  value: T
  setValue: (value: T) => void
  label: string
  options: SelectOptionType<T>[]
}

const SelectInput = <T extends SettingTypes>({
  value,
  setValue,
  label,
  options
}: SelectInputProps<T>) => {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedOption, setSelectedOption] = useState<string>(
    options.find((option) => option.value === value)!.title
  )

  useEffect(() => {
    setSelectedOption(options.find((option) => option.value === value)!.title)
  }, [value, options])

  const handleToggle = () => {
    setIsOpen((prev) => !prev)
  }

  const handleSelect = (e: React.MouseEvent<HTMLLIElement>) => {
    const value = (e.target as HTMLLIElement).dataset.value as T
    const title = (e.target as HTMLLIElement).textContent as string
    setIsOpen(false)
    setSelectedOption(title)
    setValue(value)
  }

  return (
    <div
      className={cn(
        'select-input',
        'select-input-medium',
        'select-input-primary',
        isOpen && 'select-input-open'
      )}
    >
      <div
        className="select-input-overlay"
        onClick={() => setIsOpen(false)}
      ></div>
      {label && <span className="select-input-label">{label}</span>}
      <div onClick={handleToggle} className="select-input-box">
        {selectedOption}
      </div>
      <ul className="select-input-options">
        {options.map((item) => (
          <li
            className={cn(selectedOption === item.title && 'option-selected')}
            onClick={handleSelect}
            key={item.value}
            data-value={item.value}
          >
            {item.title}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default SelectInput
