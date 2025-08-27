'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

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
import { scheduleMutations, scheduleQueries } from '@/queries/scheduleOptions';
import { cn } from '@/utils/cn';
import { PATH } from '@/constants/path';

import ScheduleDetailContent from './ScheduleDetailContent';

interface Props {
  scheduleId: number;
}

export default function ScheduleDetailView({ scheduleId }: Props) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const {
    data: response,
    isLoading,
    isError,
  } = useQuery(scheduleQueries.detail(scheduleId));
  const { mutate: deleteSchedule } = useMutation(
    scheduleMutations.delete(queryClient),
  );

  const handleEdit = () => {
    router.push(PATH.SCHEDULE.EDIT.path.replace('[id]', String(scheduleId)));
    setIsDrawerOpen(false);
  };

  const handleDelete = () => {
    setIsDrawerOpen(false);
    if (confirm('정말로 이 일정을 삭제하시겠습니까?')) {
      deleteSchedule(
        { scheduleId: scheduleId },
        {
          onSuccess: () => {
            alert('일정이 삭제되었습니다.');
            router.push(PATH.SCHEDULE.HOME.path);
          },
          onError: () => {
            alert('삭제에 실패했습니다. 다시 시도해주세요.');
          },
        },
      );
    }
  };

  if (isLoading) return <div>로딩 중...</div>;
  if (isError || !response?.data)
    return <div>데이터를 불러오는 데 실패했습니다.</div>;

  const scheduleData = response.data;

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
          <ScheduleDetailContent data={scheduleData} />
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
