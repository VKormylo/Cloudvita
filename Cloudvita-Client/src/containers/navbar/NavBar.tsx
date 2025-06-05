import { useTranslation } from 'react-i18next'
import { useAuthContext } from '~/context/authContext'
import { SizeEnum } from '~/types/common.enums'
import Logo from '~/components/logo/Logo'
import NavItem from '~/components/nav-item/NavItem'
import Button from '~/components/button/Button'
import LogoutIcon from '~/assets/img/sidebar/logout.svg?react'
import './navbar.scss'

const NavBar: React.FC = () => {
  const { t } = useTranslation()
  const { isLoggedIn, logout } = useAuthContext()

  return (
    <div className="sidebar">
      <Logo isText />
      <nav className="sidebar__nav navbar">
        <ul className="navbar__list">
          <NavItem to="/dashboard" icon="dashboard">
            {t('sidebar.dashboard')}
          </NavItem>
          <NavItem
            to={isLoggedIn ? '/locations' : '/auth'}
            state={!isLoggedIn && { mode: 'signup' }}
            icon="locations"
          >
            {t('sidebar.locations')}
          </NavItem>
          <NavItem to="/settings" icon="settings">
            {t('sidebar.settings')}
          </NavItem>
          <NavItem
            to={isLoggedIn ? '/profile' : '/auth'}
            state={!isLoggedIn && { mode: 'signup' }}
            icon="profile"
          >
            {t('sidebar.profile')}
          </NavItem>
          {isLoggedIn && (
            <Button
              className="navbar__button"
              onClick={logout}
              size={SizeEnum.large}
              icon={<LogoutIcon />}
            >
              {t('sidebar.logout')}
            </Button>
          )}
        </ul>
      </nav>
    </div>
  )
}

export default NavBar
