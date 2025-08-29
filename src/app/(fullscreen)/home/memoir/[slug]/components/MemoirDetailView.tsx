'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { Header } from '@/components/ui/Header';
import { Button } from '@/components/ui/Button';
import {
  BottomDrawer,
  BottomDrawerContent,
  BottomDrawerFooter,
  BottomDrawerHandle,
  BottomDrawerHeader,
} from '@/components/ui/Drawer';
import { cn } from '@/utils/cn';
import { memoirMutations } from '@/queries/memoirOptions';
import { MEMOIR_TYPES } from '@/constants/code';
import { PATH } from '@/constants/path';
import MoreIcon from '@/assets/icon/more_icon.svg';
import type { MemoirData } from '@/types/memoirTypes';

import MemoirDetailContent from './MemoirDetailContent';
import MemoirDetailAction from './MemoirDetailAction';
import CommentDrawer from './CommentDrawer';

interface Props {
  memoirData: MemoirData;
}

export default function MemoirDetailView({ memoirData }: Props) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isCommentDrawerOpen, setIsCommentDrawerOpen] = useState(false);

  const { mutate: deleteMemoir } = useMutation(
    memoirMutations.delete(queryClient),
  );

  const handleEdit = () => {
    router.push(PATH.MEMOIR.EDIT.path.replace('[id]', String(memoirData.id)));
    setIsDrawerOpen(false);
  };

  const handleDelete = () => {
    setIsDrawerOpen(false);
    if (confirm('정말로 이 회고를 삭제하시겠습니까?')) {
      deleteMemoir(memoirData.id, {
        onSuccess: () => {
          alert('회고가 삭제되었습니다.');
          router.push(PATH.MY_PAGE.MEMOIRS.path);
        },
        onError: () => {
          alert('삭제에 실패했습니다. 다시 시도해주세요.');
        },
      });
    }
  };

  const menuItems = [
    { id: 'edit', label: '수정', onClick: handleEdit },
    { id: 'delete', label: '삭제', onClick: handleDelete },
  ];

  const headerTitle =
    memoirData.type === MEMOIR_TYPES.QUICK ? '퀵회고' : '일반회고';

  return (
    <div className="flex h-screen flex-col">
      <Header
        title={headerTitle}
        showBackButton={true}
        rightContent={<MoreIcon className="cursor-pointer" />}
        onRightClick={() => setIsDrawerOpen(true)}
      />
      <main className="no-scrollbar flex-1 overflow-y-auto px-5">
        <MemoirDetailContent data={memoirData} />
      </main>

      {memoirData.isPublic && (
        <footer>
          <MemoirDetailAction
            isLike={false}
            onCommentClick={() => setIsCommentDrawerOpen(true)}
          />
        </footer>
      )}

      <BottomDrawer isOpen={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
        <BottomDrawerHandle />
        <BottomDrawerHeader
          title="옵션"
          onClose={() => setIsDrawerOpen(false)}
        />
        <BottomDrawerContent className="px-4">
          <div className="bg-gray-btn flex cursor-pointer flex-col rounded-lg px-5 py-3">
            {menuItems.map(item => (
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
            ))}
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

      <CommentDrawer
        memoirId={memoirData.id}
        isOpen={isCommentDrawerOpen}
        onClose={() => setIsCommentDrawerOpen(false)}
      />
    </div>
  );
}
