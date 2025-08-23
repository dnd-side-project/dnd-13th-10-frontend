'use client';

import { type ReactNode, useState } from 'react';

import { Label } from '@/components/ui/Label';
import { Input } from '@/components/ui/Input';
import { ToggleGroup } from '@/components/ui/ToggleGroup';
import { SelectPicker } from '@/components/ui/picker/SelectPicker';
import { TimePicker, TimeValue } from '@/components/ui/picker/TimePicker';
import { DatePicker } from '@/components/ui/picker/DatePicker';
import { Button } from '@/components/ui/Button';
import { Title } from '@/components/ui/Title';
import {
  BottomDrawer,
  BottomDrawerContent,
  BottomDrawerFooter,
  BottomDrawerHandle,
  BottomDrawerHeader,
  BottomDrawerItem,
} from '@/components/ui/Drawer';
import {
  INTERVIEW_FORMAT,
  INTERVIEW_METHOD,
  INTERVIEW_MOOD,
  INTERVIEW_STEP,
  POSITION,
} from '@/constants/code';
import {
  INTERVIEW_FORMAT_LABELS,
  INTERVIEW_METHOD_LABELS,
  INTERVIEW_MOOD_LABELS,
  INTERVIEW_STEP_LABELS,
  POSITION_LABELS,
} from '@/constants/labels';
import { formatDate, formatTime } from '@/utils/date';
import { createOptionsArray, createToggleOptions } from '@/utils/options';

import { useGeneralMemoirFormStore } from '../store/generalMemoirFormStore';

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

const INTERVIEW_STEP_OPTIONS = createToggleOptions(
  INTERVIEW_STEP,
  INTERVIEW_STEP_LABELS,
);
const INTERVIEWER_OPTIONS = createOptionsArray(
  INTERVIEW_FORMAT,
  INTERVIEW_FORMAT_LABELS,
);
const INTERVIEW_METHOD_OPTIONS = createOptionsArray(
  INTERVIEW_METHOD,
  INTERVIEW_METHOD_LABELS,
);
const INTERVIEW_MOOD_OPTIONS = createOptionsArray(
  INTERVIEW_MOOD,
  INTERVIEW_MOOD_LABELS,
);
const POSITION_OPTIONS = createOptionsArray(POSITION, POSITION_LABELS);

type DrawerType = keyof typeof DRAWER_CONFIG | 'date' | 'time' | null;

const DRAWER_CONFIG = {
  position: { title: '직무 선택', options: POSITION_OPTIONS },
  interviewFormat: { title: '면접관 수', options: INTERVIEWER_OPTIONS },
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

    handleFieldChange(activeDrawer as keyof typeof data, tempSelection);
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
          <SelectPicker
            placeholder="직무 선택"
            value={POSITION_LABELS[data.position] || ''}
            onClick={() => handleOpenDrawer('position', data.position)}
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
              value={INTERVIEW_FORMAT_LABELS[data.interviewFormat] || ''}
              onClick={() =>
                handleOpenDrawer('interviewFormat', data.interviewFormat)
              }
            />
            <SelectPicker
              placeholder="면접 방식"
              value={INTERVIEW_METHOD_LABELS[data.interviewMethod] || ''}
              onClick={() =>
                handleOpenDrawer('interviewMethod', data.interviewMethod)
              }
            />
            <SelectPicker
              placeholder="면접 분위기"
              value={INTERVIEW_MOOD_LABELS[data.interviewMood] || ''}
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
