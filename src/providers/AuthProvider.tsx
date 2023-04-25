import { Auth0Provider, useAuth0 } from '@auth0/auth0-react'
import React, { ReactNode, useEffect } from 'react'
import { authInterceptor } from '../api/api'

const domain = import.meta.env.VITE_AUTH0_DOMAIN || ''
const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID || ''
const audience = import.meta.env.VITE_AUTH0_AUDIENCE || ''

export function AuthInject({ children }: { children: ReactNode }) {
  const { getAccessTokenSilently } = useAuth0()

  useEffect(() => {
    authInterceptor.setAuthGetter(getAccessTokenSilently)
  }, [])

  return <>{children}</>
}

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      cacheLocation="localstorage"
      authorizationParams={{
        redirect_uri: window.location.origin,
        audience,
      }}
    >
      <AuthInject>{children}</AuthInject>
    </Auth0Provider>
  )
}
