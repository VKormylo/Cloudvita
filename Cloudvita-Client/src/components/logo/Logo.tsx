import logo from '~/assets/logo.svg'
import logoText from '~/assets/logo-text.svg'
import { Link } from 'react-router-dom'

interface LogoProps {
  isText?: boolean
}

const Logo: React.FC<LogoProps> = ({ isText = false }) => {
  return isText ? (
    <Link to={'/dashboard'} className="logo">
      <img src={logoText} alt="logo" />
    </Link>
  ) : (
    <div className="logo">
      <img src={logo} alt="logo" />
    </div>
  )
}

export default Logo
