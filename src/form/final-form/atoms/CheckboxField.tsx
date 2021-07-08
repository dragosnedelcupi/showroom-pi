import React from 'react'
import { FieldProps, FieldRenderProps, useField } from 'react-final-form'
import DynamicFormattedMessage from '../../../components/common/ui/DynamicFormattedMessage'
import { TFieldLabel } from '../../../i18n'

interface ICheckboxRenderProps
  extends FieldProps<boolean, FieldRenderProps<boolean>> {
  className?: string
  showLabel?: boolean
  isMandatory?: boolean
  label?: TFieldLabel
}

const CheckboxField = ({
  name,
  className = '',
  label,
  ...fieldProps
}: ICheckboxRenderProps) => {
  const { input, meta } = useField<boolean>(name, fieldProps)
  const { value, ...checkboxInput } = input

  return (
    <div className={className}>
      <label
        htmlFor={`${label || name}id`}
        className="inputLabel dFlex alignItemsCenter"
      >
        <div className="checkbox-content">
          <input
            type="checkbox"
            {...checkboxInput}
            className="checkbox-input"
            id={`${label || name}id`}
          />
        </div>
        <DynamicFormattedMessage
          tag="span"
          id={`form.field.${label || name}.label`}
        />
      </label>
      <DynamicFormattedMessage
        id={`form.validation.${meta.error}`}
        shouldRender={!!meta.error && meta.touched}
      />
    </div>
  )
}

export default CheckboxField
