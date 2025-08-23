'use client';

import { useState } from 'react';

import { Label } from '@/components/ui/Label';
import { ToggleGroup } from '@/components/ui/ToggleGroup';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Title } from '@/components/ui/Title';
import { SelectPicker } from '@/components/ui/picker/SelectPicker';
import {
  BottomDrawer,
  BottomDrawerContent,
  BottomDrawerFooter,
  BottomDrawerHandle,
  BottomDrawerHeader,
  BottomDrawerItem,
} from '@/components/ui/Drawer';
import {
  INTERVIEW_STATUS,
  SATISFACTION_NOTE,
  INTERVIEW_LEVEL,
} from '@/constants/code';
import {
  INTERVIEW_STATUS_LABELS,
  SATISFACTION_NOTE_LABELS,
  INTERVIEW_LEVEL_LABELS,
} from '@/constants/labels';
import { createOptionsArray, createToggleOptions } from '@/utils/options';
import type { InterviewStatus } from '@/types/memoirTypes';

import { useGeneralMemoirFormStore } from '../store/generalMemoirFormStore';

const INTERVIEW_STATUS_OPTIONS = createOptionsArray(
  INTERVIEW_STATUS,
  INTERVIEW_STATUS_LABELS,
);
const SATISFACTION_NOTE_OPTIONS = createToggleOptions(
  SATISFACTION_NOTE,
  SATISFACTION_NOTE_LABELS,
);
const INTERVIEW_LEVEL_OPTIONS = createToggleOptions(
  INTERVIEW_LEVEL,
  INTERVIEW_LEVEL_LABELS,
);

const VISIBILITY_OPTIONS = [
  { text: '비공개', id: 'false' },
  { text: '공개', id: 'true' },
];

export default function InterviewReview() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [tempInterviewStatus, setTempInterviewStatus] = useState<
    InterviewStatus | ''
  >('');

  const data = useGeneralMemoirFormStore(
    state => state.formData.interviewReview,
  );
  const updateFormData = useGeneralMemoirFormStore(
    state => state.updateFormData,
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateFormData('interviewReview', {
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const clearInput = (name: keyof typeof data) => {
    updateFormData('interviewReview', {
      ...data,
      [name]: '',
    });
  };

  const handleToggleChange = (field: keyof typeof data, value: string) => {
    if (field === 'isPublic') {
      updateFormData('interviewReview', {
        ...data,
        isPublic: value === 'true',
      });
    } else if (value) {
      updateFormData('interviewReview', { ...data, [field]: value });
    }
  };

  const handleOpenDrawer = () => {
    setTempInterviewStatus(data.interviewStatus);
    setIsDrawerOpen(true);
  };

  const handleSave = () => {
    if (tempInterviewStatus) {
      updateFormData('interviewReview', {
        ...data,
        interviewStatus: tempInterviewStatus,
      });
    }
    setIsDrawerOpen(false);
  };

  return (
    <section>
      <Title title="면접 후기" />
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          <Label label="난이도" />
          <ToggleGroup
            options={INTERVIEW_LEVEL_OPTIONS}
            selectedValue={data.interviewLevel}
            onSelectionChange={value =>
              handleToggleChange('interviewLevel', value)
            }
            className="flex-wrap"
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label label="만족도" />
          <ToggleGroup
            options={SATISFACTION_NOTE_OPTIONS}
            selectedValue={data.satisfactionNote}
            onSelectionChange={value =>
              handleToggleChange('satisfactionNote', value)
            }
            className="flex-wrap"
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label label="자유기재" htmlFor="freeNote" />
          <Input
            id="freeNote"
            name="freeNote"
            placeholder="면접 후기를 자유롭게 적어주세요."
            maxLength={500}
            showCharCount={true}
            value={data.freeNote}
            onChange={handleInputChange}
            onClear={data.freeNote ? () => clearInput('freeNote') : undefined}
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label label="면접 결과" />
          <SelectPicker
            placeholder="결과 분류"
            value={INTERVIEW_STATUS_LABELS[data.interviewStatus] || ''}
            onClick={handleOpenDrawer}
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label label="회고 공개여부" />
          <ToggleGroup
            options={VISIBILITY_OPTIONS}
            selectedValue={String(data.isPublic)}
            onSelectionChange={value => handleToggleChange('isPublic', value)}
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
              item={{ ...option, checked: tempInterviewStatus === option.id }}
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
    </section>
  );
}
