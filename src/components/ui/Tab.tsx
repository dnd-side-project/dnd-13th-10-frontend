import type { ReactNode } from 'react';

import { cn } from '@/utils/cn';

interface TabItem {
  id: string;
  label: string;
  content?: ReactNode;
}

interface TabProps {
  items: TabItem[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
  className?: string;
  tabClassName?: string;
  activeTabClassName?: string;
  contentClassName?: string;
  variant?: 'full' | 'fit';
}

const baseContainerStyles = 'border-foundation-divider relative flex border-b';
const baseTabStyles =
  'typo-subhead-03 relative cursor-pointer transition-colors';
const variantStyles = {
  full: {
    padding: 'p-2.5',
    layout: 'flex-1',
    position: 'left-0 right-0',
  },
  fit: {
    padding: 'px-5 py-2.5',
    layout: 'shrink-0',
    position: 'left-5 right-5',
  },
};
const stateStyles = {
  active: 'text-primary-btn',
  inactive: 'text-foundation-disabled',
};

function Tab({
  items,
  activeTab,
  onTabChange,
  className,
  tabClassName,
  activeTabClassName,
  contentClassName,
  variant = 'full',
}: TabProps) {
  const activeItem = items.find(item => item.id === activeTab);

  return (
    <div className={className}>
      <TabGroupHeader
        items={items}
        activeTab={activeTab}
        onTabChange={onTabChange}
        tabClassName={tabClassName}
        activeTabClassName={activeTabClassName}
        variant={variant}
      />
      {activeItem?.content && (
        <div className={cn('px-5 py-8', contentClassName)}>
          {activeItem.content}
        </div>
      )}
    </div>
  );
}

function TabGroupHeader({
  items,
  activeTab,
  onTabChange,
  className,
  tabClassName,
  activeTabClassName,
  variant = 'full',
}: TabProps) {
  const variantConfig = variantStyles[variant];

  return (
    <div className={cn(baseContainerStyles, className)}>
      {items.map(item => {
        const isActive = item.id === activeTab;
        return (
          <button
            type="button"
            key={item.id}
            onClick={() => onTabChange(item.id)}
            className={cn(
              baseTabStyles,
              variantConfig.padding,
              variantConfig.layout,
              isActive ? stateStyles.active : stateStyles.inactive,
              tabClassName,
              isActive && activeTabClassName,
            )}
          >
            {item.label}
            <div
              className={cn(
                'bg-primary-btn absolute bottom-0 h-[3px] transition-all duration-300',
                variantConfig.position,
                isActive ? 'scale-x-100 opacity-100' : 'scale-x-50 opacity-0',
              )}
            />
          </button>
        );
      })}
    </div>
  );
}

export type { TabItem, TabProps };
export { Tab, TabGroupHeader };
