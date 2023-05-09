import { useAuth0 } from '@auth0/auth0-react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute'
import RootLayout from './components/RootLayout'
import Home from './pages/Home'
import Landing from './pages/Landing'
import ShortDetailPage from './pages/ShortDetailPage'

export function App() {
  const { isAuthenticated } = useAuth0()
  return (
    <BrowserRouter>
      <Routes>
        {!isAuthenticated && <Route path='/' element={<Landing />}></Route>}
        <Route element={<RootLayout />}>
          <Route path='/' element={<Home />}>
            <Route
              path='s/:shortUrl'
              element={
                <ProtectedRoute>
                  <ShortDetailPage />
                </ProtectedRoute>
              }
            />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
