import { cn } from '@/utils/cn';

interface Props {
  title: string;
  className?: string;
}

export default function Title({ title, className }: Props) {
  return (
    <h2
      className={cn('text-foundation-strong typo-display-01 mb-8', className)}
    >
      {title}
    </h2>
  );
}
