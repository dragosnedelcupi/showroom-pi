import React, { ReactElement } from 'react'
import { render, RenderResult } from '@testing-library/react'
import { Provider } from 'react-redux'
import { Store } from 'redux'
import { IntlProvider } from 'react-intl'
import { mockedStore } from './storeMock'
import messages from '../i18n/en.json'

interface ProviderWrapper {
  children: ReactElement
}

interface IntlProviderWrapper extends ProviderWrapper {
  msg?: { [propName: string]: string }
}

interface StoreProviderWrapper extends ProviderWrapper {
  store?: Store
}

type SetupWrapper = StoreProviderWrapper & IntlProviderWrapper

/**
 * Adds Intl to provided component
 * @param props
 */
export const intlProviderWrapper = (
  props: IntlProviderWrapper
): RenderResult => {
  const { children, msg } = props
  const defaultMessages = msg || messages
  return render(
    <IntlProvider locale="en" messages={defaultMessages}>
      {children}
    </IntlProvider>
  )
}

/**
 * Adds Redux store to provided component
 * @param props
 */
export const storeProviderWrapper = (
  props: StoreProviderWrapper
): RenderResult => {
  const { children, store } = props
  const defaultStore = store || mockedStore
  return render(<Provider store={defaultStore}>{children}</Provider>)
}

/**
 * Adds Intl and Redux store to provided component
 * @param props
 */
export const setup = (props: SetupWrapper): RenderResult => {
  const { children, msg, store } = props
  const defaultMessages = msg || messages
  const defaultStore = store || mockedStore
  return render(
    <Provider store={defaultStore}>
      <IntlProvider locale="en" messages={defaultMessages}>
        {children}
      </IntlProvider>
    </Provider>
  )
}
