'use client';

import { ReactNode, useState } from 'react';

import { Input } from '@/components/ui/Input';
import { SelectPicker } from '@/components/ui/picker/SelectPicker';
import {
  BottomDrawer,
  BottomDrawerContent,
  BottomDrawerFooter,
  BottomDrawerHandle,
  BottomDrawerHeader,
  BottomDrawerItem,
} from '@/components/ui/Drawer';
import { Button } from '@/components/ui/Button';
import { Label } from '@/components/ui/Label';
import { TimePicker, type TimeValue } from '@/components/ui/picker/TimePicker';
import { DatePicker } from '@/components/ui/picker/DatePicker';
import { formatDate, formatTime } from '@/utils/date';
import { createOptionsArray } from '@/utils/options';
import { INTERVIEW_FORMAT, POSITION } from '@/constants/code';
import { INTERVIEW_FORMAT_LABELS, POSITION_LABELS } from '@/constants/labels';

import { useMemoirFormStore } from '../store/memoirFormStore';

function FormField({
  label,
  htmlFor,
  action,
  children,
}: {
  label: string;
  htmlFor?: string;
  action?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <Label label={label} htmlFor={htmlFor} />
        {action}
      </div>
      {children}
    </div>
  );
}

const INTERVIEW_FORMAT_OPTIONS = createOptionsArray(
  INTERVIEW_FORMAT,
  INTERVIEW_FORMAT_LABELS,
);
const POSITION_OPTIONS = createOptionsArray(POSITION, POSITION_LABELS);

type DrawerType = 'position' | 'interviewFormat' | 'date' | 'time' | null;

const DRAWER_CONFIG = {
  position: { title: '직무 선택', options: POSITION_OPTIONS },
  interviewFormat: { title: '면접 구성', options: INTERVIEW_FORMAT_OPTIONS },
};

export default function Step1Component() {
  const [activeDrawer, setActiveDrawer] = useState<DrawerType>(null);
  const [tempSelection, setTempSelection] = useState('');

  const data = useMemoirFormStore(state => state.formData.step1);
  const updateStepData = useMemoirFormStore(state => state.updateStepData);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    updateStepData('step1', { ...data, [name]: value });
  };

  const handleOpenDrawer = (drawerType: DrawerType, currentCode: string) => {
    setTempSelection(currentCode);
    setActiveDrawer(drawerType);
  };

  const handleDateConfirm = (date: Date) => {
    updateStepData('step1', { ...data, interviewDate: date });
    setActiveDrawer(null);
  };

  const handleTimeConfirm = (time: TimeValue) => {
    updateStepData('step1', { ...data, interviewTime: time });
    setActiveDrawer(null);
  };

  const handleSaveSelection = () => {
    if (!activeDrawer || activeDrawer === 'date' || activeDrawer === 'time')
      return;
    updateStepData('step1', { ...data, [activeDrawer]: tempSelection });
    setActiveDrawer(null);
  };

  const clearInput = (name: keyof typeof data) => {
    const value =
      name === 'interviewDate' || name === 'interviewTime' ? null : '';
    updateStepData('step1', { ...data, [name]: value });
  };

  const renderDrawerContent = () => {
    switch (activeDrawer) {
      case 'date':
        return (
          <>
            <BottomDrawerHeader
              title="날짜 선택"
              onClose={() => setActiveDrawer(null)}
            />
            <DatePicker
              value={data.interviewDate ?? new Date()}
              onConfirm={handleDateConfirm}
              onCancel={() => setActiveDrawer(null)}
            />
          </>
        );
      case 'time':
        return (
          <>
            <BottomDrawerHeader
              title="시간 선택"
              onClose={() => setActiveDrawer(null)}
            />
            <TimePicker
              value={data.interviewTime ?? undefined}
              onConfirm={handleTimeConfirm}
              onCancel={() => setActiveDrawer(null)}
            />
          </>
        );
      case 'position':
      case 'interviewFormat': {
        const config = DRAWER_CONFIG[activeDrawer];
        return (
          <>
            <BottomDrawerHeader
              title={config.title}
              onClose={() => setActiveDrawer(null)}
            />
            <BottomDrawerContent>
              {config.options.map(option => (
                <BottomDrawerItem
                  key={option.id}
                  item={{ ...option, checked: tempSelection === option.id }}
                  onClick={() => setTempSelection(option.id)}
                />
              ))}
            </BottomDrawerContent>
            <BottomDrawerFooter>
              <Button
                size="large"
                onClick={handleSaveSelection}
                disabled={!tempSelection}
              >
                저장
              </Button>
            </BottomDrawerFooter>
          </>
        );
      }
      default:
        return null;
    }
  };

  return (
    <>
      <div className="flex flex-col gap-8">
        <FormField
          label="기업명"
          htmlFor="companyName"
          action={
            <span className="typo-subhead-02 text-primary-btn cursor-pointer">
              일정 불러오기
            </span>
          }
        >
          <Input
            name="companyName"
            placeholder="기업명 입력"
            value={data.companyName}
            onChange={handleInputChange}
            onClear={
              data.companyName ? () => clearInput('companyName') : undefined
            }
          />
        </FormField>

        <FormField label="직무">
          <SelectPicker
            placeholder="직무 선택"
            value={POSITION_LABELS[data.position] || ''}
            onClick={() => handleOpenDrawer('position', data.position)}
          />
        </FormField>

        <FormField label="면접일시">
          <div className="grid grid-cols-2 gap-2">
            <Input
              readOnly
              placeholder="날짜 선택"
              value={formatDate(data.interviewDate)}
              onClick={() => setActiveDrawer('date')}
              inputClassName="cursor-pointer text-center w-full"
            />
            <Input
              readOnly
              placeholder="시간 선택"
              value={formatTime(data.interviewTime)}
              onClick={() => setActiveDrawer('time')}
              inputClassName="cursor-pointer text-center w-full"
            />
          </div>
        </FormField>

        <FormField label="면접구성">
          <SelectPicker
            placeholder="면접관 수"
            value={INTERVIEW_FORMAT_LABELS[data.interviewFormat] || ''}
            onClick={() =>
              handleOpenDrawer('interviewFormat', data.interviewFormat)
            }
          />
        </FormField>
      </div>

      <BottomDrawer
        isOpen={activeDrawer !== null}
        onOpenChange={open => !open && setActiveDrawer(null)}
      >
        <BottomDrawerHandle />
        {renderDrawerContent()}
      </BottomDrawer>
    </>
  );
}
