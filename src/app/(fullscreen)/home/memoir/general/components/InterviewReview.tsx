'use client';

import { useState } from 'react';

import { Label } from '@/components/ui/Label';
import { ToggleGroup } from '@/components/ui/ToggleGroup';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { SelectPicker } from '@/components/ui/picker/SelectPicker';
import {
  BottomDrawer,
  BottomDrawerContent,
  BottomDrawerFooter,
  BottomDrawerHandle,
  BottomDrawerHeader,
  BottomDrawerItem,
  type DrawerItem,
} from '@/components/ui/Drawer';

import Title from './Title';
import { useGeneralMemoirFormStore } from '../store/generalMemoirFormStore';

const INTERVIEW_LEVEL = [
  { text: '매우 쉬움', id: 'very_easy' },
  { text: '쉬움', id: 'easy' },
  { text: '보통', id: 'normal' },
  { text: '어려움', id: 'hard' },
  { text: '매우 어려움', id: 'very_hard' },
];

const SATISFACTION_NOTE = [
  { text: '만족', id: 'satisfied' },
  { text: '보통', id: 'neutral' },
  { text: '불만족', id: 'dissatisfied' },
];

const INTERVIEW_STATUS: DrawerItem[] = [
  { label: '합격', id: 'pass' },
  { label: '불합격', id: 'fail' },
  { label: '결과 대기중', id: 'pending' },
];

const VISIBILITY_OPTIONS = [
  { text: '비공개', id: 'private' },
  { text: '공개', id: 'public' },
];

export default function InterviewReview() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [tempInterviewStatus, setTempInterviewStatus] = useState('');

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

  const handleFieldChange = (field: keyof typeof data, value: string) => {
    updateFormData('interviewReview', { ...data, [field]: value });
  };

  const handleOpenDrawer = () => {
    setTempInterviewStatus(data.interviewStatus);
    setIsDrawerOpen(true);
  };

  const handleSave = () => {
    updateFormData('interviewReview', {
      ...data,
      interviewStatus: tempInterviewStatus,
    });
    setIsDrawerOpen(false);
  };

  return (
    <section>
      <Title title="면접 후기" />
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          <Label label="난이도" />
          <ToggleGroup
            options={INTERVIEW_LEVEL}
            selectedValue={data.interviewLevel}
            onSelectionChange={value =>
              updateFormData('interviewReview', {
                ...data,
                interviewLevel: value,
              })
            }
            className="flex-wrap"
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label label="만족도" />
          <ToggleGroup
            options={SATISFACTION_NOTE}
            selectedValue={data.satisfactionNote}
            onSelectionChange={value =>
              updateFormData('interviewReview', {
                ...data,
                satisfactionNote: value,
              })
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
            value={data.interviewStatus}
            onClick={handleOpenDrawer}
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label label="회고 공개여부" />
          <ToggleGroup
            options={VISIBILITY_OPTIONS}
            selectedValue={data.visibility}
            onSelectionChange={value =>
              value && handleFieldChange('visibility', value)
            }
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
          {INTERVIEW_STATUS.map(option => (
            <BottomDrawerItem
              key={option.id}
              item={{
                ...option,
                checked: tempInterviewStatus === option.label,
              }}
              onClick={() => setTempInterviewStatus(option.label)}
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
