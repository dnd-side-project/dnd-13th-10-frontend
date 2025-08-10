import type { ReactNode, ButtonHTMLAttributes } from 'react';

import { cn } from '@/utils/cn';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  className?: string;
}

const baseStyles =
  'cursor-pointer rounded-lg p-2.5 h-12 shrink-0 typo-subhead-02';

const variantStyles = {
  primary: 'bg-primary-btn text-white',
  secondary: 'bg-gray-btn text-foundation-primary',
  outline: 'border border-foundation-secondary text-white bg-transparent',
};

const sizeStyles = {
  small: 'w-btn-small',
  medium: 'w-btn-medium',
  large: 'w-full',
};

const Button = ({
  children,
  type = 'button',
  variant = 'primary',
  size = 'medium',
  disabled = false,
  className,
  ...props
}: Props) => {
  const combinedStyles = cn(
    baseStyles,
    variantStyles[variant],
    sizeStyles[size],
    className,
  );

  return (
    <button
      className={cn(
        combinedStyles,
        disabled && 'bg-gray-btn text-foundation-disabled cursor-not-allowed',
      )}
      type={type}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
