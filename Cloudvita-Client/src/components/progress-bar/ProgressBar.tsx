import './progress-bar.scss'

interface ProgressBarProps {
  showPercentage?: boolean
  value: number
  label?: string
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  showPercentage,
  value,
  label = ''
}) => {
  const progressValue = Math.max(0, Math.min(value, 100))

  return (
    <div className="progress-bar__container">
      {label && <span className="progress-bar__label">{label}</span>}
      <div
        className="progress-bar"
        role="progressbar"
        aria-valuenow={progressValue}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={label}
      >
        <div
          className="progress-bar__bar"
          style={{
            width: `${progressValue}%`,
            transition: 'width 0.4s ease'
          }}
        ></div>
      </div>
      {showPercentage && (
        <span className="progress-bar__percentage">{`${progressValue}%`}</span>
      )}
    </div>
  )
}

export default ProgressBar
