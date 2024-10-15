// Imports
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

// Pages
import App from './App.tsx'

// Global CSS
import './index.css'

// Create React Root
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);