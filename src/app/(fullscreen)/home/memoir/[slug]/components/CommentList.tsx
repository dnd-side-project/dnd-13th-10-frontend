'use client';

import Image from 'next/image';

import { formatTimeAgo } from '@/utils/date';
import type { Comment } from '@/types/memoirTypes';
import Logo from '@/assets/logo/logo_icon.svg';

interface Props {
  comments: Comment[];
  isPending: boolean;
  isError: boolean;
  lastCommentRef: (node: HTMLDivElement) => void;
  onReplyClick: (commentId: number, author: string) => void;
}

export default function CommentList({
  comments,
  isPending,
  isError,
  lastCommentRef,
  onReplyClick,
}: Props) {
  if (isPending) {
    return (
      <div className="flex flex-col gap-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <CommentSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (isError) {
    return <div className="py-10 text-center">댓글을 불러오지 못했습니다.</div>;
  }

  if (comments.length === 0) {
    return (
      <div className="text-foundation-primary py-10 text-center">
        작성된 댓글이 없습니다.
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8 p-5">
      {comments.map((comment, index) => {
        const isLastItem = comments.length === index + 1;

        return (
          <div key={comment.id} ref={isLastItem ? lastCommentRef : null}>
            <CommentItem comment={comment} onReplyClick={onReplyClick} />
          </div>
        );
      })}
    </div>
  );
}

function CommentItem({
  comment,
  onReplyClick,
}: {
  comment: Comment;
  onReplyClick: (commentId: number, author: string) => void;
}) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-start gap-3">
        <figure className="h-10 w-10 shrink-0 rounded-full">
          {comment.profileImageUrl ? (
            <Image
              src={comment.profileImageUrl}
              alt={comment.author}
              width={40}
              height={40}
              className="h-full w-full rounded-full object-cover"
            />
          ) : (
            <div className="bg-foundation-secondary/20 flex h-full w-full items-center justify-center rounded-full">
              <Logo height={20} width={20} />
            </div>
          )}
        </figure>

        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <span className="typo-subhead-02 text-foundation-strong">
              {comment.author}
            </span>
            <span className="typo-caption text-foundation-disabled">
              {formatTimeAgo(comment.createdAt)}
            </span>
          </div>
          <p className="typo-subhead-02 text-foundation-primary whitespace-pre-wrap">
            {comment.content}
          </p>
          {comment.isParent && (
            <button
              className="typo-caption text-foundation-disabled mt-px w-fit cursor-pointer"
              onClick={() => onReplyClick(comment.id, comment.author)}
            >
              답글달기
            </button>
          )}
        </div>
      </div>

      {comment.children && comment.children.length > 0 && (
        <div className="ml-8 flex flex-col gap-4">
          {comment.children.map(reply => (
            <CommentItem
              key={reply.id}
              comment={reply}
              onReplyClick={onReplyClick}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export function CommentSkeleton() {
  return (
    <div className="flex animate-pulse items-start gap-3 p-5">
      <div className="bg-foundation-box h-8 w-8 shrink-0 rounded-full" />
      <div className="flex w-full flex-col gap-1.5">
        <div className="bg-foundation-box h-4 w-1/2 rounded-md" />
        <div className="bg-foundation-box h-4 w-full rounded-md" />
      </div>
    </div>
  );
}
