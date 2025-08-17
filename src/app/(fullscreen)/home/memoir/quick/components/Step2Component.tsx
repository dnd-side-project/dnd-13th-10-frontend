'use client';

import { useState } from 'react';

import { SelectPicker } from '@/components/ui/SelectPicker';
import { ToggleGroup } from '@/components/ui/ToggleGroup';
import { Label } from '@/components/ui/Label';
import {
  BottomDrawer,
  BottomDrawerContent,
  BottomDrawerFooter,
  BottomDrawerHandle,
  BottomDrawerHeader,
  BottomDrawerItem,
  type DrawerItem,
} from '@/components/ui/Drawer';
import { useMemoirFormStore } from '../store/memoirFormStore';
import { Button } from '@/components/ui/Button';

const INTERVIEW_MOOD_OPTIONS: DrawerItem[] = [
  { id: 'pressuring', label: '압박되는' },
  { id: 'comfortable', label: '편안한' },
  { id: 'quiet', label: '조용한' },
  { id: 'sharp', label: '예리한' },
  { id: 'friendly', label: '친근한' },
];

const SATISFACTION_LEVELS = [
  { text: '매우 불만족', id: 'very_dissatisfied' },
  { text: '불만족', id: 'dissatisfied' },
  { text: '보통', id: 'neutral' },
  { text: '만족', id: 'satisfied' },
  { text: '매우 만족', id: 'very_satisfied' },
];

export default function Step2Component() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [tempInterviewMood, setTempInterviewMood] = useState('');

  const data = useMemoirFormStore(state => state.formData.step2);
  const updateStepData = useMemoirFormStore(state => state.updateStepData);

  const handleSatisfactionChange = (value: string) => {
    if (value) {
      updateStepData('step2', { ...data, satisfaction: value });
    }
  };

  const handleOpenDrawer = () => {
    setTempInterviewMood(data.interviewMood);
    setIsDrawerOpen(true);
  };

  const handleSave = () => {
    updateStepData('step2', { ...data, interviewMood: tempInterviewMood });
    setIsDrawerOpen(false);
  };

  return (
    <>
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-2">
          <Label label="면접 분위기" />
          <SelectPicker
            placeholder="면접 분위기"
            value={data.interviewMood}
            onClick={handleOpenDrawer}
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label label="면접 만족도" />
          <ToggleGroup
            options={SATISFACTION_LEVELS}
            className="flex-wrap"
            selectedValue={data.satisfaction}
            onSelectionChange={handleSatisfactionChange}
          />
        </div>
      </div>

      <BottomDrawer isOpen={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
        <BottomDrawerHandle />
        <BottomDrawerHeader
          title="면접 분위기"
          onClose={() => setIsDrawerOpen(false)}
        />
        <BottomDrawerContent>
          {INTERVIEW_MOOD_OPTIONS.map(option => (
            <BottomDrawerItem
              key={option.id}
              item={{
                ...option,
                checked: tempInterviewMood === option.label,
              }}
              onClick={() => setTempInterviewMood(option.label)}
            />
          ))}
        </BottomDrawerContent>

        <BottomDrawerFooter>
          <Button size="large" onClick={handleSave}>
            저장
          </Button>
        </BottomDrawerFooter>
      </BottomDrawer>
    </>
  );
}
