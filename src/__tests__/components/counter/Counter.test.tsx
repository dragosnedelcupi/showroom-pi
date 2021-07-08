import React from 'react'
import { fireEvent, screen, wait } from '@testing-library/react'
import { Store } from 'redux'
import Counter from '../../../components/counter/Counter'
import { setup } from '../../../__mocks__/wrappers'
import { createStateMock, mockStore } from '../../../__mocks__/storeMock'
import { CounterMockData } from '../../../__mocks__/Counter'

describe('Counter', () => {
  const state = createStateMock({
    counterReducer: 42,
  })
  let store: Store

  beforeEach(() => {
    store = mockStore(state)
    store.dispatch = jest.fn()
  })

  it('should render counterReducer', () => {
    setup({ children: <Counter />, store })

    const countValue = screen.getByTestId('counter-value')
    expect(countValue.textContent).toBe('42')
  })

  it.each(CounterMockData)(
    'Clicking on %s will trigger a dispatch',
    async (buttonLabel, expected) => {
      setup({ children: <Counter />, store })

      const button = screen.getByText(buttonLabel)
      fireEvent.click(button)
      await wait(() => {
        expect(store.dispatch).toHaveBeenCalledWith(expected)
      })
    }
  )
})
