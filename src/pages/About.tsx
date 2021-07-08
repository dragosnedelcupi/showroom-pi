import React from 'react'
import { useHistory } from 'react-router-dom'

export const About: React.FC = () => {
  const history = useHistory()

  return (
    <div className="container">
      <div className="mt-12 text-center">
        <h1 className="text-xl font-bold">About</h1>
        <p className="mb-6">Second page with go back button</p>
        <button
          type="button"
          className="btn btnPrimary"
          onClick={() => history.push('/')}
        >
          Go back
        </button>
      </div>
    </div>
  )
}
