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
  value?: TimeValue; // { meridiem: "오전"|"오후", hour:1..12, minute:0..59 }
  onConfirm: (v: TimeValue) => void;
  onCancel?: () => void;
}

export function TimePicker({ value, onConfirm, onCancel }: TimePickerProps) {
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
  };
  const cancel = () => {
    onCancel?.();
  };

  return (
    <div className="px-4 pb-5">
      <div data-vaul-no-drag>
        <WheelPicker columns={columns} />
      </div>
      <div className="mt-6 grid grid-cols-2 gap-[6px]">
        <Button type="button" variant="secondary" size="large" onClick={cancel}>
          취소
        </Button>
        <Button type="button" size="large" onClick={confirm}>
          설정
        </Button>
      </div>
    </div>
  );
}
