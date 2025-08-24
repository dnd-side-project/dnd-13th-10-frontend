'use client';

import type { ReactNode } from 'react';

import LeftArrowIcon from '@/assets/icon/left_arrow_icon.svg';
import { cn } from '@/utils/cn';

interface Props {
  title: ReactNode;
  rightContent?: ReactNode | string;
  onBackClick?: () => void;
  onRightClick?: () => void;
  showBackButton?: boolean;
}

function Header({
  title,
  rightContent,
  onBackClick,
  onRightClick,
  showBackButton = true,
}: Props) {
  const handleBackClick = () => {
    if (onBackClick) {
      onBackClick();
    } else {
      window.history.back();
    }
  };

  return (
    <header
      className={cn(
        'border-foundation-divider flex items-center border-b px-4',
        typeof title === 'string' ? 'py-6' : 'py-3',
      )}
    >
      {showBackButton && (
        <div className="w-8 shrink-0">
          <LeftArrowIcon
            className="shrink-0 cursor-pointer"
            aria-label="뒤로 가기"
            onClick={handleBackClick}
          />
        </div>
      )}

      <div className="flex-1 text-center">
        {typeof title === 'string' ? (
          <span className="typo-headline text-foundation-strong">{title}</span>
        ) : (
          title
        )}
      </div>

      {rightContent ? (
        <div
          className={cn(
            'flex w-8 flex-shrink-0 justify-end',
            onRightClick && 'cursor-pointer',
          )}
          onClick={onRightClick}
        >
          {typeof rightContent === 'string' ? (
            <span className="typo-body-02 text-foundation-strong">
              {rightContent}
            </span>
          ) : (
            rightContent
          )}
        </div>
      ) : showBackButton ? (
        <div className="w-8 shrink-0" />
      ) : null}
    </header>
  );
}

export { Header };
