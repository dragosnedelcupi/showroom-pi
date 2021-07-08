import React, { ReactElement } from 'react'
import { FieldError, Controller, Control } from 'react-hook-form'
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Typography,
} from '@material-ui/core'
import DynamicFormattedMessage from '../../../../components/common/ui/DynamicFormattedMessage'
import { TFieldLabel } from '../../../../i18n'

interface IYesNoInputProps {
  name: string
  id: string
  error?: FieldError | undefined
  control: Control
  label?: TFieldLabel
}

function YesNoInput({
  name,
  id,
  error,
  control,
  label,
}: IYesNoInputProps): ReactElement {
  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">
        <DynamicFormattedMessage
          tag="span"
          id={`form.field.${label || name}.label`}
          className="inputLabel"
        />
      </FormLabel>
      <Controller
        name={name}
        control={control}
        rules={{ required: true }}
        id={id}
        as={
          <RadioGroup row aria-label="gender" name="gender1">
            <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
            <FormControlLabel value="no" control={<Radio />} label="No" />
          </RadioGroup>
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
    </FormControl>
  )
}

export default YesNoInput
