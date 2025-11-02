import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router'
import './index.css'
import { UrqlProvider } from './providers/urql-provider'
import { AuthProvider } from './contexts/auth-context'
import { router } from './router'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <UrqlProvider>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </UrqlProvider>
  </StrictMode>,
)
