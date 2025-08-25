'use client';

import { useRef, useEffect } from 'react';

import { cn } from '@/utils/cn';
import DropdownIcon from '@/assets/icon/dropdown_icon2.svg';

type SortOption<T extends string> = {
  label: string;
  value: T;
};

interface Props<T extends string> {
  options: readonly SortOption<T>[];
  value: T;
  onValueChange: (value: T) => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  dropdownClassName?: string;
}

const useOnClickOutside = (
  ref: React.RefObject<HTMLDivElement | null>,
  handler: () => void,
) => {
  useEffect(() => {
    const listner = (e: MouseEvent | TouchEvent) => {
      if (!ref.current || ref.current.contains(e.target as Node)) {
        return;
      }
      handler();
    };
    document.addEventListener('mousedown', listner);
    document.addEventListener('touchstart', listner);

    return () => {
      document.removeEventListener('mousedown', listner);
      document.removeEventListener('touchstart', listner);
    };
  }, [ref, handler]);
};

export function SortDropdown<T extends string>({
  options,
  value,
  onValueChange,
  isOpen,
  setIsOpen,
  dropdownClassName,
}: Props<T>) {
  const dropdownRef = useRef<HTMLDivElement>(null);

  useOnClickOutside(dropdownRef, () => setIsOpen(false));

  const selectedLabel =
    options.find(option => option.value === value)?.label || '';

  const handleOptionClick = (optionValue: T) => {
    onValueChange(optionValue);
    setIsOpen(false);
  };

  return (
    <div className="relative z-20" ref={dropdownRef}>
      <div
        className="flex cursor-pointer items-center gap-1 whitespace-nowrap"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-foundation-primary typo-subhead-02">
          {selectedLabel}
        </span>
        <DropdownIcon />
      </div>

      <div
        className={cn(
          'bg-foundation-box absolute top-full left-0 z-10 mt-3 w-max rounded-xl px-4 py-3',
          'transition-all duration-200 ease-in-out',
          dropdownClassName,
          isOpen
            ? 'visible scale-100 opacity-100'
            : 'invisible scale-95 opacity-0',
        )}
      >
        {options.map((option, index) => (
          <div key={option.value}>
            <div
              onClick={() => handleOptionClick(option.value)}
              className={cn(
                'typo-subhead-02 cursor-pointer',
                value === option.value
                  ? 'text-foundation-strong'
                  : 'text-foundation-disabled',
              )}
            >
              {option.label}
            </div>
            {index < options.length - 1 && (
              <div className="bg-foundation-divider my-2 h-px" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
