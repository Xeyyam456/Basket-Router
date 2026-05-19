import clsx from 'clsx'
import styles from './Input.module.css'

function Input({
  type = 'text',
  placeholder = '',
  value,
  onChange,
  icon,
  size = 'md',
  disabled = false,
  className = '',
  ...rest
}) {
  return (
    <div className={clsx(styles['input-wrap'], styles[`input-wrap--${size}`], icon && styles['input-wrap--has-icon'], className)}>
      {icon && <span className={styles['input-wrap__icon']}>{icon}</span>}
      <input
        type={type}
        className={styles['input-wrap__field']}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        {...rest}
      />
    </div>
  )
}

export default Input
