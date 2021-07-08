import React from 'react'
import { FieldProps, FieldRenderProps, useField } from 'react-final-form'
import {
  FormControl,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
  Typography,
} from '@material-ui/core'
import { useIntl } from 'react-intl'
import DynamicFormattedMessage from '../../../../components/common/ui/DynamicFormattedMessage'
import { getValidationErrorMessage } from '../../validation'
import { TFieldLabel, TFieldPlaceHolder } from '../../../../i18n'
import { TSelectOption } from '../../../../interfaces/common'

interface ISelectRenderProps<OptionValue, Multiple extends boolean | undefined>
  extends FieldProps<OptionValue, FieldRenderProps<OptionValue>> {
  className?: string
  showLabel?: boolean
  multiple?: Multiple
  isMandatory?: boolean
  defaultValue?: OptionValue
  label?: TFieldLabel
  placeholder?: TFieldPlaceHolder
  options: TSelectOption<OptionValue>[]
}

const useStyles = makeStyles({
  formControl: {
    minWidth: '100%',
  },
})

function SelectField<
  OptionValue extends string | string[] | number,
  Multiple extends boolean | undefined
>({
  name,
  className = '',
  placeholder,
  label,
  defaultValue,
  multiple,
  options,
  ...fieldProps
}: ISelectRenderProps<OptionValue, Multiple>) {
  const { input, meta } = useField<OptionValue>(name, fieldProps)
  const { formatMessage } = useIntl()
  const classes = useStyles()

  const [errorMessage, errorValues] = getValidationErrorMessage(meta.error)
  const shouldShowError = !!errorMessage && meta.touched

  return (
    <FormControl className={className || classes.formControl}>
      <DynamicFormattedMessage
        tag={InputLabel}
        variant="outlined"
        id={`form.field.${label || name}.label`}
      />
      <Select
        value={input.value}
        onChange={input.onChange}
        variant="outlined"
        fullWidth
        defaultValue={defaultValue}
        multiple={multiple}
        placeholder={
          placeholder &&
          formatMessage({ id: `form.placeholder.${placeholder}` })
        }
      >
        {options.map(({ label: optionLabel, value }) => (
          <MenuItem value={value}>
            <DynamicFormattedMessage
              id={optionLabel}
              defaultMessage={optionLabel}
            />
          </MenuItem>
        ))}
      </Select>
      <DynamicFormattedMessage
        tag={Typography}
        color="error"
        id={`form.validation.${errorMessage}`}
        values={errorValues}
        shouldRender={shouldShowError}
      />
    </FormControl>
  )
}

export default SelectField
