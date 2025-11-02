import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { UrqlProvider } from './providers/urql-provider'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <UrqlProvider>
      <App />
    </UrqlProvider>
  </StrictMode>,
)
