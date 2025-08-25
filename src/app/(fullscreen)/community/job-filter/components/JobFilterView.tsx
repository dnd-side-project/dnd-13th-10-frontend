'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { ToggleGroup } from '@/components/ui/ToggleGroup';
import { Header } from '@/components/ui/Header';
import { Button } from '@/components/ui/Button';
import { POSITION } from '@/constants/code';
import { PATH } from '@/constants/path';
import { getPositionLabel } from '@/utils/labelUtils';
import type { Position } from '@/types/memoirTypes';
import XIcon from '@/assets/icon/x_icon.svg';
import RotateIcon from '@/assets/icon/rotate_icon.svg';

export default function JobFilterView() {
  const [selectedValue, setSelectedValue] = useState('');
  const router = useRouter();

  const positionOptions = Object.values(POSITION).map(code => ({
    id: code,
    text: getPositionLabel(code as Position),
  }));

  const handleReset = () => {
    setSelectedValue('');
  };

  const handleClose = () => {
    router.push(PATH.COMMUNITY.MAIN.path);
  };

  const handleApplyFilter = () => {
    if (selectedValue) {
      router.push(`${PATH.COMMUNITY.MAIN.path}?position=${selectedValue}`);
    }
  };

  return (
    <main className="flex h-screen flex-col">
      <Header
        title="직무필터"
        leftContent={<RotateIcon />}
        rightContent={<XIcon />}
        onBackClick={handleReset}
        onRightClick={handleClose}
      />
      <div className="no-scrollbar flex-1 overflow-y-auto px-5 pt-6 pb-6">
        <ToggleGroup
          options={positionOptions}
          selectedValue={selectedValue}
          onSelectionChange={setSelectedValue}
          className="grid w-full grid-cols-2 gap-x-4 gap-y-5"
        />
      </div>

      <footer className="px-5 pt-4 pb-6">
        <Button
          size="large"
          disabled={!selectedValue}
          onClick={handleApplyFilter}
        >
          적용하기
        </Button>
      </footer>
    </main>
  );
}
