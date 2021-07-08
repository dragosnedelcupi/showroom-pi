import React, { FC } from 'react'
import { Meta, Story } from '@storybook/react'
import { Box, Container, Grid } from '@material-ui/core'
import { FormWrapper, OnSubmit } from './FormWrapper'
import { Validations } from './validation'
import {
  integerToLocaleString,
  localeStringToInteger,
} from '../../utils/number'
import { Condition } from './atoms/Condition'
import { FormButtons } from './atoms/mui/FormButtons'
import CheckboxField from './atoms/mui/CheckboxField'
import { SetupWrapper } from '../../SetupWrapper'
import TextField from './atoms/mui/TextField'
import SelectField from './atoms/mui/SelectField'
import { mapToSelectOption } from '../../utils/selectOption'

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
    { code: '0000FF', name: 'Blue' },
    { code: 'AA0000', name: 'Violet' },
    { code: 'ZZFF00', name: 'White' },
    { code: '0011FF', name: 'Gray' },
  ]
  const onSubmit: OnSubmit<IFormExampleFields> = (values) => {
    // eslint-disable-next-line no-alert
    alert(JSON.stringify(values, null, 2))
  }

  return (
    <Box mt={3}>
      <FormWrapper onSubmit={onSubmit}>
        {(formProps) => (
          <Container maxWidth="md">
            <Grid container spacing={5}>
              <Grid item md={6}>
                <TextField
                  name="name"
                  isMandatory
                  validate={Validations.required}
                />
              </Grid>
              <Grid item md={6}>
                <TextField name="surname" label="surname" />
              </Grid>
              <Grid item md={6}>
                <TextField
                  name="amount"
                  isMandatory
                  validate={Validations.composeValidators(
                    Validations.required,
                    Validations.minValue(1213)
                  )}
                  parse={localeStringToInteger}
                  format={integerToLocaleString}
                  label="amount"
                />
              </Grid>
              <Grid item md={6}>
                <SelectField
                  name="color"
                  options={apiOptions.map(mapToSelectOption('code', 'name'))}
                  defaultValue="ABC"
                />
              </Grid>
              <Grid item md={6}>
                <CheckboxField name="isAdmin" />
              </Grid>
              <Condition when="isAdmin" is={true}>
                <Grid item md={6}>
                  <TextField
                    name="address"
                    validate={Validations.required}
                    isMandatory
                  />
                </Grid>
              </Condition>
              <Grid item xs={12}>
                <FormButtons {...formProps} />
              </Grid>
            </Grid>
          </Container>
        )}
      </FormWrapper>
    </Box>
  )
}

const Template: Story<any> = () => (
  <SetupWrapper>
    <Example />
  </SetupWrapper>
)

export const MUI = Template.bind({})
MUI.args = {}
