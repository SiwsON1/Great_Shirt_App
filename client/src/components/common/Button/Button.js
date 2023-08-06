import { forwardRef } from "react";

const Button = forwardRef(({ className, children, disabled, type = 'button', ...props }, ref) => {
  const combinedClassName = `
    w-auto
    rounded-full
    bg-black
    border
    border-transparent
    px-5
    py-3
    disabled:cursor-not-allowed
    disabled:opacity-50
    text-white
    font-semibold
    hover:opacity-75
    transition
    ${disabled ? 'opacity-75 cursor-not-allowed' : ''}
    ${className ? className : ''}
  `;

  return (
    <button
      type={type}
      className={combinedClassName}
      disabled={disabled}
      ref={ref}
      {...props}
    >
      {children}
    </button>
  );
});

Button.displayName = "Button";

export default Button;