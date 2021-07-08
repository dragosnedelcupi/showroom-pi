import React from 'react'
import { FieldProps, FieldRenderProps, useField } from 'react-final-form'
import { useIntl } from 'react-intl'
import DynamicFormattedMessage from '../../../components/common/ui/DynamicFormattedMessage'
import { getValidationErrorMessage } from '../validation'
import { TFieldLabel, TFieldPlaceHolder } from '../../../i18n'

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
    <div className={`inputContainer ${className} `}>
      {showLabel && (
        <span className="flex">
          <DynamicFormattedMessage
            tag="label"
            id={`form.field.${label || name}.label`}
            className="inputLabel"
          />
          {isMandatory && ' *'}
        </span>
      )}
      <input
        {...input}
        {...fieldProps}
        type={input.type || 'text'}
        placeholder={
          placeholder &&
          formatMessage({ id: `form.placeholder.${placeholder}` })
        }
        className={`rounded ${shouldShowError ? 'errorHighlight' : ''}`}
      />
      <DynamicFormattedMessage
        tag="span"
        id={`form.validation.${errorMessage}`}
        values={errorValues}
        shouldRender={shouldShowError}
        className="inputError"
      />
    </div>
  )
}

export default TextField
