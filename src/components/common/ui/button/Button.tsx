import React, {
  ButtonHTMLAttributes,
  FunctionComponent,
  MouseEvent,
} from 'react'

export interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean
}

const Button: FunctionComponent<IButtonProps> = ({
  children,
  onClick = () => null,
  type = 'button',
  disabled = false,
  loading = false,
  className = '',
  ...rest
}) => {
  const handleClick = (props: MouseEvent<HTMLButtonElement>) =>
    !disabled && onClick(props)

  return (
    <button
      {...{ onClick: handleClick, disabled, type, ...rest }}
      className={className}
    >
      {/* TODO: Style loading */}
      {loading ? 'loading' : children}
    </button>
  )
}

export default Button
