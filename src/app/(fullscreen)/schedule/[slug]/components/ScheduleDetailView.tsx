'use client';

import { useState } from 'react';

import MoreIcon from '@/assets/icon/more_icon.svg';
import { Header } from '@/components/ui/Header';
import {
  BottomDrawer,
  BottomDrawerContent,
  BottomDrawerFooter,
  BottomDrawerHandle,
  BottomDrawerHeader,
} from '@/components/ui/Drawer';
import { Button } from '@/components/ui/Button';
import { cn } from '@/utils/cn';
import type { ScheduleDetailData } from '@/types/scheduleTypes';

import ScheduleDetailContent from './ScheduleDetailContent';

interface Props {
  data: ScheduleDetailData;
}

export default function ScheduleDetailView({ data }: Props) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleEdit = () => {
    // router.push(PATH.SCHEDULE.EDIT.path.replace('[id]', String(data.id)));
    setIsDrawerOpen(false);
  };

  const handleDelete = () => {
    // if (confirm('정말로 이 일정을 삭제하시겠습니까?')) {
    //   // deleteApi(data.id);
    // }
    setIsDrawerOpen(false);
  };

  const menuItems = [
    { id: 'edit', label: '수정', onClick: handleEdit },
    { id: 'delete', label: '삭제', onClick: handleDelete },
  ];

  return (
    <div className="flex h-screen flex-col">
      <Header
        title="일정"
        rightContent={<MoreIcon className="cursor-pointer" />}
        onRightClick={() => setIsDrawerOpen(true)}
      />
      <main className="no-scrollbar flex-1 overflow-y-auto">
        <div className="px-5">
          <ScheduleDetailContent data={data} />
        </div>
      </main>

      <BottomDrawer isOpen={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
        <BottomDrawerHandle />
        <BottomDrawerHeader
          title="옵션"
          onClose={() => setIsDrawerOpen(false)}
        />
        <BottomDrawerContent className="px-4">
          <div className="bg-gray-btn flex cursor-pointer flex-col rounded-lg px-5 py-3">
            {menuItems.map(item => {
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={item.onClick}
                  className={cn(
                    'bg-gray-btn cursor-pointer p-2.5',
                    item.id === 'edit' && 'border-foundation-divider border-b',
                  )}
                >
                  <span
                    className={cn(
                      'typo-body-02',
                      item.id === 'delete'
                        ? 'text-warning'
                        : 'text-foundation-primary',
                    )}
                  >
                    {item.label}
                  </span>
                </button>
              );
            })}
          </div>
        </BottomDrawerContent>
        <BottomDrawerFooter>
          <Button
            variant="secondary"
            size="large"
            onClick={() => setIsDrawerOpen(false)}
          >
            닫기
          </Button>
        </BottomDrawerFooter>
      </BottomDrawer>
    </div>
  );
}
