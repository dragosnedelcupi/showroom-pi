import React, { ReactElement } from 'react'
import { Control, FieldError, Controller } from 'react-hook-form'
import { Select, Typography } from '@material-ui/core'
import { useIntl } from 'react-intl'
import DynamicFormattedMessage from '../../../../components/common/ui/DynamicFormattedMessage'
import { TFieldLabel, TFieldPlaceHolder } from '../../../../i18n'

interface ISelectInputProps {
  name: string
  id: string
  error?: FieldError | undefined
  options: string[]
  control: Control
  placeholder?: TFieldPlaceHolder
  label?: TFieldLabel
}

function SelectInput({
  name,
  id,
  error,
  options,
  control,
  label,
  placeholder,
}: ISelectInputProps): ReactElement {
  const { formatMessage } = useIntl()

  return (
    <>
      <Controller
        fullWidth
        id={id}
        as={
          <Select
            variant="outlined"
            label={
              label &&
              formatMessage({ id: `form.field.${label || name}.label` })
            }
            defaultValue={options[0]}
            placeholder={
              placeholder &&
              formatMessage({ id: `form.placeholder.${placeholder}` })
            }
          >
            {options.map((option) => (
              <option value={option} key={option}>
                {option}
              </option>
            ))}
          </Select>
        }
        name={name}
        control={control}
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

export default SelectInput
