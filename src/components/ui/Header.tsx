'use client';

import type { ReactNode } from 'react';

import LeftArrowIcon from '@/assets/icon/left_arrow_icon.svg';
import { cn } from '@/utils/cn';

interface Props {
  title: string;
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
    <header className="border-foundation-divider relative border py-6">
      {showBackButton && (
        <LeftArrowIcon
          className="absolute top-1/2 left-6 -translate-y-1/2 cursor-pointer"
          aria-label="뒤로 가기"
          onClick={handleBackClick}
        />
      )}

      <div className={cn('text-center', !showBackButton && 'px-6')}>
        <span className="typo-headline text-foundation-strong">{title}</span>
      </div>

      <div
        className={cn(
          'absolute top-1/2 right-6 flex -translate-y-1/2 items-center',
          onRightClick && 'cursor-pointer',
        )}
        onClick={onRightClick}
      >
        {rightContent &&
          (typeof rightContent === 'string' ? (
            <span className="typo-body-02 text-foundation-strong">
              {rightContent}
            </span>
          ) : (
            rightContent
          ))}
      </div>
    </header>
  );
}

export { Header };
