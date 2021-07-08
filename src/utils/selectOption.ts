import { TSelectOption } from '../interfaces/common'

type MapFn<VK extends string, LK extends string> = <
  T extends Record<VK, unknown> & Record<LK, unknown>
>(
  elem: T
) => T extends Record<VK, infer V> & Record<LK, infer L>
  ? TSelectOption<V, L>
  : never

/**
 * Returns a mapping function used for transforming any object[] into TSelectOption
 *
 * @example [{name:"label", code : "123"}].map(mapToSelectOption('code', 'name'))
 * @param valueKey
 * @param labelKey
 */
export function mapToSelectOption<VK extends string, LK extends string>(
  valueKey: VK,
  labelKey: LK
): MapFn<VK, LK>
export function mapToSelectOption<T>(valueKey: keyof T, labelKey: keyof T) {
  return (elem: T) => ({ value: elem[valueKey], label: elem[labelKey] })
}

/**
 * Maps simple array to TSelectOption format
 *
 * @example mapToSelectOptions([1,2,3])
 * @param values
 */
export const mapSelectOptions = <T extends string | number>(values: T[]) =>
  values.map((el) => ({
    value: el,
    label: el,
  }))
