import React, { ReactElement } from 'react'
import {
  Control,
  Controller,
  FieldError,
  RegisterOptions,
} from 'react-hook-form'
import { TextField, Typography } from '@material-ui/core'
import { useIntl } from 'react-intl'
import DynamicFormattedMessage from '../../../../components/common/ui/DynamicFormattedMessage'
import { TFieldLabel, TFieldPlaceHolder } from '../../../../i18n'

interface ITextInputProps {
  defaultValue?: string
  placeholder?: TFieldPlaceHolder
  error?: FieldError | undefined
  control: Control
  rules?: RegisterOptions
  id: string
  name: string
  label?: TFieldLabel
}

function TextInput({
  name,
  id,
  error,
  control,
  label,
  rules,
  placeholder,
  defaultValue,
}: ITextInputProps): ReactElement {
  const { formatMessage } = useIntl()

  return (
    <>
      <Controller
        as={TextField}
        id={id}
        name={name}
        label={
          label && formatMessage({ id: `form.field.${label || name}.label` })
        }
        InputLabelProps={{
          shrink: true,
        }}
        control={control}
        defaultValue={defaultValue}
        placeholder={
          placeholder &&
          formatMessage({ id: `form.placeholder.${placeholder}` })
        }
        rules={rules}
        variant="outlined"
        fullWidth
        error={error && !error.message}
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

export default TextInput
