import SkeletonLoader from '~/components/skeleton-loader/SkeletonLoader'

interface ForecastSkeletonProps {
  loading: boolean
}

const ForecastSkeleton: React.FC<ForecastSkeletonProps> = ({
  loading = false
}) => {
  return (
    <>
      <div className="forecast-header">
        <SkeletonLoader
          isLoading={loading}
          variant="dark"
          width={200}
          height={30}
        />
        <SkeletonLoader
          isLoading={loading}
          variant="dark"
          width={100}
          height={30}
          style={{ justifySelf: 'flex-end' }}
        />
        <SkeletonLoader
          isLoading={loading}
          variant="dark"
          width={150}
          height={20}
        />
        <SkeletonLoader
          isLoading={loading}
          variant="dark"
          width={50}
          height={50}
          style={{ margin: '64px 0 24px 0' }}
        />
        <SkeletonLoader
          isLoading={loading}
          variant="dark"
          width={'100%'}
          height={60}
          style={{ margin: '0 0 80px 0' }}
        />
        <div className="forecast-header__additional">
          <SkeletonLoader
            isLoading={loading}
            variant="dark"
            count={2}
            width={150}
            height={60}
          />
        </div>
      </div>
      <div className="forecast-main">
        <SkeletonLoader
          isLoading={loading}
          variant="dark"
          width={300}
          height={30}
          style={{ margin: '0 0 24px 0' }}
        />
        <div className="forecast-main__items">
          <SkeletonLoader
            isLoading={loading}
            variant="dark"
            count={3}
            width={'100%'}
            height={90}
          />
        </div>
      </div>
    </>
  )
}

export default ForecastSkeleton
