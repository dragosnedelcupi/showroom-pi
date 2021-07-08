import { useDispatch, useSelector } from 'react-redux'
import React from 'react'
import { counterActions } from '../../store/reducers/counterReducer'
import { selectors } from '../../store/selectors'
import DynamicFormattedMessage from '../common/ui/DynamicFormattedMessage'
import Button from '../common/ui/button/Button'

const Counter: React.FC = () => {
  const count = useSelector(selectors.getCountValue)
  const dispatch = useDispatch()

  return (
    <div className="flex justify-center">
      <div className="container">
        <div className="card text-center">
          <h2 className="card-title">Counter component</h2>
          <h4>
            Counter: <strong id="counter-value">{count}</strong>
          </h4>
          <p className="mb-3">
            Here you can increment and decrement counter value using buttons
            below. All the state updates are performed via redux toolkit
            actions.
          </p>
          <div className="flex justify-center">
            <DynamicFormattedMessage
              tag={Button}
              id="increment"
              onClick={() => dispatch(counterActions.increment())}
              className="btn btnPrimary"
            />
            <DynamicFormattedMessage
              tag={Button}
              values={{ no: 3 }}
              id="incrementBy"
              onClick={() => dispatch(counterActions.incrementBy(3))}
              className="btn btnPrimary mx-3"
            />
            <DynamicFormattedMessage
              id="decrement"
              tag={Button}
              onClick={() => dispatch(counterActions.decrement())}
              className="btn btnPrimary"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Counter
