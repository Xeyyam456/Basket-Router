import clsx from 'clsx'
import styles from './Button.module.css'

function Button({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  type = 'button',
  disabled = false,
  className = '',
  ...rest
}) {
  return (
    <button
      type={type}
      className={clsx(styles.btn, styles[`btn--${variant}`], styles[`btn--${size}`], className)}
      onClick={onClick}
      disabled={disabled}
      {...rest}
    >
      {children}
    </button>
  )
}

export default Button
