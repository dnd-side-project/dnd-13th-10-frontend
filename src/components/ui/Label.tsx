import { cn } from '@/utils/cn';

interface Props {
  label: string;
  className?: string;
}

export function Label({ label, className }: Props) {
  return (
    <p className={cn('text-foundation-primary typo-subhead-03', className)}>
      {label}
    </p>
  );
}
