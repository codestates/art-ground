import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { BrowserRouter as Router } from 'react-router-dom'
import ScrollTop from './components/scrollTop/ScrollTop'

ReactDOM.render(
  <React.StrictMode>
    <Router>
      {/* <ScrollTop /> */}
      <App />
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
)
