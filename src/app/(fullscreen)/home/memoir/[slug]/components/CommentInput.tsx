'use client';

import { Input } from '@/components/ui/Input';
import SendIcon from '@/assets/icon/send_icon.svg';

interface Props {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: () => void;
  isPosting: boolean;
  placeholder?: string;
  isReplying?: boolean;
  onCancelReply?: () => void;
}

export default function CommentInput({
  value,
  onChange,
  onSubmit,
  isPosting,
  placeholder = '댓글 달기...',
  isReplying,
  onCancelReply,
}: Props) {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.nativeEvent.isComposing) {
      e.preventDefault();
      onSubmit();
    }
  };

  return (
    <div className="flex flex-col gap-2">
      {isReplying && onCancelReply && (
        <div className="text-foundation-secondary typo-caption flex items-center justify-between px-1">
          <span>{placeholder.split('...')[0]}</span>
          <button onClick={onCancelReply} className="flex items-center gap-1">
            취소
          </button>
        </div>
      )}
      <div className="relative">
        <Input
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onKeyDown={handleKeyDown}
          className="w-full"
          disabled={isPosting}
          icons={<SendIcon />}
          onClear={onSubmit}
        />
      </div>
    </div>
  );
}
