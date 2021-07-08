import React, { ReactElement } from 'react'
import { FieldError } from 'react-hook-form'
import { useIntl } from 'react-intl'
import DynamicFormattedMessage from '../../../components/common/ui/DynamicFormattedMessage'
import { TFieldLabel, TFieldPlaceHolder } from '../../../i18n'

interface ISelectInputProps {
  name: string
  id: string
  placeholder?: TFieldPlaceHolder
  label?: TFieldLabel
  register: (ref: HTMLSelectElement) => void
  error?: FieldError | undefined
  options: string[]
}

function SelectInput({
  name,
  id,
  register,
  label,
  placeholder,
  error,
  options,
}: ISelectInputProps): ReactElement {
  const { formatMessage } = useIntl()

  return (
    <div className="flex flex-col mb-3">
      <DynamicFormattedMessage
        tag="label"
        id={`form.field.${label || name}.label`}
        className="pb-1 text-sm"
        htmlFor={id}
      />
      <select
        className="inputField wFull"
        name={name}
        id={id}
        ref={register}
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
      </select>
      {error && (
        <DynamicFormattedMessage
          tag="span"
          id={`form.validation.${
            ['pattern', 'validate'].includes(error.type)
              ? error.message
              : error.message || error.type
          }`}
          className="errorMessage"
        />
      )}
    </div>
  )
}

export default SelectInput
