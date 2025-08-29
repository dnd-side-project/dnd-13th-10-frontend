'use client';

import LikeIcon from '@/assets/icon/heart_icon.svg';
import CommentIcon from '@/assets/icon/comment_icon.svg';
import BookmarkIcon from '@/assets/icon/bookmark_icon.svg';
import { cn } from '@/utils/cn';

interface Props {
  isLike?: boolean;
  onCommentClick?: () => void;
}

export default function MemoirDetailAction({ isLike, onCommentClick }: Props) {
  return (
    <div className="border-foundation-divider flex items-center justify-between border-t p-5">
      <div className="flex items-center gap-[14px]">
        <div className="flex items-center gap-1">
          <LikeIcon
            className={cn(
              'cursor-pointer',
              isLike ? 'text-warning' : 'fill-transparent text-[#888888]',
            )}
          />
          <span className="text-foundation-secondary typo-subhead-03">16</span>
        </div>

        <div className="flex items-center gap-1">
          <CommentIcon className="cursor-pointer" onClick={onCommentClick} />
          <span className="text-foundation-secondary typo-subhead-03">12</span>
        </div>
      </div>

      <BookmarkIcon className="cursor-pointer" />
    </div>
  );
}
