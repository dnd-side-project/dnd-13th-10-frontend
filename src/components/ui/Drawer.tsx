'use client';

import type { ReactNode } from 'react';

import { Drawer } from 'vaul';

import { cn } from '@/utils/cn';
import ClosedIcon from '@/assets/icon/closed_icon.svg';
import CheckIcon from '@/assets/icon/check_icon.svg';

interface BottomDrawerProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  children: ReactNode;
  className?: string;
}

function BottomDrawer({
  isOpen,
  onOpenChange,
  children,
  className,
}: BottomDrawerProps) {
  return (
    <Drawer.Root autoFocus={true} open={isOpen} onOpenChange={onOpenChange}>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/50" />
        <Drawer.Content
          className={cn(
            'bg-foundation-bg max-w-maxWidth fixed right-0 bottom-0 left-0 z-50 mx-auto flex h-fit max-h-[70%] w-full flex-col rounded-t-[20px]',
            className,
          )}
        >
          {children}
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}

function BottomDrawerHandle() {
  return <div className="mx-auto mt-4 h-1.5 w-12 rounded-full bg-gray-300" />;
}

interface BottomDrawerHeaderProps {
  title?: string;
  description?: string;
  onClose?: () => void;
  showCloseButton?: boolean;
  children?: ReactNode;
}

function BottomDrawerHeader({
  title,
  description,
  onClose,
  showCloseButton = true,
  children,
}: BottomDrawerHeaderProps) {
  return (
    <>
      <div className="flex shrink-0 items-center justify-between p-5">
        {title && (
          <Drawer.Title className="typo-headline text-foundation-primary">
            {title}
          </Drawer.Title>
        )}
        {children}
        {showCloseButton && onClose && (
          <button
            type="button"
            aria-label="Close Drawer"
            onClick={onClose}
            className="ml-auto flex cursor-pointer items-center justify-center"
          >
            <ClosedIcon className="text-foundation-primary h-6 w-6" />
          </button>
        )}
      </div>
      <Drawer.Description className="sr-only">
        {description || (title ? `${title} 내용` : 'Drawer 내용')}
      </Drawer.Description>
    </>
  );
}

function BottomDrawerContent({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn('min-h-0 flex-1 overflow-y-auto', className)}>
      {children}
    </div>
  );
}

function BottomDrawerFooter({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={cn('shrink-0 p-4', className)}>{children}</div>;
}

interface DrawerItem {
  id: string;
  label: string;
  checked?: boolean;
}

interface BottomDrawerItemProps {
  item: DrawerItem;
  onClick: () => void;
}

function BottomDrawerItem({ item, onClick }: BottomDrawerItemProps) {
  return (
    <button
      type="button"
      aria-label={`Select ${item.label}`}
      onClick={onClick}
      className="hover:bg-foundation-box/10 flex w-full cursor-pointer items-center justify-between px-5 py-3 text-left"
    >
      <span className="typo-body-02 text-foundation-primary">{item.label}</span>
      {item.checked && <CheckIcon className="text-primary-btn h-5 w-5" />}
    </button>
  );
}

export type { DrawerItem };
export {
  BottomDrawer,
  BottomDrawerContent,
  BottomDrawerFooter,
  BottomDrawerHeader,
  BottomDrawerHandle,
  BottomDrawerItem,
};
