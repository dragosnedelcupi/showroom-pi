import React from 'react'
import { screen } from '@testing-library/react'
import { intlProviderWrapper } from '../../../../__mocks__/wrappers'
import DynamicFormattedMessage from '../../../../components/common/ui/DynamicFormattedMessage'

describe('DynamicFormattedMessage', () => {
  it('should render translation of given id', () => {
    intlProviderWrapper({
      children: <DynamicFormattedMessage id="form.field.name.label" />,
    })

    expect(screen.getByText('First name')).not.toBeNull()
  })
})
