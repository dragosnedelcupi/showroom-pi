import { FieldValidator } from 'final-form'
import { integerToLocaleString } from '../../utils/number'
import { EMAIL_REGEX, MIN_AGE } from '../../constants/form'
import { TFieldError } from '../../i18n'

const FieldValidation: { [key: string]: TFieldError } = {
  REQUIRED: 'required',
  NUMBER: 'number',
  MIN: 'minLength',
  MAX: 'maxLength',
  GREATER_THAN: 'greaterThan',
  FORMAT: 'format',
} as const

type IDynamicFormError = { type: TFieldError; values: any }

/**
 * Function used to parse complex field validation for field personalized error rendering
 *
 * @param error
 */
export const getValidationErrorMessage: (
  error: string | IDynamicFormError
) => [string, any?] = (error) => {
  if (typeof error === 'string' || !error) {
    return [error]
  }

  return [error.type, error.values]
}

/**
 * Class used for holding all the validations used in forms
 */
export class Validations {
  private constructor() {
    // class should never be instantiated
  }

  /**
   * Function used for merging N validators and returning the first error
   *
   * @param validators
   */

  static composeValidators<T>(
    ...validators: FieldValidator<T>[]
  ): FieldValidator<T> {
    return (...validatorProps) =>
      validators.reduce(
        (error, validator) => error || validator(...validatorProps),
        undefined
      )
  }

  static required<T>(
    ...[value]: Parameters<FieldValidator<T>>
  ): ReturnType<FieldValidator<T>> {
    return value != null ? undefined : FieldValidation.REQUIRED
  }

  static mustBeNumber: FieldValidator<any> = (value) =>
    Number.isNaN(value) ? FieldValidation.NUMBER : undefined

  static minValue: (min: number) => FieldValidator<number | string> =
    (min) => (value) => {
      if (!(Number.isNaN(Number(value)) || value >= min))
        return {
          type: FieldValidation.GREATER_THAN,
          values: [integerToLocaleString(min)],
        }
    }

  static matches: (regex: string, skipNull: boolean) => FieldValidator<string> =

      (regex = EMAIL_REGEX, skipNull = false) =>
      (value = '') => {
        if ((!skipNull && !value) || !RegExp(regex).test(value)) {
          return FieldValidation.FORMAT
        }
      }

  static intervalEnd: (startField: string) => FieldValidator<Date> =
    (startField) => (endField, values: any) => {
      if (!endField || !values[startField]) {
        return FieldValidation.REQUIRED
      }
      if (values[startField]?.value >= endField!!) {
        return FieldValidation.GREATER_THAN
      }
    }

  static minLength: (min: number) => FieldValidator<string> =
    (min: number) => (value) => {
      if (!value || value.trim().length < min) {
        return FieldValidation.MIN
      }
    }

  static minimumAge: (min: number) => FieldValidator<number | string> = (
    minAge = MIN_AGE
  ) =>
    Validations.composeValidators(
      Validations.required,
      Validations.minValue(minAge)
    )
}
