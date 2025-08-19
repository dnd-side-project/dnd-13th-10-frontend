'use client';

import { useState, type ChangeEvent } from 'react';

import { Button } from '@/components/ui/Button';
import { Header } from '@/components/ui/Header';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import PlusIcon from '@/assets/icon/plus_icon2.svg';

interface Props {
  initialNickname: string;
}

export default function ProfileModifyView({ initialNickname }: Props) {
  const [nickname, setNickname] = useState(initialNickname);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const isNicknameValid = nickname.trim().length > 0 && nickname.length <= 8;
  const hasContentChanged = nickname !== initialNickname || !!imageFile;
  const isSaveButtonDisabled = !isNicknameValid || !hasContentChanged;

  const handleSave = () => {
    history.back();
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);

      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    }
  };

  return (
    <div className="flex h-screen flex-col">
      <Header
        title="프로필 편집"
        rightContent="완료"
        onRightClick={handleSave}
      />

      <main className="flex-1 px-5">
        <label htmlFor="profile-image-upload" className="cursor-pointer">
          <figure className="mt-7 flex justify-center">
            <div className="relative h-[100px] w-[100px]">
              <div
                className="h-full w-full rounded-full bg-gray-200 bg-cover bg-center"
                style={{
                  backgroundImage: imagePreview
                    ? `url(${imagePreview})`
                    : 'none',
                }}
              />

              <div className="absolute right-0 bottom-0 flex h-6 w-6 items-center justify-center rounded-full bg-white p-[6px]">
                <PlusIcon />
              </div>
            </div>
          </figure>
        </label>

        <input
          id="profile-image-upload"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="hidden"
        />

        <div className="mt-6">
          <Label label="닉네임" />
          <Input
            placeholder="내용 입력"
            className="mt-2"
            value={nickname}
            onChange={e => setNickname(e.target.value)}
            maxLength={8}
          />
          <span className="text-foundation-disabled typo-body-01 mt-1">
            최대 8글자 이내로 입력해주세요.
          </span>
        </div>
      </main>

      <footer className="px-5 pt-4 pb-6">
        <Button
          size="large"
          disabled={isSaveButtonDisabled}
          onClick={handleSave}
        >
          저장
        </Button>
      </footer>
    </div>
  );
}
