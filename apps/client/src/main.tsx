import { StrictMode } from 'react'
import { createFirstTxRoot } from '@firsttx/prepaint'
import { RouterProvider } from 'react-router'
import './index.css'
import { UrqlProvider } from './providers/urql-provider'
import { AuthProvider } from './contexts/auth-context'
import { router } from './router'

createFirstTxRoot(
  document.getElementById('root')!,
  <StrictMode>
    <UrqlProvider>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </UrqlProvider>
  </StrictMode>,
  {
    transition: true,
  }
)
