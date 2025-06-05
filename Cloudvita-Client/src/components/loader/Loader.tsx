import LoaderIcon from '~/assets/img/loader.svg?react'
import './loader.scss'

const Loader: React.FC = () => {
  return (
    <div className="loader__container">
      <div className="loader">
        <LoaderIcon />
      </div>
    </div>
  )
}

export default Loader
