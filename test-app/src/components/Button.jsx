import './Button.css';

export default function Button({ variant = 'primary', size = 'md', type = 'button', children, ...rest }) {
  return (
    <button type={type} className={`button button--${variant} button--${size}`} {...rest}>
      {children}
    </button>
  );
}
