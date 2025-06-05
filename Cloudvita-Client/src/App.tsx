import { Navigate, Route, Routes } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { SettingsProvider } from '~/context/settingsContext'
import { AuthProvider } from '~/context/authContext'
import { SnackbarProvider } from '~/context/snackbarContext'
import Auth from '~/pages/auth/Auth'
import Home from '~/pages/home/Home'
import Weather from '~/pages/weather/Weather'
import Locations from '~/pages/locations/Locations'
import Settings from '~/pages/settings/Settings'
import '~/index.tsx'
import '~/scss/styles.scss'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <SettingsProvider>
          <SnackbarProvider>
            <Routes>
              <Route path="/" element={<Home />}>
                <Route index element={<Navigate to="dashboard" replace />} />
                <Route path="dashboard" element={<Weather />} />
                <Route path="locations" element={<Locations />} />
                <Route path="settings" element={<Settings />} />
                <Route path="profile" element={<div>Profile</div>} />
              </Route>
              <Route path="/auth" element={<Auth />} />
            </Routes>
          </SnackbarProvider>
        </SettingsProvider>
      </AuthProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

export default App
