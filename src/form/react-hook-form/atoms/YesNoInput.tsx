import React, { ReactElement } from 'react'
import { FieldError, UseFormMethods } from 'react-hook-form'
import DynamicFormattedMessage from '../../../components/common/ui/DynamicFormattedMessage'
import { TFieldLabel } from '../../../i18n'

interface IYesNoInputProps {
  name: string
  id: string
  register: UseFormMethods['register']
  error?: FieldError | undefined
  label?: TFieldLabel
}

function YesNoInput({
  name,
  id,
  register,
  error,
  label,
}: IYesNoInputProps): ReactElement {
  return (
    <div className="flex flex-col mb-3">
      <DynamicFormattedMessage
        tag="label"
        id={`form.field.${label || name}.label`}
        className="pb-1 text-sm"
        htmlFor={id}
      />

      <div className="container">
        <div className="flex flex-col">
          <div className="flex items-center pr-3">
            <DynamicFormattedMessage
              className="pb-1 text-sm pr-2"
              tag="span"
              id="form.field.yes.label"
            />
            <input
              name={name}
              type="radio"
              value="Yes"
              id={id}
              ref={register({ required: true })}
            />
          </div>
          <div className="flex items-center">
            <DynamicFormattedMessage
              className="pb-1 text-sm pr-2"
              tag="span"
              id="form.field.no.label"
            />
            <input
              name={name}
              type="radio"
              value="No"
              ref={register({ required: true })}
            />
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
      </div>
    </div>
  )
}

export default YesNoInput
