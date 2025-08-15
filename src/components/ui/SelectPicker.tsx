import { cn } from '@/utils/cn';
import DropdownIcon from '@/assets/icon/dropdown_icon.svg';

interface Props {
  value?: string;
  placeholder?: string;
  className?: string;
  onClick: () => void;
  disabled?: boolean;
}

const SelectPicker = ({
  value,
  placeholder = '옵션 선택',
  className,
  onClick,
  disabled = false,
}: Props) => {
  const handleClick = () => {
    if (!disabled) {
      onClick();
    }
  };

  return (
    <div className={cn('w-full', className)}>
      <button
        type="button"
        className={cn(
          'bg-foundation-box flex w-full cursor-pointer items-center gap-2 rounded-xl border border-transparent px-4 py-3 text-left transition-colors duration-200',
          disabled && 'cursor-not-allowed opacity-50',
        )}
        onClick={handleClick}
        aria-label={value || placeholder}
        onKeyDown={e => {
          if ((e.key === 'Enter' || e.key === ' ') && !disabled) {
            e.preventDefault();
            onClick();
          }
        }}
      >
        <p
          className={cn(
            'placeholder:text-foundation-disabled typo-body-02 flex-1 bg-transparent text-white outline-none',
            !value && 'text-foundation-disabled',
          )}
        >
          {value || placeholder}
        </p>

        <DropdownIcon className="h-5 w-5 shrink-0" />
      </button>
    </div>
  );
};

export { SelectPicker };
