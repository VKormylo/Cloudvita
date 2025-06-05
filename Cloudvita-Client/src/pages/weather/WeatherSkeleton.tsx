import SkeletonLoader from '~/components/skeleton-loader/SkeletonLoader'

const WeatherSkeleton: React.FC = () => {
  return (
    <>
      <div className="weather__forecast">
        <SkeletonLoader isLoading={true} count={5} width={180} height={220} />
      </div>
      <div className="weather-overiew">
        <SkeletonLoader
          isLoading={true}
          width={200}
          height={30}
          style={{ margin: '32px 0 22px 0' }}
        />
        <div className="weather-overview__items">
          <SkeletonLoader
            isLoading={true}
            count={4}
            width={'45%'}
            height={140}
            style={{ flexGrow: 1 }}
          />
        </div>
        <SkeletonLoader
          isLoading={true}
          width={450}
          height={55}
          style={{ margin: '32px 0 18px 0' }}
        />
        <div className="weather-precip">
          <div className="weather-precip__items">
            <SkeletonLoader isLoading={true} count={4} height={35} />
          </div>
        </div>
      </div>
    </>
  )
}

export default WeatherSkeleton
