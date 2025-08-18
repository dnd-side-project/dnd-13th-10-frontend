'use client';

import { useState } from 'react';

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
import { INTERVIEW_MOOD, SATISFACTION_NOTE } from '@/constants/code';
import {
  INTERVIEW_MOOD_LABELS,
  SATISFACTION_NOTE_LABELS,
} from '@/constants/labels';
import { createOptionsArray, createToggleOptions } from '@/utils/options';
import type { InterviewMood, SatisfactionNote } from '@/types/memoirTypes';

import { useMemoirFormStore } from '../store/memoirFormStore';

const INTERVIEW_MOOD_OPTIONS = createOptionsArray(
  INTERVIEW_MOOD,
  INTERVIEW_MOOD_LABELS,
);
const SATISFACTION_LEVELS_OPTIONS = createToggleOptions(
  SATISFACTION_NOTE,
  SATISFACTION_NOTE_LABELS,
);

export default function Step2Component() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [tempInterviewMood, setTempInterviewMood] = useState<
    InterviewMood | ''
  >('');

  const data = useMemoirFormStore(state => state.formData.step2);
  const updateStepData = useMemoirFormStore(state => state.updateStepData);

  const handleSatisfactionChange = (value: string) => {
    if (value) {
      updateStepData('step2', {
        ...data,
        satisfactionNote: value as SatisfactionNote,
      });
    }
  };

  const handleOpenDrawer = () => {
    setTempInterviewMood(data.interviewMood);
    setIsDrawerOpen(true);
  };

  const handleSave = () => {
    if (tempInterviewMood) {
      updateStepData('step2', {
        ...data,
        interviewMood: tempInterviewMood as InterviewMood,
      });
      setIsDrawerOpen(false);
    }
  };

  return (
    <>
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-2">
          <Label label="면접 분위기" />
          <SelectPicker
            placeholder="면접 분위기"
            value={INTERVIEW_MOOD_LABELS[data.interviewMood] || ''}
            onClick={handleOpenDrawer}
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label label="면접 만족도" />
          <ToggleGroup
            options={SATISFACTION_LEVELS_OPTIONS}
            className="flex-wrap"
            selectedValue={data.satisfactionNote}
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
                checked: tempInterviewMood === option.id,
              }}
              onClick={() => setTempInterviewMood(option.id as InterviewMood)}
            />
          ))}
        </BottomDrawerContent>

        <BottomDrawerFooter>
          <Button
            size="large"
            onClick={handleSave}
            disabled={!tempInterviewMood}
          >
            저장
          </Button>
        </BottomDrawerFooter>
      </BottomDrawer>
    </>
  );
}
