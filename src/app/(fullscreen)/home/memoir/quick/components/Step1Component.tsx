'use client';

import { useState } from 'react';

import { Input } from '@/components/ui/Input';
import { SelectPicker } from '@/components/ui/picker2/SelectPicker';
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
import { TimePicker, type TimeValue } from '@/components/ui/picker2/TimePicker';
import { DatePicker } from '@/components/ui/picker2/DatePicker';
import { formatDate, formatTime } from '@/utils/date';

import { useMemoirFormStore } from '../store/memoirFormStore';

const INTERVIEWER_OPTIONS: DrawerItem[] = [
  { id: '1', label: '일대일 면접' },
  { id: '2', label: '일대다 면접' },
  { id: '3', label: '다대일 면접' },
  { id: '4', label: '다대다 면접' },
];

export default function Step1Component() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [isTimePickerOpen, setIsTimePickerOpen] = useState(false);
  const [tempInterviewerCount, setTempInterviewerCount] = useState('');

  const data = useMemoirFormStore(state => state.formData.step1);
  const updateStepData = useMemoirFormStore(state => state.updateStepData);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    updateStepData('step1', { ...data, [name]: value });
  };

  const handleDateConfirm = (date: Date) => {
    updateStepData('step1', { ...data, interviewDate: date });
    setIsDatePickerOpen(false);
  };

  const handleTimeConfirm = (time: TimeValue) => {
    updateStepData('step1', { ...data, interviewTime: time });
    setIsTimePickerOpen(false);
  };

  const handleOpenDrawer = () => {
    setTempInterviewerCount(data.interviewerCount);
    setIsDrawerOpen(true);
  };

  const handleSave = () => {
    updateStepData('step1', {
      ...data,
      interviewerCount: tempInterviewerCount,
    });
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
            <Label label="기업명" htmlFor="companyName" />
            <span className="typo-subhead-02 text-primary-btn cursor-pointer">
              일정 불러오기
            </span>
          </div>
          <Input
            id="companyName"
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
          <Label label="직무" htmlFor="position" />
          <Input
            id="position"
            name="position"
            placeholder="직무 입력"
            value={data.position}
            onChange={handleInputChange}
            onClear={data.position ? () => clearInput('position') : undefined}
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label label="면접일시" htmlFor="interviewDate" />
          <div className="grid grid-cols-2 gap-2">
            <Input
              readOnly
              placeholder="날짜 선택"
              value={formatDate(data.interviewDate)}
              onClick={() => setIsDatePickerOpen(true)}
              inputClassName="cursor-pointer text-center w-full"
            />
            <Input
              readOnly
              placeholder="시간 선택"
              value={formatTime(data.interviewTime)}
              onClick={() => setIsTimePickerOpen(true)}
              inputClassName="cursor-pointer w-full text-center"
            />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <Label label="면접구성" />
          <SelectPicker
            placeholder="면접관 수"
            value={data.interviewerCount}
            onClick={handleOpenDrawer}
          />
        </div>
      </div>

      <BottomDrawer
        isOpen={isDatePickerOpen}
        onOpenChange={setIsDatePickerOpen}
      >
        <BottomDrawerHandle />
        <BottomDrawerHeader
          title="날짜 선택"
          onClose={() => setIsDatePickerOpen(false)}
        />
        <DatePicker
          value={data.interviewDate ?? new Date()}
          onConfirm={handleDateConfirm}
          onCancel={() => setIsDatePickerOpen(false)}
        />
      </BottomDrawer>

      <BottomDrawer
        isOpen={isTimePickerOpen}
        onOpenChange={setIsTimePickerOpen}
      >
        <BottomDrawerHandle />
        <BottomDrawerHeader
          title="시간 선택"
          onClose={() => setIsTimePickerOpen(false)}
        />
        <TimePicker
          value={data.interviewTime ?? undefined}
          onConfirm={handleTimeConfirm}
          onCancel={() => setIsTimePickerOpen(false)}
        />
      </BottomDrawer>

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
                checked: tempInterviewerCount === option.label,
              }}
              onClick={() => setTempInterviewerCount(option.label)}
            />
          ))}
        </BottomDrawerContent>

        <BottomDrawerFooter>
          <Button
            size="large"
            onClick={handleSave}
            disabled={!tempInterviewerCount}
          >
            저장
          </Button>
        </BottomDrawerFooter>
      </BottomDrawer>
    </>
  );
}
