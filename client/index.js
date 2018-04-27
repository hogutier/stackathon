import '@tmkelly28/tk-css'
import './index.css'
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

ReactDOM.render(
    <MuiThemeProvider>
      <App />
    </MuiThemeProvider>,
  document.getElementById('app')
)
