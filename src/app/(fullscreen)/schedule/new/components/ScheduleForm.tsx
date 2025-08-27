'use client';

import { type ReactNode, useState } from 'react';

import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { SelectPicker } from '@/components/ui/picker/SelectPicker';
import { ToggleGroup } from '@/components/ui/ToggleGroup';
import { Button } from '@/components/ui/Button';
import { DatePicker } from '@/components/ui/picker/DatePicker';
import { TimePicker, type TimeValue } from '@/components/ui/picker/TimePicker';
import {
  BottomDrawer,
  BottomDrawerContent,
  BottomDrawerFooter,
  BottomDrawerHandle,
  BottomDrawerHeader,
  BottomDrawerItem,
} from '@/components/ui/Drawer';
import { INTERVIEW_STEP, POSITION } from '@/constants/code';
import { INTERVIEW_STEP_LABELS, POSITION_LABELS } from '@/constants/labels';
import { createOptionsArray, createToggleOptions } from '@/utils/options';
import { formatDate, formatTime, convertISOToTimeValue } from '@/utils/date';

import { useScheduleFormStore } from '../store/scheduleFormStore';

type DrawerType = keyof typeof DRAWER_CONFIG | 'date' | 'time' | null;

const INTERVIEW_STEP_OPTIONS = createToggleOptions(
  INTERVIEW_STEP,
  INTERVIEW_STEP_LABELS,
);
const POSITION_OPTIONS = createOptionsArray(POSITION, POSITION_LABELS);

const DRAWER_CONFIG = {
  position: { title: '직무 선택', options: POSITION_OPTIONS },
};

function FormField({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <Label label={label} />
      {children}
    </div>
  );
}

export default function ScheduleForm() {
  const [activeDrawer, setActiveDrawer] = useState<DrawerType>(null);
  const [tempSelection, setTempSelection] = useState<string>('');
  const { formData, updateFormData } = useScheduleFormStore();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateFormData(e.target.name as keyof typeof formData, e.target.value);
  };

  const handleToggleChange = (value: string) => {
    if (value) {
      updateFormData('interviewStep', value);
    }
  };

  const handleOpenDrawer = (drawerType: DrawerType, currentValue: string) => {
    setTempSelection(currentValue);
    setActiveDrawer(drawerType);
  };

  const handleSaveSelection = () => {
    if (!activeDrawer || activeDrawer === 'date' || activeDrawer === 'time')
      return;
    updateFormData(activeDrawer, tempSelection);
    setActiveDrawer(null);
  };

  const handleDateConfirm = (newDate: Date) => {
    const newDateTime = new Date(newDate);
    if (formData.interviewDateTime) {
      const oldTime = new Date(formData.interviewDateTime);
      newDateTime.setHours(oldTime.getHours(), oldTime.getMinutes());
    }
    updateFormData('interviewDateTime', newDateTime.toISOString());
    setActiveDrawer(null);
  };

  const handleTimeConfirm = (newTime: TimeValue) => {
    const newDateTime = formData.interviewDateTime
      ? new Date(formData.interviewDateTime)
      : new Date();
    let hour24 = newTime.hour;
    if (newTime.meridiem === '오후' && hour24 < 12) {
      hour24 += 12;
    }
    if (newTime.meridiem === '오전' && hour24 === 12) {
      hour24 = 0;
    }
    newDateTime.setHours(hour24, newTime.minute);
    updateFormData('interviewDateTime', newDateTime.toISOString());
    setActiveDrawer(null);
  };

  const dateValue = formData.interviewDateTime
    ? new Date(formData.interviewDateTime)
    : null;
  const timeValue = dateValue
    ? convertISOToTimeValue(formData.interviewDateTime)
    : null;
  const positionLabel =
    POSITION_OPTIONS.find(opt => opt.id === formData.position)?.label || '';

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
            value={
              formData.interviewDateTime
                ? new Date(formData.interviewDateTime)
                : new Date()
            }
            onConfirm={handleDateConfirm}
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
            value={convertISOToTimeValue(formData.interviewDateTime)}
            onConfirm={handleTimeConfirm}
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
  };

  return (
    <section className="flex flex-col gap-8">
      <FormField label="기업명">
        <Input
          name="companyName"
          placeholder="기업명을 입력해 주세요."
          value={formData.companyName}
          onChange={handleInputChange}
          onClear={() => updateFormData('companyName', '')}
        />
      </FormField>

      <FormField label="직무">
        <SelectPicker
          placeholder="직무를 선택해 주세요."
          value={positionLabel}
          onClick={() => handleOpenDrawer('position', formData.position)}
        />
      </FormField>

      <FormField label="면접일시">
        <div className="grid grid-cols-2 gap-2">
          <Input
            readOnly
            placeholder="날짜 선택"
            value={formatDate(dateValue) || ''}
            onClick={() => setActiveDrawer('date')}
            inputClassName="cursor-pointer text-center w-full"
          />
          <Input
            readOnly
            placeholder="시간 선택"
            value={formatTime(timeValue ?? null) || ''}
            onClick={() => setActiveDrawer('time')}
            inputClassName="cursor-pointer text-center w-full"
          />
        </div>
      </FormField>

      <FormField label="면접장소">
        <Input
          name="location"
          placeholder="면접장소를 입력해 주세요."
          value={formData.location}
          onChange={handleInputChange}
          onClear={() => updateFormData('location', '')}
        />
      </FormField>

      <FormField label="면접유형">
        <ToggleGroup
          options={INTERVIEW_STEP_OPTIONS}
          selectedValue={formData.interviewStep}
          onSelectionChange={handleToggleChange}
        />
      </FormField>

      <BottomDrawer
        isOpen={activeDrawer !== null}
        onOpenChange={isOpen => !isOpen && setActiveDrawer(null)}
      >
        <BottomDrawerHandle />
        {renderDrawerContent()}
      </BottomDrawer>
    </section>
  );
}
