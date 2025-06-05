import { createContext, useContext } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { authService } from '~/services/auth-service'
import { User } from '~/types/user.types'

interface AuthContextParams {
  isLoadingUser: boolean
  isLoggedIn: boolean | null
  user: User | null
  logout: () => void
}

const AuthContext = createContext<AuthContextParams | null>(null)

const useAuthContext = () => {
  const authContext = useContext(AuthContext)

  if (!authContext) {
    throw new Error('useAuthContext must be used within an AuthProvider')
  }

  return authContext
}

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const queryClient = useQueryClient()

  const { isLoading: isLoadingUser, data: user = null } = useQuery({
    queryKey: ['user'],
    queryFn: authService.isLoggedIn,
    select: (data) => data.user,
    retry: false
  })

  const isLoggedIn = !!user

  const { mutate: logout } = useMutation({
    mutationFn: authService.logout,
    onSuccess: () => {
      queryClient.setQueryData(['user'], null)
      queryClient.invalidateQueries({ queryKey: ['user'] })
    }
  })

  return (
    <AuthContext.Provider
      value={{ isLoadingUser: isLoadingUser, isLoggedIn, user, logout }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export { AuthProvider, useAuthContext }
