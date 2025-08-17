'use client';

import { type ReactNode, useState } from 'react';

import { Label } from '@/components/ui/Label';
import { Input } from '@/components/ui/Input';
import { ToggleGroup } from '@/components/ui/ToggleGroup';
import { SelectPicker } from '@/components/ui/picker/SelectPicker';
import { TimePicker, TimeValue } from '@/components/ui/picker/TimePicker';
import { DatePicker } from '@/components/ui/picker/DatePicker';
import { useGeneralMemoirFormStore } from '../store/generalMemoirFormStore';
import { formatDate, formatTime } from '@/utils/date';
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

import Title from './Title';

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

const INTERVIEW_STEP_OPTIONS = [
  { text: '1차 면접', id: 'first' },
  { text: '2차 면접', id: 'second' },
  { text: '최종 면접', id: 'final' },
  { text: '전화 면접', id: 'phone' },
];

const INTERVIEWER_OPTIONS: DrawerItem[] = [
  { id: '1', label: '일대일 면접' },
  { id: '2', label: '일대다 면접' },
  { id: '3', label: '다대일 면접' },
  { id: '4', label: '다대다 면접' },
];

const INTERVIEW_METHOD_OPTIONS: DrawerItem[] = [
  { id: 'in-person', label: '대면' },
  { id: 'remote', label: '비대면' },
];

const INTERVIEW_MOOD_OPTIONS: DrawerItem[] = [
  { id: 'pressuring', label: '압박되는' },
  { id: 'comfortable', label: '편안한' },
  { id: 'quiet', label: '조용한' },
  { id: 'sharp', label: '예리한' },
  { id: 'friendly', label: '친근한' },
];

type DrawerType =
  | 'interviewerCount'
  | 'interviewMethod'
  | 'interviewMood'
  | 'date'
  | 'time'
  | null;

const DRAWER_CONFIG = {
  interviewerCount: { title: '면접관 수', options: INTERVIEWER_OPTIONS },
  interviewMethod: { title: '면접 방식', options: INTERVIEW_METHOD_OPTIONS },
  interviewMood: { title: '면접 분위기', options: INTERVIEW_MOOD_OPTIONS },
};

export default function InterviewInfo() {
  const [activeDrawer, setActiveDrawer] = useState<DrawerType>(null);
  const [tempSelection, setTempSelection] = useState('');

  const data = useGeneralMemoirFormStore(state => state.formData.interviewInfo);
  const updateFormData = useGeneralMemoirFormStore(
    state => state.updateFormData,
  );

  const handleFieldChange = (
    field: keyof typeof data,
    value: string | TimeValue | Date,
  ) => {
    updateFormData('interviewInfo', { ...data, [field]: value });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFieldChange(e.target.name as keyof typeof data, e.target.value);
  };

  const handleToggleChange = (field: keyof typeof data, value: string) => {
    if (value) handleFieldChange(field, value);
  };

  const clearInput = (name: keyof typeof data) => {
    handleFieldChange(name, '');
  };

  const handleOpenDrawer = (drawerType: DrawerType, currentValue: string) => {
    setTempSelection(currentValue);
    setActiveDrawer(drawerType);
  };

  const handleSaveSelection = () => {
    if (!activeDrawer || activeDrawer === 'date' || activeDrawer === 'time')
      return;

    handleFieldChange(activeDrawer, tempSelection);
    setActiveDrawer(null);
  };

  const renderDrawerContent = () => {
    if (!activeDrawer) return null;

    if (activeDrawer === 'date') {
      return (
        <>
          <BottomDrawerHeader
            title="날짜 선택"
            onClose={() => setActiveDrawer(null)}
          />
          <DatePicker
            value={data.interviewDate ?? new Date()}
            onConfirm={date => {
              handleFieldChange('interviewDate', date);
              setActiveDrawer(null);
            }}
            onCancel={() => setActiveDrawer(null)}
          />
        </>
      );
    }

    if (activeDrawer === 'time') {
      return (
        <>
          <BottomDrawerHeader
            title="시간 선택"
            onClose={() => setActiveDrawer(null)}
          />
          <TimePicker
            value={data.interviewTime ?? undefined}
            onConfirm={time => {
              handleFieldChange('interviewTime', time);
              setActiveDrawer(null);
            }}
            onCancel={() => setActiveDrawer(null)}
          />
        </>
      );
    }

    const config = DRAWER_CONFIG[activeDrawer];
    if (!config) return null;

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
              item={{ ...option, checked: tempSelection === option.label }}
              onClick={() => setTempSelection(option.label)}
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
  };

  return (
    <section>
      <Title title="면접 정보" />
      <div className="flex flex-col gap-5">
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
            id="companyName"
            name="companyName"
            placeholder="기업명 입력"
            value={data.companyName}
            onChange={handleInputChange}
            onClear={
              data.companyName ? () => clearInput('companyName') : undefined
            }
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

        <FormField label="직무" htmlFor="position">
          <Input
            id="position"
            name="position"
            placeholder="직무선택"
            value={data.position}
            onChange={handleInputChange}
            onClear={data.position ? () => clearInput('position') : undefined}
          />
        </FormField>

        <FormField label="면접 유형">
          <ToggleGroup
            options={INTERVIEW_STEP_OPTIONS}
            selectedValue={data.interviewStep}
            onSelectionChange={value =>
              handleToggleChange('interviewStep', value)
            }
            className="flex-wrap"
          />
        </FormField>

        <FormField label="면접 구성">
          <div className="flex flex-col gap-2">
            <SelectPicker
              placeholder="면접관 수"
              value={data.interviewerCount}
              onClick={() =>
                handleOpenDrawer('interviewerCount', data.interviewerCount)
              }
            />
            <SelectPicker
              placeholder="면접 방식"
              value={data.interviewMethod}
              onClick={() =>
                handleOpenDrawer('interviewMethod', data.interviewMethod)
              }
            />
            <SelectPicker
              placeholder="면접 분위기"
              value={data.interviewMood}
              onClick={() =>
                handleOpenDrawer('interviewMood', data.interviewMood)
              }
            />
          </div>
        </FormField>
      </div>

      <BottomDrawer
        isOpen={activeDrawer !== null}
        onOpenChange={open => !open && setActiveDrawer(null)}
      >
        <BottomDrawerHandle />
        {renderDrawerContent()}
      </BottomDrawer>
    </section>
  );
}
