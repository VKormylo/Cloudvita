import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { authService } from '~/services/auth-service'
import { useForm } from '~/hooks/use-form'
import { SizeEnum, VariantEnum } from '~/types/common.enums'
import { LoginSchema, UserLogin } from '~/schemas'
import { initialLoginValues } from './AuthLogin.constants'
import { useSnackbarContext } from '~/context/snackbarContext'
import Button from '~/components/button/Button'
import Input from '~/components/input/Input'
import Checkbox from '~/components/checkbox/Checkbox'

const AuthLogin: React.FC = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const { handleErrorAlert } = useSnackbarContext()

  const { mutate: handleLogin } = useMutation({
    mutationFn: authService.login,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['user'] })
      if (data.token) navigate('/dashboard', { replace: true })
    },
    onError: handleErrorAlert
  })

  const handleFormSubmit = async (data?: UserLogin) => {
    if (!data) return
    handleLogin(data)
  }

  const { handleInputChange, handleSubmit, errors } = useForm<UserLogin>({
    initialValues: initialLoginValues,
    schema: LoginSchema,
    onSubmit: handleFormSubmit
  })

  return (
    <form className="auth-main__form auth-form" onSubmit={handleSubmit}>
      <div className="auth-form__inputs">
        <Input
          name="username"
          onChange={handleInputChange('name')}
          className="auth-form"
          label={t('auth.common.username.label')}
          placeholder={t('auth.common.username.placeholder')}
          isStretch
          error={errors.name}
        />
        <Input
          name="password"
          onChange={handleInputChange('password')}
          className="auth-form"
          label={t('auth.common.password.label')}
          placeholder={t('auth.common.password.placeholder')}
          type="password"
          isStretch
          error={errors.password}
        />
      </div>
      <Checkbox
        name="rememberMe"
        onChange={handleInputChange('rememberMe')}
        className="auth-form"
        label={t('auth.common.rememberMe')}
      />
      <Button size={SizeEnum.large} type={VariantEnum.primary} isStretch>
        {t('auth.common.login')}
      </Button>
    </form>
  )
}

export default AuthLogin
