'use client';

import { useState } from 'react';

import { Input } from '@/components/ui/Input';
import { SelectPicker } from '@/components/ui/SelectPicker';
import {
  BottomDrawer,
  BottomDrawerContent,
  BottomDrawerFooter,
  BottomDrawerHandle,
  BottomDrawerHeader,
  BottomDrawerItem,
  type DrawerItem,
} from '@/components/ui/Drawer';
import { Button } from '@/components/ui/Button';
import { Label } from '@/components/ui/Label';

import { useMemoirFormStore } from '../store/memoirFormStore';

const INTERVIEWER_OPTIONS: DrawerItem[] = [
  { id: '1', label: '일대일 면접' },
  { id: '2', label: '일대다 면접' },
  { id: '3', label: '다대일 면접' },
  { id: '4', label: '다대다 면접' },
];

export default function Step1Component() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const data = useMemoirFormStore(state => state.formData.step1);
  const updateStepData = useMemoirFormStore(state => state.updateStepData);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    updateStepData('step1', { ...data, [name]: value });
  };

  const handleInterviewerSelect = (option: DrawerItem) => {
    updateStepData('step1', { ...data, interviewerCount: option.label });
  };

  const handleSave = () => {
    setIsDrawerOpen(false);
  };

  const clearInput = (name: keyof typeof data) => {
    updateStepData('step1', { ...data, [name]: '' });
  };

  return (
    <>
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <Label label="기업명" />
            <span className="typo-subhead-02 text-primary-btn cursor-pointer">
              일정 불러오기
            </span>
          </div>
          <Input
            name="companyName"
            placeholder="기업명 입력"
            value={data.companyName}
            onChange={handleInputChange}
            onClear={
              data.companyName ? () => clearInput('companyName') : undefined
            }
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label label="직무" />
          <Input
            name="position"
            placeholder="직무 입력"
            value={data.position}
            onChange={handleInputChange}
            onClear={data.position ? () => clearInput('position') : undefined}
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label label="면접일시" />
          <Input
            name="interviewDate"
            placeholder="면접일시 입력"
            value={data.interviewDate}
            onChange={handleInputChange}
            onClear={
              data.interviewDate ? () => clearInput('interviewDate') : undefined
            }
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label label="면접구성" />
          <SelectPicker
            placeholder="면접관 수"
            value={data.interviewerCount}
            onClick={() => setIsDrawerOpen(true)}
          />
        </div>
      </div>

      <BottomDrawer isOpen={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
        <BottomDrawerHandle />

        <BottomDrawerHeader
          title="면접구성"
          onClose={() => setIsDrawerOpen(false)}
        />
        <BottomDrawerContent>
          {INTERVIEWER_OPTIONS.map(option => (
            <BottomDrawerItem
              key={option.id}
              item={{
                ...option,
                checked: data.interviewerCount === option.label,
              }}
              onClick={() => handleInterviewerSelect(option)}
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
