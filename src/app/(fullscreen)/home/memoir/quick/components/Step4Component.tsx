'use client';

import { useState } from 'react';

import { Input } from '@/components/ui/Input';
import { SelectPicker } from '@/components/ui/picker/SelectPicker';
import { ToggleGroup } from '@/components/ui/ToggleGroup';
import { Label } from '@/components/ui/Label';
import {
  BottomDrawer,
  BottomDrawerContent,
  BottomDrawerFooter,
  BottomDrawerHandle,
  BottomDrawerHeader,
  BottomDrawerItem,
} from '@/components/ui/Drawer';
import { Button } from '@/components/ui/Button';
import { INTERVIEW_STATUS } from '@/constants/code';
import { INTERVIEW_STATUS_LABELS } from '@/constants/labels';
import { createOptionsArray } from '@/utils/options';
import type { InterviewStatus } from '@/types/memoirTypes';

import { useMemoirFormStore } from '../store/memoirFormStore';

const INTERVIEW_STATUS_OPTIONS = createOptionsArray(
  INTERVIEW_STATUS,
  INTERVIEW_STATUS_LABELS,
);

const VISIBILITY_OPTIONS = [
  { text: '비공개', id: 'false' },
  { text: '공개', id: 'true' },
];

export default function Step4Component() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [tempInterviewStatus, setTempInterviewStatus] = useState<
    InterviewStatus | ''
  >('');

  const data = useMemoirFormStore(state => state.formData.step4);
  const updateStepData = useMemoirFormStore(state => state.updateStepData);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateStepData('step4', { ...data, [e.target.name]: e.target.value });
  };

  const handleVisibilityChange = (value: string) => {
    if (value) {
      updateStepData('step4', { ...data, isPublic: value === 'true' });
    }
  };

  const handleOpenDrawer = () => {
    setTempInterviewStatus(data.interviewStatus);
    setIsDrawerOpen(true);
  };

  const handleSave = () => {
    if (tempInterviewStatus) {
      updateStepData('step4', {
        ...data,
        interviewStatus: tempInterviewStatus,
      });
      setIsDrawerOpen(false);
    }
  };

  return (
    <>
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-2">
          <Label label="자유기재" htmlFor="freeNote" />
          <Input
            id="freeNote"
            name="freeNote"
            placeholder="면접 후기를 자유롭게 적어주세요."
            showCharCount={true}
            maxLength={500}
            value={data.freeNote}
            onChange={handleInputChange}
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label label="면접 결과" />
          <SelectPicker
            placeholder="결과 선택"
            value={INTERVIEW_STATUS_LABELS[data.interviewStatus] || ''}
            onClick={handleOpenDrawer}
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label label="회고 공개여부" />
          <ToggleGroup
            options={VISIBILITY_OPTIONS}
            selectedValue={String(data.isPublic)}
            onSelectionChange={handleVisibilityChange}
          />
        </div>
      </div>

      <BottomDrawer isOpen={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
        <BottomDrawerHandle />
        <BottomDrawerHeader
          title="면접 결과"
          onClose={() => setIsDrawerOpen(false)}
        />
        <BottomDrawerContent>
          {INTERVIEW_STATUS_OPTIONS.map(option => (
            <BottomDrawerItem
              key={option.id}
              item={{
                ...option,
                checked: tempInterviewStatus === option.id,
              }}
              onClick={() =>
                setTempInterviewStatus(option.id as InterviewStatus)
              }
            />
          ))}
        </BottomDrawerContent>
        <BottomDrawerFooter>
          <Button
            size="large"
            onClick={handleSave}
            disabled={!tempInterviewStatus}
          >
            저장
          </Button>
        </BottomDrawerFooter>
      </BottomDrawer>
    </>
  );
}
