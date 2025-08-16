import { cn } from '@/utils/cn';

interface ToggleOption {
  id: string;
  text: string;
}

interface ToggleItemProps {
  text: string;
  isSelected?: boolean;
  onClick?: () => void;
}

interface ToggleGroupProps {
  options: ToggleOption[];
  selectedValue: string;
  onSelectionChange: (value: string) => void;
  className?: string;
}

function ToggleGroup({
  options,
  selectedValue,
  onSelectionChange,
  className,
}: ToggleGroupProps) {
  return (
    <div role="radiogroup" className={cn('flex gap-2', className)}>
      {options.map(option => (
        <ToggleItem
          key={option.id}
          text={option.text}
          isSelected={selectedValue === option.id}
          onClick={() => onSelectionChange(option.id)}
        />
      ))}
    </div>
  );
}

function ToggleItem({ text, isSelected, onClick }: ToggleItemProps) {
  return (
    <button
      role="radio"
      type="button"
      aria-checked={isSelected}
      onClick={onClick}
      className={cn(
        'typo-body-02 bg-foundation-box h-13 min-w-[106px] cursor-pointer rounded-lg p-2.5 transition-colors',
        isSelected
          ? 'text-foundation-strong border-foundation-primary border font-bold'
          : 'text-foundation-disabled',
      )}
    >
      {text}
    </button>
  );
}

export type { ToggleOption };
export { ToggleGroup };
