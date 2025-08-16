import Link from 'next/link';
import type { ReactNode, ButtonHTMLAttributes } from 'react';

import { cn } from '@/utils/cn';

interface BaseProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'yellow';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  className?: string;
}

interface ButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'>,
    BaseProps {
  href?: never;
  type?: 'button' | 'submit' | 'reset';
}

interface LinkProps extends BaseProps {
  href: string;
  type?: never;
  onClick?: never;
}

type Props = ButtonProps | LinkProps;

const baseStyles =
  'cursor-pointer rounded-lg p-2.5 h-12 shrink-0 typo-subhead-02 inline-flex items-center justify-center';

const variantStyles = {
  primary: 'bg-primary-btn text-foundation-bg',
  secondary: 'bg-gray-btn text-foundation-primary',
  outline: 'border border-foundation-secondary text-white bg-transparent',
  yellow: 'bg-secondary-btn text-black',
};

const sizeStyles = {
  small: 'w-btn-small',
  medium: 'w-btn-medium',
  large: 'w-full',
};

function Button({
  children,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  className,
  ...props
}: Props) {
  const combinedStyles = cn(
    baseStyles,
    variantStyles[variant],
    sizeStyles[size],
    className,
  );

  const disabledStyles =
    disabled && 'bg-gray-btn text-foundation-disabled cursor-not-allowed';

  if ('href' in props && props.href) {
    return (
      <Link href={props.href} className={cn(combinedStyles, disabledStyles)}>
        {children}
      </Link>
    );
  }

  const { type = 'button', ...buttonProps } = props as ButtonProps;

  return (
    <button
      className={cn(combinedStyles, disabledStyles)}
      type={type}
      disabled={disabled}
      {...buttonProps}
    >
      {children}
    </button>
  );
}

export { Button };
