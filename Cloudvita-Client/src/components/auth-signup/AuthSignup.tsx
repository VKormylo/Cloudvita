import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useForm } from '~/hooks/use-form'
import { authService } from '~/services/auth-service'
import { SizeEnum, VariantEnum } from '~/types/common.enums'
import { SignupSchema, UserSignup } from '~/schemas'
import { initialSignupValues } from './AuthSignup.constants'
import { useSnackbarContext } from '~/context/snackbarContext'
import { ErrorResponse } from '~/types/common.types'
import Button from '~/components/button/Button'
import Input from '~/components/input/Input'
import Checkbox from '~/components/checkbox/Checkbox'

const AuthSignup: React.FC = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const { handleErrorAlert } = useSnackbarContext()

  const { mutate: handleSignup } = useMutation({
    mutationFn: authService.signup,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['user'] })
      if (data.token) navigate('/dashboard', { replace: true })
    },
    onError: (error: ErrorResponse) => {
      const message = error.message.includes('duplicate')
        ? 'Username already taken. Please choose another one.'
        : 'UNKOWN_ERROR'

      handleErrorAlert(message)
    }
  })

  const handleFormSubmit = (data?: UserSignup) => {
    if (!data) return
    handleSignup(data)
  }

  const { handleInputChange, handleSubmit, errors } = useForm<UserSignup>({
    initialValues: initialSignupValues,
    schema: SignupSchema,
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
        <Input
          name="passwordConfirm"
          onChange={handleInputChange('passwordConfirm')}
          className="auth-form"
          label={t('auth.common.confirmPassword.label')}
          placeholder={t('auth.common.confirmPassword.placeholder')}
          type="password"
          isStretch
          error={errors.passwordConfirm}
        />
      </div>
      <Checkbox
        name="rememberMe"
        onChange={handleInputChange('rememberMe')}
        className="auth-form"
        label={t('auth.common.rememberMe')}
      />
      <Button size={SizeEnum.large} type={VariantEnum.primary} isStretch>
        {t('auth.common.signup')}
      </Button>
    </form>
  )
}

export default AuthSignup
