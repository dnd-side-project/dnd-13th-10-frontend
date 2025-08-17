import { cn } from '@/utils/cn';

interface Props {
  label: string;
  htmlFor?: string;
  className?: string;
}

export function Label({ label, htmlFor, className }: Props) {
  return (
    <label
      htmlFor={htmlFor}
      className={cn('text-foundation-primary typo-subhead-03', className)}
    >
      {label}
    </label>
  );
}
