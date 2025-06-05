import { cn } from '~/utils/cn'
import './skeleton-loader.scss'

interface SkeletonLoaderProps {
  isLoading: boolean
  variant?: 'light' | 'dark'
  count?: number
  children?: React.ReactNode
  width?: number | string
  height?: number | string
  style?: React.CSSProperties
}

const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({
  isLoading,
  variant = 'light',
  count = 1,
  children,
  width,
  height,
  style
}) => {
  const dimensions = {
    width: typeof width === 'number' ? `${width}px` : width,
    height: typeof height === 'number' ? `${height}px` : height
  }

  if (isLoading) {
    return (
      <>
        {Array.from({ length: count }, (_, index) => (
          <div
            key={index}
            className={cn('skeleton-loader', `skeleton-loader-${variant}`)}
            style={{ ...style, ...dimensions }}
          ></div>
        ))}
      </>
    )
  }

  return <>{children}</>
}

export default SkeletonLoader
