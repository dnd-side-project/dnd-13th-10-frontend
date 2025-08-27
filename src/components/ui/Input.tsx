import type { InputHTMLAttributes, ReactNode, Ref } from 'react';

import { cn } from '@/utils/cn';
import ClearIcon from '@/assets/icon/x.svg';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  ref?: Ref<HTMLInputElement>;
  icons?: ReactNode;
  showCharCount?: boolean;
  className?: string;
  inputClassName?: string;
  warningText?: ReactNode;
  onClear?: () => void;
}

function Input({
  icons = <ClearIcon />,
  showCharCount = false,
  className,
  inputClassName,
  value,
  maxLength,
  onClear,
  warningText = '입력 글자 수를 초과했어요.',
  ref,
  ...props
}: Props) {
  const currentLength = String(value || '').length;
  const isLengthExceeded = maxLength ? currentLength > maxLength : false;

  return (
    <div className={cn('w-full', className)}>
      <div className="bg-foundation-box focus-within:border-foundation-primary flex items-center gap-2 rounded-xl border border-transparent px-4 py-3 transition-colors duration-200">
        <input
          ref={ref}
          value={value ?? ''}
          maxLength={maxLength}
          className={cn(
            'placeholder:text-foundation-disabled typo-body-02 flex-1 bg-transparent text-white outline-none',
            inputClassName,
          )}
          {...props}
        />
        {onClear && icons && (
          <button
            type="button"
            onClick={onClear}
            aria-label="Clear input"
            className={cn('shrink-0 cursor-pointer', !value && 'invisible')}
          >
            {icons}
          </button>
        )}
      </div>

      {((isLengthExceeded && warningText) || (showCharCount && maxLength)) && (
        <div className="mt-1 flex items-center justify-between">
          <div className="typo-body-01">
            {isLengthExceeded && warningText && (
              <span className="text-warning">{warningText}</span>
            )}
          </div>

          {showCharCount && maxLength && (
            <div
              className={cn(
                'text-foundation-disabled typo-body-01',
                isLengthExceeded && 'text-warning',
              )}
            >
              <span>
                {currentLength}/{maxLength}
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export { Input };
