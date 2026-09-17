import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ClerkProvider } from '@clerk/clerk-react'
import React from "react";
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>

      <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
          <App />
      </ClerkProvider>
    </ BrowserRouter>

  </React.StrictMode>
)
