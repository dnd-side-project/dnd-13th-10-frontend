import { useState } from 'react';

import { Input } from '@/components/ui/Input';
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

const RESULT_OPTIONS: DrawerItem[] = [
  { id: 'pass', label: '합격' },
  { id: 'fail', label: '불합격' },
  { id: 'pending', label: '결과 대기중' },
];

const VISIBILITY_OPTIONS = [
  { text: '비공개', id: 'private' },
  { text: '공개', id: 'public' },
];

export default function Step4Component() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const data = useMemoirFormStore(state => state.formData.step4);
  const updateStepData = useMemoirFormStore(state => state.updateStepData);

  const handleFieldChange = (field: keyof typeof data, value: string) => {
    updateStepData('step4', { ...data, [field]: value });
  };

  const handleResultSelect = (option: DrawerItem) => {
    handleFieldChange('result', option.label);
  };

  const handleSave = () => {
    setIsDrawerOpen(false);
  };

  return (
    <>
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-2">
          <Label label="자유기재" />
          <Input
            placeholder="면접 후기를 자유롭게 적어주세요."
            showCharCount={true}
            maxLength={500}
            value={data.notes}
            onChange={e => handleFieldChange('notes', e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label label="면접 결과" />
          <SelectPicker
            placeholder="결과 선택"
            value={data.result}
            onClick={() => setIsDrawerOpen(true)}
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
          {RESULT_OPTIONS.map(option => (
            <BottomDrawerItem
              key={option.id}
              item={{
                ...option,
                checked: data.result === option.label,
              }}
              onClick={() => handleResultSelect(option)}
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
