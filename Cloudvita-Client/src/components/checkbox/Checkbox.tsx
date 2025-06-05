import './checkbox.scss'

interface CheckboxProps {
  name: string
  label: string
  className?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const Checkbox: React.FC<CheckboxProps> = ({
  name,
  label,
  className,
  onChange
}) => {
  return (
    <div className={className ? `${className}__item` : 'input__container'}>
      <label className={`${className}__remember checkbox`}>
        <input name={name} type="checkbox" onChange={onChange} />
        <span className="checkbox__box"></span>
        <span className="checkbox__text">{label}</span>
      </label>
    </div>
  )
}

export default Checkbox
