'use client';

import { Input } from '@/components/ui/Input';
import SendIcon from '@/assets/icon/send_icon.svg';

interface Props {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: () => void;
  isPosting: boolean;
}

export default function CommentInput({
  value,
  onChange,
  onSubmit,
  isPosting,
}: Props) {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.nativeEvent.isComposing) {
      e.preventDefault();
      onSubmit();
    }
  };

  return (
    <div className="relative">
      <Input
        placeholder="댓글 달기..."
        value={value}
        onChange={onChange}
        onKeyDown={handleKeyDown}
        className="w-full"
        disabled={isPosting}
        icons={<SendIcon />}
        onClear={onSubmit}
      />
    </div>
  );
}
