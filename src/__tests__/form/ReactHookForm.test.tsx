import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { fireEvent, screen, wait } from '@testing-library/react'
import { setup } from '../../__mocks__/wrappers'
import { Primary as ReactHookForm } from '../../form/react-hook-form/ReactHook.stories'

test('Renders the component', () => {
  setup({ children: <ReactHookForm /> })
  expect(screen.getByText('A React Hook From example')).toBeInTheDocument()
  expect(screen.getByLabelText('First name')).toBeInTheDocument()
  expect(screen.getByLabelText('Last name')).toBeInTheDocument()
  expect(screen.getByLabelText('Email')).toBeInTheDocument()
  expect(screen.getByLabelText('Title')).toBeInTheDocument()
  expect(screen.getByLabelText('Are you a developer')).toBeInTheDocument()
})

test('Renders the error messages', async () => {
  setup({ children: <ReactHookForm /> })

  const submitBtn = screen.getByText('Save')
  expect(submitBtn).toBeInTheDocument()
  fireEvent.click(submitBtn)

  // the component is re-rendered so we have to wait for it to finish
  await wait(() => {
    const errors = screen.getAllByText('Required')
    expect(errors).toHaveLength(4)
  })
})

test('Errors disappear when the input is valid', async () => {
  setup({ children: <ReactHookForm /> })

  const submitBtn = screen.getByText('Save')
  fireEvent.click(submitBtn)

  await wait(() => {
    const errors = screen.getAllByText('Required')
    expect(errors).toHaveLength(4)
  })

  const firstNameInput = screen.getByLabelText('First name')
  fireEvent.input(firstNameInput, { target: { value: 'test' } })

  await wait(() => {
    const errors = screen.getAllByText('Required')
    expect(errors).toHaveLength(3)
  })
})

test('Renders the form in the initial state when Reset is pressed', async () => {
  setup({ children: <ReactHookForm /> })

  const submitBtn = screen.getByText('Save')
  fireEvent.click(submitBtn)

  await wait(() => {
    const errors = screen.getAllByText('Required')
    expect(errors).toHaveLength(4)
  })
  const firstNameInput = screen.getByLabelText('First name')
  fireEvent.input(firstNameInput, { target: { value: 'test' } })

  const resetBtn = screen.getByText('Reset')
  fireEvent.click(resetBtn)

  await wait(() => {
    const errors = screen.queryAllByText('Required')
    expect(errors).toHaveLength(0)
    expect(firstNameInput.nodeValue).toBe(null)
  })
})

test('Renders the hidden option', async () => {
  setup({ children: <ReactHookForm /> })

  const yesBtn = screen.getByDisplayValue('Yes')
  fireEvent.click(yesBtn)

  await wait(() => {
    expect(screen.getByLabelText('Are you a human')).toBeInTheDocument()
  })
})
