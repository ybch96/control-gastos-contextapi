import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BudguetProvider } from './context/budguetContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BudguetProvider>
    <App />
    </BudguetProvider>
  </StrictMode>,
)
