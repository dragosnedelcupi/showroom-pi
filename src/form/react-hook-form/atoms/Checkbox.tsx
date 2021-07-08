import React, { ReactElement } from 'react'
import { FieldError } from 'react-hook-form'
import DynamicFormattedMessage from '../../../components/common/ui/DynamicFormattedMessage'
import { TFieldLabel } from '../../../i18n'

interface ICheckboxProps {
  name: string
  id: string
  register: (ref: HTMLInputElement) => void
  error?: FieldError | undefined
  label?: TFieldLabel
}

function Checkbox({
  name,
  id,
  register,
  error,
  label,
}: ICheckboxProps): ReactElement {
  return (
    <div className="flex flex-col mb-3 pt-3">
      <DynamicFormattedMessage
        tag="label"
        id={`form.field.${label || name}.label`}
        className="pb-1 text-sm"
        htmlFor={id}
      />

      <div className="container pb-3">
        <input name={name} type="checkbox" value="1" id={id} ref={register} />
      </div>

      {error && (
        <DynamicFormattedMessage
          tag="span"
          id={`form.validation.${
            ['pattern', 'validate'].includes(error.type)
              ? error.message
              : error.message || error.type
          }`}
          className="text-xs text-red-600"
        />
      )}
    </div>
  )
}

export default Checkbox
