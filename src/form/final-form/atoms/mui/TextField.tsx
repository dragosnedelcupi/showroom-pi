import React from 'react'
import { FieldProps, FieldRenderProps, useField } from 'react-final-form'
import { Box, TextField as TextInput, Typography } from '@material-ui/core'
import { useIntl } from 'react-intl'
import DynamicFormattedMessage from '../../../../components/common/ui/DynamicFormattedMessage'
import { getValidationErrorMessage } from '../../validation'
import { TFieldLabel, TFieldPlaceHolder } from '../../../../i18n'

interface TextRenderProps<T> extends FieldProps<T, FieldRenderProps<T>> {
  className?: string
  showLabel?: boolean
  isMandatory?: boolean
  label?: TFieldLabel
  placeholder?: TFieldPlaceHolder
}

const TextField = <T extends string | number>({
  name,
  className = '',
  placeholder,
  showLabel = true,
  label,
  isMandatory = false,
  ...fieldProps
}: TextRenderProps<T>) => {
  const { input, meta } = useField<T>(name, fieldProps)
  const { formatMessage } = useIntl()

  const [errorMessage, errorValues] = getValidationErrorMessage(meta.error)
  const shouldShowError = !!errorMessage && meta.touched

  return (
    <Box className={className}>
      <TextInput
        type={input.type || 'text'}
        placeholder={
          placeholder &&
          formatMessage({ id: `form.placeholder.${placeholder}` })
        }
        variant="outlined"
        fullWidth
        error={shouldShowError}
        {...input}
        {...fieldProps}
        label={
          showLabel && (
            <>
              <DynamicFormattedMessage
                tag="label"
                id={`form.field.${label || name}.label`}
              />
              {isMandatory && ' *'}
            </>
          )
        }
      />
      <DynamicFormattedMessage
        tag={Typography}
        color="error"
        id={`form.validation.${errorMessage}`}
        values={errorValues}
        shouldRender={shouldShowError}
      />
    </Box>
  )
}

export default TextField
