import './Input.css'

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
    <div className={`input-wrap input-wrap--${size}${icon ? ' input-wrap--has-icon' : ''}${className ? ' ' + className : ''}`}>
      {icon && <span className="input-wrap__icon">{icon}</span>}
      <input
        type={type}
        className="input-wrap__field"
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
