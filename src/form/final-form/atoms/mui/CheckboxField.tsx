import React from 'react'
import { FieldProps, FieldRenderProps, useField } from 'react-final-form'
import Checkbox from '@material-ui/core/Checkbox'
import { Box, FormControlLabel, Typography } from '@material-ui/core'
import DynamicFormattedMessage from '../../../../components/common/ui/DynamicFormattedMessage'
import { TFieldLabel } from '../../../../i18n'

interface ICheckboxRenderProps
  extends FieldProps<boolean, FieldRenderProps<boolean>> {
  className?: string
  showLabel?: boolean
  isMandatory?: boolean
  label?: TFieldLabel
}

const CheckboxField = ({
  name,
  className = '',
  label,
  ...fieldProps
}: ICheckboxRenderProps) => {
  const { input, meta } = useField<boolean>(name, fieldProps)
  const { value, ...checkboxInput } = input
  return (
    <Box className={className}>
      <FormControlLabel
        control={
          <Checkbox
            {...checkboxInput}
            className="checkbox-input"
            id={`${label || name}id`}
          />
        }
        label={
          <DynamicFormattedMessage id={`form.field.${label || name}.label`} />
        }
      />
      <DynamicFormattedMessage
        tag={Typography}
        color="error"
        id={`form.validation.${meta.error}`}
        shouldRender={!!meta.error && meta.touched}
      />
    </Box>
  )
}

export default CheckboxField
