import React, { createElement, ReactHTML } from 'react'
import { FormattedMessage } from 'react-intl'
import { TranslationKey } from '../../../i18n'

interface IBase<T> {
  tag?: keyof ReactHTML | React.FC<T>
  shouldRender?: boolean
  id: TranslationKey | string
  defaultMessage?: string
  values?: any
}

type IDynamicFormattedMessage<T> = IBase<T> &
  {
    [K in keyof T]: T[K]
  }

/**
 * Renders conditionally a translated message
 * Wraps the translation inside a custom {@param tag} defaults to `span`
 *
 * @param tag
 * @param shouldRender
 * @param dynamicProps
 * @constructor
 */
function DynamicFormattedMessage<P extends object>({
  tag = 'span',
  shouldRender = true,
  ...dynamicProps
}: IDynamicFormattedMessage<P>) {
  if (!shouldRender) return null

  const { defaultMessage, id, values, ...parentProps } = dynamicProps
  const messageProps = { defaultMessage, id, values: dynamicProps.values }

  return createElement<P>(
    tag,
    parentProps as P,
    <FormattedMessage {...messageProps} />
  )
}

export default DynamicFormattedMessage
