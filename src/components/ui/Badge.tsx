import type { ReactNode } from 'react';

import { cn } from '@/utils/cn';

interface Props {
  children: ReactNode;
  className?: string;
  variant?: 'gray' | 'dark' | 'blue' | 'black' | 'yellow';
  shape?: 'minimal' | 'round' | 'square';
  size?: 'xsmall' | 'small' | 'large';
}

const variantStyles = {
  gray: 'bg-gray-btn text-white',
  dark: 'bg-foundation-box text-secondary-btn',
  blue: 'bg-primary-btn text-black',
  black: 'bg-foundation-box text-foundation-primary',
  yellow: 'bg-secondary-btn text-foundation-box',
};

const sizeStyles = {
  xsmall: 'typo-caption py-0.5 px-2',
  small: 'typo-caption py-1 px-2',
  large: 'typo-body-01 py-2 px-4',
};

const shapeStyles = {
  minimal: 'rounded-sm',
  square: 'rounded-lg',
  round: 'rounded-full',
};

function Badge({
  children,
  className,
  variant = 'gray',
  shape = 'square',
  size = 'small',
}: Props) {
  const combinedStyles = cn(
    variantStyles[variant],
    sizeStyles[size],
    shapeStyles[shape],
    className,
  );

  return (
    <span
      className={cn(
        'inline-flex w-fit items-center whitespace-nowrap',
        combinedStyles,
      )}
    >
      {children}
    </span>
  );
}

export { Badge };
