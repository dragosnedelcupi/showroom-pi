import messages from './en.json'

type FilterStartingWith<Set, Needle extends string> =
  Set extends `${Needle}${infer _X}` ? _X : never

type FilterBetween<Set, Start extends string, End extends string> =
  Set extends `${Start}${infer _X}${End}` ? _X : never

/**
 * Union of all translation keys available
 */
export type TranslationKey = keyof typeof messages

/**
 * Union of all suffixes available for form.placeholder.
 */
export type TFieldPlaceHolder = FilterStartingWith<
  TranslationKey,
  'form.placeholder.'
>

/**
 * Union of all suffixes available to form.validation.
 */
export type TFieldError = FilterStartingWith<TranslationKey, 'form.validation.'>

/**
 * Union of all field names that have label form.field.${fieldName}.label
 */
export type TFieldLabel = FilterBetween<TranslationKey, 'form.field.', '.label'>
