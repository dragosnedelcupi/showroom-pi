import React from 'react'
import ReactDOM from 'react-dom'

import App from './App'
import { SetupWrapper } from './SetupWrapper'

ReactDOM.render(
  <SetupWrapper>
    <App />
  </SetupWrapper>,
  document.getElementById('root')
)
