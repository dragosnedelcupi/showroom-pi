import React, { FC } from 'react'
import { Meta, Story } from '@storybook/react'
import { FormWrapper, OnSubmit } from './FormWrapper'
import TextField from './atoms/TextField'
import { Validations } from './validation'
import {
  integerToLocaleString,
  localeStringToInteger,
} from '../../utils/number'
import CheckboxField from './atoms/CheckboxField'
import { Condition } from './atoms/Condition'
import { SetupWrapper } from '../../SetupWrapper'
import { FormButtons } from './atoms/FormButtons'
import SelectField from './atoms/SelectField'
import { mapToSelectOption } from '../../utils/selectOption'
import DynamicFormattedMessage from '../../components/common/ui/DynamicFormattedMessage'

export default {
  title: 'Form/FinalForm',
  component: FormWrapper,
} as Meta

interface IFormExampleFields {
  name?: string
  surname?: string
  amount: number
  color: string
}

const Example: FC = () => {
  const apiOptions = [
    { code: 'FF0000', name: 'Red' },
    { code: '00FF00', name: 'Green' },
    { code: '1000FF', name: 'Blue' },
    { code: 'AA0000', name: 'Violet' },
    { code: 'ZZFF00', name: 'White' },
    { code: '0011FF', name: 'Gray' },
  ]
  const onSubmit: OnSubmit<IFormExampleFields> = (values) => {
    // eslint-disable-next-line no-alert
    alert(JSON.stringify(values, null, 2))
  }

  return (
    <FormWrapper onSubmit={onSubmit}>
      {(formProps) => (
        <div className="container mt-3">
          <DynamicFormattedMessage
            tag="span"
            id="finalFormExample"
            className="text-center text-4xl pb-8 inline-block"
          />
          <div className="formRow">
            <TextField
              name="name"
              isMandatory
              className="mb-3"
              validate={Validations.required}
            />
            <TextField name="surname" className="colMd6 mb15" />
            <TextField
              name="amount"
              isMandatory
              validate={Validations.composeValidators(
                Validations.required,
                Validations.minValue(1213)
              )}
              parse={localeStringToInteger}
              format={integerToLocaleString}
              className="colMd6 mb15"
            />
            <div className="colMd6 mb15">
              <SelectField
                name="color"
                multiple
                validate={Validations.required}
                options={apiOptions.map(mapToSelectOption('code', 'name'))}
              />
            </div>
            <div className="col mb15">
              <CheckboxField name="isAdmin" />
              <div className="row">
                <Condition when="isAdmin" is={true}>
                  <TextField
                    name="address"
                    className="col6"
                    validate={Validations.required}
                    isMandatory
                  />
                </Condition>
              </div>
            </div>
            <div className="flex content-center">
              <FormButtons {...formProps} />
            </div>
          </div>
        </div>
      )}
    </FormWrapper>
  )
}

const Template: Story<any> = () => (
  <SetupWrapper>
    <Example />
  </SetupWrapper>
)

export const Primary = Template.bind({})
Primary.args = {}
