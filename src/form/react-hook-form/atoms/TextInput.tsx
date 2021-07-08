import React from 'react'
import { FieldError } from 'react-hook-form'
import { useIntl } from 'react-intl'
import DynamicFormattedMessage from '../../../components/common/ui/DynamicFormattedMessage'
import { TFieldLabel, TFieldPlaceHolder } from '../../../i18n'

interface ITextInputProps {
  name: string
  id: string
  placeholder?: TFieldPlaceHolder
  label?: TFieldLabel
  register: (ref: HTMLInputElement) => void
  error?: FieldError | undefined
}

const TextInput = ({
  name,
  id,
  register,
  error,
  label,
  placeholder,
}: ITextInputProps) => {
  const { formatMessage } = useIntl()

  return (
    <div className="inputContainer">
      <DynamicFormattedMessage
        tag="label"
        id={`form.field.${label || name}.label`}
        className="inputLabel"
        htmlFor={id}
      />
      <input
        className={`rounded-lg ${error ? 'border-red-600 border-2' : ''}`}
        type="text"
        name={name}
        ref={register}
        placeholder={
          placeholder &&
          formatMessage({ id: `form.placeholder.${placeholder}` })
        }
        id={id}
      />
      {error && (
        <DynamicFormattedMessage
          tag="span"
          id={`form.validation.${
            ['pattern', 'validate'].includes(error.type)
              ? error.message
              : error.message || error.type
          }`}
          className="inputError"
        />
      )}
    </div>
  )
}

export default TextInput
