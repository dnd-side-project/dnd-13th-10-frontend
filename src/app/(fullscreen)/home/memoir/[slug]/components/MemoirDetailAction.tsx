'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import LikeIcon from '@/assets/icon/heart_icon.svg';
import CommentIcon from '@/assets/icon/comment_icon.svg';
import BookmarkIcon from '@/assets/icon/bookmark_icon.svg';
import { cn } from '@/utils/cn';
import { memoirMutations } from '@/queries/memoirOptions';

interface Props {
  memoirId: number;
  likeCount: number;
  commentCountText: string;
  isLiked: boolean;
  isBookmarked: boolean;
  onCommentClick?: () => void;
}

export default function MemoirDetailAction({
  memoirId,
  likeCount,
  commentCountText,
  isLiked,
  isBookmarked,
  onCommentClick,
}: Props) {
  const queryClient = useQueryClient();

  const { mutate: toggleLike } = useMutation(
    memoirMutations.toggleLike(queryClient),
  );
  const { mutate: toggleBookmark } = useMutation(
    memoirMutations.toggleBookmark(queryClient),
  );

  const handleLikeClick = () => {
    toggleLike(memoirId);
  };

  const handleBookmarkClick = () => {
    toggleBookmark(memoirId);
  };

  return (
    <div className="border-foundation-divider flex items-center justify-between border-t p-5">
      <div className="flex items-center gap-[14px]">
        <div className="flex items-center gap-1">
          <LikeIcon
            onClick={handleLikeClick}
            className={cn(
              'cursor-pointer',
              isLiked ? 'text-warning' : 'fill-transparent text-[#888888]',
            )}
          />
          <span className="text-foundation-secondary typo-subhead-03">
            {likeCount}
          </span>
        </div>

        <div className="flex items-center gap-1">
          <CommentIcon className="cursor-pointer" onClick={onCommentClick} />
          <span className="text-foundation-secondary typo-subhead-03">
            {commentCountText}
          </span>
        </div>
      </div>

      <BookmarkIcon
        className={cn(
          'cursor-pointer',
          isBookmarked ? 'text-secondary-btn' : 'transparent border-[#888888]',
        )}
        fill={isBookmarked ? 'currentColor' : 'transparent'}
        onClick={handleBookmarkClick}
      />
    </div>
  );
}
