import { useEffect, useState } from 'react';
import { WheelColumnConfig, WheelPicker } from './Picker';
import { clamp, range } from './utils';
import { Button } from '../Button';

export const MERIDIEMS = ['오전', '오후'] as const;
export type Meridiem = (typeof MERIDIEMS)[number];
type TimeItem = Meridiem | number;

export type TimeValue = {
  meridiem: Meridiem;
  hour: number;
  minute: number;
};

interface TimePickerProps {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  value?: TimeValue; // { meridiem: "오전"|"오후", hour:1..12, minute:0..59 }
  onConfirm: (v: TimeValue) => void;
  onCancel?: () => void;
}

export function TimePicker({
  open,
  onOpenChange,
  value,
  onConfirm,
  onCancel,
}: TimePickerProps) {
  const init = value ?? { meridiem: '오전', hour: 10, minute: 30 };
  const [mer, setMer] = useState<'오전' | '오후'>(init.meridiem);
  const [h, setH] = useState<number>(init.hour);
  const [mi, setMi] = useState<number>(init.minute);

  useEffect(() => {
    if (!value) return;
    setMer(value.meridiem);
    setH(value.hour);
    setMi(value.minute);
  }, [value]);

  const mers = MERIDIEMS;
  const hours = range(1, 12);
  const minutes = range(0, 59);

  const merIdx = mers.indexOf(mer);
  const hIdx = clamp(hours.indexOf(h), 0, hours.length - 1);
  const mIdx = clamp(minutes.indexOf(mi), 0, minutes.length - 1);

  const columns: ReadonlyArray<WheelColumnConfig<TimeItem>> = [
    {
      items: mers, // readonly ['오전','오후']
      selectedIndex: merIdx,
      onChangeIndex: (i: number) => setMer(mers[i]), // i에 :number
      format: (v: TimeItem) => String(v), // 유니온 처리
    },
    {
      items: hours,
      selectedIndex: hIdx,
      onChangeIndex: (i: number) => setH(hours[i]),
      format: (v: TimeItem) => String(v), // `${v}` 동일
    },
    {
      items: minutes,
      selectedIndex: mIdx,
      onChangeIndex: (i: number) => setMi(minutes[i]),
      format: (v: TimeItem) => String(v),
    },
  ];

  const confirm = () => {
    onConfirm({ meridiem: mer, hour: h, minute: mi });
    onOpenChange(false);
  };
  const cancel = () => {
    onCancel?.();
    onOpenChange(false);
  };
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      <div
        className="absolute inset-0 bg-black/30"
        onClick={() => onOpenChange(false)}
      />
      <div
        role="dialog"
        aria-modal="true"
        className="relative w-full max-w-[560px] rounded-t-2xl rounded-b-none bg-neutral-900 p-6 shadow-2xl"
      >
        <div className="mb-4 text-center text-neutral-300">
          시간을 선택하세요
        </div>
        <WheelPicker columns={columns} />
        <div className="mt-6 grid grid-cols-2 gap-4">
          <Button
            type="button"
            variant="secondary"
            size="large"
            onClick={cancel}
          >
            취소
          </Button>
          <Button type="button" size="large" onClick={confirm}>
            설정
          </Button>
        </div>
      </div>
    </div>
  );
}
