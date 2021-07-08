import configureStore from 'redux-mock-store'
import { Store } from 'redux'
import { IStore } from '../store'

export const createStateMock = (params?: Partial<IStore>): IStore => {
  const defaultState = {
    counterReducer: 0,
  }

  return { ...defaultState, ...params }
}

export const mockStore = configureStore([])
export const mockedStore: Store = mockStore(createStateMock())
