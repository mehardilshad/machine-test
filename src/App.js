import React from 'react'
import './assets/css/style.css'
import { BrowserRouter as Router } from 'react-router-dom'
import MainRouter from './routing/routers/MainRouter'
import Store from './contexts/Store'

function App() {
  return (
    <Router>
      <Store>
        <MainRouter />
      </Store>
    </Router>
  )
}

export default App
