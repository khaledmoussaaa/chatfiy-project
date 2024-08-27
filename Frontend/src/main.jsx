// React Import
import React from 'react'
import ReactDOM from 'react-dom/client'

// React Route Dom
import { BrowserRouter as Router } from 'react-router-dom'

// App & CSS Import
import App from './App'
import './index.css'

import { AuthProvider } from './Context/AuthContext.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(
  <Router>
    <AuthProvider>
      <App />
    </AuthProvider>
  </Router>,
)
