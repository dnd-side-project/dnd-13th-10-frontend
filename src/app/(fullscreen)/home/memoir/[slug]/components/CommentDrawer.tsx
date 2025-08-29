import { useState, useMemo, useRef, useCallback } from 'react';

import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';

import {
  BottomDrawer,
  BottomDrawerContent,
  BottomDrawerFooter,
  BottomDrawerHandle,
  BottomDrawerHeader,
} from '@/components/ui/Drawer';
import {
  memoirInfiniteQueries,
  memoirMutations,
} from '@/queries/memoirOptions';

import CommentList from './CommentList';
import CommentInput from './CommentInput';

interface Props {
  memoirId: number;
  isOpen: boolean;
  onClose: () => void;
}

export default function CommentDrawer({ memoirId, isOpen, onClose }: Props) {
  const queryClient = useQueryClient();
  const [newComment, setNewComment] = useState('');

  const {
    data: commentsData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isPending,
    isError,
  } = useInfiniteQuery({
    ...memoirInfiniteQueries.comments(memoirId),
    enabled: isOpen,
  });

  const allComments = useMemo(() => {
    const flatComments =
      commentsData?.pages.flatMap(page => page.data.result) || [];

    const uniqueComments = Array.from(
      new Map(flatComments.map(comment => [comment.id, comment])).values(),
    );

    return uniqueComments;
  }, [commentsData]);

  const observer = useRef<IntersectionObserver | null>(null);
  const lastCommentRef = useCallback(
    (node: HTMLDivElement) => {
      if (isFetchingNextPage) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      });

      if (node) observer.current.observe(node);
    },
    [isFetchingNextPage, fetchNextPage, hasNextPage],
  );

  const { mutate: createComment, isPending: isPosting } = useMutation({
    ...memoirMutations.createComment(queryClient),
  });

  const handleCommentSubmit = () => {
    if (!newComment.trim() || isPosting) return;
    createComment(
      { memoirId, content: newComment },
      {
        onSuccess: () => {
          setNewComment('');
        },
        onError: () => {
          alert('댓글 등록에 실패했습니다.');
        },
      },
    );
  };

  return (
    <BottomDrawer isOpen={isOpen} onOpenChange={open => !open && onClose()}>
      <BottomDrawerHandle />
      <BottomDrawerHeader title="댓글" onClose={onClose} />
      <BottomDrawerContent className="overscroll-contain">
        <CommentList
          comments={allComments}
          isPending={isPending}
          isError={isError}
          lastCommentRef={lastCommentRef}
        />
        {isFetchingNextPage && (
          <div className="py-2 text-center text-sm text-gray-500">
            댓글을 불러오는 중...
          </div>
        )}
      </BottomDrawerContent>
      <BottomDrawerFooter>
        <CommentInput
          value={newComment}
          onChange={e => setNewComment(e.target.value)}
          onSubmit={handleCommentSubmit}
          isPosting={isPosting}
        />
      </BottomDrawerFooter>
    </BottomDrawer>
  );
}
