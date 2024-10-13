import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { init, ErrorBoundary } from '@monitor-fe/react'

init({
  appId: 'react-app',
  userId: 'react',
})
createRoot(document.getElementById('root')!).render(
  <ErrorBoundary fallback={<p>Something went wrong</p>}>
    <App/>
  </ErrorBoundary>,
)
