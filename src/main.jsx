import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { GoogleOAuthProvider } from '@react-oauth/google';

import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <GoogleOAuthProvider clientId="461521049263-47h6ajb5q26lht86l01to2jqj39il97g.apps.googleusercontent.com">
    <App />
  </GoogleOAuthProvider>,
)
