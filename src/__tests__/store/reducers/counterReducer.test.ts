import counterReducer, {
  counterActions,
} from '../../../store/reducers/counterReducer'

describe('counterReducer', () => {
  it(`increments value, if increment action is provided`, () => {
    expect(counterReducer(0, counterActions.increment())).toBe(1)
  })
  it(`should decrement state, if decrement action is dispatched`, () => {
    expect(counterReducer(0, counterActions.decrement())).toBe(-1)
  })
  it(`should increment state by {value} , if incrementBy action is provided`, () => {
    expect(counterReducer(0, counterActions.incrementBy(10))).toBe(10)
  })
})
