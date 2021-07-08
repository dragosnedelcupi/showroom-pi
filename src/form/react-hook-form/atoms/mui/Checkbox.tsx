import React, { ReactElement } from 'react'
import {
  Control,
  Controller,
  FieldError,
  RegisterOptions,
} from 'react-hook-form'
import {
  Checkbox as MuiCheckbox,
  FormControlLabel,
  Typography,
} from '@material-ui/core'
import DynamicFormattedMessage from '../../../../components/common/ui/DynamicFormattedMessage'
import { TFieldLabel } from '../../../../i18n'

interface ICheckboxProps {
  name: string
  id: string
  error?: FieldError | undefined
  control: Control
  rules?: RegisterOptions
  label?: TFieldLabel
}

function Checkbox({
  name,
  error,
  control,
  rules,
  id,
  label,
}: ICheckboxProps): ReactElement {
  return (
    <>
      <FormControlLabel
        label={
          <DynamicFormattedMessage id={`form.field.${label || name}.label`} />
        }
        control={
          <Controller
            control={control}
            name={name}
            rules={rules}
            id={id}
            render={({ onChange, value }) => (
              <MuiCheckbox
                onChange={(e) => onChange(e.target.checked)}
                checked={value}
              />
            )}
          />
        }
      />

      {error && (
        <DynamicFormattedMessage
          id={`form.validation.${
            ['pattern', 'validate'].includes(error.type)
              ? error.message
              : error.message || error.type
          }`}
          tag={Typography}
          color="error"
        />
      )}
    </>
  )
}

export default Checkbox
