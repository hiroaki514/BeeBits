import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import TimeLine from './TimeLine.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <TimeLine />
  </StrictMode>,
)
