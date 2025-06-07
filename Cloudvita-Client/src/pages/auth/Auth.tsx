import { MouseEvent, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Trans, useTranslation } from 'react-i18next'
import { AuthActionEnum, SizeEnum, VariantEnum } from '~/types/common.enums'
import Logo from '~/components/logo/Logo'
import Button from '~/components/button/Button'
import AuthSignup from '~/components/auth-signup/AuthSignup'
import AuthLogin from '~/components/auth-login/AuthLogin'
import './auth.scss'
const Auth = () => {
  const { t } = useTranslation()
  document.body.style.backgroundColor = '#f5f5f5'

  const { state } = useLocation()
  const [actionType, setActionType] = useState<AuthActionEnum>(
    state.mode ?? AuthActionEnum.signup
  )

  let actionBtn
  let title
  let subtitle

  if (actionType === AuthActionEnum.signup) {
    actionBtn = AuthActionEnum.login
    title = t('auth.signup.title')
    subtitle = t('auth.signup.subtitle')
  } else if (actionType === AuthActionEnum.login) {
    actionBtn = AuthActionEnum.signup
    title = t('auth.login.title')
    subtitle = t('auth.login.subtitle')
  }

  function handleSetActionType(
    e: MouseEvent<HTMLButtonElement | HTMLAnchorElement>
  ) {
    e.preventDefault()

    setActionType((prev) =>
      prev === AuthActionEnum.signup
        ? AuthActionEnum.login
        : AuthActionEnum.signup
    )
  }

  return (
    <div className={`authentication ${actionType}`}>
      <div className="authentication__main auth-main">
        <Logo />
        <div className="auth-main__title">{title}</div>
        <div className="auth-main__subtitle">{subtitle}</div>
        {actionType === AuthActionEnum.signup ? <AuthSignup /> : <AuthLogin />}
      </div>
      <div className="authentication__swap auth-swap">
        <div className="auth-swap__title">
          <Trans i18nKey="auth.title" components={[<span />]} />
        </div>
        <Button
          className="auth-swap__button"
          onClick={handleSetActionType}
          size={SizeEnum.large}
          type={VariantEnum.tertiary}
        >
          {t(`auth.common.${actionBtn}`)}
        </Button>
      </div>
    </div>
  )
}

export default Auth
