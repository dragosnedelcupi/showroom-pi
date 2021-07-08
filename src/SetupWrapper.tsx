import React, { FC } from 'react'
import { MuiThemeProvider } from '@material-ui/core'
import { RecoilRoot } from 'recoil'
import { IntlProvider } from 'react-intl'
import { Provider } from 'react-redux'
import theme from './theme'
import store from './store'
import messages from './i18n/en.json'

import './assets/styles/style.scss'

export const SetupWrapper: FC = ({ children }) => (
  <Provider store={store}>
    <RecoilRoot>
      <MuiThemeProvider theme={theme}>
        <IntlProvider locale="en" messages={messages}>
          {children}
        </IntlProvider>
      </MuiThemeProvider>
    </RecoilRoot>
  </Provider>
)

// @ts-ignore Add store on window when running e2e tests
if (window.Cypress) window.store = store
