import { useAuth0 } from '@auth0/auth0-react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute'
import RootLayout from './components/RootLayout'
import GotoLink from './pages/GotoLink'
import Home from './pages/Home'
import Landing from './pages/Landing'
import Profile from './pages/Profile'
import ShortDetail from './pages/ShortDetail'

export function App() {
  const { isAuthenticated } = useAuth0()
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<RootLayout />}>
          <Route path='/' element={isAuthenticated ? <Home /> : <Landing />}>
            <Route
              path='s/:shortUrl'
              element={
                <ProtectedRoute>
                  <ShortDetail />
                </ProtectedRoute>
              }
            />
          </Route>
          <Route
            path='profile'
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
        </Route>
        <Route path=':shortUrl' element={<GotoLink />} />
      </Routes>
    </BrowserRouter>
  )
}
