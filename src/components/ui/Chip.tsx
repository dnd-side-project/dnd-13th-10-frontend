'use client';

import { cn } from '@/utils/cn';

interface Props {
  text: string;
  isSelected: boolean;
  onClick: () => void;
}

const baseStyles =
  'rounded-full cursor-pointer px-4 py-1 whitespace-nowrap typo-subhead-02';

const variantStyle = {
  default: 'bg-foundation-box border border-foundation-secondary',
  filled: 'bg-foundation-strong border border-foundation-primary',
};

const textStyle = {
  default: 'text-foundation-secondary',
  filled: 'text-foundation-box',
};

function Chip({ text, isSelected, onClick }: Props) {
  const variant = isSelected ? 'filled' : 'default';
  const variantClasses = variantStyle[variant];

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(baseStyles, variantClasses)}
    >
      <span className={textStyle[variant]}>{text}</span>
    </button>
  );
}

export { Chip };
