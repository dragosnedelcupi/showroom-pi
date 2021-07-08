import React from 'react'
import { Field, FieldProps, FieldRenderProps } from 'react-final-form'
import { useIntl } from 'react-intl'
import DynamicFormattedMessage from '../../../components/common/ui/DynamicFormattedMessage'
import { getValidationErrorMessage } from '../validation'
import { TFieldLabel } from '../../../i18n'
import { TSelectOption } from '../../../interfaces/common'

interface ISelectRenderProps<
  OptionValue,
  Multiple extends boolean | undefined,
  SelectOption = Multiple extends true
    ? TSelectOption<OptionValue>[]
    : TSelectOption<OptionValue>
> extends FieldProps<SelectOption, FieldRenderProps<SelectOption>> {
  className?: string
  showLabel?: boolean
  multiple?: Multiple
  isMandatory?: boolean
  defaultValue?: SelectOption
  label?: TFieldLabel
  options: TSelectOption<OptionValue>[]
}

function SelectField<
  OptionValue extends string | number,
  Multiple extends boolean | undefined
>({
  name,
  className = '',
  placeholder,
  showLabel = true,
  label,
  options,
  isMandatory = false,
  ...fieldProps
}: ISelectRenderProps<OptionValue, Multiple>) {
  const { formatMessage } = useIntl()

  return (
    <div className={`inputContainer ${className} `}>
      {showLabel && (
        <>
          <DynamicFormattedMessage
            tag="label"
            id={`form.field.${label || name}.label`}
            className="inputLabel"
          />
          {isMandatory && ' *'}
        </>
      )}
      <Field
        name={name}
        id={name}
        component="select"
        className="wFull inputField py0"
        {...fieldProps}
      >
        {options.map(({ label: optionLabel, value }) => (
          <option value={value}>{formatMessage({ id: optionLabel })}</option>
        ))}
      </Field>
      <Field
        name={name}
        subscription={{ error: true, submitError: true, touched: true }}
      >
        {({ meta: { error, touched } }) => {
          const [errorMessage, errorValues] = getValidationErrorMessage(error)
          const shouldShowError = !!errorMessage && touched

          return (
            <DynamicFormattedMessage
              id={`form.validation.${errorMessage}`}
              values={errorValues}
              shouldRender={shouldShowError}
              className="inputError"
            />
          )
        }}
      </Field>
    </div>
  )
}

export default SelectField
