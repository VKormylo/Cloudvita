import { useTranslation } from 'react-i18next'
import { useAuthContext } from '~/context/authContext'
import { getDateAlpha } from '~/utils/transformDate'
import { headerIcons } from '~/utils/icons'
import SkeletonLoader from '~/components/skeleton-loader/SkeletonLoader'
import Button from '~/components/button/Button'
import './header.scss'

interface HeaderProps {
  isSaved: boolean
  saveLocation: () => void
}

const Header: React.FC<HeaderProps> = ({ isSaved, saveLocation }) => {
  const { t } = useTranslation()
  const { isLoadingUser, isLoggedIn, user } = useAuthContext()
  const username = user?.name ?? t('header.guest')

  const { monthYear, dateWeekDay } = getDateAlpha(new Date())

  return (
    <div className="header">
      <div className="header__user">
        {headerIcons.guestUser}
        <SkeletonLoader isLoading={isLoadingUser} width={80} height={20}>
          <div className="header__username">{username}</div>
        </SkeletonLoader>
      </div>
      <div className="header__info">
        <div className="header__month">{monthYear}</div>
        <div className="header__date">{dateWeekDay}</div>
      </div>
      <SkeletonLoader
        isLoading={isLoadingUser}
        width={70}
        height={70}
        style={{ marginLeft: 'auto' }}
      >
        {isLoggedIn ? (
          <Button isDisabled={isSaved} onClick={saveLocation} iconOnly>
            {headerIcons.save}
          </Button>
        ) : (
          <div className="header__buttons">
            <Button to="/auth" urlState={{ mode: 'signup' }}>
              {t('header.signup')}
            </Button>
            <Button to="/auth" urlState={{ mode: 'login' }}>
              {t('header.login')}
            </Button>
          </div>
        )}
      </SkeletonLoader>
    </div>
  )
}

export default Header
